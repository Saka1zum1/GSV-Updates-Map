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
    const favoriteTypeData = topTypes.length > 0 ? topTypes[0] : null;
    const favoriteType = favoriteTypeData?.type;

    const getRankMedal = (rank) => {
        const medals = { 1: '🏆', 2: '🥈', 3: '🥉' };
        return medals[rank] || `#${rank}`;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            {/* Header */}
            <p className="text-white/60 text-lg mb-4">
                Your signature style?
            </p>

            {/* Favorite type highlight */}
            {favoriteType && favoriteTypeData && (
                <div className="mb-8">
                    <div className="relative inline-block mb-4">
                        <div className="absolute -top-3 -right-3 text-2xl md:text-3xl">{getRankMedal(favoriteTypeData.rank)}</div>
                        <img 
                            src={`/assets/${favoriteType}.webp`}
                            alt={favoriteType}
                            className="w-24 h-24 md:w-32 md:h-32 object-contain"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
                    </div>
                    <div className="text-white/60">
                        {favoriteTypeData.count.toLocaleString()} reports
                    </div>
                </div>
            )}

            {/* Other top types grid */}
            {topTypes.length > 1 && (
                <div className="w-full max-w-2xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {topTypes.map(({ type, count, rank }) => (
                            <div 
                                key={type}
                                className="relative bg-white/10 backdrop-blur-sm rounded-lg p-3 flex flex-col items-center"
                            >
                                <div className="absolute top-0 right-1 text-white/80 text-xs md:text-sm bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">{getRankMedal(rank)}</div>
                                <img 
                                    src={`/assets/${type}.webp`}
                                    alt={type}
                                    className="w-10 h-10 md:w-12 md:h-12 object-contain mb-2"
                                    onError={(e) => {
                                        e.target.src = '/assets/gen4.webp';
                                    }}
                                />
                                <span className="text-white font-medium text-xs md:text-sm">{count}</span>
                                <span className="text-xxs text-white/40">
                                    reports
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Total types stat */}
            <div className="mt-8 text-white/50 text-sm">
                <span className="text-white font-medium">{totalTypes}</span> different update types mastered
            </div>
        </div>
    );
};

export default UpdateTypesSlide;
