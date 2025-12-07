import React from 'react';
import { Trophy, Award, TrendingUp } from 'lucide-react';
import { getMonthName } from '../../../utils/discordAuth.js';

/**
 * Ranking Statistics Slide
 * @param {Object} props - Component props
 * @param {Object} props.report - Annual report data
 */
const RankingSlide = ({ report }) => {
    if (!report || !report.ranking_stats) return null;

    const { ranking_stats } = report;
    const {
        total_rank,
        total_rank_percentile,
        country_ranks,
        best_month_rank,
        best_month
    } = ranking_stats;

    // Get top country rankings
    const topCountryRanks = Object.entries(country_ranks || {})
        .sort((a, b) => a[1] - b[1])
        .slice(0, 5);

    return (
        <div className="flex flex-col h-full px-6 py-8 overflow-y-auto">
            {/* Header */}
            <div className="text-center mb-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    Rankings & Achievements
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Your standing in the community
                </p>
            </div>

            {/* Overall Ranking */}
            <div className="glass-effect rounded-xl p-8 text-center mb-6 transform hover:scale-105 transition-transform">
                <Trophy className="w-16 h-16 text-yellow-500 dark:text-yellow-400 mx-auto mb-4" />
                <div className="text-5xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                    #{total_rank}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                    Overall Ranking
                </div>
                {total_rank_percentile && (
                    <div className="text-lg text-gray-700 dark:text-gray-300">
                        Top <span className="font-bold text-yellow-600 dark:text-yellow-400">
                            {total_rank_percentile.toFixed(1)}%
                        </span>
                    </div>
                )}
            </div>

            {/* Best Month */}
            {best_month_rank && best_month && (
                <div className="glass-effect rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-orange-500" />
                        Best Monthly Performance
                    </h3>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                                #{best_month_rank}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                in {getMonthName(best_month)}
                            </div>
                        </div>
                        <div className="text-4xl">🏆</div>
                    </div>
                </div>
            )}

            {/* Country Rankings */}
            {topCountryRanks.length > 0 && (
                <div className="glass-effect rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-500" />
                        Top Country Rankings
                    </h3>
                    <div className="space-y-3">
                        {topCountryRanks.map(([country, rank], index) => {
                            const medals = ['🥇', '🥈', '🥉'];
                            const medal = medals[index] || '🏅';
                            
                            return (
                                <div
                                    key={country}
                                    className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{medal}</span>
                                        <div>
                                            <div className="font-medium text-gray-800 dark:text-gray-200">
                                                {country}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                Rank #{rank}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                        #{rank}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Encouragement */}
            <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-400 italic">
                    Keep up the great work! 🌟
                </p>
            </div>
        </div>
    );
};

export default RankingSlide;
