import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import L from 'leaflet';
import { calculateDistance, debounce, searchResultIcon, getFlagEmoji } from '../utils/constants.js';
import Spinner from './Spinner';
import { createRoot } from 'react-dom/client'

function setPopupLoading(marker) {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = "flex flex-col items-center justify-center p-8 min-h-[120px]";
    marker.setPopupContent(loadingDiv);
    // 用 React 18 createRoot 渲染 Spinner
    const root = createRoot(loadingDiv);
    root.render(
        <>
            <div className="flex flex-col items-center justify-center">
                <Spinner size="medium" color="blue" />
                <div className="mt-3 text-gray-600 dark:text-gray-300 text-sm animate-pulse">searching...</div>
            </div>
        </>
    );
}

const SearchResultMarker = forwardRef(({
    map,
    searchResult,
    onLocationUpdate,
    onRemove
}, ref) => {
    const markerRef = useRef(null);
    const circleRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const dragStartPosRef = useRef(null);

    // Debounced location update function
    const debouncedLocationUpdate = useRef(
        debounce((newLat, newLng) => {
            if (onLocationUpdate) {
                onLocationUpdate(newLat, newLng);
            }
        }, 1000)
    ).current;

    // Cleanup function
    const cleanup = () => {
        if (markerRef.current && map) {
            map.removeLayer(markerRef.current);
            markerRef.current = null;
        }
        if (circleRef.current && map) {
            map.removeLayer(circleRef.current);
            circleRef.current = null;
        }
    };

    // Expose remove method via ref
    useImperativeHandle(ref, () => ({
        remove: () => {
            cleanup();
            if (onRemove) {
                onRemove();
            }
        }
    }));

    useEffect(() => {
        if (!map || !searchResult) return;

        // Cleanup previous markers
        cleanup();

        const { coordinates, location, radius, data: queryData } = searchResult;

        // Create marker with draggable option
        const marker = L.marker([coordinates.lat, coordinates.lng], {
            icon: searchResultIcon,
            draggable: true
        }).addTo(map);

        markerRef.current = marker;

        // Create search radius circle
        const circle = L.circle([coordinates.lat, coordinates.lng], {
            radius: radius,
            fillColor: '#3b82f6',
            fillOpacity: 0.1,
            color: '#3b82f6',
            weight: 2,
            opacity: 0.5
        }).addTo(map);

        circleRef.current = circle;

        // Create popup content with dark mode support
        const popupContainer = document.createElement('div');
        popupContainer.innerHTML = `
            <div class="p-3 bg-white-500 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg">
                <div class="flex items-start justify-between mb-2">
                    <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        Search Result
                    </h3>
                    <button class="search-result-close p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                
                <div class="space-y-2 text-xs">
                    ${location.countryCode
                ? `<p class="text-gray-700 dark:text-gray-300 break-words font-flags">
                        ${getFlagEmoji(location.countryCode)}  ${location.display_name}</p>`
                : ''}
                    <p class="text-gray-500 dark:text-gray-400">
                        ${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}
                    </p>
                    <p class="text-gray-500 dark:text-gray-400">
                        Search radius: ${radius >= 1000 ? `${(radius / 1000).toFixed(1)}km` : `${radius}m`}
                    </p>
                    
                    <hr class="border-gray-200 dark:border-gray-600">
                    
                    ${queryData ? `
                        <div class="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                                data found at this location
                        </div>
                    ` : `
                        <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                            </svg>
                                No data found within search radius
                        </div>
                    `}
                    
                    <div class="text-gray-400 dark:text-gray-500 text-xs mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                        💡 Drag marker to search new location
                    </div>
                </div>
            </div>
        `;

        // Bind popup
        marker.bindPopup(popupContainer, {
            maxWidth: 300,
            className: 'result-popup',
            closeButton: false
        });

        // Add close button event listener
        const closeButton = popupContainer.querySelector('.search-result-close');
        if (closeButton) {
            closeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                if (marker && marker.closePopup) {
                    marker.closePopup();
                }
            });
        }

        // Handle marker drag events
        marker.on('dragstart', (e) => {
            setIsDragging(true);
            dragStartPosRef.current = e.target.getLatLng();
            marker.closePopup();
        });

        marker.on('drag', (e) => {
            const newPos = e.target.getLatLng();
            circle.setLatLng(newPos);
        });

        marker.on('dragend', (e) => {
            const newPos = e.target.getLatLng();
            const startPos = dragStartPosRef.current;

            if (startPos && calculateDistance(startPos.lat, startPos.lng, newPos.lat, newPos.lng) > 50) {
                setPopupLoading(marker);
                debouncedLocationUpdate(newPos.lat, newPos.lng);
            } else {
                console.warn('Distance too small or no start position');
            }

            setIsDragging(false);
            dragStartPosRef.current = null;

            setTimeout(() => {
                if (markerRef.current && !isDragging) {
                    marker.openPopup();
                }
            }, 300);
        });

        // Fit map to show search area
        const bounds = circle.getBounds();
        map.fitBounds(bounds, { padding: [20, 20] });

        // Open popup after a short delay
        setTimeout(() => {
            if (markerRef.current) {
                marker.openPopup();
            }
        }, 500);

        return cleanup;

    }, [map, searchResult, onLocationUpdate, onRemove, debouncedLocationUpdate]);

    return null;
});

SearchResultMarker.displayName = 'SearchResultMarker';

export default SearchResultMarker;
