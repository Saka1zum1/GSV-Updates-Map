import React from 'react';

/**
 * Total Contributions Slide - The big number moment
 * Netease style: Large impactful number with context
 */
const TotalContributionsSlide = ({ report }) => {
    const totalCount = report?.total_count || 0;
    const dailyAverage = report?.daily_average || 0;
    const reportType = report?.report_type || 'update';

    // Generate a fun comparison
    const getComparison = (count) => {
        if (count >= 1000) return `That's like exploring a new place every ${Math.round(365 / count * 100) / 100} hours!`;
        if (count >= 500) return `You're in the top tier of coverage hunters!`;
        if (count >= 100) return `That's serious dedication to the map!`;
        if (count >= 50) return `Quality over quantity, right?`;
        return `Every discovery counts!`;
    };

    // Get emoji based on report type
    const getTypeEmoji = () => {
        return reportType === 'update' ? '📍' : '📸';
    };

    // Get action verb based on report type
    const getActionVerb = () => {
        return reportType === 'update' ? 'coverage updates' : 'interesting spots';
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            {/* Context */}
            <p className="text-white/60 text-lg mb-4">
                You contributed a total of
            </p>

            {/* Big number with animation */}
            <div className="relative mb-6">
                <div className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {totalCount.toLocaleString()}
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 text-7xl md:text-9xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent blur-2xl opacity-30">
                    {totalCount.toLocaleString()}
                </div>
            </div>

            {/* Type label */}
            <div className="text-xl md:text-2xl text-white/80 mb-8">
                {getTypeEmoji()} {getActionVerb()}
            </div>

            {/* Daily average */}
            <div className="flex items-center gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
                    <div className="text-3xl font-bold text-white">
                        {dailyAverage.toFixed(1)}
                    </div>
                    <div className="text-sm text-white/60">per day avg</div>
                </div>
            </div>

            {/* Fun comparison */}
            <p className="text-white/50 text-sm max-w-md italic">
                {getComparison(totalCount)}
            </p>
        </div>
    );
};

export default TotalContributionsSlide;
