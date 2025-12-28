import React, { useEffect, useRef, useCallback } from 'react';
import { DeckGL } from '@deck.gl/react';
import { IconLayer } from '@deck.gl/layers';
import L from 'leaflet';
import { createRoot } from 'react-dom/client';
import MarkerPopup from './MarkerPopup.jsx';
import { getIconType } from '../utils/constants.js';

const WebGLMarkerLayer = L.Layer.extend({
    options: {
        data: [],
        onMarkerClick: null,
        onMarkerHover: null
    },

    initialize: function (options) {
        L.setOptions(this, options);
        this._data = options.data || [];
        this._deckglContainer = null;
        this._deckglInstance = null;
        this._popupRef = null;
        this._hoveredObject = null;
        this._showingPopup = false; // Flag to prevent immediate popup hiding
    },

    onAdd: function (map) {
        this._map = map;

        this._deckglContainer = L.DomUtil.create('div', 'webgl-marker-layer', map._container);
        this._deckglContainer.style.position = 'absolute';
        this._deckglContainer.style.top = '0';
        this._deckglContainer.style.left = '0';
        this._deckglContainer.style.right = '0';
        this._deckglContainer.style.bottom = '0';
        this._deckglContainer.style.width = '100%';
        this._deckglContainer.style.height = '100%';
        this._deckglContainer.style.pointerEvents = 'none';
        this._deckglContainer.style.zIndex = '650';
        this._deckglContainer.style.overflow = 'hidden';
        this._deckglContainer.style.transition = 'visibility 0.1s ease-out'; // Smooth visibility transitions

        this._reactRoot = createRoot(this._deckglContainer);

        // Enhanced event binding for smooth animation synchronization
        this._map.on('move', this._update, this);
        this._map.on('drag', this._update, this);
        this._map.on('viewreset', this._update, this);
        this._map.on('resize', this._update, this);
        
        // Bind zoom animation events for smooth transition
        this._map.on('zoomstart', this._update, this);
        this._map.on('zoomanim', this._update, this);
        this._map.on('zoomend', this._update, this);
        
        // Initialize animation state
        this._animatingZoom = false;

        // 初次渲染
        this._update();
    },

    onRemove: function () {
        // 清理popup
        this._cleanupPopup();

        // Clean up all event listeners
        this._map.off('move', this._update, this);
        this._map.off('drag', this._update, this);
        this._map.off('viewreset', this._update, this);
        this._map.off('resize', this._update, this);
        this._map.off('zoomanim', this._update, this);
        this._map.off('zoomstart', this._update, this);
        this._map.off('zoomend', this._update, this);

        // 异步清理React组件以避免渲染冲突
        if (this._reactRoot) {
            const root = this._reactRoot;
            this._reactRoot = null;

            // 使用setTimeout异步卸载
            setTimeout(() => {
                try {
                    root.unmount();
                } catch (e) {
                    console.warn('Error unmounting react root:', e);
                }
            }, 0);
        }

        // 移除DOM元素
        if (this._deckglContainer && this._deckglContainer.parentNode) {
            try {
                this._deckglContainer.parentNode.removeChild(this._deckglContainer);
            } catch (e) {
                console.warn('Error removing deckgl container:', e);
            }
        }

        this._deckglContainer = null;
    },

    setData: function (data) {
        this._data = data || [];
        if (this._map) {
            this._update();
        }
    },

    _update: function () {
        if (!this._map || !this._deckglContainer) return;

        // Skip expensive updates during zoom animation to maintain smooth performance
        if (this._animatingZoom) {
            return;
        }

        const mapSize = this._map.getSize();
        const center = this._map.getCenter();
        const zoom = this._map.getZoom();

        const viewState = {
            longitude: center.lng,
            latitude: center.lat,
            zoom: zoom - 1,
            pitch: 0,
            bearing: 0,
            width: mapSize.x,
            height: mapSize.y
        };

        const deckglElement = React.createElement(WebGLMarkerRenderer, {
            viewState: viewState,
            data: this._data,
            width: mapSize.x,
            height: mapSize.y,
            onClick: this._handleClick.bind(this),
            map: this._map
        });

        this._reactRoot.render(deckglElement);
    },

    _handleClick: function (info) {
        if (info.object && info.object.originalData) {
            const data = info.object.originalData;
            this._showPopup(data, info.x, info.y);
        } 
    },

    _showPopup: function (data, x, y) {
        this._showingPopup = true;

        if (!this._popupRef) {
            this._popupRef = document.createElement('div');
            this._popupRef.className = 'webgl-popup';
            this._popupRef.style.cssText = `
                position: fixed;
                z-index: 9999;
                pointer-events: auto;
                background: transparent;
                padding: 8px;
                max-width: 300px;
            `;
            document.body.appendChild(this._popupRef);
            this._popupRef.root = createRoot(this._popupRef);

            this._globalClickHandler = (e) => {
                // Don't hide if we're in the process of showing the popup
                if (this._showingPopup) {
                    this._showingPopup = false;
                    return;
                }
                
                if (this._popupRef && !this._popupRef.contains(e.target)) {
                    this._hidePopup();
                }
            };
            document.addEventListener('click', this._globalClickHandler);
        } else {
            // Reset the flag for existing popup
            this._showingPopup = true;
        }

        // Render popup content first to get dimensions
        // Pass a timestamp to force state reset in the component
        this._popupRef.root.render(React.createElement(MarkerPopup, {
            item: data,
            showLink: true,
            resetKey: Date.now() // Force component state reset
        }));

        // Make popup visible temporarily to measure dimensions
        this._popupRef.style.display = 'block';
        this._popupRef.style.visibility = 'hidden';
        
        // Get popup dimensions
        const popupRect = this._popupRef.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        let popupX = x + 10; // Default: right of marker
        let popupY = y - 10; // Default: above marker
        
        // Check horizontal bounds - if popup would overflow right, position it to the left
        if (popupX + popupRect.width > viewportWidth) {
            popupX = x - popupRect.width - 10;
            // If still overflows (very wide popup), align to right edge
            if (popupX < 0) {
                popupX = viewportWidth - popupRect.width - 10;
            }
        }
        
        // Check vertical bounds - if popup would overflow bottom, position it below marker
        if (popupY + popupRect.height > viewportHeight) {
            popupY = y + 10;
            // If still overflows (very tall popup), align to top
            if (popupY + popupRect.height > viewportHeight) {
                popupY = viewportHeight - popupRect.height - 10;
            }
        }
        
        // Ensure popup doesn't go beyond top or left edges
        if (popupY < 10) popupY = 10;
        if (popupX < 10) popupX = 10;
        
        // Apply final position and make visible
        this._popupRef.style.left = `${popupX}px`;
        this._popupRef.style.top = `${popupY}px`;
        this._popupRef.style.visibility = 'visible';
        
        // Clear the flag after a brief moment to allow normal click-to-hide behavior
        setTimeout(() => {
            this._showingPopup = false;
        }, 50);
    },

    _hidePopup: function () {
        if (this._popupRef) {
            this._popupRef.style.display = 'none';
        }
    },

    _cleanupPopup: function () {
        if (this._globalClickHandler) {
            document.removeEventListener('click', this._globalClickHandler);
            this._globalClickHandler = null;
        }

        if (this._popupRef && this._popupRef.root) {
            const root = this._popupRef.root;
            this._popupRef.root = null;

            setTimeout(() => {
                try {
                    root.unmount();
                } catch (e) {
                    console.warn('Error unmounting popup root:', e);
                }
            }, 0);
        }

        if (this._popupRef && this._popupRef.parentNode) {
            try {
                document.body.removeChild(this._popupRef);
            } catch (e) {
                console.warn('Error removing popup element:', e);
            }
        }

        this._popupRef = null;
    }
});

