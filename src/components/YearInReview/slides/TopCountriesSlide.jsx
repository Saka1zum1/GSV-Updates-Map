import React from 'react';

/**
 * Top Countries Slide - Geographic exploration highlights
 * Uses flag emojis and visual bars
 * 
 * Mobile Layout:
 * - Uses pt-safe-plus-lg for top padding to account for iOS safe areas (notch, status bar)
 * - Header section positioned below browser UI and progress dots
 * - Scrollable content with safe area bottom padding
 */
const TopCountriesSlide = ({ report, getFlagEmoji, countries }) => {
    const geo = report?.geo;
    const countriesCount = geo?.countries || 0;
    const topCountries = geo?.top_countries || {};

    const topCountriesArray = Object.entries(topCountries)
        .map(([code, data]) => ({ code, rank: data.rank, count: data.count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 12);
    
    const maxCount = topCountriesArray.length > 0 ? topCountriesArray[0].count : 1;

    const getRankMedal = (index) => {
        const medals = ['🏆', '🥈', '🥉'];
        return medals[index-1] || `#${index}`;
    };

    return (
        <div className="flex flex-col h-full min-h-screen overflow-y-auto">
            {/* Fixed header section with safe area support for mobile browsers */}
            <div className="flex-shrink-0 pt-safe-plus-lg pb-6 md:py-10 text-center px-4">
                <p className="text-white/60 text-base md:text-xl mt-2 md:mt-4 mb-2 md:mb-4">
                    Your contributions spanned across
                </p>
                
                <div className="flex items-baseline gap-2 md:gap-4 justify-center mb-4 md:mb-6">
                    <span className="text-4xl md:text-6xl font-bold text-white">
                        {countriesCount}
                    </span>
                    <span className="text-lg md:text-2xl text-white/70">countries</span>
                </div>
                
                <p className="text-sm md:text-base text-white/50 uppercase tracking-wider">
                    Your favorite destinations
                </p>
            </div>

            {/* Scrollable content section with safe area padding */}
            {topCountriesArray.length > 0 && (
                <div className="flex-1 overflow-y-auto pb-safe px-4 md:px-8" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                    
                    {topCountriesArray.map((item, index) => {
                        const { code, rank, count } = item;
                        const widthPercent = (count / maxCount) * 100;
                        const flagEmoji = getFlagEmoji ? getFlagEmoji(code) : code;
                        const countryName = countries?.[code];
                        
                        return (
                            <div key={code} className="relative" style={{ gridColumn: 'auto' }}>
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
                                                {countryName}
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

export default TopCountriesSlide;
