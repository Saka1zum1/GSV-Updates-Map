import React, { useCallback, useState, useMemo, useEffect } from 'react';
import usePersistentState from './hooks/usePersistentState.js';
import MapContainer from './components/MapContainer.jsx';
import TopNavBar from './components/NavBar.jsx';
import FilterPanel from './components/Filter.jsx';
import FilterStatus from './components/FilterStatus.jsx';
import CompactCalendarWidget from './components/Calendar.jsx';
import { FullScreenSpinner } from './components/Spinner.jsx';
import { useMapData, useCalendar } from './hooks/useMapData.js';
import { colorOptions } from './utils/constants.js';
import { queryByLocation, reverseGeocode } from './utils/api.js';
import { X } from 'lucide-react';

function App() {
    const {
        filteredData,
        countries,
        countriesMap,
        regionsMap,
        loading,
        error,
        filters,
        mapMode,
        updateFilters,
        updateMapMode
    } = useMapData();

    const [errorVisible, setErrorVisible] = useState(true);

    const { calendarState, updateCalendarState } = useCalendar();

    const [isDarkTheme, setIsDarkTheme] = usePersistentState('theme', false);
    const [colorPreference, setColorPreference] = usePersistentState('colorPreference', 0);
    const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
    const [cluster, setCluster] = usePersistentState('cluster', true);
    const [isHeatmap, setIsHeatmap] = usePersistentState('isHeatmap', false);
    const [gsvOpacity, setGsvOpacity] = usePersistentState('gsvOpacity', 1);
    const [calendarVisible, setCalendarVisible] = usePersistentState('calendarVisible', true);
    const [searchResult, setSearchResult] = useState(null);

    const handleOpacityChange = useCallback((value) => {
        setGsvOpacity(value);
    }, []);

    const handleLocationSearch = useCallback((searchData) => {
        setSearchResult(searchData);

        // Update filters with search data
        if (searchData && searchData.location && searchData.coordinates && searchData.radius) {
            updateFilters({
                search: {
                    address: searchData.location.display_name,
                    lat: searchData.coordinates.lat,
                    lng: searchData.coordinates.lng,
                    radius: searchData.radius,
                    countryCode: searchData.location?.countryCode || null,
                }
            });
        }
    }, [updateFilters]);

    // Handle search location update (when dragged)
    const handleSearchLocationUpdate = useCallback(async (newLat, newLng) => {
        if (!searchResult) return;

        try {
            // 1. Reverse geocode 获取新地名和国家代码
            // 并发请求 reverseGeocode 和 queryByLocation
            const [geoData, data] = await Promise.all([
                reverseGeocode(newLat, newLng),
                queryByLocation(newLat, newLng, searchResult.radius)]);
         
            // 3. 更新 searchResult
            const updatedSearchResult = {
                ...searchResult,
                coordinates: { lat: newLat, lng: newLng },
                data: data.data,
                location: {
                    ...searchResult.location,
                    display_name: geoData.display_name,
                    countryCode: geoData.countryCode
                }
            };

            setSearchResult(updatedSearchResult);

            // 4. 更新 filters
            updateFilters({
                search: {
                    address: geoData.display_name,
                    lat: newLat,
                    lng: newLng,
                    radius: searchResult.radius,
                    countryCode: geoData.countryCode
                }
            });
        } catch (error) {
            console.error('Failed to update search location:', error);
        }
    }, [searchResult, updateFilters]);

    // Handle search result removal
    const handleSearchResultRemove = useCallback(() => {
        setSearchResult(null);
        updateFilters({ search: null });
    }, [updateFilters]);

    // Dummy function for backward compatibility - filters now auto-apply
    const handleApplyFilters = useCallback(() => {
        // Filters are automatically applied via useEffect in useMapData hook
    }, []);

    // Extract unique authors from data
    const authors = useMemo(() => {
        if (!filteredData) return [];
        const authorSet = new Set();
        filteredData.forEach(item => {
            if (item.author) authorSet.add(item.author);
        });
        return Array.from(authorSet).sort();
    }, [filteredData]);

    // Drawing event handlers (useRef to keep stable reference)
    const drawCreatedRef = React.useRef();
    const drawEditedRef = React.useRef();
    const drawDeletedRef = React.useRef();

    drawCreatedRef.current = (layer) => {
        updateFilters({ poly: [...filters.poly, layer] });
    };
    drawEditedRef.current = (layers) => {
        updateFilters({ poly: layers });
    };
    drawDeletedRef.current = () => {
        updateFilters({ poly: [] });
    };

    // html dark class
    useEffect(() => {
        if (isDarkTheme) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkTheme]);

    // Handle control panel actions
    const handleToggleHeatmap = useCallback(() => {
        setIsHeatmap(prev => !prev);
        updateMapMode({ isHeatmap: !mapMode.isHeatmap });
    }, [mapMode.isHeatmap, updateMapMode]);

    const handleToggleCluster = useCallback(() => {
        setCluster(prev => !prev);
        updateMapMode({ isCluster: !mapMode.isCluster });
    }, [mapMode.isCluster, updateMapMode]);

    const handleTogglePeak = useCallback(() => {
        updateMapMode({
            isPeak: !mapMode.isPeak,
            isSpot: false
        });
    }, [mapMode.isPeak, updateMapMode]);

    const handleToggleSpot = useCallback(() => {
        updateMapMode({
            isSpot: !mapMode.isSpot,
            isPeak: false
        });
    }, [mapMode.isSpot, updateMapMode]);

    const handleCopyJSON = useCallback(() => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const formattedData = filteredData.map(item => ({
            lat: item.location.y,
            lng: item.location.x,
            heading: 0,
            pitch: 0,
            zoom: 0,
            panoId: item.panoId,
            extra: {
                tags: [
                    item.country || null,
                    item.author || null,
                    item.camera || null,
                    `${months[(item.month) - 1]} ${item.year}` || null,
                    ...(() => {
                        try {
                            return JSON.parse(item.types);
                        } catch {
                            return [];
                        }
                    })()
                ].filter(Boolean)
            }
        }));

        const formattedText = JSON.stringify(formattedData);
        navigator.clipboard.writeText(formattedText).then(() => {
            alert('JSON data has been copied to your clipboard');
        }).catch(err => {
            console.error('Failed to copy to clipboard', err);
        });
    }, [filteredData]);

    const handleToggleColor = useCallback(() => {
        const colorKeys = Object.keys(colorOptions);
        const newPreference = (colorPreference + 1) % colorKeys.length;
        setColorPreference(newPreference);
    }, [colorPreference]);

    const handleToggleTheme = useCallback(() => {
        setIsDarkTheme(prev => {
            const next = !prev;
            if (next) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            return next;
        });
    }, []);

    const handleDownloadJSON = useCallback(() => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const formattedData = filteredData.map(item => ({
            lat: item.location.y,
            lng: item.location.x,
            heading: 0,
            pitch: 0,
            zoom: 0,
            panoId: item.panoId,
            extra: {
                tags: [
                    item.country || null,
                    item.author || null,
                    `${months[(item.month) - 1]} ${item.year}` || null,
                    ...(() => {
                        try {
                            return JSON.parse(item.types || item.camera);
                        } catch {
                            return [];
                        }
                    })()
                ].filter(Boolean)
            }
        }));

        const blob = new Blob([JSON.stringify(formattedData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'gsv-updates-map-data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [filteredData]);

    const handleDownloadCSV = useCallback(() => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const headers = ['Latitude', 'Longitude', 'PanoID', 'Country', 'Author', 'Date', 'Types'];
        const csvData = filteredData.map(item => [
            item.location.y,
            item.location.x,
            item.panoId,
            item.country || '',
            item.author || '',
            `${months[(item.month) - 1]} ${item.year}` || '',
            (() => {
                try {
                    const types = JSON.parse(item.types || item.camera);
                    return Array.isArray(types) ? types.join(';') : types;
                } catch {
                    return item.types || item.camera || '';
                }
            })()
        ]);

        const csvContent = [headers, ...csvData]
            .map(row => row.map(field => `"${field}"`).join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'gsv-updates-map-data.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [filteredData]);

    // Handle calendar actions
    const handleDateSelect = useCallback((dates) => {
        if (!dates || dates.length === 0) return;

        let startDate, endDate;

        // Handle range mode properly
        if (calendarState.isRangeMode && dates.length === 2) {
            // Two dates selected in range mode
            if (calendarState.currentView === 'months') {
                startDate = new Date(dates[0].getFullYear(), dates[0].getMonth(), 1);
                endDate = new Date(dates[1].getFullYear(), dates[1].getMonth() + 1, 0);
            } else if (calendarState.currentView === 'years') {
                startDate = new Date(dates[0].getFullYear(), 0, 1);
                endDate = new Date(dates[1].getFullYear(), 11, 31);
            } else {
                startDate = new Date(dates[0]);
                endDate = new Date(dates[1]);
            }
        } else {
            // Single date or first date in range mode
            const localdate = new Date(dates[0]);
            if (calendarState.currentView === 'months') {
                startDate = new Date(localdate.getFullYear(), localdate.getMonth(), 1);
                endDate = new Date(localdate.getFullYear(), localdate.getMonth() + 1, 0);
            } else if (calendarState.currentView === 'years') {
                startDate = new Date(localdate.getFullYear(), 0, 1);
                endDate = new Date(localdate.getFullYear(), 11, 31);
            } else {
                startDate = new Date(localdate);
                // For single date mode or incomplete range, end date is same as start date + 1 day
                if (calendarState.isRangeMode && dates.length === 1) {
                    endDate = new Date(localdate); // For incomplete range, keep same date until second date is selected
                } else {
                    endDate = new Date(localdate.getTime() + 86400000); // Add one day for single mode
                }
            }
        }

        // Only update if we have a complete selection (single mode or completed range)
        if (!calendarState.isRangeMode || dates.length === 2) {
            const startTimestamp = Math.floor(startDate.getTime() / 1000);
            const endTimestamp = Math.floor(endDate.getTime() / 1000);

            updateFilters({
                report_date: [startTimestamp, endTimestamp]
            });
        }
    }, [calendarState, updateFilters]);

    // Get selected dates for calendar display
    const getSelectedDates = useCallback(() => {
        if (!filters.report_date || !filters.report_date[0] || !filters.report_date[1]) {
            return [];
        }

        const startDate = new Date(filters.report_date[0] * 1000);
        const endDate = new Date(filters.report_date[1] * 1000);

        // Ensure we're using the correct dates based on calendar view and mode
        if (calendarState.currentView === 'months') {
            const startMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
            const endMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

            if (calendarState.isRangeMode && startMonth.getTime() !== endMonth.getTime()) {
                return [startMonth, endMonth];
            } else {
                return [startMonth];
            }
        } else if (calendarState.currentView === 'years') {
            const startYear = new Date(startDate.getFullYear(), 0, 1);
            const endYear = new Date(endDate.getFullYear(), 0, 1);

            if (calendarState.isRangeMode && startYear.getTime() !== endYear.getTime()) {
                return [startYear, endYear];
            } else {
                return [startYear];
            }
        } else {
            // Days view - for one month range, we should show it as a range
            const timeDiff = endDate.getTime() - startDate.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

            // If the range is more than a few days and calendar is in range mode, show as range
            if (calendarState.isRangeMode && daysDiff > 7) {
                return [startDate, endDate];
            } else if (daysDiff > 7) {
                // If it's a long range but not in range mode, just show start date
                return [startDate];
            } else {
                // Short range or single day
                return [startDate];
            }
        }
    }, [filters.report_date, calendarState.isRangeMode, calendarState.currentView]);

    const handleToggleCalendarMode = useCallback(() => {
        updateCalendarState({ isRangeMode: !calendarState.isRangeMode });
    }, [calendarState.isRangeMode, updateCalendarState]);

    const handleToggleCalendarView = useCallback(() => {
        let newView;
        switch (calendarState.currentView) {
            case 'days':
                newView = 'months';
                break;
            case 'months':
                newView = 'years';
                break;
            case 'years':
                newView = 'days';
                break;
            default:
                newView = 'days';
        }
        updateCalendarState({ currentView: newView });
    }, [calendarState.currentView, updateCalendarState]);

    return (
        <div className={
            'relative w-screen h-full font-flags bg-gray-100 dark:bg-gray-900'
        }>
            {/* Loading Overlay - Non-blocking */}
            {loading && (
                <FullScreenSpinner
                    title={mapMode.isSpot ? "Loading spottings..." :
                        mapMode.isPeak ? "Loading peak locations" : "Loading updates..."}
                    subtitle="Please wait while we fetching data"
                    color="blue"
                />
            )}

            {/* Error Notification */}
            {error && errorVisible && (
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded shadow-lg flex items-center gap-3">
                    <p className="flex-1">Error: {error}</p>
                    <button
                        onClick={() => setErrorVisible(false)}
                        className="rounded-full hover:bg-red-200 dark:hover:bg-red-800 text-red-700 dark:text-red-300"
                        title="Close"
                    >
                        <X className="absolute w-4 h-4 top-1 right-1" />
                    </button>
                </div>
            )}

            {/* Top Navigation Bar */}
            <TopNavBar
                isHeatmap={isHeatmap}
                isCluster={cluster}
                isPeak={mapMode.isPeak}
                isSpot={mapMode.isSpot}
                onToggleHeatmap={handleToggleHeatmap}
                onToggleCluster={handleToggleCluster}
                onTogglePeak={handleTogglePeak}
                onToggleSpot={handleToggleSpot}
                onCopyJSON={handleCopyJSON}
                onDownloadJSON={handleDownloadJSON}
                onDownloadCSV={handleDownloadCSV}
                onToggleTheme={handleToggleTheme}
                onToggleColor={handleToggleColor}
                colorPreference={colorPreference}
                isDarkTheme={isDarkTheme}
                gsvOpacity={gsvOpacity}
                onOpacityChange={handleOpacityChange}
                onToggleFilterSidebar={() => setFilterSidebarOpen(open => !open)}
                calendarVisible={calendarVisible}
                onToggleCalendar={() => setCalendarVisible(prev => !prev)}
                onLocationSearch={handleLocationSearch}
            />

            {/* Map Container */}
            <div className="h-screen pt-12 sm:pt-16">
                <MapContainer
                    data={filteredData}
                    onDrawCreated={drawCreatedRef}
                    onDrawEdited={drawEditedRef}
                    onDrawDeleted={drawDeletedRef}
                    isHeatmap={isHeatmap}
                    isCluster={cluster}
                    colorPreference={colorPreference}
                    gsvOpacity={gsvOpacity}
                    searchResult={searchResult}
                    onSearchLocationUpdate={handleSearchLocationUpdate}
                    onSearchResultRemove={handleSearchResultRemove}
                />
            </div>

            {/* Filter Status Widget */}
            <FilterStatus
                filteredData={filteredData}
                filters={filters}
                onUpdateFilters={updateFilters}
                countries={countries}
                mapMode={mapMode}
                onSearchResultRemove={handleSearchResultRemove}
            />

            {/* Left Sidebar Filter */}
            <FilterPanel
                filters={filters}
                onUpdateFilters={updateFilters}
                isSpot={mapMode.isSpot}
                isPeak={mapMode.isPeak}
                countries={countries}
                countriesMap={countriesMap}
                regionsMap={regionsMap}
                authors={authors}
                filteredData={filteredData}
                onApplyFilters={handleApplyFilters}
                isOpen={filterSidebarOpen}
                setIsOpen={setFilterSidebarOpen}
            />

            {/* Compact Calendar Widget */}
            {calendarVisible && (
                <CompactCalendarWidget
                    isRangeMode={calendarState.isRangeMode}
                    currentView={calendarState.currentView}
                    selectedDates={getSelectedDates()}
                    onDateSelect={handleDateSelect}
                    onToggleMode={handleToggleCalendarMode}
                    onToggleView={handleToggleCalendarView}
                />
            )}
        </div>
    );
}

export default App;
