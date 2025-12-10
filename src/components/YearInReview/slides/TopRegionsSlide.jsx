import React from 'react';

/**
 * Top Regions Slide - Show top regions explored with flags
 * Uses top_regions data from backend
 * 
 * Mobile Layout:
 * - Uses pt-safe-plus-lg for top padding to account for iOS safe areas (notch, status bar)
 * - Header section positioned below browser UI and progress dots
 * - Scrollable content with safe area bottom padding
 */
const TopRegionsSlide = ({ report, getFlagEmoji, countries }) => {
    const geo = report?.geo;
    const topRegions = geo?.top_regions || []; // Array of {rank, count, region, country}
    const regionsCount = geo?.regions || 0;

    // Get top 15 regions
    const displayRegions = topRegions.slice(0, 10);
    const maxCount = displayRegions.length > 0 ? displayRegions[0].count : 1;

    const getRankMedal = (index) => {
        const medals = ['🏆', '🥈', '🥉'];
        return medals[index-1] || `#${index}`;
    };

    return (
        <div className="flex flex-col h-full min-h-screen overflow-y-auto">
            {/* Fixed header section with safe area support for mobile browsers */}
            <div className="flex-shrink-0 pt-safe-plus-lg pb-6 md:py-10 text-center px-4">
                <p className="text-white/60 text-base md:text-xl mt-2 md:mt-4 mb-2 md:mb-4">
                    You explored
                </p>
                
                <div className="flex items-baseline gap-2 md:gap-4 justify-center mb-4 md:mb-6">
                    <span className="text-4xl md:text-6xl font-bold text-white">
                        {regionsCount}
                    </span>
                    <span className="text-lg md:text-2xl text-white/70">unique regions</span>
                </div>
                
                <p className="text-sm md:text-base text-white/50 uppercase tracking-wider">
                    Most covered regions
                </p>
            </div>

            {/* Scrollable content section with safe area padding */}
            {displayRegions.length > 0 && (
                <div className="flex-1 overflow-y-auto pb-safe-plus px-2 md:px-6 lg:px-8">
                    <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4 lg:gap-5">
                    
                    {displayRegions.map((item, index) => {
                        const { region, country, count, rank } = item;
                        const widthPercent = (count / maxCount) * 100;
                        const flagEmoji = getFlagEmoji ? getFlagEmoji(country) : country;
                        
                        return (
                            <div key={`${country}-${region}-${index}`} className="relative" style={{ gridColumn: 'auto' }}>
                                {/* Animated bar background */}
                                <div 
                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-md transition-all duration-1000 ease-out"
                                    style={{
                                        width: `${widthPercent}%`,
                                        animationDelay: `${index * 100}ms`
                                    }}
                                />
                                
                                {/* Content */}
                                <div className="relative flex items-center justify-between px-3 md:px-4 py-2 md:py-3 rounded-md backdrop-blur-sm">
                                    <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                                        <span className="text-xl md:text-2xl flex-shrink-0">{flagEmoji}</span>
                                        <div className="text-left flex-1 min-w-0">
                                            <div className="text-white font-medium truncate text-sm md:text-base">
                                                {region}
                                            </div>
                                            <div className="text-white/50 text-xs md:text-sm leading-tight">
                                                {getRankMedal(rank)} in community
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ml-2 md:ml-3 text-right flex-shrink-0 min-w-fit">
                                        <div className="text-white font-bold text-sm md:text-base">
                                            {count}
                                        </div>
                                        <div className="text-white/40 text-xs hidden md:block">
                                            contributions
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TopRegionsSlide;
