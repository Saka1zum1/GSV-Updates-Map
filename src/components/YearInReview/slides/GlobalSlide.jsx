import React from 'react';

/**
 * Global Firsts Slide - Celebrate first reports in countries
 * Shows first_country_report and top_country_report achievements
 */
const GlobalFirstsSlide = ({ report, getFlagEmoji, countries }) => {
    const globalStats = report?.global_stats || {};
    const firstCountryReports = globalStats.first_country_report || []; // [{count, country, message_id, report_time}]
    const topCountryReports = globalStats.top_country_report || []; // [{count, country, message_id, report_time}]

    // Combine and deduplicate
    const allAchievements = [...firstCountryReports, ...topCountryReports];
    const uniqueCountries = [...new Set(allAchievements.map(a => a.country))];
    
    // Get detailed achievements per country
    const achievements = uniqueCountries.map(country => {
        const first = firstCountryReports.find(f => f.country === country);
        const top = topCountryReports.find(t => t.country === country);
        return {
            country,
            isFirst: !!first,
            isTopRank: !!top,
            count: top?.count || first?.count || 0,
            rank: top ? (top.count >= 50 ? 1 : top.count >= 30 ? 2 : 3) : null
        };
    }).sort((a, b) => b.count - a.count);

    if (achievements.length === 0) {
        return null; // Skip this slide if no global achievements
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            {/* Header */}
            <div className="mb-8">
                <div className="text-5xl mb-2 animate-bounce">🌟</div>
                <p className="text-white/60 text-lg mb-2">
                    You made history!
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Community Achievements
                </h2>
            </div>

            {/* Achievements list */}
            <div className="w-full max-w-md space-y-3 mb-6">
                {achievements.slice(0, 5).map((achievement, index) => {
                    const { country, isFirst, isTopRank, count } = achievement;
                    const flagEmoji = getFlagEmoji ? getFlagEmoji(country) : country;
                    const countryName = countries?.[country];
                    
                    return (
                        <div 
                            key={country}
                            className="relative group"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-yellow-500/20 hover:border-yellow-500/40 transition-all">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                                        <span className="text-2xl md:text-3xl flex-shrink-0">{flagEmoji}</span>
                                        <div className="text-left flex-1 min-w-0">
                                            <div className="text-white font-bold text-base md:text-lg truncate">
                                                {countryName}
                                            </div>
                                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                                                {isFirst && (
                                                    <span className="text-xs px-2 py-0.5 bg-blue-500/30 text-blue-300 rounded-full whitespace-nowrap">
                                                        1st Report
                                                    </span>
                                                )}
                                                {isTopRank && (
                                                    <span className="text-xs px-2 py-0.5 bg-yellow-500/30 text-yellow-300 rounded-full whitespace-nowrap">
                                                        Top Rank
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0 ml-2">
                                        <div className="text-white font-bold text-2xl">
                                            {count}
                                        </div>
                                        <div className="text-white/40 text-xs">
                                            update reports
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Summary */}
            <div className="mt-4">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-500/30">
                    <span className="text-2xl">🏆</span>
                    <span className="text-white font-medium">
                        {achievements.length} {achievements.length === 1 ? 'Country' : 'Countries'} Pioneered
                    </span>
                </div>
            </div>
        </div>
    );
};

export default GlobalFirstsSlide;
