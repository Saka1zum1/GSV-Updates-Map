import React from 'react';
import { FileText, Camera, Tag } from 'lucide-react';

/**
 * Content Statistics Slide
 * Shows update types or spot content based on report type
 * @param {Object} props - Component props
 * @param {Object} props.report - Annual report data
 */
const ContentStatsSlide = ({ report }) => {
    if (!report) return null;

    const { report_type, content_stats, spot_content_stats } = report;
    const isUpdateReport = report_type === 'update';

    if (isUpdateReport && !content_stats) return null;
    if (!isUpdateReport && !spot_content_stats) return null;

    // For updates
    if (isUpdateReport) {
        const { types_distribution, top_types, new_type_count, update_type_count } = content_stats;
        const typesData = Object.entries(types_distribution || {})
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);
        const maxValue = typesData.length > 0 ? typesData[0][1] : 1;

        return (
            <div className="flex flex-col h-full px-6 py-8 overflow-y-auto">
                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                        Update Types
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        What you contributed in {report.report_year}
                    </p>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="glass-effect rounded-lg p-4 text-center">
                        <FileText className="w-8 h-8 text-orange-500 dark:text-orange-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                            {update_type_count}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 uppercase">
                            Total Types
                        </div>
                    </div>

                    <div className="glass-effect rounded-lg p-4 text-center">
                        <Tag className="w-8 h-8 text-red-500 dark:text-red-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                            {new_type_count}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 uppercase">
                            New Types
                        </div>
                    </div>
                </div>

                {/* Types Distribution */}
                <div className="glass-effect rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                        Type Distribution
                    </h3>
                    <div className="space-y-2">
                        {typesData.map(([type, count]) => {
                            const percentage = (count / maxValue) * 100;
                            return (
                                <div key={type} className="flex items-center gap-3">
                                    <div className="w-32 text-sm text-gray-600 dark:text-gray-400 truncate">
                                        {type}
                                    </div>
                                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 relative overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-end px-2 transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        >
                                            {percentage > 20 && (
                                                <span className="text-xs font-semibold text-white">
                                                    {count}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {percentage <= 20 && (
                                        <div className="w-12 text-sm text-gray-600 dark:text-gray-400 text-right">
                                            {count}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    // For spots
    const { camera_distribution, source_distribution, top_cameras, pinpoint_count, pinpoint_rate } = spot_content_stats;
    const cameraData = Object.entries(camera_distribution || {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    const maxCameraValue = cameraData.length > 0 ? cameraData[0][1] : 1;

    return (
        <div className="flex flex-col h-full px-6 py-8 overflow-y-auto">
            {/* Header */}
            <div className="text-center mb-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Spot Details
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Your spotting patterns in {report.report_year}
                </p>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="glass-effect rounded-lg p-4 text-center">
                    <Camera className="w-8 h-8 text-cyan-500 dark:text-cyan-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                        {top_cameras?.length || 0}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 uppercase">
                        Camera Types
                    </div>
                </div>

                <div className="glass-effect rounded-lg p-4 text-center">
                    <Tag className="w-8 h-8 text-blue-500 dark:text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {pinpoint_rate?.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 uppercase">
                        Pinpoint Rate
                    </div>
                </div>
            </div>

            {/* Camera Distribution */}
            {cameraData.length > 0 && (
                <div className="glass-effect rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                        Camera Distribution
                    </h3>
                    <div className="space-y-2">
                        {cameraData.map(([camera, count]) => {
                            const percentage = (count / maxCameraValue) * 100;
                            return (
                                <div key={camera} className="flex items-center gap-3">
                                    <div className="w-32 text-sm text-gray-600 dark:text-gray-400 truncate">
                                        {camera}
                                    </div>
                                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 relative overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-end px-2 transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        >
                                            {percentage > 20 && (
                                                <span className="text-xs font-semibold text-white">
                                                    {count}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {percentage <= 20 && (
                                        <div className="w-12 text-sm text-gray-600 dark:text-gray-400 text-right">
                                            {count}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContentStatsSlide;
