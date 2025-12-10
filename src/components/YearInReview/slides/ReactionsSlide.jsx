import React from 'react';

/**
 * Reactions Slide - Community engagement and reactions received
 * Shows most reacted day and reaction statistics
 */
const ReactionsSlide = ({ report, getMonthName }) => {
    const reactions = report?.reactions;
    const mostReactedDay = report?.time?.most_reacted_day;
    const mostReactedCount = reactions?.top_msg_count;
    
    // New data fields
    const goldMessages = reactions?.gold || 0;
    const diamondMessages = reactions?.diamond || 0;
    const topMsgCount = reactions?.top_msg_count || 0;
    const fastestTime = reactions?.fastest_time || 0;

    // Parse most reacted date
    const formatDate = (dateStr) => {
        if (!dateStr) return null;
        const date = new Date(dateStr);
        const month = getMonthName(date.getMonth() + 1);
        const day = date.getDate();
        return { month, day, date };
    };

    const dateInfo = formatDate(mostReactedDay);

    // Format fastest time
    const formatFastestTime = (seconds) => {
        if (!seconds || seconds === 0) return null;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        if (minutes > 0) {
            return `${minutes}m ${remainingSeconds}s`;
        }
        return `${remainingSeconds}s`;
    };


    return (
        <div className="flex flex-col items-center justify-center w-full px-2 sm:px-4 md:px-6 lg:px-8 text-center py-3 sm:py-4 md:py-6 lg:py-8 overflow-y-auto">
            {/* Header */}
            <p className="text-white/60 text-md sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                Community engagement highlights
            </p>

            {/* Golden and Diamond messages */}
            {(goldMessages > 0 || diamondMessages > 0) && (
                <div className="mb-5 sm:mb-6 md:mb-8 lg:mb-10">
                    <p className="text-sm sm:text-xs md:text-sm lg:text-base text-white/50 uppercase tracking-wider mb-2 sm:mb-3 md:mb-4">
                        Viral achievements
                    </p>
                    <div className="flex flex-row gap-4 sm:gap-5 md:gap-6 justify-center flex-wrap">
                        {diamondMessages > 0 && (
                            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-md rounded-xl p-1 sm:p-1.5 md:p-2 border border-cyan-400/30">
                                <div className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2">💎</div>
                                <div className="text-lg sm:text-xl md:text-2xl font-bold text-cyan-300 mb-0.5 sm:mb-1">
                                    {diamondMessages}
                                </div>
                                <div className="text-xxs sm:text-xs md:text-sm text-white/70 leading-tight">
                                    diamond message{diamondMessages !== 1 ? 's' : ''}<br/>
                                    (40 reactions in 15 min)
                                </div>
                            </div>
                        )}
                        {goldMessages > 0 && (
                            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-xl p-2.5 sm:p-3 md:p-4 border border-yellow-400/30">
                                <div className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2">🥇</div>
                                <div className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-300 mb-0.5 sm:mb-1">
                                    {goldMessages}
                                </div>
                                <div className="text-xxs sm:text-xs md:text-sm text-white/70 leading-tight">
                                    golden message{goldMessages !== 1 ? 's' : ''}<br/>
                                    (40 reactions in 1 hour)
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Most reacted day and fastest time */}
            <div className="mb-5 sm:mb-6 md:mb-8 lg:mb-10">
                <div className="flex justify-center">
                    <div className="flex flex-row gap-4 sm:gap-5 md:gap-6 max-w-lg flex-wrap">
                        {/* Most reacted day */}
                        {dateInfo && mostReactedCount > 0 && (
                            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-xl p-2.5 sm:p-3 md:p-4 border border-white/10">
                                <div className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2">📅</div>
                                <div className="text-base sm:text-lg md:text-xl font-bold text-white mb-0.5 sm:mb-1">
                                    {dateInfo.month} {dateInfo.day}
                                </div>
                                <div className="text-xxs sm:text-xs md:text-sm text-white/60 leading-tight">
                                    most reacted day
                                </div>
                            </div>
                        )}

                        {/* Fastest time to 40 reactions */}
                        {fastestTime > 0 && (
                            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-xl p-2.5 sm:p-3 md:p-4 border border-white/10">
                                <div className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2">⚡</div>
                                <div className="text-base sm:text-lg md:text-xl font-bold text-white mb-0.5 sm:mb-1">
                                    {formatFastestTime(fastestTime)}
                                </div>
                                <div className="text-xxs sm:text-xs md:text-sm text-white/60 leading-tight">
                                    fastest to 40 reactions
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Top message highlight */}
            {topMsgCount > 0 && (
                <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                    <p className="text-xs sm:text-xs md:text-sm lg:text-base text-white/50 uppercase tracking-wider mb-2 sm:mb-3 md:mb-4">
                        Most popular message
                    </p>
                    <div className="flex justify-center">
                        <div className="relative inline-block">
                            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 border border-purple-400/30">
                                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                                    {(
                                        <img 
                                            src="https://cdn.discordapp.com/emojis/851305317950292001.webp" 
                                            alt="Star" 
                                            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 object-contain flex-shrink-0"
                                        />
                                    ) }
                                    <div className="text-left">
                                        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-0.5 sm:mb-1">
                                            {topMsgCount}
                                        </div>
                                        <div className="text-xs sm:text-sm md:text-base lg:text-lg text-white/70">
                                            reactions on one message
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-yellow-500/20 blur-2xl rounded-2xl -z-10" />
                        </div>
                    </div>
                </div>
            )}

            {/* Appreciation note */}
            <p className="text-white/40 text-xxs sm:text-xs md:text-sm max-w-sm leading-tight">
                Every reaction represents someone who appreciated your contribution to the community💙
            </p>
        </div>
    );
};

export default ReactionsSlide;
