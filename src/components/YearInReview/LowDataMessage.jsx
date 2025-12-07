import React from 'react';
import { Compass, TrendingUp, MapPin } from 'lucide-react';

/**
 * Low Data Message Component
 * Displayed when user has insufficient data for a full annual report
 * @param {Object} props - Component props
 * @param {string} props.userName - Discord username
 * @param {number} props.dataCount - Current data count
 * @param {number} props.year - Report year
 */
const LowDataMessage = ({ userName, dataCount = 0, year = 2024 }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
            <div className="glass-effect rounded-2xl p-8 md:p-12 max-w-2xl w-full shadow-2xl">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <Compass className="w-20 h-20 text-blue-400 dark:text-blue-300 animate-pulse" />
                        <MapPin className="w-8 h-8 text-purple-400 dark:text-purple-300 absolute -bottom-2 -right-2" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {year} Exploration Journey
                </h1>

                {/* Message */}
                <div className="text-center mb-8">
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                        Hi, <span className="font-semibold text-blue-500 dark:text-blue-400">@{userName}</span>! 👋
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Your street view exploration journey this year has been quite mysterious — 
                        with only <span className="font-bold text-purple-500 dark:text-purple-400">{dataCount} record{dataCount !== 1 ? 's' : ''}</span>, 
                        we don't have quite enough data yet to generate a detailed annual analysis.
                    </p>
                </div>

                {/* Encouragement Section */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-6 border border-blue-200 dark:border-blue-700">
                    <div className="flex items-start gap-3">
                        <TrendingUp className="w-6 h-6 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                The adventure continues!
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {year + 1} is a brand new year filled with endless possibilities. 
                                We're excited to see more of your discoveries and contributions on the map!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Preview */}
                {dataCount > 0 && (
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-blue-500 dark:text-blue-400">
                                {dataCount}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                Records
                            </div>
                        </div>
                        <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-purple-500 dark:text-purple-400">
                                {year}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                Year
                            </div>
                        </div>
                    </div>
                )}

                {/* Call to Action */}
                <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                        Keep exploring, and we'll be here to celebrate your journey next year! 🗺️✨
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LowDataMessage;
