import React from 'react';
import { Globe, MapPin, Flag } from 'lucide-react';

/**
 * Geographic Statistics Slide
 * @param {Object} props - Component props
 * @param {Object} props.report - Annual report data
 */
const GeoStatsSlide = ({ report }) => {
    if (!report || !report.geo_stats) return null;

    const { geo_stats } = report;
    const { countries_count, regions_count, top_countries, top_regions_with_country, new_countries } = geo_stats;

    // Get top countries data
    const topCountriesData = Object.entries(top_countries || {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    const maxCountryValue = topCountriesData.length > 0 ? topCountriesData[0][1] : 1;

    // Get top regions data
    const topRegionsData = (top_regions_with_country || []).slice(0, 5);
    const maxRegionValue = topRegionsData.length > 0 ? topRegionsData[0].count : 1;

    return (
        <div className="flex flex-col h-full px-6 py-8 overflow-y-auto">
            {/* Header */}
            <div className="text-center mb-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    Geographic Exploration
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Where your journey took you in {report.report_year}
                </p>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="glass-effect rounded-lg p-4 text-center">
                    <Globe className="w-8 h-8 text-green-500 dark:text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {countries_count}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 uppercase">
                        Countries
                    </div>
                </div>

                <div className="glass-effect rounded-lg p-4 text-center">
                    <MapPin className="w-8 h-8 text-blue-500 dark:text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {regions_count}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 uppercase">
                        Regions
                    </div>
                </div>

                <div className="glass-effect rounded-lg p-4 text-center">
                    <Flag className="w-8 h-8 text-purple-500 dark:text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {new_countries?.length || 0}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 uppercase">
                        New Countries
                    </div>
                </div>
            </div>

            {/* Top Countries */}
            {topCountriesData.length > 0 && (
                <div className="glass-effect rounded-lg p-4 mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                        <Globe className="w-5 h-5" />
                        Top Countries
                    </h3>
                    <div className="space-y-2">
                        {topCountriesData.map(([country, count], index) => {
                            const percentage = (count / maxCountryValue) * 100;
                            return (
                                <div key={country} className="flex items-center gap-3">
                                    <div className="w-8 text-center text-sm font-bold text-gray-500 dark:text-gray-400">
                                        #{index + 1}
                                    </div>
                                    <div className="w-24 text-sm text-gray-600 dark:text-gray-400 truncate">
                                        {country}
                                    </div>
                                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 relative overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-end px-2 transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        >
                                            {percentage > 20 && (
                                                <span className="text-xs font-semibold text-white">
                                                    {count}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {percentage <= 20 && (
                                        <div className="w-12 text-sm text-gray-600 dark:text-gray-400 text-right">
                                            {count}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Top Regions */}
            {topRegionsData.length > 0 && (
                <div className="glass-effect rounded-lg p-4 mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Top Regions
                    </h3>
                    <div className="space-y-2">
                        {topRegionsData.map((regionData, index) => {
                            const percentage = (regionData.count / maxRegionValue) * 100;
                            return (
                                <div key={`${regionData.region}-${regionData.country}`} className="flex items-center gap-3">
                                    <div className="w-8 text-center text-sm font-bold text-gray-500 dark:text-gray-400">
                                        #{index + 1}
                                    </div>
                                    <div className="w-32 text-sm text-gray-600 dark:text-gray-400 truncate">
                                        <div className="font-medium">{regionData.region}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-500">{regionData.country}</div>
                                    </div>
                                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 relative overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-end px-2 transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        >
                                            {percentage > 20 && (
                                                <span className="text-xs font-semibold text-white">
                                                    {regionData.count}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {percentage <= 20 && (
                                        <div className="w-12 text-sm text-gray-600 dark:text-gray-400 text-right">
                                            {regionData.count}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* New Countries */}
            {new_countries && new_countries.length > 0 && (
                <div className="glass-effect rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                        <Flag className="w-5 h-5" />
                        New Countries Explored
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {new_countries.map((country) => (
                            <span
                                key={country}
                                className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
                            >
                                {country}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GeoStatsSlide;
