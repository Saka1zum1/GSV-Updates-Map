import React from 'react';

/**
 * Intro Slide - Opening of the year in review
 * Netease style: Full-screen, minimal text, emotional impact
 */
const IntroSlide = ({ report, user }) => {
    const year = report?.report_year || new Date().getFullYear();
    const userName = user?.username || report?.author_name || 'Explorer';

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            {/* Year badge */}
            <div className="mb-8 animate-fade-in">
                <span className="inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-sm font-medium tracking-widest">
                    YEAR IN REVIEW
                </span>
            </div>

            {/* Main title */}
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
                {year}
            </h1>

            {/* User greeting */}
            <div className="space-y-4">
                <p className="text-xl md:text-2xl text-white/80">
                    Hey, <span className="text-blue-400 font-semibold">@{userName}</span>
                </p>
                <p className="text-lg md:text-xl text-white/60 max-w-md">
                    Let's look back at your Street View journey this year...
                </p>
            </div>

            {/* Decorative element */}
            <div className="mt-12 flex items-center gap-2 text-white/40">
                <div className="w-8 h-px bg-white/40" />
                <span className="text-xs uppercase tracking-widest">Your Story Begins</span>
                <div className="w-8 h-px bg-white/40" />
            </div>
        </div>
    );
};

export default IntroSlide;
