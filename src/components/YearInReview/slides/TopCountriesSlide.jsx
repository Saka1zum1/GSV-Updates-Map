import React from 'react';

/**
 * Top Countries Slide - Geographic exploration highlights
 * Uses flag emojis and visual bars
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

    const getRankMedal = (rank) => {
        const medals = { 1: '🏆', 2: '🥈', 3: '🥉' };
        return medals[rank] || `#${rank}`;
    };

    return (
        <div className="flex flex-col h-full overflow-y-auto w-full">
            {/* Fixed header section */}
            <div className="flex-shrink-0 py-2 sm:py-3 md:py-4 lg:py-5 text-center px-2 sm:px-4 md:px-6 lg:px-8">
                <p className="text-white/60 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mt-5 sm:mt-6 md:mt-7 lg:mt-8 mb-1 md:mb-1.5 lg:mb-2">
                    Your contributions spanned across
                </p>
                
                <div className="flex items-baseline gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 justify-center mb-1.5 sm:mb-2 md:mb-3 lg:mb-4">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                        {countriesCount}
                    </span>
                    <span className="text-xs sm:text-sm md:text-base lg:text-xl text-white/70">countries</span>
                </div>
                
                <p className="text-xxs sm:text-xs md:text-sm text-white/50 uppercase tracking-wider">
                    Your favorite destinations
                </p>
            </div>

            {/* Scrollable content section */}
            {topCountriesArray.length > 0 && (
                <div className="flex-1 overflow-y-auto pb-6 sm:pb-8 md:pb-12 lg:pb-16 px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8">
                    <div className="max-w-full lg:max-w-4xl xl:max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                    
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
                                <div className="relative flex items-center justify-between px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-md backdrop-blur-sm">
                                    <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-1 min-w-0">
                                        <span className="text-lg sm:text-xl md:text-2xl flex-shrink-0">{flagEmoji}</span>
                                        <div className="text-left flex-1 min-w-0">
                                            <div className="text-white font-medium truncate text-xs sm:text-sm md:text-base">
                                                {countryName}
                                            </div>
                                            <div className="text-white/50 text-xxs sm:text-xs md:text-sm leading-tight">
                                                {getRankMedal(rank)} in community
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ml-1.5 sm:ml-2 md:ml-3 text-right flex-shrink-0 min-w-fit">
                                        <div className="text-white font-bold text-xs sm:text-sm md:text-base">
                                            {count}
                                        </div>
                                        <div className="text-white/40 text-xxs sm:text-xs hidden sm:block">
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
