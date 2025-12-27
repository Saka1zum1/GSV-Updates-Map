import React, { useEffect, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const GlobalFirstsSlide = ({ report, getFlagEmoji, countries, getMonthName }) => {
    const globalStats = report?.global_stats || {};

    const getCameraAsset = (camera) => {
        const assetMap = {
            'Gen4': 'gen4',
            'Gen4Trekker': 'gen4trekker',
            'SmallCam': 'smallcam',
            'BadCam': 'badcam',
            'Gen1': 'gen1',
            'Gen2': 'gen2',
            'Gen3': 'gen3'
        };
        return assetMap[camera] || 'gen4';
    };

    const [page, setPage] = useState(0);
    const allAchievements = [];

    // First report of the year
    if (globalStats.first_report) {
        allAchievements.push({
            type: 'first_report',
            image: '/assets/newyear.webp',
            title: 'First Report',
            badge: '1st Report of the Year',
            value: '⚡',
            subtitle: 'update',
            gradient: 'from-purple-500/10 via-pink-500/10 to-red-500/10',
            border: 'border-purple-500/20 hover:border-purple-500/40',
            badgeColor: 'bg-purple-500/30 text-purple-300'
        });
    }

    // First spotting of the year
    if (globalStats.first_spot) {
        allAchievements.push({
            type: 'first_spot',
            icon: '📸',
            title: 'First Spotting',
            badge: '1st Report of the Year',
            value: '⚡',
            subtitle: 'spotting',
            gradient: 'from-blue-500/10 via-indigo-500/10 to-purple-500/10',
            border: 'border-blue-500/20 hover:border-blue-500/40',
            badgeColor: 'bg-blue-500/30 text-blue-300'
        });
    }


    // Top pinpoints
    if (globalStats.top_pinpoints) {
        const item = globalStats.top_pinpoints;
        allAchievements.push({
            type: 'top_pinpoints',
            icon: '📍',
            title: 'Pinpoint Master',
            badge: 'Top Rank',
            value: item.count,
            subtitle: 'pinpoints',
            gradient: 'from-rose-500/10 via-pink-500/10 to-red-500/10',
            border: 'border-rose-500/20 hover:border-rose-500/40',
            badgeColor: 'bg-rose-500/30 text-rose-300'
        });
    }

    // Top reactions
    if (globalStats.top_reactions) {
        const item = globalStats.top_reactions;
        allAchievements.push({
            type: 'top_reactions',
            image: 'https://cdn.discordapp.com/emojis/851305317950292001.webp',
            title: '',
            badge: 'Most Reactions Received',
            value: item.count,
            subtitle: 'reactions',
            gradient: 'from-pink-500/10 via-rose-500/10 to-red-500/10',
            border: 'border-pink-500/20 hover:border-pink-500/40',
            badgeColor: 'bg-pink-500/30 text-pink-300'
        });
    }

    (globalStats.first_country_report || []).forEach(item => {
        allAchievements.push({
            type: 'first_country_report',
            icon: getFlagEmoji ? getFlagEmoji(item.country) : item.country,
            title: countries?.[item.country] || item.country,
            badge: '1st Report of the Year',
            value: '⚡',
            subtitle: 'update',
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

    (globalStats.top_camera_spot || []).forEach(item => {
        allAchievements.push({
            type: 'top_camera_spotting',
            image: `/assets/${getCameraAsset(item.camera)}.webp`,
            title: `${item.camera}`,
            badge: 'Top Rank',
            value: item.count,
            subtitle: 'spottings',
            gradient: 'from-yellow-500/10 via-orange-500/10 to-red-500/10',
            border: 'border-yellow-500/20 hover:border-yellow-500/40',
            badgeColor: 'bg-yellow-500/30 text-yellow-300'
        });
    });

    (globalStats.first_camera_spot || []).forEach(item => {
        allAchievements.push({
            type: 'first_camera_spottting',
            image: `/assets/${getCameraAsset(item.camera)}.webp`,
            title: `${item.camera}`,
            badge: '1st Report',
            value: '⚡',
            subtitle: 'spotting',
            gradient: 'from-blue-500/10 via-cyan-500/10 to-teal-500/10',
            border: 'border-blue-500/20 hover:border-blue-500/40',
            badgeColor: 'bg-blue-500/30 text-blue-300'
        });
    });

    (globalStats.first_country_spot || []).forEach(item => {
        allAchievements.push({
            type: 'first_country_spot',
            icon: getFlagEmoji ? getFlagEmoji(item.country) : item.country,
            title: countries?.[item.country] || item.country,
            badge: '1st Report of the Year',
            value: '⚡',
            subtitle: 'spotting',
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

    // Top update types
    (globalStats.top_update_type || []).forEach(item => {
        allAchievements.push({
            type: 'top_update_type',
            image: `/assets/${item.type}.webp`,
            title: '',
            badge: 'Top Rank',
            value: item.count,
            subtitle: 'reports',
            gradient: 'from-violet-500/10 via-purple-500/10 to-fuchsia-500/10',
            border: 'border-violet-500/20 hover:border-violet-500/40',
            badgeColor: 'bg-violet-500/30 text-violet-300'
        });
    });

    const pageSize = 8;

    useEffect(() => {
        setPage(0);
    }, [allAchievements.length]);

    const totalPages = Math.max(1, Math.ceil(allAchievements.length / pageSize));
    const handlePrev = () => setPage((prev) => Math.max(0, prev - 1));
    const handleNext = () => setPage((prev) => Math.min(totalPages - 1, prev + 1));
    const startIndex = page * pageSize;
    const displayedAchievements = allAchievements.slice(startIndex, startIndex + pageSize);
    const startDisplay = allAchievements.length ? startIndex + 1 : 0;
    const endDisplay = Math.min(startIndex + displayedAchievements.length, allAchievements.length);

    if (allAchievements.length === 0) return null;


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
                <button
                    type="button"
                    aria-label="Previous achievements"
                    onClick={handlePrev}
                    disabled={page === 0 || totalPages <= 1}
                    className="p-1.5 rounded-full bg-white/10 border border-yellow-500/30 text-white/80 hover:border-yellow-400/60 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                    <AiOutlineLeft className="text-white/90" size={18} />
                </button>
                <div className="inline-flex items-center gap-2">
                    <span className="text-lg sm:text-xl md:text-2xl">🏆</span>
                    <span className="text-white font-medium text-xs sm:text-sm md:text-base">
                        {startDisplay}-{endDisplay} of {allAchievements.length} Achievement{allAchievements.length !== 1 ? 's' : ''} Shown
                    </span>
                </div>
                <button
                    type="button"
                    aria-label="Next achievements"
                    onClick={handleNext}
                    disabled={page >= totalPages - 1 || totalPages <= 1}
                    className="p-1.5 rounded-full bg-white/10 border border-yellow-500/30 text-white/80 hover:border-yellow-400/60 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                    <AiOutlineRight className="text-white/90" size={18} />
                </button>
            </div>
        </div>
    );
};

export default GlobalFirstsSlide;
