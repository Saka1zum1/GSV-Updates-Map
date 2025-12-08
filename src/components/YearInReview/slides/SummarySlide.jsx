import React from 'react';

/**
 * Summary Slide - Final wrap-up with sharing option
 */
const SummarySlide = ({ report, user }) => {
    const year = report?.report_year || new Date().getFullYear();
    const userName = user?.username || report?.author_name || 'Explorer';
    const totalCount = report?.total_count || 0;
    const countriesCount = report?.geo_stats?.countries_count || 0;
    const longestStreak = report?.streak_stats?.longest_streak_days || 0;
    const rank = report?.ranking_stats?.total_rank;

    // Get achievements
    const achievements = report?.milestones?.achievements || [];

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            {/* Celebration emoji */}
            <div className="text-6xl mb-6 animate-bounce">
                🎉
            </div>

            {/* Thank you message */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What a year, <span className="text-blue-400">@{userName}</span>!
            </h2>

            <p className="text-white/70 text-lg mb-8 max-w-md">
                Thanks for being part of the Street View coverage community
            </p>

            {/* Quick stats summary */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">{totalCount}</div>
                    <div className="text-xs text-white/50">contributions</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400">{countriesCount}</div>
                    <div className="text-xs text-white/50">countries</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-orange-400">{longestStreak}</div>
                    <div className="text-xs text-white/50">day streak</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-400">#{rank || '--'}</div>
                    <div className="text-xs text-white/50">ranking</div>
                </div>
            </div>

            {/* Achievements badges */}
            {achievements.length > 0 && (
                <div className="mb-8">
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Achievements Unlocked</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {achievements.slice(0, 4).map((achievement, index) => (
                            <span 
                                key={index}
                                className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full text-yellow-400 text-xs"
                            >
                                🏆 {achievement}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Call to action */}
            <div className="space-y-4">
                <p className="text-white/50 text-sm">
                    See you in {year + 1}! Keep exploring 🌍
                </p>
                
                {/* Share hint */}
                <p className="text-white/30 text-xs">
                    Screenshot and share your wrapped with the community!
                </p>
            </div>

            {/* Year badge */}
            <div className="mt-8 px-6 py-2 rounded-full bg-white/5 text-white/40 text-sm">
                #{year}Wrapped
            </div>
        </div>
    );
};

export default SummarySlide;
