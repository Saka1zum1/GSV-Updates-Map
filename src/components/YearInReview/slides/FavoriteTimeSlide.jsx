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

    // Get time period description
    const getTimePeriod = (hour) => {
        if (hour === undefined || hour === null) return { period: 'Unknown', emoji: '⏰' };
        if (hour >= 5 && hour < 12) return { period: 'Morning', emoji: '🌅', desc: 'Early bird catches the coverage!' };
        if (hour >= 12 && hour < 17) return { period: 'Afternoon', emoji: '☀️', desc: 'Peak productivity hours!' };
        if (hour >= 17 && hour < 21) return { period: 'Evening', emoji: '🌆', desc: 'After-work explorer!' };
        return { period: 'Night Owl', emoji: '🦉', desc: 'Burning the midnight oil for coverage!' };
    };

    // Format hour to 12-hour format (input is 0-23)
    const formatHour = (hour) => {
        if (hour === undefined || hour === null) return '--';

        return `${hour}:00`;
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
                Your timezone says a lot about when you spot coverage changes around the world 🌍
            </p>
        </div>
    );
};

export default FavoriteTimeSlide;
