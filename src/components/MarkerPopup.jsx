import { Calendar, MapPin, User, Camera, Mountain, Shapes, Clock, Waves, Radar, Hourglass } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getFlagEmoji } from '../utils/constants';

const MarkerPopup = ({ item }) => {
    const { id, author, types, camera, report_time, spot_date, year, month, panoId, country, region, altitude, pinpoint } = item;
    const [imageLoaded, setImageLoaded] = useState(false);
    const [shouldLoadImage, setShouldLoadImage] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Handle types for both update_reports and spots data
    let typesList = [];
    if (types) typesList = JSON.parse(types);

    const localTime = report_time ? new Date(Number(report_time) * 1000).toLocaleString() : '';
    const panoDate = year && month ? new Date(year, month - 1).toLocaleString('en-US', { month: 'short', year: 'numeric' }) : '';

    // Use different image sources based on data type
    const imgUrl = spot_date ?
        `https://cdn.whereisthegooglecar.com/images/${id}.webp` :
        `https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=${panoId}&cb_client=maps_sv.tactile.gps&w=1024&h=768&yaw=0&pitch=0&thumbfov=100`;

    // Auto-load image after a short delay when popup is rendered
    useEffect(() => {
        const timer = setTimeout(() => {
            setShouldLoadImage(true);
        }, 300); // Delay image loading by 300ms to allow popup to render first

        return () => clearTimeout(timer);
    }, []);

    // Load image immediately when user hovers over image area
    const handleImageLoad = () => {
        if (!shouldLoadImage) {
            setShouldLoadImage(true);
        }
    };

    const handleImageError = () => {
        setImageError(true);
    };

    const handleImageLoadSuccess = () => {
        setImageLoaded(true);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden w-60">
            {/* Header Image */}
            <div 
                className="relative h-32 bg-gray-200 dark:bg-gray-700 cursor-pointer"
                onMouseEnter={handleImageLoad}
                onClick={handleImageLoad}
            >
                {shouldLoadImage && !imageError ? (
                    <img
                        src={imgUrl}
                        alt="Street View"
                        className="w-full h-full object-cover transition-opacity duration-300"
                        onLoad={handleImageLoadSuccess}
                        onError={handleImageError}
                        style={{ opacity: imageLoaded ? 1 : 0.7 }}
                    />
                ) : (
                    <div className="w-full h-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                        <div className="text-center">
                            <Hourglass className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                            {imageError ? (
                                <span className="text-xs text-gray-500">Image unavailable</span>
                            ) : (
                                <span className="text-xs text-gray-500">
                                    Loading...
                                </span>
                            )}
                        </div>
                    </div>
                )}
                
                {/* Fallback placeholder for image errors - hidden by default */}
                <div className="hidden w-full h-full bg-gray-300 dark:bg-gray-600 items-center justify-center">
                    <MapPin className="w-8 h-8 text-gray-500" />
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                {/* Update Types */}
                {typesList.length > 0 && (
                    <div>
                        <div className="flex items-center flex-wrap gap-3">
                            <Shapes className="w-4 h-4 text-gray-500" />
                            {typesList.map((type, index) => (
                                <div key={index} className="flex items-center rounded-full py-1">
                                    <img
                                        src={`/assets/${type.toLowerCase()}.webp`}
                                        alt={type}
                                        className="w-4 h-4"
                                        onError={(e) => {
                                            // Prevent infinite loop - only try once with original case
                                            if (!e.target.hasAttribute('data-fallback-tried')) {
                                                e.target.setAttribute('data-fallback-tried', 'true');
                                                e.target.src = `/assets/${type}.webp`;
                                            } else {
                                                // If both attempts fail, hide the image
                                                e.target.style.display = 'none';
                                            }
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Camera Type */}
                {camera && (
                    <div className="flex items-center space-x-3">
                        <Camera className="w-4 h-4 text-gray-500" />
                        <div className="flex items-center space-x-2">
                            <img
                                src={`/assets/${camera.toLowerCase()}.webp`}
                                alt={camera}
                                className="w-5 h-5"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* Coverage Date (only for non-spot data) */}
                {panoDate && !spot_date && (
                    <div className="flex items-center space-x-3">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{panoDate}</span>
                    </div>
                )}

                {/* Spotting Date (only for spot data) */}
                {spot_date && (
                    <div className="flex items-center space-x-3">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{spot_date}</span>
                    </div>
                )}

                {/* Region */}
                {region && (
                    <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300 font-flags">{region} {getFlagEmoji(country)}</span>
                    </div>
                )}

                {/* Elevation */}
                {altitude && (
                    <div className="flex items-center space-x-3">
                        {altitude > 0 ? <Mountain className="w-4 h-4 text-gray-500" /> : <Waves className="w-4 h-4 text-gray-500 rotate-180" />}
                        <span className="text-sm text-gray-600 dark:text-gray-300">{altitude}m</span>
                    </div>
                )}

                {/* Author */}
                {author && (
                    <div className="flex items-center space-x-3">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{author}</span>
                    </div>
                )}

                {pinpoint && (
                    <div className="flex items-center space-x-3">
                        <Radar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{pinpoint}</span>
                    </div>
                )}

                {/* Report Time */}
                {localTime && (
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600 pt-2">
                        <Clock className="w-4 h-4 text-gray-500" /> {localTime}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MarkerPopup;
