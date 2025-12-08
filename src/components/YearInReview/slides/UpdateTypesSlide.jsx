import React from 'react';

/**
 * Update Types Slide - What kind of updates the user contributed
 * Uses actual update type images from assets
 */
const UpdateTypesSlide = ({ report }) => {
    const contentStats = report?.content_stats;
    const typesDistribution = contentStats?.types_distribution || {};
    const topTypes = contentStats?.top_types || [];

    // Sort types by count and get top 6
    const sortedTypes = Object.entries(typesDistribution)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6);

    const totalTypes = Object.keys(typesDistribution).length;
    const maxCount = sortedTypes.length > 0 ? sortedTypes[0][1] : 1;

    // Get display name for update type
    const getTypeName = (type) => {
        const names = {
            'newcountry': 'New Country',
            'newregion': 'New Region',
            'newarea': 'New Area',
            'newtown': 'New Town',
            'newstreet': 'New Street',
            'newroad': 'New Road',
            'newisland': 'New Island',
            'newyear': 'New Year Coverage',
            'gen1update': 'Gen 1 Update',
            'gen2update': 'Gen 2 Update',
            'gen3update': 'Gen 3 Update',
            'ariupdate': 'ARI Update',
            'newsmallcam': 'New Small Cam',
            'newtrekker': 'New Trekker',
            'newtripod': 'New Tripod',
            'newgen4': 'New Gen 4',
            'newbadcam': 'New Bad Cam',
            'smallcam': 'Small Cam',
            'gen4trekker': 'Gen 4 Trekker',
            'gen4': 'Gen 4',
            'gen3': 'Gen 3',
            'gen2': 'Gen 2',
            'gen1': 'Gen 1',
            'badcam': 'Bad Cam'
        };
        return names[type] || type;
    };

    // Get the #1 type
    const favoriteType = sortedTypes.length > 0 ? sortedTypes[0][0] : null;

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            {/* Header */}
            <p className="text-white/60 text-lg mb-4">
                Your signature style?
            </p>

            {/* Favorite type highlight */}
            {favoriteType && (
                <div className="mb-8">
                    <div className="relative inline-block mb-4">
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
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {getTypeName(favoriteType)}
                    </div>
                    <div className="text-white/60">
                        {sortedTypes[0][1].toLocaleString()} contributions
                    </div>
                </div>
            )}

            {/* Other top types grid */}
            {sortedTypes.length > 1 && (
                <div className="w-full max-w-md">
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-4">
                        Also loved
                    </p>
                    <div className="grid grid-cols-5 gap-2">
                        {sortedTypes.slice(1).map(([type, count]) => (
                            <div 
                                key={type}
                                className="bg-white/10 backdrop-blur-sm rounded-lg p-2 flex flex-col items-center"
                                title={`${getTypeName(type)}: ${count}`}
                            >
                                <img 
                                    src={`/assets/${type}.webp`}
                                    alt={type}
                                    className="w-8 h-8 md:w-10 md:h-10 object-contain mb-1"
                                    onError={(e) => {
                                        e.target.src = '/assets/gen4.webp';
                                    }}
                                />
                                <span className="text-white/70 text-xs">{count}</span>
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
