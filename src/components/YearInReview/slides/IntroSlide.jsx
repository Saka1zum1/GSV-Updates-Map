import React from 'react';

/**
 * Intro Slide - Opening of the year in review
 * Netease style: Full-screen, minimal text, emotional impact
 */
const IntroSlide = ({ report, user }) => {
    const year = report?.report_year || report?.year || new Date().getFullYear();
    const userName = user?.username || report?.author_name || 'Explorer';

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            {/* Year badge */}
            <div className="mb-6 md:mb-8 animate-fade-in">
                <span className="inline-block px-4 md:px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-xs md:text-sm font-medium tracking-widest">
                    YEAR IN REVIEW
                </span>
            </div>

            {/* Main title */}
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-4 md:mb-6 tracking-tight">
                {year}
            </h1>

            {/* User greeting */}
            <div className="space-y-3 md:space-y-4 px-4">
                <p className="text-lg md:text-xl lg:text-2xl text-white/80">
                    Hey, <span className="text-blue-400 font-semibold">@{userName}</span>
                </p>
                <p className="text-base md:text-lg lg:text-xl text-white/60 max-w-md">
                    Let's look back at your Street View journey this year...
                </p>
            </div>

            {/* Decorative element */}
            <div className="mt-8 md:mt-12 flex items-center gap-2 text-white/40">
                <div className="w-6 md:w-8 h-px bg-white/40" />
                <span className="text-xs uppercase tracking-widest whitespace-nowrap">Your Story Begins</span>
                <div className="w-6 md:w-8 h-px bg-white/40" />
            </div>
        </div>
    );
};

export default IntroSlide;
