import React, { useState, useRef, useEffect } from 'react';
import { X, Calendar, MapPin, Camera, User, Shapes, Globe } from 'lucide-react';
import { getOneMonthAgoTimestamp, getTimestamp, getFlagEmoji } from '../utils/constants.js';

const FilterStatus = ({
    filteredData = [],
    filters = {},
    onUpdateFilters,
    countries = {},
    mapMode = {}
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsExpanded(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Helper function to get filter display info
    const getActiveFilters = () => {
        const activeFilters = [];

        // Date filter
        if (filters.report_date && filters.report_date.length === 2) {
            const startDate = new Date(filters.report_date[0] * 1000);
            const endDate = new Date(filters.report_date[1] * 1000);
            const isSameMonth = startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear();

            const userLocale = navigator.language || 'default';
            let dateLabel;
            if (isSameMonth) {
                dateLabel = `Report Date: ${startDate.toLocaleDateString(userLocale, { day: 'numeric', month: 'numeric', year: 'numeric' })}`;
            } else {
                dateLabel = `Report Date: ${startDate.toLocaleDateString(userLocale, { day: 'numeric', month: 'numeric', year: 'numeric' })} ~ ${endDate.toLocaleDateString(userLocale, { day: 'numeric', month: 'numeric', year: 'numeric' })}`;
            }

            activeFilters.push({
                id: 'report_date',
                type: 'date',
                label: dateLabel,
                icon: Calendar,
                onRemove: () => {
                    // Reset to default time range instead of removing completely
                    onUpdateFilters({ report_date: [getOneMonthAgoTimestamp(), getTimestamp()] });
                }
            });
        }

        // Coverage Date filter (dateRange)
        if (filters.dateRange) {
            const { fromYear, fromMonth, toYear, toMonth } = filters.dateRange;
            let label = '';
            const userLocale = navigator.language || 'default';
            if (fromYear && fromMonth && toYear && toMonth) {
                const fromDate = new Date(fromYear, fromMonth - 1);
                const toDate = new Date(toYear, toMonth - 1);
                if (fromYear === toYear && fromMonth === toMonth) {
                    label = fromDate.toLocaleDateString(userLocale, { month: 'short', year: 'numeric' });
                } else {
                    label = `${fromDate.toLocaleDateString(userLocale, { month: 'short', year: 'numeric' })} - ${toDate.toLocaleDateString(userLocale, { month: 'short', year: 'numeric' })}`;
                }
            } else if (fromYear && fromMonth) {
                const fromDate = new Date(fromYear, fromMonth - 1);
                label = fromDate.toLocaleDateString(userLocale, { month: 'short', year: 'numeric' });
            }
            activeFilters.push({
                id: 'coverage_date',
                type: 'coverage_date',
                label: `Coverage Date: ${label}`,
                icon: Calendar,
                onRemove: () => onUpdateFilters({ dateRange: null })
            });
        }

        // Type filter
        if (filters.type && filters.type.length > 0) {
            activeFilters.push({
                id: 'type',
                type: 'type',
                label: filters.type, // pass array for rendering
                icon: Shapes,
                onRemove: () => onUpdateFilters({ type: [] })
            });
        }

        // Camera filter
        if (filters.camera && filters.camera.length > 0) {
            activeFilters.push({
                id: 'camera',
                type: 'camera',
                label: filters.camera, // pass array for rendering
                icon: Camera,
                onRemove: () => onUpdateFilters({ camera: [] })
            });
        }

        // Country filter
        if (filters.countries && filters.countries.length > 0) {
            const countryNames = filters.countries.map(code => countries[code] || code);
            activeFilters.push({
                id: 'countries',
                type: 'location',
                label: countryNames,
                icon: Globe,
                onRemove: () => onUpdateFilters({ countries: [] })
            });
        }

        // Region filter
        if (filters.regions && filters.regions.length > 0) {
            activeFilters.push({
                id: 'regions',
                type: 'location',
                label: filters.regions,
                icon: MapPin,
                onRemove: () => onUpdateFilters({ regions: [] })
            });
        }

        // Author filter
        if (filters.author && filters.author.length > 0) {
            activeFilters.push({
                id: 'author',
                type: 'author',
                label: `Authors: ${filters.author.join(', ')}`,
                icon: User,
                onRemove: () => onUpdateFilters({ author: [] })
            });
        }

        // Polygon filter
        if (filters.poly && filters.poly.length > 0) {
            activeFilters.push({
                id: 'poly',
                type: 'polygon',
                label: `Area filter: ${filters.poly.length} Shapes${filters.poly.length > 1 ? 's' : ''}`,
                icon: Shapes,
                onRemove: () => onUpdateFilters({ poly: [] })
            });
        }

        return activeFilters;
    };

    const activeFilters = getActiveFilters();
    const hasActiveFilters = activeFilters.length > 0;

    return (
        <div className="fixed top-12 sm:top-16 left-2 z-30" ref={dropdownRef}>
            {/* Main Counter Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`
                    flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg shadow-lg transition-all duration-200
                    ${hasActiveFilters
                        ? 'bg-gray-600 hover:bg-green-600 text-white dark:bg-gray-700 dark:hover:bg-blue-600 dark:text-white'
                        : 'bg-white hover:bg-gray-50 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200'
                    }
                `}
            >

                {hasActiveFilters && (
                    <span className="bg-white bg-opacity-40 px-1 sm:px-1.5 py-0.5 rounded text-xs font-medium">
                        {activeFilters.length}
                    </span>
                )}
                <span className="font-medium text-sm">
                    {filteredData.length.toLocaleString()}
                </span>

                <span className="text-xs text-white-600 dark:text-white-400">
                    {mapMode.isSpot ? 'spotting' : 'location'}{filteredData.length === 1 ? '' : 's'}
                </span>
                <svg
                    className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isExpanded && (
                <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 overflow-hidden backdrop-blur-sm">
                    <div className="p-3 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                            Filter Status
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {filteredData.length.toLocaleString()} items displayed
                        </p>
                    </div>

                    <div className="max-h-64 overflow-y-auto">
                        {activeFilters.length === 0 ? (
                            <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                                <Shapes className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                No filters applied
                            </div>
                        ) : (
                            <div className="p-2 space-y-1">
                                {activeFilters.map((filter) => {
                                    const IconComponent = filter.icon;
                                    if (filter.id === 'countries' && Array.isArray(filter.label)) {
                                        return filter.label.map((item, index) => (
                                            <div
                                                key={`country-${item}`}
                                                className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 group"
                                            >
                                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                                    <Globe className="w-4 h-4 text-gray-500" />
                                                    <span className="font-flags text-base">{getFlagEmoji(filters.countries[index])}</span>
                                                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{item}</span>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const newCountries = filters.countries.filter((c, i) => i !== index);
                                                        onUpdateFilters({ countries: newCountries });
                                                    }}
                                                    className="flex-shrink-0 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-400 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-200"
                                                    title="Remove country filter"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ));
                                    }
                                    if (filter.id === 'regions' && Array.isArray(filter.label)) {
                                        return filter.label.map((item, index) => (
                                            <div
                                                key={`region-${item}`}
                                                className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 group"
                                            >
                                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                                    <MapPin className="w-4 h-4 text-gray-500" />
                                                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{item}</span>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const newRegions = filters.regions.filter((r, i) => i !== index);
                                                        onUpdateFilters({ regions: newRegions });
                                                    }}
                                                    className="flex-shrink-0 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-400 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-200"
                                                    title="Remove region filter"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ));
                                    }
                                    // ...existing code...
                                    return (
                                        <div
                                            key={filter.id}
                                            className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 group"
                                        >
                                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                                {filter.id === 'camera' ? (
                                                    <div className="flex items-center space-x-3">
                                                        <Camera className="w-4 h-4 text-gray-500" />
                                                        <div className="flex items-center space-x-2">
                                                            {Array.isArray(filter.label) && filter.label.map((camera) => (
                                                                <img
                                                                    key={camera}
                                                                    src={`/assets/${camera.toLowerCase()}.webp`}
                                                                    alt={camera}
                                                                    className="w-5 h-5"
                                                                    onError={(e) => {
                                                                        e.target.style.display = 'none';
                                                                    }}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : filter.id === 'type' ? (
                                                    <div className="flex items-center space-x-3">
                                                        <Shapes className="w-4 h-4 text-gray-500" />
                                                        <div className="flex items-center space-x-2">
                                                            {Array.isArray(filter.label) && filter.label.map((type) => (
                                                                <img
                                                                    key={type}
                                                                    src={`/assets/${type.toLowerCase()}.webp`}
                                                                    alt={type}
                                                                    className="w-5 h-5"
                                                                    onError={(e) => {
                                                                        e.target.style.display = 'none';
                                                                    }}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <IconComponent className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                        <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                                                            {filter.label}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                            {filter.id != 'report_date' && <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    filter.onRemove();
                                                }}
                                                className="flex-shrink-0 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-400 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-200"
                                                title="Remove filter"
                                            >
                                                { <X className="w-3 h-3" />}
                                            </button>}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {activeFilters.length > 0 && (
                        <div className="p-3 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                            <button
                                onClick={() => {
                                    onUpdateFilters({
                                        type: [],
                                        camera: [],
                                        countries: [],
                                        regions: [],
                                        author: [],
                                        poly: [],
                                        pano_date: []
                                    });
                                    setIsExpanded(false);
                                }}
                                className="w-full px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FilterStatus;
