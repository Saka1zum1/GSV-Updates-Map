import React from 'react';

/**
 * Ranking Slide - Community standing (Netease style)
 */
const RankingSlide = ({ report }) => {
    const updates = report?.updates;
    const totalRank = updates?.rank;
    const percentile = updates?.percentile;

    // Get rank badge info
    const getRankBadge = (rank, percentile) => {
        if (rank === 1) return { badge: '👑', title: 'Champion', desc: 'The undisputed champion!', gradient: 'from-yellow-400 to-amber-500' };
        if (rank === 2) return { badge: '🥈', title: 'Top2', desc: 'Among the very best!', gradient: 'from-gray-300 to-gray-500' };
        if (rank === 3) return { badge: '🥉', title: 'Top3', desc: 'Among the very best!', gradient: 'from-orange-400 to-orange-600' };
        if (percentile >= 90) return { badge: '💎', title: 'Top 10%', desc: 'Diamond tier contributor!', gradient: 'from-blue-400 to-cyan-400' };
        if (percentile >= 75) return { badge: '🔥', title: 'Top 25%', desc: 'Rising through the ranks!', gradient: 'from-orange-400 to-red-500' };
        if (percentile >= 50) return { badge: '⭐', title: 'Top 50%', desc: 'Above average explorer!', gradient: 'from-blue-500 to-indigo-500' };
        return { badge: '🌱', title: 'Growing', desc: 'Every journey starts somewhere!', gradient: 'from-green-400 to-emerald-500' };
    };

    const rankInfo = getRankBadge(totalRank, percentile);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            {/* Header */}
            <p className="text-white/60 text-xl mb-8">
                In the community, you ranked
            </p>

            {/* Rank badge */}
            <div className="mb-6">
                <div className="text-6xl mb-4">{rankInfo.badge}</div>
                <div className={`text-5xl md:text-7xl font-bold bg-gradient-to-r ${rankInfo.gradient} bg-clip-text text-transparent`}>
                    #{totalRank || '--'}
                </div>
            </div>

            {/* Title and description */}
            <div className="mb-8">
                <div className="text-2xl font-bold text-white mb-2">
                    {rankInfo.title}
                </div>
                <div className="text-white/60">
                    {rankInfo.desc}
                </div>
            </div>

            {/* Percentile visualization */}
            {percentile && (
                <div className="w-full max-w-sm">
                    <div className="flex justify-between text-xs text-white/40 mb-2">
                        <span>Top {(100 - percentile).toFixed(1)}%</span>
                        <span>of all contributors</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                        <div 
                            className={`h-full bg-gradient-to-r ${rankInfo.gradient} rounded-full transition-all duration-1000`}
                            style={{ width: `${percentile}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Fun fact */}
            <p className="mt-8 text-white/40 text-xs max-w-sm">
                Rankings are based on total contributions across the year 📊
            </p>
        </div>
    );
};

export default RankingSlide;
                            