import React from 'react';
import { Award, Star, Sparkles } from 'lucide-react';

/**
 * Achievements and Milestones Slide
 * @param {Object} props - Component props
 * @param {Object} props.report - Annual report data
 */
const AchievementsSlide = ({ report }) => {
    if (!report || !report.milestones) return null;

    const { milestones, interaction_stats, report_year, author_name } = report;
    const { achievements, special_moments } = milestones;
    const {
        most_reacted_msg_count,
        diamond_count,
        gold_count
    } = interaction_stats || {};

    return (
        <div className="flex flex-col h-full px-6 py-8 overflow-y-auto">
            {/* Header */}
            <div className="text-center mb-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Achievements & Milestones
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Your remarkable accomplishments in {report_year}
                </p>
            </div>

            {/* Interaction Stats */}
            {interaction_stats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {most_reacted_msg_count > 0 && (
                        <div className="glass-effect rounded-lg p-4 text-center">
                            <Star className="w-8 h-8 text-yellow-500 dark:text-yellow-400 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                                {most_reacted_msg_count}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 uppercase">
                                Most Reactions
                            </div>
                        </div>
                    )}

                    {diamond_count > 0 && (
                        <div className="glass-effect rounded-lg p-4 text-center">
                            <Sparkles className="w-8 h-8 text-blue-500 dark:text-blue-400 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {diamond_count}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 uppercase">
                                💎 Diamonds
                            </div>
                        </div>
                    )}

                    {gold_count > 0 && (
                        <div className="glass-effect rounded-lg p-4 text-center">
                            <Award className="w-8 h-8 text-yellow-500 dark:text-yellow-400 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                                {gold_count}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 uppercase">
                                🏆 Gold
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Achievements */}
            {achievements && achievements.length > 0 && (
                <div className="glass-effect rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-purple-500" />
                        Unlocked Achievements
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {achievements.map((achievement, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-700"
                            >
                                <span className="text-3xl mb-2">🏅</span>
                                <span className="text-xs text-center text-gray-700 dark:text-gray-300 font-medium">
                                    {achievement}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Special Moments */}
            {special_moments && special_moments.length > 0 && (
                <div className="glass-effect rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-pink-500" />
                        Special Moments
                    </h3>
                    <div className="space-y-3">
                        {special_moments.map((moment, index) => (
                            <div
                                key={index}
                                className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg"
                            >
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">⭐</span>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            {moment.description || moment}
                                        </p>
                                        {moment.date && (
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {new Date(moment.date).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Thank You Message */}
            <div className="glass-effect rounded-xl p-8 text-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <Sparkles className="w-16 h-16 text-purple-500 dark:text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    Thank You, @{author_name}!
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Your contributions make the street view community amazing. 
                    Here's to another year of exploration and discovery! 🎉
                </p>
            </div>
        </div>
    );
};

export default AchievementsSlide;
