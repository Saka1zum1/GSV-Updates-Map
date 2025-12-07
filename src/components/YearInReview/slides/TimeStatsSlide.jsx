import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import { getWeekdayName, getMonthName } from '../../../utils/discordAuth.js';

/**
 * Time Statistics Slide
 * @param {Object} props - Component props
 * @param {Object} props.report - Annual report data
 */
const TimeStatsSlide = ({ report }) => {
    if (!report || !report.time_stats) return null;

    const { time_stats } = report;
    const { peak_month, peak_weekday, peak_hour, by_month, by_weekday } = time_stats;

    // Get month chart data
    const monthData = Object.entries(by_month || {}).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
    const maxMonthValue = Math.max(...monthData.map(([, value]) => value), 1);

    // Get weekday chart data
    const weekdayData = Object.entries(by_weekday || {}).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
    const maxWeekdayValue = Math.max(...weekdayData.map(([, value]) => value), 1);

    return (
        <div className="flex flex-col h-full px-6 py-8 overflow-y-auto">
            {/* Header */}
            <div className="text-center mb-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Time Statistics
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    When you were most active in {report.report_year}
                </p>
            </div>

            {/* Peak Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="glass-effect rounded-lg p-4 text-center">
                    <Calendar className="w-8 h-8 text-blue-500 dark:text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {getMonthName(peak_month)}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 uppercase">
                        Peak Month
                    </div>
                </div>

                <div className="glass-effect rounded-lg p-4 text-center">
                    <Calendar className="w-8 h-8 text-purple-500 dark:text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {getWeekdayName(peak_weekday)}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 uppercase">
                        Peak Weekday
                    </div>
                </div>

                <div className="glass-effect rounded-lg p-4 text-center">
                    <Clock className="w-8 h-8 text-pink-500 dark:text-pink-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                        {peak_hour}:00
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 uppercase">
                        Peak Hour
                    </div>
                </div>
            </div>

            {/* Monthly Distribution Chart */}
            <div className="glass-effect rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    Monthly Activity
                </h3>
                <div className="space-y-2">
                    {monthData.map(([month, count]) => {
                        const percentage = (count / maxMonthValue) * 100;
                        return (
                            <div key={month} className="flex items-center gap-3">
                                <div className="w-16 text-sm text-gray-600 dark:text-gray-400">
                                    {getMonthName(parseInt(month)).substring(0, 3)}
                                </div>
                                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 relative overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-end px-2 transition-all duration-500"
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

            {/* Weekday Distribution Chart */}
            <div className="glass-effect rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    Weekday Activity
                </h3>
                <div className="space-y-2">
                    {weekdayData.map(([day, count]) => {
                        const percentage = (count / maxWeekdayValue) * 100;
                        return (
                            <div key={day} className="flex items-center gap-3">
                                <div className="w-16 text-sm text-gray-600 dark:text-gray-400">
                                    {getWeekdayName(parseInt(day)).substring(0, 3)}
                                </div>
                                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 relative overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-end px-2 transition-all duration-500"
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
        </div>
    );
};

export default TimeStatsSlide;
