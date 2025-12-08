import React from 'react';

/**
 * Journey Start Slide - When the user started their journey
 */
const JourneyStartSlide = ({ report }) => {
    const streakStats = report?.streak_stats;
    const firstDate = streakStats?.first_activity_date;
    
    // Parse the first activity date
    const formatDate = (dateStr) => {
        if (!dateStr) return null;
        const date = new Date(dateStr);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
        return {
            month: months[date.getMonth()],
            day: date.getDate(),
            year: date.getFullYear()
        };
    };

    const dateInfo = formatDate(firstDate);
    const activeDays = streakStats?.active_days || 0;

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            {/* Context */}
            <p className="text-white/60 text-lg mb-8">
                This year, your journey began on
            </p>

            {/* Date highlight */}
            {dateInfo ? (
                <div className="mb-8">
                    <div className="text-5xl md:text-7xl font-bold text-white mb-2">
                        {dateInfo.month} {dateInfo.day}
                    </div>
                    <div className="text-2xl text-white/60">
                        {dateInfo.year}
                    </div>
                </div>
            ) : (
                <div className="text-4xl font-bold text-white mb-8">
                    A New Adventure
                </div>
            )}

            {/* Active days stat */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6 max-w-sm">
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                    {activeDays}
                </div>
                <div className="text-white/70">
                    days you dropped by to share discoveries
                </div>
            </div>

            {/* Emotional text */}
            <p className="mt-8 text-white/50 text-sm max-w-md">
                Every ping in the channel, every update you shared — it all adds up to something amazing.
            </p>
        </div>
    );
};

export default JourneyStartSlide;
