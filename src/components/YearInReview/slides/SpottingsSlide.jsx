import React from 'react';

/**
 * Spottings Slide - Camera spottings the user contributed
 * Uses actual camera images from assets
 */
const SpottingsSlide = ({ report }) => {
    const spots = report?.spots;
    const camerasObj = spots?.cameras || {};
    const topCameras = spots?.top_cameras || [];
    const totalSpottings = spots?.count || 0;
    const spottingsRank = spots?.rank;
    const percentile = spots?.percentile;

    const totalCameraTypes = Object.keys(camerasObj).length;

    // Get the #1 camera from top_cameras
    const topCameraData = topCameras.length > 0 ? topCameras[0] : null;
    const favoriteCamera = topCameraData?.camera;

    const getRankMedal = (rank) => {
        const medals = { 1: '🏆', 2: '🥈', 3: '🥉' };
        return medals[rank] || `#${rank}`;
    };

    // Map camera names to asset file names
    const getCameraAsset = (camera) => {
        const assetMap = {
            'Gen4': 'gen4',
            'Gen4Trekker': 'gen4trekker',
            'SmallCam': 'smallcam',
            'BadCam': 'badcam',
            'Gen1': 'gen1',
            'Gen2': 'gen2',
            'Gen3': 'gen3'
        };
        return assetMap[camera] || 'gen4';
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] w-full px-2 sm:px-4 md:px-6 lg:px-8 text-center py-4 sm:py-5 md:py-6 lg:py-8">
            {/* Header */}
            <p className="text-white/60 text-base sm:text-lg md:text-xl lg:text-2xl mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                Your Google Car spottings contributions
            </p>

            {/* Rank badge */}
            {spottingsRank && (
                <div className="mb-2 sm:mb-3 md:mb-4">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5">
                        <span className="text-white font-medium text-xs sm:text-sm md:text-base">
                            {getRankMedal(spottingsRank)} in community
                        </span>
                        {percentile && (
                            <span className="text-white/60 text-xs sm:text-sm">
                                (Top {(100 - percentile).toFixed(0)}%)
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Total spottings */}
            <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-1 sm:mb-2">
                    {totalSpottings}
                </div>
                <div className="text-white/60 text-xs sm:text-sm md:text-base">
                    camera spottings
                </div>
            </div>

            {/* Favorite camera highlight */}
            {favoriteCamera && topCameraData && (
                <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                    <div className="relative inline-block mb-2 sm:mb-2.5 md:mb-3 lg:mb-3">
                        <img
                            src={`/assets/${getCameraAsset(favoriteCamera)}.webp`}
                            alt={favoriteCamera}
                            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full" />
                    </div>
                    <div className="text-white/60 text-xxs sm:text-xs md:text-sm">
                        {topCameraData.count} {favoriteCamera} {topCameraData.count === 1 ? 'spotting' : 'spottings'}
                    </div>
                </div>
            )}

            {/* Other top cameras grid */}
            {topCameras.length > 1 && (
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-3xl">
                    <div className="flex gap-3 items-center justify-center flex-wrap">
                        {topCameras.map(({ camera, count, rank }) => (
                            <div
                                key={camera}
                                className="relative bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col items-center justify-center"
                            >
                                <img
                                    src={`/assets/${getCameraAsset(camera)}.webp`}
                                    alt={camera}
                                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-16 md:h-16 lg:w-16 lg:h-16 object-contain mb-0.5 sm:mb-1 md:mb-1"
                                    onError={(e) => {
                                        e.target.src = '/assets/gen4.webp';
                                    }}
                                />
                                <span className="text-white font-medium text-xxs sm:text-xs md:text-xs">{count}</span>
                                <span className="text-xxs text-white/40 leading-tight">
                                    {count === 1 ? 'spotting' : 'spottings'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Total camera types stat */}
            <div className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 text-white/50 text-xs sm:text-md md:text-base">
                <span className="text-white font-medium">{totalCameraTypes}</span> {totalCameraTypes == 1 ? 'camera type collected' : 'different camera types collected'}
            </div>
        </div>
    );
};

export default SpottingsSlide;
