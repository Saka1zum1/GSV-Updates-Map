import React from 'react';

/**
 * Streak Slide - Consistency and dedication
 */
const StreakSlide = ({ report }) => {
    const streakStats = report?.streak_stats;
    const longestStreak = streakStats?.longest_streak_days || 0;
    const currentStreak = streakStats?.current_streak_days || 0;
    const activeDays = streakStats?.active_days || 0;
    const activeWeeks = streakStats?.active_weeks || 0;
    const activeMonths = streakStats?.active_months || 0;

    // Get dedication level
    const getDedicationLevel = (streak) => {
        if (streak >= 30) return { title: 'Legendary Dedication', emoji: '🏆', color: 'text-yellow-400' };
        if (streak >= 14) return { title: 'Streak Master', emoji: '🔥', color: 'text-orange-400' };
        if (streak >= 7) return { title: 'Week Warrior', emoji: '⚡', color: 'text-blue-400' };
        if (streak >= 3) return { title: 'Getting Hooked', emoji: '✨', color: 'text-purple-400' };
        return { title: 'Casual Explorer', emoji: '🌱', color: 'text-green-400' };
    };

    const dedication = getDedicationLevel(longestStreak);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            {/* Header */}
            <p className="text-white/60 text-lg mb-2">
                Your longest streak was
            </p>

            {/* Big streak number */}
            <div className="mb-6">
                <div className="text-7xl md:text-8xl font-bold text-white mb-2">
                    {longestStreak}
                </div>
                <div className="text-xl text-white/70">
                    consecutive days
                </div>
            </div>

            {/* Dedication badge */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 mb-8">
                <div className="text-4xl mb-2">{dedication.emoji}</div>
                <div className={`text-lg font-bold ${dedication.color}`}>
                    {dedication.title}
                </div>
            </div>

            {/* Activity breakdown */}
            <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
                <div className="text-center">
                    <div className="text-2xl font-bold text-white">{activeDays}</div>
                    <div className="text-xs text-white/50">days</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-white">{activeWeeks}</div>
                    <div className="text-xs text-white/50">weeks</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-white">{activeMonths}</div>
                    <div className="text-xs text-white/50">months</div>
                </div>
            </div>

            {/* Current streak if active */}
            {currentStreak > 0 && (
                <div className="mt-8 text-white/60 text-sm">
                    🔥 Currently on a <span className="text-orange-400 font-bold">{currentStreak} day</span> streak!
                </div>
            )}

            {/* Motivational text */}
            <p className="mt-6 text-white/40 text-xs max-w-sm">
                Every day you show up, the community grows stronger 💪
            </p>
        </div>
    );
};

export default StreakSlide;
