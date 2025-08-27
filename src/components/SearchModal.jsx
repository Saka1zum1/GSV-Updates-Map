import { useState, useRef, useEffect } from 'react';
import { Search, X, MapPin, Loader2, Navigation, AlertCircle } from 'lucide-react';
import Spinner from './Spinner.jsx';
import { getFlagEmoji } from '../utils/constants.js';
import { geocode, queryByLocation } from '../utils/api.js';
import usePersistentState from '../hooks/usePersistentState.js';

const SearchModal = ({ isOpen, onClose, onLocationSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchRadius, setSearchRadius] = usePersistentState('searchRadius', 10000); // Default 10km, persistent
    const [selectedResult, setSelectedResult] = useState(null);
    const inputRef = useRef(null);
    const searchTimeoutRef = useRef(null);

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Debounced search (防抖机制)
    useEffect(() => {
        if (!isOpen) return;
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        if (searchQuery.trim().length > 2) {
            searchTimeoutRef.current = setTimeout(() => {
                performSearch(searchQuery);
            }, 500);
        } else {
            setSearchResults([]);
        }
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchQuery, isOpen]);

    const performSearch = async (query) => {
        setIsLoading(true);
        try {
            const results = await geocode(query);
            setSearchResults(results);
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };    const handleLocationSelect = async (result) => {
        setSelectedResult(result);

        try {
            // Call the queryByLocation function using the API util
            const data = await queryByLocation(result.lat, result.lon, searchRadius);
            
            onLocationSelect({
                location: result,
                radius: searchRadius,
                data: data.data,
                coordinates: { lat: result.lat, lng: result.lon }
            });
            onClose();
            resetForm();
        } catch (error) {
            console.error('Location query error:', error);
        }
    };

    const resetForm = () => {
        setSearchQuery('');
        setSearchResults([]);
        setSelectedResult(null);
        setIsLoading(false);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Search Location
                    </h2>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <X size={20} className="text-gray-500 dark:text-gray-400" />
                    </button>

                </div>

                {/* Search Input */}
                <div className="p-4">
                    <div className="relative mb-4">
                        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search address or enter coordinates (lat,lng)..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                                     bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                     placeholder-gray-500 dark:placeholder-gray-400
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {isLoading && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <Spinner size="small" color="blue" />
                            </div>
                        )}
                    </div>

                    {/* Search Radius */}
                    <div className="flex items-center space-x-4">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                            Search Radius:
                        </label>
                        <div className="flex items-center space-x-2 flex-1">
                            <input
                                type="range"
                                min="1000"
                                max="200000"
                                step="1000"
                                value={searchRadius}
                                onChange={(e) => setSearchRadius(Number(e.target.value))}
                                className="flex-1 h-2 accent-blue-500"
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400 w-16 text-right">
                                {(searchRadius / 1000).toFixed(0)}km
                            </span>
                        </div>
                    </div>
                    {/* Search Results */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <Spinner size="medium" color="blue" showText text="Searching..." />
                            </div>
                        ) : searchResults.length > 0 ? (
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    Search Results
                                </h3>
                                {searchResults.map((result) => (
                                    <button
                                        key={result.id}
                                        onClick={() => handleLocationSelect(result)}
                                        className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-600
                                             hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-500
                                             transition-colors group"
                                    >
                                        <div className="flex items-start space-x-3">
                                            <div className="flex items-center space-x-2 flex-shrink-0">
                                                <MapPin size={16} className="text-gray-400 mt-0.5" />
                                                {result.countryCode && (
                                                    <span className="font-flags text-lg">
                                                        {getFlagEmoji(result.countryCode)}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-gray-900 dark:text-gray-100 truncate">
                                                    {result.display_name}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    {result.lat.toFixed(6)}, {result.lon.toFixed(6)}
                                                    {result.type !== 'coordinates' && (
                                                        <span className="ml-2 capitalize">• {result.type}</span>
                                                    )}
                                                </p>
                                            </div>
                                            <Navigation size={14} className="text-gray-400 group-hover:text-blue-500 flex-shrink-0 mt-1" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : searchQuery.length > 2 ? (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                <AlertCircle size={32} className="mx-auto mb-2 opacity-50" />
                                <p>No results found for "{searchQuery}"</p>
                                <p className="text-xs mt-1">Try searching for a city, address, or coordinates (lat,lng)</p>
                                <p className="text-xs text-red-600 font-bold dark:text-blue-400 text-center">
                                    Only works with Google Street View updates and peak locations
                                </p>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                <MapPin size={32} className="mx-auto mb-2 opacity-50" />
                                <p>Enter a location to search</p>
                                <p className="text-xs mt-1">You can search for addresses or enter coordinates like "40.7128, -74.0060"</p>
                                <p className="text-xs text-red-600 font-bold dark:text-blue-400 text-center">
                                    Only works with Google Street View updates and peak locations
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
