import React from 'react';

/**
 * Update Types Slide - What kind of updates the user contributed
 * Uses actual update type images from assets
 */
const UpdateTypesSlide = ({ report }) => {
    const updates = report?.updates;
    const typesObj = updates?.types || {};
    const topTypes = updates?.top_types || [];

    const totalTypes = Object.keys(typesObj).length;

    // Get the #1 type from top_types
    const topTypesData = topTypes.length > 0 ? topTypes[0] : null;
    const favoriteType = topTypesData?.type;

    const getRankMedal = (rank) => {
        const medals = { 1: '🏆', 2: '🥈', 3: '🥉' };
        return medals[rank] || `#${rank}`;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full px-2 sm:px-4 md:px-6 lg:px-8 text-center py-3 sm:py-4 md:py-6 lg:py-8">
            {/* Header */}
            <p className="text-white/60 text-sm sm:text-base md:text-lg lg:text-xl mb-2 sm:mb-3 md:mb-4 lg:mb-5">
                Your signature style?
            </p>

            {/* Favorite type highlight */}
            {favoriteType && topTypesData && (
                <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                    <div className="relative inline-block mb-2 sm:mb-2.5 md:mb-3 lg:mb-3">
                        {topTypesData.rank < 4 && <div className="absolute -top-1 sm:-top-1.5 -right-1 sm:-right-1.5 text-sm sm:text-sm md:text-lg lg:text-xl">{getRankMedal(topTypesData.rank)}</div>}
                        <img
                            src={`/assets/${favoriteType}.webp`}
                            alt={favoriteType}
                            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
                    </div>
                    <div className="text-white/60 text-xxs sm:text-xs md:text-sm">
                        {topTypesData.count.toLocaleString()} reports
                    </div>
                </div>
            )}

            {/* Other top types grid */}
            {topTypes.length > 1 && (
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-3xl">
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3">
                        {topTypes.map(({ type, count, rank }) => (
                            <div
                                key={type}
                                className="relative bg-white/10 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 md:p-2.5 lg:p-4 flex flex-col items-center justify-center"
                            >
                                <div className="absolute top-0 right-1 text-white/80 text-xs sm:text-sm md:text-sm bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">{getRankMedal(rank)}</div>
                                <img
                                    src={`/assets/${type}.webp`}
                                    alt={type}
                                    className="w-5 h-5 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 object-contain mb-0.5 sm:mb-1 md:mb-1"
                                    onError={(e) => {
                                        e.target.src = '/assets/gen4.webp';
                                    }}
                                />
                                <span className="text-white font-medium text-xxs sm:text-xs md:text-xs">{count}</span>
                                <span className="text-xxs text-white/40 leading-tight">
                                    reports
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Total types stat */}
            <div className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 text-white/50 text-xxs sm:text-xs md:text-sm">
                <span className="text-white font-medium">{totalTypes}</span> different update types mastered
            </div>
        </div>
    );
};

export default UpdateTypesSlide;
