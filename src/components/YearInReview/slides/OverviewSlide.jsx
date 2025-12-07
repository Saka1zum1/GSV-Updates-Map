import React from 'react';
import { Calendar, TrendingUp, MapPin } from 'lucide-react';

/**
 * Overview Slide - First slide showing general statistics
 * @param {Object} props - Component props
 * @param {Object} props.report - Annual report data
 */
const OverviewSlide = ({ report }) => {
    if (!report) return null;

    const { author_name, report_year, total_count, daily_average, report_type } = report;

    return (
        <div className="flex flex-col items-center justify-center h-full px-6 py-8">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {report_year} Year in Review
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300">
                    @{author_name}'s Street View Journey
                </p>
            </div>

            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-8">
                {/* Total Count */}
                <div className="glass-effect rounded-xl p-6 text-center transform hover:scale-105 transition-transform">
                    <div className="flex justify-center mb-3">
                        <MapPin className="w-12 h-12 text-blue-500 dark:text-blue-400" />
                    </div>
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                        {total_count.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        Total {report_type === 'update' ? 'Updates' : 'Spots'}
                    </div>
                </div>

                {/* Daily Average */}
                <div className="glass-effect rounded-xl p-6 text-center transform hover:scale-105 transition-transform">
                    <div className="flex justify-center mb-3">
                        <TrendingUp className="w-12 h-12 text-purple-500 dark:text-purple-400" />
                    </div>
                    <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                        {daily_average.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        Daily Average
                    </div>
                </div>

                {/* Year */}
                <div className="glass-effect rounded-xl p-6 text-center transform hover:scale-105 transition-transform">
                    <div className="flex justify-center mb-3">
                        <Calendar className="w-12 h-12 text-pink-500 dark:text-pink-400" />
                    </div>
                    <div className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2">
                        {report_year}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        Year
                    </div>
                </div>
            </div>

            {/* Footer Message */}
            <div className="text-center max-w-2xl">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Let's explore your amazing contributions to the street view community! 🌍✨
                </p>
            </div>
        </div>
    );
};

export default OverviewSlide;
