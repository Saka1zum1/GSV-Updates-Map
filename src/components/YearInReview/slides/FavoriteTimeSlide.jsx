import React from 'react';

/**
 * Favorite Time Slide - When the user is most active
 * Shows peak hour, day, and month with personality
 */
const FavoriteTimeSlide = ({ report, getWeekdayName, getMonthName }) => {
    const time = report?.time;
    const peakHour = time?.peak_hour;
    const peakWeekday = time?.peak_weekday;
    const peakMonth = time?.peak_month;

    // Get time period description (UTC -> local hour)
    const getTimePeriod = (utcHour) => {
        if (utcHour === undefined || utcHour === null) return { period: 'Unknown', emoji: '⏰' };

        // Convert UTC hour to local hour (handle fractional offsets)
        const timezoneOffsetHours = -new Date().getTimezoneOffset() / 60;
        const localHourRaw = (utcHour + timezoneOffsetHours) % 24;
        const localHour = Math.floor(localHourRaw < 0 ? localHourRaw + 24 : localHourRaw);

        if (localHour >= 5 && localHour < 12) return { period: 'Morning', emoji: '🌅', desc: 'Early bird catches the coverage!' };
        if (localHour >= 12 && localHour < 17) return { period: 'Afternoon', emoji: '☀️', desc: 'Peak productivity hours!' };
        if (localHour >= 17 && localHour < 21) return { period: 'Evening', emoji: '🌆', desc: 'After-work explorer!' };
        return { period: 'Night Owl', emoji: '🦉', desc: 'Burning the midnight oil for coverage!' };
    };

    // Format hour to 12-hour format and convert UTC to local time
    const formatHour = (utcHour) => {
        if (utcHour === undefined || utcHour === null) return '--';

        // Convert UTC hour to local hour (handle fractional offsets)
        const timezoneOffsetHours = -new Date().getTimezoneOffset() / 60;
        const localHourRaw = (utcHour + timezoneOffsetHours) % 24;
        const localHour = Math.floor(localHourRaw < 0 ? localHourRaw + 24 : localHourRaw);

        return `${localHour}:00`;
    };

    const timeInfo = getTimePeriod(peakHour);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            {/* Header */}
            <p className="text-white/60 text-lg mb-8">
                You're definitely a...
            </p>

            {/* Main time personality */}
            <div className="mb-8">
                <div className="text-6xl mb-4">{timeInfo.emoji}</div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {timeInfo.period}
                </div>
                <div className="text-white/50 text-sm max-w-sm">
                    {timeInfo.desc}
                </div>
            </div>

            {/* Peak stats grid */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 w-full max-w-md px-4">
                {/* Peak Hour */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 md:p-4">
                    <div className="text-lg md:text-2xl font-bold text-blue-400 mb-1">
                        {formatHour(peakHour)}
                    </div>
                    <div className="text-xs text-white/50">
                        favorite hour
                    </div>
                </div>

                {/* Peak Day */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 md:p-4">
                    <div className="text-lg md:text-2xl font-bold text-purple-400 mb-1">
                        {getWeekdayName(peakWeekday)?.slice(0, 3) || '--'}
                    </div>
                    <div className="text-xs text-white/50">
                        busiest day
                    </div>
                </div>

                {/* Peak Month */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 md:p-4">
                    <div className="text-lg md:text-2xl font-bold text-pink-400 mb-1">
                        {getMonthName(peakMonth)?.slice(0, 3) || '--'}
                    </div>
                    <div className="text-xs text-white/50">
                        most active
                    </div>
                </div>
            </div>

            {/* Fun fact */}
            <p className="mt-8 text-white/40 text-xs max-w-sm">
              Your activity patterns reveal when you're most active! 🌍
            </p>
        </div>
    );
};

export default FavoriteTimeSlide;
