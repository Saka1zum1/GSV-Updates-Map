import React from 'react';

/**
 * Busiest Day Slide - Highlight the most productive day
 * Shows busiest_day, busiest_day_count, and most_reacted_day
 */
const BusiestDaySlide = ({ report }) => {
    const time = report?.time;
    const busiestDay = time?.busiest_day; // "2025-10-13"
    const busiestDayCount = time?.busiest_day_count || 0; // 71
    const mostReactedDay = time?.most_reacted_day; // "2025-10-10"

    // Format date to readable string
    const formatDate = (dateStr) => {
        if (!dateStr) return 'Unknown';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            {/* Header */}
            <p className="text-white/60 text-base md:text-lg mb-6 md:mb-8">
                Your Most Productive Day 🔥
            </p>

            {/* Date display with giant count */}
            <div className="mb-4 md:mb-6">
                <div className="text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-3 md:mb-4">
                    {busiestDayCount}
                </div>
                <p className="text-white/90 text-base md:text-xl mb-2">
                    contributions in a single day!
                </p>
                <div className="inline-block px-4 md:px-6 py-2 md:py-3 bg-white/10 backdrop-blur-sm rounded-full">
                    <p className="text-white/80 text-sm md:text-lg font-medium">
                        📅 {formatDate(busiestDay)}
                    </p>
                </div>
            </div>

            {/* Additional context */}
            <div className="mt-6 md:mt-8 max-w-md px-4">
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/10">
                    <p className="text-white/70 text-xs md:text-sm mb-2">
                        That's an average of
                    </p>
                    <p className="text-white text-2xl md:text-3xl font-bold mb-2">
                        {(busiestDayCount / 24).toFixed(2)}
                    </p>
                    <p className="text-white/70 text-xs md:text-sm">
                        contributions per hour! 🚀
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BusiestDaySlide;
