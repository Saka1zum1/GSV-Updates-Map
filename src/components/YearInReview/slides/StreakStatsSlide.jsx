import React from 'react';
import { Flame, Calendar, TrendingUp } from 'lucide-react';
import { formatDate } from '../../../utils/discordAuth.js';

/**
 * Streak Statistics Slide
 * @param {Object} props - Component props
 * @param {Object} props.report - Annual report data
 */
const StreakStatsSlide = ({ report }) => {
    if (!report || !report.streak_stats) return null;

    const { streak_stats } = report;
    const {
        longest_streak_days,
        current_streak_days,
        active_days,
        active_weeks,
        active_months,
        first_activity_date,
        last_activity_date
    } = streak_stats;

    return (
        <div className="flex flex-col h-full px-6 py-8 overflow-y-auto">
            {/* Header */}
            <div className="text-center mb-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    Consistency & Streaks
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Your dedication throughout {report.report_year}
                </p>
            </div>

            {/* Main Streak Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="glass-effect rounded-xl p-6 text-center transform hover:scale-105 transition-transform">
                    <Flame className="w-12 h-12 text-orange-500 dark:text-orange-400 mx-auto mb-3" />
                    <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                        {longest_streak_days}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        Longest Streak (Days)
                    </div>
                </div>

                <div className="glass-effect rounded-xl p-6 text-center transform hover:scale-105 transition-transform">
                    <TrendingUp className="w-12 h-12 text-yellow-500 dark:text-yellow-400 mx-auto mb-3" />
                    <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                        {current_streak_days}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        Current Streak (Days)
                    </div>
                </div>
            </div>

            {/* Activity Stats */}
            <div className="glass-effect rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Activity Overview
                </h3>
                <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                            {active_days}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 uppercase">
                            Active Days
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                            {active_weeks}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 uppercase">
                            Active Weeks
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-1">
                            {active_months}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 uppercase">
                            Active Months
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <div className="glass-effect rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Activity Timeline
                </h3>
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                        <div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                First Activity
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                {formatDate(first_activity_date)}
                            </div>
                        </div>
                    </div>
                    <div className="ml-1.5 border-l-2 border-gray-300 dark:border-gray-600 h-8"></div>
                    <div className="flex items-start gap-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
                        <div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Last Activity
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                {formatDate(last_activity_date)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Encouragement Message */}
            {current_streak_days > 0 && (
                <div className="mt-6 glass-effect rounded-lg p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border border-orange-200 dark:border-orange-700">
                    <p className="text-center text-gray-700 dark:text-gray-300">
                        <Flame className="inline w-5 h-5 text-orange-500 mr-1" />
                        Keep the streak alive! You're on fire! 🔥
                    </p>
                </div>
            )}
        </div>
    );
};

export default StreakStatsSlide;
