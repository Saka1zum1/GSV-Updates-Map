import { Calendar, MapPin, User, Camera, Mountain, Shapes, Clock } from 'lucide-react';

const MarkerPopup = ({ item }) => {
    const { author, types, report_time, year, month, panoId, region, altitude, camera, spot_date } = item;

    let typesList = [];
    if (typeof types === 'string') {
        try {
            typesList = JSON.parse(types);
            if (!Array.isArray(typesList)) {
                typesList = types.split(',').map(t => t.trim()).filter(Boolean);
            }
        } catch {
            typesList = types.split(',').map(t => t.trim()).filter(Boolean);
        }
    } else if (Array.isArray(types)) {
        typesList = types;
    }

    const localTime = report_time ? new Date(Number(report_time) * 1000).toLocaleString() : '';
    const panoDate = year && month ? new Date(year, month - 1).toLocaleString('en-US', { month: 'short', year: 'numeric' }) : '';
    const imgUrl = `https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=${panoId}&cb_client=maps_sv.tactile.gps&w=1024&h=768&yaw=0&pitch=0&thumbfov=100`;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden w-60">
            {/* Header Image */}
            <div className="relative h-32 bg-gray-200 dark:bg-gray-700">
                <img
                    src={imgUrl}
                    alt="Street View"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                    }}
                />
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
                                        src={`/assets/${type}.webp`}
                                        alt={type}
                                        className="w-4 h-4"
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
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">{camera}</span>
                        </div>
                    </div>
                )}

                {/* Coverage Date */}
                {panoDate && (
                    <div className="flex items-center space-x-3">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{panoDate}</span>
                    </div>
                )}

                {/* Spotting Date */}
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
                        <span className="text-sm text-gray-600 dark:text-gray-300">{region}</span>
                    </div>
                )}

                {/* Elevation */}
                {altitude && (
                    <div className="flex items-center space-x-3">
                        <Mountain className="w-4 h-4 text-gray-500" />
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
