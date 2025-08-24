import { useState, useEffect, useCallback } from 'react';
import { loadTableData, loadCountriesData } from '../utils/api.js';
import {
    getMonthTimestamp,
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

    // Filter state
    const [filters, setFilters] = useState({
        report_date: [null, getTimestamp()],
        type: [],
        pano_date: [],
        poly: [],
        country: null,
        region: null
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
                const since = getMonthTimestamp();

                const [updateReports, countriesData] = await Promise.all([
                    loadTableData({ table: 'update_reports', since }),
                    loadCountriesData()
                ]);

                setUpdateData(updateReports);
                setFilteredData(updateReports);
                setCountries(countriesData);
            } catch (err) {
                setError(err.message);
                console.error('Error loading data:', err);
            } finally {
                setLoading(false);
            }
        };

        initData();
    }, []);

    // Apply filters
    const applyFilters = useCallback(async () => {
        try {
            let since = filters.report_date?.[0];
            let before = filters.report_date?.[1];
            let dataToFilter;

            if (mapMode.isPeak) {
                const data = await loadTableData({ table: 'altitude_data' });
                setAltitudeData(data);
                dataToFilter = data;
            } else if (mapMode.isSpot) {
                const data = await loadTableData({
                    table: 'spots',
                    since,
                    before,
                    key: filters.country ? 'country' : undefined,
                    value: filters.country || undefined
                });
                setSpotsData(data);
                dataToFilter = data;
            } else {
                const data = await loadTableData({
                    table: 'update_reports',
                    since,
                    before,
                    key: filters.country ? 'country' : undefined,
                    value: filters.country || undefined
                });
                setUpdateData(data);
                dataToFilter = data;
            }

            const filtered = dataToFilter.filter(item => {
                const matchesType = mapMode.isPeak ||
                    filters.type.length === 0 ||
                    intersect(filters.type, item.types ? JSON.parse(item.types) : []) ||
                    intersect(filters.type, item.camera ? [item.camera] : []);

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

                const inSpotDateRange = !mapMode.isSpot ||
                    (item.spot_date &&
                        getTimestamp(item.spot_date) >= filters.report_date[0] &&
                        getTimestamp(item.spot_date) <= filters.report_date[1]);

                return matchesType && inMonthRange && pointInPolygon &&
                    matchesCountry && matchesRegion && inSpotDateRange;
            });

            setFilteredData(filtered);
        } catch (err) {
            setError(err.message);
            console.error('Error applying filters:', err);
        }
    }, [filters, mapMode]);

    // Update filters
    const updateFilters = useCallback((newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    }, []);

    // Update map mode
    const updateMapMode = useCallback((newMode) => {
        setMapMode(prev => ({ ...prev, ...newMode }));
    }, []);

    // Get allowed types based on mode
    const getAllowedTypes = useCallback(() => {
        if (mapMode.isSpot) {
            return allowedTypesInSpot;
        }
        return filters.type;
    }, [mapMode.isSpot, filters.type]);

    return {
        // Data
        updateData,
        altitudeData,
        spotsData,
        filteredData,
        countries,
        loading,
        error,

        // State
        filters,
        mapMode,

        // Actions
        applyFilters,
        updateFilters,
        updateMapMode,
        getAllowedTypes
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
