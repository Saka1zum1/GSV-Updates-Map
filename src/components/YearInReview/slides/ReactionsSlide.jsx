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
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            {/* Header */}
            <p className="text-white/60 text-base md:text-lg mb-4">
                Community engagement highlights
            </p>

            {/* Golden and Diamond messages */}
            {(goldMessages > 0 || diamondMessages > 0) && (
                <div className="mb-8 md:mb-10">
                    <p className="text-sm md:text-base text-white/50 uppercase tracking-wider mb-4">
                        Viral achievements
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {diamondMessages > 0 && (
                            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-md rounded-xl p-4 border border-cyan-400/30">
                                <div className="text-2xl mb-2">💎</div>
                                <div className="text-xl md:text-2xl font-bold text-cyan-300 mb-1">
                                    {diamondMessages}
                                </div>
                                <div className="text-xs text-white/70">
                                    diamond message{diamondMessages !== 1 ? 's' : ''}<br/>
                                    (40 reactions in 15 min)
                                </div>
                            </div>
                        )}
                        {goldMessages > 0 && (
                            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-xl p-4 border border-yellow-400/30">
                                <div className="text-2xl mb-2">🥇</div>
                                <div className="text-xl md:text-2xl font-bold text-yellow-300 mb-1">
                                    {goldMessages}
                                </div>
                                <div className="text-xs text-white/70">
                                    golden message{goldMessages !== 1 ? 's' : ''}<br/>
                                    (40 reactions in 1 hour)
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Most reacted day and fastest time */}
            <div className="mt-4 md:mt-8 mb-8 md:mb-10">
                <div className="flex justify-center">
                    <div className="flex sm:grid-cols-2 gap-4 max-w-lg">
                        {/* Most reacted day */}
                        {dateInfo && mostReactedCount > 0 && (
                            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
                                <div className="text-2xl mb-2">📅</div>
                                <div className="text-lg md:text-xl font-bold text-white mb-1">
                                    {dateInfo.month} {dateInfo.day}
                                </div>
                                <div className="text-xs text-white/60">
                                    most reacted day<br/>
                                </div>
                            </div>
                        )}

                        {/* Fastest time to 40 reactions */}
                        {fastestTime > 0 && (
                            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
                                <div className="text-2xl mb-2">⚡</div>
                                <div className="text-lg md:text-xl font-bold text-white mb-1">
                                    {formatFastestTime(fastestTime)}
                                </div>
                                <div className="text-xs text-white/60">
                                    fastest to 40 reactions
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Top message highlight */}
            {topMsgCount > 0 && (
                <div className="mb-8 md:mb-10">
                    <p className="text-sm md:text-base text-white/50 uppercase tracking-wider mb-4">
                        Most popular message
                    </p>
                    <div className="flex justify-center">
                        <div className="relative inline-block">
                            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-purple-400/30">
                                <div className="flex items-center gap-4 md:gap-6">
                                    {(
                                        <img 
                                            src="https://cdn.discordapp.com/emojis/851305317950292001.webp" 
                                            alt="Star" 
                                            className="w-12 h-12 md:w-16 md:h-16 object-contain"
                                        />
                                    ) }
                                    <div className="text-left">
                                        <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                                            {topMsgCount}
                                        </div>
                                        <div className="text-base md:text-lg text-white/70">
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
            <p className="mt-8 md:mt-10 text-white/40 text-xs md:text-sm max-w-md">
                Every reaction represents someone who appreciated your contribution to the community💙
            </p>
        </div>
    );
};

export default ReactionsSlide;
