import { useState, useEffect, useCallback, useRef } from 'react';
import { loadTableData, loadCountriesData } from '../utils/api.js';
import {
    getMonthTimestamp,
    getOneMonthAgoTimestamp,
    intersect,
    monthInRange,
    getTimestamp,
    allowedTypesInSpot
} from '../utils/constants.js';

// Hook for managing map data and filters
export const useMapData = () => {
    const [updateData, setUpdateData] = useState([]);
    const [altitudeData, setAltitudeData] = useState([]);
    const [spotsData, setSpotsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [countries, setCountries] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastFilterRequest, setLastFilterRequest] = useState('');
    const [isInitialized, setIsInitialized] = useState(false);

    // Filter state
    const [filters, setFilters] = useState({
        report_date: [getOneMonthAgoTimestamp(), getTimestamp()],
        type: [],
        pano_date: [],
        poly: [],
        country: null,
        region: null,
        camera: [],
        dateRange: null // 新增 dateRange 过滤器
    });

    // Map state
    const [mapMode, setMapMode] = useState({
        isHeatmap: false,
        isCluster: true,
        isPeak: false,
        isSpot: false
    });

    // Initialize data
    useEffect(() => {
        const initData = async () => {
            try {
                setLoading(true);
                const since = getOneMonthAgoTimestamp();

                const [updateReports, countriesData] = await Promise.all([
                    loadTableData({ table: 'update_reports', since }),
                    loadCountriesData()
                ]);

                setUpdateData(updateReports);
                setFilteredData(updateReports);
                setCountries(countriesData);
                
                // Set the initial request key to prevent duplicate loading
                const requestKey = JSON.stringify({
                    table: 'update_reports',
                    since,
                    before: getTimestamp(),
                    mapMode: { isPeak: false, isSpot: false }
                });
                setLastFilterRequest(requestKey);
                setIsInitialized(true);
            } catch (err) {
                setError(err.message);
                console.error('Error loading data:', err);
            } finally {
                setLoading(false);
            }
        };

        initData();
    }, []);

    // Apply filters - separated into data loading and local filtering
    const loadDataRef = useRef(null);
    
    const loadData = useCallback(async () => {
        // Prevent concurrent requests
        if (loading || loadDataRef.current) return;
        
        try {
            loadDataRef.current = true;
            setLoading(true);
            let since = filters.report_date?.[0];
            let before = filters.report_date?.[1];
            
            // Create a unique key for this data request (only date and mode matter for backend)
            const requestKey = JSON.stringify({
                table: mapMode.isPeak ? 'altitude_data' : mapMode.isSpot ? 'spots' : 'update_reports',
                since,
                before,
                mapMode: { isPeak: mapMode.isPeak, isSpot: mapMode.isSpot }
            });
            
            // If this is the same request as last time, skip it
            if (requestKey === lastFilterRequest) {
                setLoading(false);
                loadDataRef.current = false;
                return;
            }
            
            setLastFilterRequest(requestKey);

            if (mapMode.isPeak) {
                const data = await loadTableData({ table: 'altitude_data' });
                setAltitudeData(data);
            } else if (mapMode.isSpot) {
                const data = await loadTableData({
                    table: 'spots',
                    since,
                    before
                });
                setSpotsData(data);
            } else {
                const data = await loadTableData({
                    table: 'update_reports',
                    since,
                    before
                });
                setUpdateData(data);
            }
            
        } catch (err) {
            setError(err.message);
            console.error('Error loading data:', err);
        } finally {
            setLoading(false);
            loadDataRef.current = false;
        }
    }, [filters.report_date, mapMode.isPeak, mapMode.isSpot]);

    // Apply local filters to loaded data
    const applyFilters = useCallback(() => {
        try {
            let dataToFilter;
            
            if (mapMode.isPeak) {
                dataToFilter = altitudeData;
            } else if (mapMode.isSpot) {
                dataToFilter = spotsData;
            } else {
                dataToFilter = updateData;
            }

            const filtered = dataToFilter.filter(item => {
                // Type filtering logic differs for spot mode vs regular mode
                let matchesType;
                if (mapMode.isSpot) {
                    // For spot mode, only filter by update types, not camera types
                    // Camera types are handled by the camera filter separately
                    if (filters.type.length === 0) {
                        matchesType = true;
                    } else {
                        const itemTypes = item.types ? 
                            (typeof item.types === 'string' ? 
                                (item.types.startsWith('[') ? JSON.parse(item.types) : [item.types]) : 
                                item.types) : [];
                        
                        // Only check update types, exclude camera types (gen1, gen2, etc.)
                        const updateTypesOnly = filters.type.filter(type => 
                            !allowedTypesInSpot.includes(type)
                        );
                        
                        if (updateTypesOnly.length === 0) {
                            matchesType = true;
                        } else {
                            matchesType = intersect(updateTypesOnly, itemTypes.map(t => t.toLowerCase()));
                        }
                    }
                } else if (mapMode.isPeak) {
                    matchesType = true; // Peak mode doesn't filter by type
                } else {
                    // Regular update reports mode
                    matchesType = filters.type.length === 0 ||
                        intersect(filters.type, item.types ? JSON.parse(item.types) : []) ||
                        intersect(filters.type, item.camera ? [item.camera] : []);
                }

                const inMonthRange = mapMode.isSpot ||
                    filters.pano_date.length === 0 ||
                    monthInRange(item, filters.pano_date);

                const matchesCountry = !filters.country ||
                    item.country === filters.country.toUpperCase();

                const matchesRegion = !filters.region ||
                    filters.region === item.region;

                const pointInPolygon = filters.poly.length === 0 ||
                    filters.poly.some(polygon => {
                        // Simplified polygon check - in real implementation use proper point-in-polygon algorithm
                        return true;
                    });

                // Check date range for both spot mode and regular mode
                const inDateRange = mapMode.isSpot ?
                    // For spot mode, check spot_date
                    (!item.spot_date ||
                        (getTimestamp(item.spot_date) >= filters.report_date[0] &&
                         getTimestamp(item.spot_date) <= filters.report_date[1])) :
                    // For regular mode, check report_date
                    (!item.report_date ||
                        (getTimestamp(item.report_date) >= filters.report_date[0] &&
                         getTimestamp(item.report_date) <= filters.report_date[1]));

                // Camera filter - only applies in spot mode
                const matchesCamera = !mapMode.isSpot ||
                    !filters.camera ||
                    filters.camera.length === 0 ||
                    (item.camera && filters.camera.includes(item.camera.toLowerCase()));

                // Author filter
                const matchesAuthor = !filters.author ||
                    filters.author.length === 0 ||
                    (item.author && filters.author.includes(item.author));

                // Date range filter (year/month based)
                const matchesDateRange = !filters.dateRange ||
                    (!item.year && !item.month) ||
                    (item.year >= filters.dateRange.fromYear && item.year <= filters.dateRange.toYear &&
                     (item.year > filters.dateRange.fromYear || item.month >= filters.dateRange.fromMonth) &&
                     (item.year < filters.dateRange.toYear || item.month <= filters.dateRange.toMonth));

                return matchesType && inMonthRange && pointInPolygon &&
                    matchesCountry && matchesRegion && inDateRange && matchesCamera && matchesAuthor && matchesDateRange;
            });

            setFilteredData(filtered);
        } catch (err) {
            setError(err.message);
            console.error('Error applying filters:', err);
        }
    }, [updateData, altitudeData, spotsData, filters.type, filters.country, filters.region, filters.camera, filters.author, filters.pano_date, filters.dateRange, mapMode]);

    // Load data when date range or mode changes (but not on initial load)
    useEffect(() => {
        // Skip if not yet initialized to prevent duplicate initial load
        if (!isInitialized) return;
        
        // Create the key directly here to avoid dependency issues
        const currentKey = JSON.stringify({
            table: mapMode.isPeak ? 'altitude_data' : mapMode.isSpot ? 'spots' : 'update_reports',
            since: filters.report_date?.[0],
            before: filters.report_date?.[1],
            mapMode: { isPeak: mapMode.isPeak, isSpot: mapMode.isSpot }
        });
        
        // Only load if the key is different
        if (currentKey !== lastFilterRequest) {
            loadData();
        }
    }, [filters.report_date, mapMode.isPeak, mapMode.isSpot, isInitialized]);

    // Apply local filters when data or filters change
    useEffect(() => {
        // Only apply filters if we have initial data loaded
        const hasInitialData = updateData.length > 0 || altitudeData.length > 0 || spotsData.length > 0;
        if (!hasInitialData) return;

        // Add a small delay to debounce rapid filter changes
        const timeoutId = setTimeout(() => {
            applyFilters();
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [applyFilters]);

    // Update filters
    const updateFilters = useCallback((newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    }, []);

    // Update map mode
    const updateMapMode = useCallback((newMode) => {
        setMapMode(prev => ({ ...prev, ...newMode }));
    }, []);



    // Get available countries and regions from current data
    const getAvailableLocations = useCallback(() => {
        let dataSource;
        if (mapMode.isPeak) {
            dataSource = altitudeData;
        } else if (mapMode.isSpot) {
            dataSource = spotsData;
        } else {
            dataSource = updateData;
        }

        const countriesMap = {};
        const regionsMap = {};

        dataSource.forEach(item => {
            if (item.country) {
                const countryCode = item.country.toUpperCase();
                const countryName = countries[countryCode] || countryCode;
                
                if (!countriesMap[countryCode]) {
                    countriesMap[countryCode] = {
                        name: countryName,
                        regions: new Set()
                    };
                }
                
                if (item.region) {
                    const regionCode = item.region;
                    countriesMap[countryCode].regions.add(regionCode);
                    regionsMap[regionCode] = countryCode;
                }
            }
        });

        // Convert regions Set to Array with proper structure
        Object.keys(countriesMap).forEach(countryCode => {
            const regionCodes = Array.from(countriesMap[countryCode].regions);
            countriesMap[countryCode].regions = regionCodes.map(regionCode => ({
                code: regionCode,
                name: regionCode // 使用regionCode作为显示名称，因为数据库中没有region_name字段
            }));
        });

        return { countriesMap, regionsMap };
    }, [updateData, altitudeData, spotsData, countries, mapMode]);

    const { countriesMap, regionsMap } = getAvailableLocations();

    return {
        // Data
        updateData,
        altitudeData,
        spotsData,
        filteredData,
        countries,
        countriesMap,
        regionsMap,
        loading,
        error,

        // State
        filters,
        mapMode,

        // Actions
        updateFilters,
        updateMapMode
    };
};

// Hook for managing calendar state
export const useCalendar = () => {
    const [calendarState, setCalendarState] = useState({
        isRangeMode: true,
        currentView: 'days',
        isMonthPickerOpen: false
    });

    const updateCalendarState = useCallback((newState) => {
        setCalendarState(prev => ({ ...prev, ...newState }));
    }, []);

    return { calendarState, updateCalendarState };
};
