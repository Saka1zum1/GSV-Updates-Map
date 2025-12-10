import React from 'react';

const GlobalFirstsSlide = ({ report, getFlagEmoji, countries, getMonthName }) => {
    const globalStats = report?.global_stats || {};
    
    const getUpdateTypeAsset = (type) => {
        const typeMap = {
            'ariupdate': 'ariupdate', 'gen3update': 'gen3update', 'newcountry': 'newcountry',
            'newregion': 'newregion', 'newsmallcam': 'newsmallcam', 'newyear': 'newyear',
            'smallcam': 'smallcam', 'newtrekker': 'newtrekker', 'gen1update': 'gen1update',
            'gen2update': 'gen2update', 'gen4update': 'gen4update'
        };
        return typeMap[type] || 'gen4update';
    };

    const allAchievements = [];

    (globalStats.first_country_report || []).forEach(item => {
        allAchievements.push({
            type: 'first_country_report',
            icon: getFlagEmoji ? getFlagEmoji(item.country) : item.country,
            title: countries?.[item.country] || item.country,
            badge: '1st Report of the Year',
            value: '⚡',
            subtitle: '',
            gradient: 'from-blue-500/10 via-cyan-500/10 to-teal-500/10',
            border: 'border-blue-500/20 hover:border-blue-500/40',
            badgeColor: 'bg-blue-500/30 text-blue-300'
        });
    });

    (globalStats.top_country_report || []).forEach(item => {
        allAchievements.push({
            type: 'top_country_report',
            icon: getFlagEmoji ? getFlagEmoji(item.country) : item.country,
            title: countries?.[item.country] || item.country,
            badge: 'Top Rank',
            value: item.count,
            subtitle: 'updates',
            gradient: 'from-yellow-500/10 via-orange-500/10 to-red-500/10',
            border: 'border-yellow-500/20 hover:border-yellow-500/40',
            badgeColor: 'bg-yellow-500/30 text-yellow-300'
        });
    });

    (globalStats.top_camera_report || []).forEach(item => {
        allAchievements.push({
            type: 'top_camera_report',
            image: `/assets/${getUpdateTypeAsset(item.type)}.webp`,
            title: item.type.charAt(0).toUpperCase() + item.type.slice(1),
            badge: 'Top Rank',
            value: item.count,
            subtitle: 'updates',
            gradient: 'from-yellow-500/10 via-orange-500/10 to-red-500/10',
            border: 'border-yellow-500/20 hover:border-yellow-500/40',
            badgeColor: 'bg-yellow-500/30 text-yellow-300'
        });
    });

    (globalStats.first_camera_report || []).forEach(item => {
        allAchievements.push({
            type: 'first_camera_report',
            image: `/assets/${getUpdateTypeAsset(item.type)}.webp`,
            title: item.type.charAt(0).toUpperCase() + item.type.slice(1),
            badge: '1st Report',
            value: '⚡',
            subtitle: 'update',
            gradient: 'from-blue-500/10 via-cyan-500/10 to-teal-500/10',
            border: 'border-blue-500/20 hover:border-blue-500/40',
            badgeColor: 'bg-blue-500/30 text-blue-300'
        });
    });

    (globalStats.first_month_spot || []).forEach(item => {
        allAchievements.push({
            type: 'first_month_spot',
            icon: '📅',
            title: getMonthName ? getMonthName(item.month) : `Month ${item.month}`,
            badge: '1st of the Month',
            value: '⚡',
            subtitle: 'spottings',
            gradient: 'from-purple-500/10 via-pink-500/10 to-rose-500/10',
            border: 'border-purple-500/20 hover:border-purple-500/40',
            badgeColor: 'bg-purple-500/30 text-purple-300'
        });
    });

    (globalStats.first_country_spot || []).forEach(item => {
        allAchievements.push({
            type: 'first_country_spot',
            icon: getFlagEmoji ? getFlagEmoji(item.country) : item.country,
            title: countries?.[item.country] || item.country,
            badge: '1st Yearly',
            value: '⚡',
            subtitle: 'spottings',
            gradient: 'from-green-500/10 via-emerald-500/10 to-teal-500/10',
            border: 'border-green-500/20 hover:border-green-500/40',
            badgeColor: 'bg-green-500/30 text-green-300'
        });
    });

    (globalStats.top_country_spot || []).forEach(item => {
        allAchievements.push({
            type: 'top_country_spot',
            icon: getFlagEmoji ? getFlagEmoji(item.country) : item.country,
            title: countries?.[item.country] || item.country,
            badge: 'Top Rank',
            value: item.count,
            subtitle: 'spottings',
            gradient: 'from-orange-500/10 via-red-500/10 to-pink-500/10',
            border: 'border-orange-500/20 hover:border-orange-500/40',
            badgeColor: 'bg-orange-500/30 text-orange-300'
        });
    });

    if (allAchievements.length === 0) return null;
    
    const displayedAchievements = allAchievements.slice(0, 8);


    return (
        <div className="flex flex-col items-center justify-center w-full px-2 sm:px-4 md:px-6 lg:px-8 text-center py-3 sm:py-4 md:py-5 lg:py-6 overflow-y-auto">
            <div className="mb-2 sm:mb-3 md:mb-4 lg:mb-5">
                <div className="text-3xl mt-6 sm:mt-4 md:mt-2 lg:mt-1 sm:text-4xl md:text-5xl mb-1 sm:mb-1.5 animate-bounce">🌟</div>
                <p className="text-white/60 text-xs sm:text-sm md:text-base lg:text-lg mb-1">You made history!</p>
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">Community Achievements</h2>
            </div>

            <div className="w-full max-w-xs sm:max-w-sm md:max-w-3xl lg:max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 mb-3 sm:mb-4">
                {displayedAchievements.map((achievement, index) => (
                    <div key={`${achievement.type}-${index}`} className="relative group">
                        <div className={`bg-gradient-to-r ${achievement.gradient} backdrop-blur-sm rounded-lg p-2 sm:p-3 md:p-4 border ${achievement.border} transition-all`}>
                            <div className="flex items-center justify-between gap-1.5 sm:gap-2 md:gap-3">
                                <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-1 min-w-0">
                                    {achievement.image ? (
                                        <img src={achievement.image} alt={achievement.title} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain flex-shrink-0" onError={(e) => e.target.style.display = 'none'} />
                                    ) : (
                                        <span className="text-xl sm:text-2xl md:text-3xl flex-shrink-0">{achievement.icon}</span>
                                    )}
                                    <div className="text-left flex-1 min-w-0">
                                        <div className="text-white font-bold text-xs sm:text-sm md:text-base truncate">
                                            {achievement.title}
                                        </div>
                                        <div className="flex items-center gap-1 mt-0.5">
                                            <span className={`text-xxs sm:text-xs px-1.5 sm:px-2 py-0.5 ${achievement.badgeColor} rounded-full whitespace-nowrap`}>
                                                {achievement.badge}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <div className="text-white font-bold text-lg sm:text-xl md:text-2xl">
                                        {achievement.value}
                                    </div>
                                    <div className="text-white/40 text-xxs sm:text-xs leading-tight">
                                        {achievement.subtitle}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="inline-flex items-center md:mt-1 gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-500/30">
                <span className="text-lg sm:text-xl md:text-2xl">🏆</span>
                <span className="text-white font-medium text-xs sm:text-sm md:text-base">
                    {displayedAchievements.length} of {allAchievements.length} Achievement{displayedAchievements.length !== 1 ? 's' : ''} Shown
                </span>
            </div>
        </div>
    );
};

export default GlobalFirstsSlide;
