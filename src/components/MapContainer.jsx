import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet-contextmenu/dist/leaflet.contextmenu.css';
import '../styles/popup.css';

// Import required Leaflet plugins
import 'leaflet.markercluster';
import 'leaflet.heat';
import 'leaflet-contextmenu';

// Import the local leaflet-draw plugin
import '../../public/leaflet-draw/leaflet.draw.js';
import '../../public/leaflet-draw/leaflet.draw.css';

import {
    getIconType,
    colorOptions,
    copyCoords,
    openNearestPano
} from '../utils/constants.js';
import { createRoot } from 'react-dom/client';
import MarkerPopup from './MarkerPopup.jsx';
import { PanoramasLayer } from '../utils/PanoramasLayer.js';

const MapContainer = ({
    data,
    onDrawCreated,
    onDrawEdited,
    onDrawDeleted,
    isHeatmap,
    isCluster,
    colorPreference,
    gsvOpacity
}) => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersRef = useRef([]);
    const clusterGroupRef = useRef(null);
    const heatmapLayerRef = useRef(null);
    const drawnItemsRef = useRef(null);
    const drawControlRef = useRef(null);
    const gsvLayersRef = useRef({});

    // Helper function to normalize coordinates for worldCopyJump
    const normalizeLatLngs = (latlngs) => {
        if (!Array.isArray(latlngs)) return latlngs;
        
        return latlngs.map(coordArray => {
            if (Array.isArray(coordArray) && coordArray.length > 0 && Array.isArray(coordArray[0])) {
                // Handle nested arrays (polygon with holes)
                return coordArray.map(coord => normalizeCoord(coord));
            } else {
                // Handle simple coordinate array
                return normalizeCoord(coordArray);
            }
        });
    };

    const normalizeCoord = (coord) => {
        if (coord && typeof coord.lng !== 'undefined') {
            // Normalize longitude to [-180, 180] range
            let lng = coord.lng;
            while (lng > 180) lng -= 360;
            while (lng < -180) lng += 360;
            
            return L.latLng(coord.lat, lng);
        }
        return coord;
    };

    // Initialize map (once only)
    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return;

        // Create base layers
        const roadmapBaseLayer = L.tileLayer("https://www.google.com/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m1!2sm!3m17!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2ss.e:l|p.v:off,s.t:1|s.e:g.s|p.v:on!5m1!5f1.5"
        );

        const roadmapLabelsLayer = L.tileLayer("https://www.google.com/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m1!2sm!3m17!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2ss.e:g|p.v:off,s.t:1|s.e:g.s|p.v:on,s.e:l|p.v:on!5m1!5f3",
            { pane: "labelPane" });

        const satelliteBaseLayer = L.tileLayer("https://www.google.com/maps/vt?pb=!1m7!8m6!1m3!1i{z}!2i{x}!3i{y}!2i9!3x1!2m2!1e1!2sm!3m3!2sen!3sus!5e1105!4e0!5m4!1e0!8m2!1e1!1e1!6m6!1e12!2i2!11e0!39b0!44e0!50e0"
        );

        const osmLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { subdomains: ["a", "b", "c"] });

        const terrainBaseLayer = L.tileLayer("https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m1!2sm!2m2!1e5!2sshading!2m2!1e6!2scontours!3m17!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sTerrain!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2ss.e:l|p.v:off,s.t:1|s.e:g.s|p.v:on!5m1!5f1.5");

        const terrainLabelsLayer = roadmapLabelsLayer;

        const satelliteLabelsLayer = L.tileLayer("https://www.google.com/maps/vt?pb=!1m7!8m6!1m3!1i{z}!2i{x}!3i{y}!2i9!3x1!2m2!1e0!2sm!3m5!2sen!3sus!5e1105!12m1!1e4!4e0!5m4!1e0!8m2!1e1!1e1!6m6!1e12!2i2!11e0!39b0!44e0!50e0",
            { pane: "labelPane" });

        const roadmapLayer = L.layerGroup([roadmapBaseLayer, roadmapLabelsLayer]);

        const terrainLayer = L.layerGroup([terrainBaseLayer, terrainLabelsLayer]);

        const satelliteLayer = L.layerGroup([satelliteBaseLayer, satelliteLabelsLayer]);

        const cartoLightLayer = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", { subdomains: ["a", "b", "c"] });

        const cartoDarkLayer = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png", { subdomains: ["a", "b", "c"] });

        // Create initial GSV layers (will be updated by color preference effect)
        const gsvLayer = L.tileLayer("", { pane: "coveragePane", opacity: gsvOpacity });
        const gsvLayer2 = L.tileLayer("", { pane: "coveragePane", opacity: gsvOpacity });
        const gsvLayer3 = L.tileLayer("", { pane: "coveragePane", opacity: gsvOpacity });

        // Create GSV Zoom Coverage layer
        const panoramasLayer = new PanoramasLayer({ pane: "panoramasPane" });

        // Store references to GSV layers for opacity and color control
        gsvLayersRef.current = {
            gsvLayer,
            gsvLayer2,
            gsvLayer3
        };

        // Initialize map
        const map = L.map(mapRef.current, {
            minZoom: 1,
            contextmenu: true,
            contextmenuItems: [
                { text: 'Copy Coordinates', callback: copyCoords },
                { text: 'See Nearest Pano', callback: openNearestPano },
            ],
            center: [0, 0],
            zoom: 2,
            preferCanvas: true,
            zoomControl: false,
            worldCopyJump: false,
            attributionControl: false,
            zoomAnimation: true,
            maxZoom: 18
        });

        // Create panes
        map.createPane("labelPane");
        map.createPane("panoramasPane");
        map.createPane("coveragePane");
        map.getPane("labelPane").style.zIndex = 300;
        map.getPane("panoramasPane").style.zIndex = 500;
        map.getPane("coveragePane").style.zIndex = 200;

        // Add base layers
        const baseMaps = {
            "Roadmap": roadmapLayer,
            "Satellite": satelliteLayer,
            "Terrain": terrainLayer,
            "Carto Light": cartoLightLayer,
            "Carto Dark": cartoDarkLayer,
            "OSM": osmLayer,
        };

        const overlayMaps = {
            "Google street view": gsvLayersRef.current.gsvLayer,
            "Google street view official only": gsvLayersRef.current.gsvLayer2,
            "Google street view unofficial only": gsvLayersRef.current.gsvLayer3,
            "Show panoramas(Requires zoom 16+)": panoramasLayer
        };

        roadmapLayer.addTo(map);
        panoramasLayer.addTo(map);
        gsvLayersRef.current.gsvLayer.addTo(map);

        // Add layer control
        L.control.layers(baseMaps, overlayMaps, { position: "bottomleft" }).addTo(map);

        // Initialize Leaflet Draw
        drawnItemsRef.current = new L.GeoJSON().addTo(map);

        const drawControl = new L.Control.Draw({
            position: 'bottomleft',
            draw: {
                polyline: false,
                marker: false,
                circlemarker: false,
                circle: false,
                polygon: {
                    allowIntersection: false,
                    drawError: {
                        color: '#e1e100',
                        message:
                            '<strong>Polygon draw does not allow intersections!<strong> (allowIntersection: false)',
                    },
                    shapeOptions: { color: '#5d8ce3' },
                },
                rectangle: { shapeOptions: { color: '#5d8ce3' } },
            },
            edit: { featureGroup: drawnItemsRef.current },
        })

        drawControlRef.current = drawControl;
        map.addControl(drawControl);

        // Draw event handlers
        map.on(L.Draw.Event.CREATED, function (e) {
            const layer = e.layer;
            
            // Fix coordinates for worldCopyJump compatibility
            if (layer instanceof L.Polygon || layer instanceof L.Rectangle) {
                const latlngs = layer.getLatLngs();
                const normalizedLatLngs = normalizeLatLngs(latlngs);
                layer.setLatLngs(normalizedLatLngs);
            }
            
            drawnItemsRef.current.addLayer(layer);
            if (onDrawCreated && onDrawCreated.current) {
                onDrawCreated.current(layer);
            }
        });

        map.on(L.Draw.Event.EDITED, function (e) {
            const layers = [];
            e.layers.eachLayer(function (layer) {
                // Fix coordinates for edited layers
                if (layer instanceof L.Polygon || layer instanceof L.Rectangle) {
                    const latlngs = layer.getLatLngs();
                    const normalizedLatLngs = normalizeLatLngs(latlngs);
                    layer.setLatLngs(normalizedLatLngs);
                }
                layers.push(layer);
            });
            if (onDrawEdited && onDrawEdited.current) {
                onDrawEdited.current(layers);
            }
        });

        map.on(L.Draw.Event.DELETED, function (e) {
            if (onDrawDeleted && onDrawDeleted.current) {
                onDrawDeleted.current();
            }
        });

        // Initialize cluster group
        clusterGroupRef.current = L.markerClusterGroup();

        mapInstanceRef.current = map;

        // Set initial GSV layer URLs with current color preference
        const colorKeys = Object.keys(colorOptions);
        const selectedColor = colorKeys[colorPreference];
        const [backgroundcolor, borderColor] = colorOptions[selectedColor];

        const gsvUrl = `https://maps.googleapis.com/maps/vt?pb=%211m5%211m4%211i{z}%212i{x}%213i{y}%214i256%212m8%211e2%212ssvv%214m2%211scc%212s*211m3*211e2*212b1*213e2*211m3*211e3*212b1*213e2*211m3*211e10*212b1*213e2*212b1*214b1%214m2%211ssvl%212s*212b1%213m17%212sen%213sUS%215e18%2112m4%211e68%212m2%211sset%212sRoadmap%2112m3%211e37%212m1%211ssmartmaps%2112m4%211e26%212m2%211sstyles%212ss.e%3Ag.f%7Cp.c%3A${encodeURIComponent(backgroundcolor)}%7Cp.w%3A1%2Cs.e%3Ag.s%7Cp.c%3A${encodeURIComponent(borderColor)}%7Cp.w%3A3%215m1%215f1.35`;
        const gsv2Url = `https://maps.googleapis.com/maps/vt?pb=%211m5%211m4%211i{z}%212i{x}%213i{y}%214i256%212m8%211e2%212ssvv%214m2%211scc%212s*211m3*211e2*212b1*213e2*212b1*214b1%214m2%211ssvl%212s*212b1%213m17%212sen%213sUS%215e18%2112m4%211e68%212m2%211sset%212sRoadmap%2112m3%211e37%212m1%211ssmartmaps%2112m4%211e26%212m2%211sstyles%212ss.e%3Ag.f%7Cp.c%3A${encodeURIComponent(backgroundcolor)}%7Cp.w%3A1%2Cs.e%3Ag.s%7Cp.c%3A${encodeURIComponent(borderColor)}%7Cp.w%3A3%215m1%215f1.35`
        const gsv3Url = `https://maps.googleapis.com/maps/vt?pb=%211m5%211m4%211i{z}%212i{x}%213i{y}%214i256%212m8%211e2%212ssvv%214m2%211scc%212s*211m3*211e3*212b1*213e2*211m3*211e10*212b1*213e2*212b1*214b1%214m2%211ssvl%212s*212b1%213m17%212sen%213sUS%215e18%2112m4%211e68%212m2%211sset%212sRoadmap%2112m3%211e37%212m1%211ssmartmaps%2112m4%211e26%212m2%211sstyles%212ss.e%3Ag.f%7Cp.c%3A${encodeURIComponent(backgroundcolor)}%7Cp.w%3A1%2Cs.e%3Ag.s%7Cp.c%3A${encodeURIComponent(borderColor)}%7Cp.w%3A3%215m1%215f1.35`

        gsvLayersRef.current.gsvLayer.setUrl(gsvUrl);
        gsvLayersRef.current.gsvLayer2.setUrl(gsv2Url);
        gsvLayersRef.current.gsvLayer3.setUrl(gsv3Url);

        return () => {
            // Clean up draw control
            if (drawControlRef.current && mapInstanceRef.current) {
                mapInstanceRef.current.removeControl(drawControlRef.current);
                drawControlRef.current = null;
            }

            // Clean up drawn items
            if (drawnItemsRef.current && mapInstanceRef.current) {
                mapInstanceRef.current.removeLayer(drawnItemsRef.current);
                drawnItemsRef.current = null;
            }

            // Clean up markers
            markersRef.current.forEach(marker => {
                if (marker.popupRoot) {
                    marker.popupRoot.unmount();
                }
            });
            markersRef.current = [];

            // Clean up map
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []); // Remove colorPreference dependency

    // Separate useEffect for color scheme changes - updates GSV layer URLs without re-rendering map
    useEffect(() => {
        if (!gsvLayersRef.current) return;

        // Get selected colors
        const colorKeys = Object.keys(colorOptions);
        const selectedColor = colorKeys[colorPreference];
        const [backgroundcolor, borderColor] = colorOptions[selectedColor];

        // Generate new URLs with updated colors
        const gsvUrl = `https://maps.googleapis.com/maps/vt?pb=%211m5%211m4%211i{z}%212i{x}%213i{y}%214i256%212m8%211e2%212ssvv%214m2%211scc%212s*211m3*211e2*212b1*213e2*211m3*211e3*212b1*213e2*211m3*211e10*212b1*213e2*212b1*214b1%214m2%211ssvl%212s*212b1%213m16%212sen%213sUS%2112m4%211e68%212m2%211sset%212sRoadmap%2112m3%211e37%212m1%211ssmartmaps%2112m4%211e26%212m2%211sstyles%212sp.c%3A${encodeURIComponent(backgroundcolor)}%2Cs.e%3Ag.f%7Cp.c%3A${encodeURIComponent(backgroundcolor)}%7Cp.w%3A1%2Cs.e%3Ag.s%7Cp.c%3A${encodeURIComponent(borderColor)}%7Cp.w%3A3%215m1%215f1.5`;
        const gsv2Url = `https://maps.googleapis.com/maps/vt?pb=%211m5%211m4%211i{z}%212i{x}%213i{y}%214i256%212m8%211e2%212ssvv%214m2%211scc%212s*211m3*211e2*212b1*213e2*212b1*214b1%214m2%211ssvl%212s*212b1%213m17%212sen%213sUS%215e18%2112m4%211e68%212m2%211sset%212sRoadmap%2112m3%211e37%212m1%211ssmartmaps%2112m4%211e26%212m2%211sstyles%212ss.e%3Ag.f%7Cp.c%3A${encodeURIComponent(backgroundcolor)}%7Cp.w%3A1%2Cs.e%3Ag.s%7Cp.c%3A${encodeURIComponent(borderColor)}%7Cp.w%3A3%215m1%215f1.5`
        const gsv3Url = `https://maps.googleapis.com/maps/vt?pb=%211m5%211m4%211i{z}%212i{x}%213i{y}%214i256%212m8%211e2%212ssvv%214m2%211scc%212s*211m3*211e3*212b1*213e2*211m3*211e10*212b1*213e2*212b1*214b1%214m2%211ssvl%212s*212b1%213m17%212sen%213sUS%215e18%2112m4%211e68%212m2%211sset%212sRoadmap%2112m3%211e37%212m1%211ssmartmaps%2112m4%211e26%212m2%211sstyles%212sp.c%3A${encodeURIComponent(backgroundcolor)}%2Cs.e%3Ag.f%7Cp.c%3A${encodeURIComponent(backgroundcolor)}%7Cp.w%3A1%2Cs.e%3Ag.s%7Cp.c%3A${encodeURIComponent(borderColor)}%7Cp.w%3A3%215m1%215f1.5`

        // Update URLs for existing GSV layers
        const { gsvLayer, gsvLayer2, gsvLayer3 } = gsvLayersRef.current;

        if (gsvLayer && gsvLayer.setUrl) {
            gsvLayer.setUrl(gsvUrl);
        }
        if (gsvLayer2 && gsvLayer2.setUrl) {
            gsvLayer2.setUrl(gsv2Url);
        }
        if (gsvLayer3 && gsvLayer3.setUrl) {
            gsvLayer3.setUrl(gsv3Url);
        }
    }, [colorPreference]);

    // Separate useEffect for opacity control - prevents map re-rendering
    useEffect(() => {
        if (!gsvLayersRef.current) return;

        // Update opacity for all GSV layers without re-creating them
        Object.values(gsvLayersRef.current).forEach(layer => {
            if (layer && typeof layer.setOpacity === 'function') {
                layer.setOpacity(gsvOpacity);
            }
        });
    }, [gsvOpacity]);

    // Create marker icons
    const createIcon = (type) => {
        const iconUrls = {
            gen1: '/assets/markers/marker-green.png',
            gen2or3: '/assets/markers/marker-violet.png',
            gen4: '/assets/markers/marker-blue.png',
            newroad: '/assets/markers/marker-red.png',
            noblueline: '/assets/markers/marker-pink.png',
        };

        return L.icon({
            iconUrl: iconUrls[type] || iconUrls.gen4,
            iconAnchor: [12, 41]
        });
    };

    // Draw markers
    const drawMarkers = (mapData) => {
        if (!mapInstanceRef.current) return;

        // Clear existing markers and cluster group
        if (clusterGroupRef.current && mapInstanceRef.current.hasLayer(clusterGroupRef.current)) {
            mapInstanceRef.current.removeLayer(clusterGroupRef.current);
        }
        if (clusterGroupRef.current) {
            clusterGroupRef.current.clearLayers();
        }

        markersRef.current.forEach(marker => {
            if (mapInstanceRef.current.hasLayer(marker)) {
                mapInstanceRef.current.removeLayer(marker);
            }
        });
        markersRef.current = [];

        // If no data, just clear and return
        if (!mapData || mapData.length === 0) return;

        mapData.forEach(item => {
            if (!item.location) return;

            const { location, panoId, types, source_link } = item;

            // Parse types for icon selection
            let typesList = [];
            if (typeof types === 'string') {
                try {
                    typesList = JSON.parse(types);
                    if (!Array.isArray(typesList)) {
                        typesList = types.split(',').map(t => t.trim()).filter(Boolean);
                    }
                } catch {
                    typesList = types.split(',').map(t => t.trim()).filter(Boolean);
                }
            } else if (Array.isArray(types)) {
                typesList = types;
            }

            const iconType = getIconType(typesList);
            const icon = createIcon(iconType);
            const marker = L.marker([location.y, location.x], { icon });

            // Create popup container and render React component
            const popupContainer = document.createElement('div');
            popupContainer.style.visibility = 'hidden';

            const popupRoot = createRoot(popupContainer);
            popupRoot.render(<MarkerPopup item={item} />);

            // Store root for cleanup
            marker.popupRoot = popupRoot;

            marker.bindPopup(popupContainer, {
                direction: 'top',
                offset: [0, -41],
                className: 'custom-popup',
                closeButton: false,

            });

            // Setup event handlers with the React-rendered popup
            marker.on('mouseover', function () {
                setTimeout(() => {
                    popupContainer.style.visibility = 'visible';
                    this.openPopup();
                }, 0);
            });

            marker.on('mouseout', function () {
                this.closePopup();
            });

            marker.on('click', function () {
                const link = `https://www.google.com/maps/@?api=1&map_action=pano&pano=${panoId}`;
                window.open(source_link ? source_link : link, '_blank');
            });

            if (isCluster) {
                clusterGroupRef.current.addLayer(marker);
            } else {
                mapInstanceRef.current.addLayer(marker);
            }

            markersRef.current.push(marker);
        });

        // Add cluster group to map if clustering is enabled
        if (isCluster && clusterGroupRef.current && clusterGroupRef.current.getLayers().length > 0) {
            mapInstanceRef.current.addLayer(clusterGroupRef.current);
        }
    };

    // Draw heatmap
    const drawHeatmap = (mapData) => {
        if (!mapInstanceRef.current) return;

        // Remove existing heatmap layer
        if (heatmapLayerRef.current && mapInstanceRef.current.hasLayer(heatmapLayerRef.current)) {
            mapInstanceRef.current.removeLayer(heatmapLayerRef.current);
            heatmapLayerRef.current = null;
        }

        // If no data, just return after clearing
        if (!mapData || mapData.length === 0) return;

        const heatData = mapData
            .filter(item => item.location) // Ensure location exists
            .map(item => [item.location.y, item.location.x, 100]);

        if (heatData.length > 0) {
            heatmapLayerRef.current = L.heatLayer(heatData, {
                radius: 20, // Increased from 25 for bigger heat spots
                blur: 25, // Increased from 15 for smoother blending
                minOpacity: 0.4, // Minimum opacity for better visibility
                max: 2.0, // Maximum intensity for color scaling
                maxZoom: 18,
                gradient: {
                    0.0: "blue",
                    0.2: "cyan",
                    0.4: "lime",
                    0.6: "yellow",
                    0.8: "orange",
                    1.0: "red",
                },
            }).addTo(mapInstanceRef.current);
        }
    };

    // Update map when data changes
    useEffect(() => {
        if (!mapInstanceRef.current || !data) return;

        // Only update layers, don't reinitialize the map
        if (isHeatmap) {
            // Clear any existing markers first
            if (clusterGroupRef.current) {
                mapInstanceRef.current.removeLayer(clusterGroupRef.current);
                clusterGroupRef.current.clearLayers();
            }
            markersRef.current.forEach(marker => {
                if (mapInstanceRef.current.hasLayer(marker)) {
                    mapInstanceRef.current.removeLayer(marker);
                }
            });
            markersRef.current = [];

            // Add heatmap
            drawHeatmap(data);
        } else {
            // Clear heatmap if exists
            if (heatmapLayerRef.current && mapInstanceRef.current.hasLayer(heatmapLayerRef.current)) {
                mapInstanceRef.current.removeLayer(heatmapLayerRef.current);
                heatmapLayerRef.current = null;
            }

            // Add markers
            drawMarkers(data);
        }
    }, [data, isHeatmap, isCluster]);

    return (
        <div
            ref={mapRef}
            className="w-full h-full"
            style={{ zIndex: 1 }}
        />
    );
};

export default MapContainer;
