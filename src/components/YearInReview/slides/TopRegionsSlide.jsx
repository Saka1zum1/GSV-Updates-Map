import React from 'react';

/**
 * Top Regions Slide - Show top regions explored with flags
 * Uses top_regions data from backend
 */
const TopRegionsSlide = ({ report, getFlagEmoji }) => {
    const geo = report?.geo;
    const topRegions = geo?.top_regions || []; // Array of {rank, count, region, country}
    const regionsCount = geo?.regions || 0;

    // Get top 5 regions
    const displayRegions = topRegions.slice(0, 5);
    const maxCount = displayRegions.length > 0 ? displayRegions[0].count : 1;

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            {/* Header */}
            <p className="text-white/60 text-lg mb-2">
                You explored
            </p>
            
            <div className="flex items-baseline gap-3 mb-8">
                <span className="text-5xl md:text-6xl font-bold text-white">
                    {regionsCount}
                </span>
                <span className="text-xl text-white/70">unique regions</span>
            </div>

            {/* Top regions list */}
            {displayRegions.length > 0 && (
                <div className="w-full max-w-lg space-y-3">
                    <p className="text-sm text-white/50 uppercase tracking-wider mb-4">
                        Most covered regions
                    </p>
                    
                    {displayRegions.map((item, index) => {
                        const { region, country, count, rank } = item;
                        const widthPercent = (count / maxCount) * 100;
                        const flagEmoji = getFlagEmoji ? getFlagEmoji(country) : country;
                        
                        return (
                            <div key={`${country}-${region}-${index}`} className="relative">
                                {/* Animated bar background */}
                                <div 
                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-lg transition-all duration-1000 ease-out"
                                    style={{
                                        width: `${widthPercent}%`,
                                        animationDelay: `${index * 100}ms`
                                    }}
                                />
                                
                                {/* Content */}
                                <div className="relative flex items-center justify-between px-4 py-3 rounded-lg backdrop-blur-sm">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <span className="text-2xl">{flagEmoji}</span>
                                        <div className="text-left flex-1 min-w-0">
                                            <div className="text-white font-medium truncate">
                                                {region}
                                            </div>
                                            <div className="text-white/40 text-xs">
                                                Rank #{rank} in {country}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ml-3 text-right">
                                        <div className="text-white font-bold">
                                            {count}
                                        </div>
                                        <div className="text-white/40 text-xs">
                                            updates
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Achievement badge */}
            {regionsCount >= 300 && (
                <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-full border border-yellow-500/30">
                    <span className="text-2xl">🏆</span>
                    <span className="text-yellow-300 text-sm font-medium">Regional Explorer</span>
                </div>
            )}
        </div>
    );
};

export default TopRegionsSlide;
