import React, { useCallback, useState, useMemo, useEffect } from 'react';
import usePersistentState from './hooks/usePersistentState.js';
import MapContainer from './components/MapContainer.jsx';
import TopNavBar from './components/NavBar.jsx';
import FilterPanel from './components/Filter.jsx';
import CompactCalendarWidget from './components/Calendar.jsx';
import { FullScreenSpinner } from './components/Spinner.jsx';
import { useMapData, useCalendar } from './hooks/useMapData.js';
import { colorOptions } from './utils/constants.js';

function App() {
    const {
        filteredData,
        countries,
        loading,
        error,
        filters,
        mapMode,
        applyFilters,
        updateFilters,
        updateMapMode
    } = useMapData();

    const { calendarState, updateCalendarState } = useCalendar();

    const [isDarkTheme, setIsDarkTheme] = usePersistentState('theme', false);
    const [colorPreference, setColorPreference] = usePersistentState('colorPreference', 0);
    const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
    const [cluster, setCluster] = usePersistentState('cluster', true);
    const [isHeatmap, setIsHeatmap] = usePersistentState('isHeatmap', false);
    const [gsvOpacity, setGsvOpacity] = usePersistentState('gsvOpacity', 1);

    const handleOpacityChange = useCallback((value) => {
        setGsvOpacity(value);
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
        applyFilters();
    };
    drawEditedRef.current = (layers) => {
        updateFilters({ poly: layers });
        applyFilters();
    };
    drawDeletedRef.current = () => {
        updateFilters({ poly: [] });
        applyFilters();
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
        applyFilters();
    }, [mapMode.isPeak, updateMapMode, applyFilters]);

    const handleToggleSpot = useCallback(() => {
        updateMapMode({
            isSpot: !mapMode.isSpot,
            isPeak: false
        });
        applyFilters();
    }, [mapMode.isSpot, updateMapMode, applyFilters]);

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

        if (dates.length > 1 && calendarState.isRangeMode) {
            if (calendarState.currentView === 'months') {
                startDate = new Date(dates[0].getFullYear(), dates[0].getMonth(), 1);
                endDate = new Date(dates[1].getFullYear(), dates[1].getMonth() + 1, 0);
            } else if (calendarState.currentView === 'years') {
                startDate = new Date(dates[0].getFullYear(), 0, 1);
                endDate = new Date(dates[1].getFullYear(), 11, 31);
            } else {
                startDate = dates[0];
                endDate = dates[1];
            }
        } else {
            const localdate = new Date(dates[0]);
            if (calendarState.currentView === 'months') {
                startDate = new Date(localdate.getFullYear(), localdate.getMonth(), 1);
                endDate = new Date(localdate.getFullYear(), localdate.getMonth() + 1, 0);
            } else if (calendarState.currentView === 'years') {
                startDate = new Date(localdate.getFullYear(), 0, 1);
                endDate = new Date(localdate.getFullYear(), 11, 31);
            } else {
                startDate = localdate;
                endDate = new Date(localdate.getTime() + 86400000);
            }
        }

        updateFilters({
            report_date: [
                Math.floor(startDate.getTime() / 1000),
                Math.floor(endDate.getTime() / 1000) + 86400
            ]
        });
        applyFilters();
    }, [calendarState, updateFilters, applyFilters]);

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

    if (loading) {
        return (
            <FullScreenSpinner 
                title="Loading map data..."
                subtitle="Please wait while we fetch the latest Street View updates"
                color="blue"
            />
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
                <div className="text-xl text-red-600 dark:text-red-400">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className={
            'relative w-full h-screen font-flags bg-gray-100 dark:bg-gray-900'
        }>
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
            />

            {/* Map Container */}
            <div className="pt-16 h-full">
                <MapContainer
                    data={filteredData}
                    onDrawCreated={drawCreatedRef}
                    onDrawEdited={drawEditedRef}
                    onDrawDeleted={drawDeletedRef}
                    isHeatmap={isHeatmap}
                    isCluster={cluster}
                    colorPreference={colorPreference}
                    gsvOpacity={gsvOpacity}
                />
            </div>

            {/* Left Sidebar Filter */}
            <FilterPanel
                filters={filters}
                onUpdateFilters={updateFilters}
                isSpot={mapMode.isSpot}
                isPeak={mapMode.isPeak}
                countries={countries}
                authors={authors}
                onApplyFilters={applyFilters}
                isOpen={filterSidebarOpen}
                setIsOpen={setFilterSidebarOpen}
            />

            {/* Compact Calendar Widget */}
            <CompactCalendarWidget
                isRangeMode={calendarState.isRangeMode}
                currentView={calendarState.currentView}
                onDateSelect={handleDateSelect}
                onToggleMode={handleToggleCalendarMode}
                onToggleView={handleToggleCalendarView}
            />
        </div>
    );
}

export default App;
