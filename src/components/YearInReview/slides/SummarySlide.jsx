import React from 'react';

/**
 * Summary Slide - Final wrap-up with sharing option
 */
const SummarySlide = ({ report, user }) => {
    const year = report?.report_year || report?.year || new Date().getFullYear();
    const userName = user?.username || report?.author_name || 'Explorer';
    const totalCount = report?.total_count || report?.total || 0;
    const countriesCount = report?.geo?.countries || 0;
    const regionsCount = report?.geo?.regions || 0;
    const activeDays = report?.streak?.active_days || 0;
    const rank = report?.updates?.rank;
    const dailyAvg = report?.daily_avg || 0;

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            {/* Celebration emoji */}
            <div className="text-6xl mb-2 animate-bounce">
                🎉
            </div>

            {/* Thank you message */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What a year, <span className="text-blue-400">@{userName}</span>!
            </h2>

            <p className="text-white/70 text-lg mb-8 max-w-md">
                Thanks for being part of the VirtualStreets
            </p>

            {/* Quick stats summary */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">{totalCount}</div>
                    <div className="text-xs text-white/50">contributions</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400">{countriesCount}</div>
                    <div className="text-xs text-white/50">countries</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">{regionsCount}</div>
                    <div className="text-xs text-white/50">regions</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-orange-400">{activeDays}</div>
                    <div className="text-xs text-white/50">active days</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-400">#{rank || '--'}</div>
                    <div className="text-xs text-white/50">community rank</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-pink-400">{dailyAvg.toFixed(1)}</div>
                    <div className="text-xs text-white/50">daily average</div>
                </div>
            </div>

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
                #{year} Wrapped
            </div>
        </div>
    );
};

export default SummarySlide;