const WebGLMarkerRenderer = ({ viewState, data, width, height, onClick, map }) => {
    const prepareIconData = useCallback((mapData) => {
        if (!mapData || mapData.length === 0) return [];

        return mapData.map((item, index) => {
            if (!item.location) return null;

            const longitude = parseFloat(item.location.x);
            const latitude = parseFloat(item.location.y);

            if (isNaN(longitude) || isNaN(latitude) ||
                longitude < -180 || longitude > 180 ||
                latitude < -90 || latitude > 90) {
                return null;
            }

            let typesList = [];
            if (typeof item.types === 'string') {
                try {
                    typesList = JSON.parse(item.types);
                    if (!Array.isArray(typesList)) {
                        typesList = item.types.split(',').map(t => t.trim()).filter(Boolean);
                    }
                } catch {
                    typesList = item.types.split(',').map(t => t.trim()).filter(Boolean);
                }
            } else if (Array.isArray(item.types)) {
                typesList = item.types;
            }

            const iconType = getIconType(typesList);

            return {
                id: `webgl-marker-${index}`,
                coordinates: [longitude, latitude], 
                iconType: iconType,
                size: 32,
                originalData: item
            };
        }).filter(Boolean);
    }, []);

    const iconData = prepareIconData(data);

    // 创建多个IconLayer，每种图标类型一个
    const createIconLayers = () => {
        const iconTypes = ['gen1', 'gen2or3', 'gen4', 'newroad', 'noblueline'];
        const iconUrls = {
            gen1: '/assets/markers/marker-green.png',
            gen2or3: '/assets/markers/marker-violet.png',
            gen4: '/assets/markers/marker-blue.png',
            newroad: '/assets/markers/marker-red.png',
            noblueline: '/assets/markers/marker-pink.png',
        };

        return iconTypes.map(iconType => {
            const typeData = iconData.filter(item => item.iconType === iconType);

            if (typeData.length === 0) return null;

            return new IconLayer({
                id: `webgl-marker-layer-${iconType}`,
                data: typeData,
                pickable: true,
                iconAtlas: iconUrls[iconType],
                iconMapping: {
                    marker: {
                        x: 0, y: 0, width: 25, height: 41,
                        anchorY: 41, anchorX: 12.5
                    }
                },
                getIcon: () => 'marker',
                sizeScale: 1,
                getPosition: d => d.coordinates,
                getSize: d => d.size,
                getColor: () => [255, 255, 255, 255], 
                onHover: null,
                onClick: (info, event) => {
                    onClick(info, event);
                },
                updateTriggers: {
                    getPosition: typeData.map(item => item.coordinates),
                },
                visible: true,
                opacity: 1,
                autoHighlight: false,
                highlightColor: [0, 0, 0, 0]
            });
        }).filter(Boolean);
    };

    const iconLayers = createIconLayers();

    return React.createElement(DeckGL, {
        viewState: viewState,
        layers: iconLayers,
        width: width,
        height: height,
        controller: false,
        useDevicePixels: true, // 支持高DPI屏幕
        debug: false,
        coordinateSystem: undefined,
        views: undefined, // 使用默认视图
        style: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'auto'
        },
        getCursor: ({ isDragging, isHovering }) => {
            if (isDragging) return 'grabbing';
            if (isHovering) return 'pointer';
            return 'inherit';
        },
        onLoad: () => {
            //console.log('DeckGL loaded successfully with', iconData.length, 'markers in', iconLayers.length, 'layers');
        },
        onError: (error) => {
            console.error('DeckGL error:', error);
        },
        onViewStateChange: undefined,
        _animate: true,
        pickingRadius: 10,
        transitions: {
            viewState: {
                transitionDuration: 0,
                transitionEasing: t => t
            }
        }
    });
};

// 工厂函数用于创建图层实例
export const createWebGLMarkerLayer = (options) => {
    return new WebGLMarkerLayer(options);
};

export default WebGLMarkerLayer;
