import React, { useCallback } from 'react';
import { X, AlertCircle } from 'lucide-react';

/**
 * Report Confirmation Modal
 * Asks user permission to generate annual report using their Discord account
 * Consistent with Year in Review modal styling
 */
const ReportConfirmationModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    isLoading = false,
    userName = 'Contributor'
}) => {
    const handleConfirm = useCallback(() => {
        onConfirm();
    }, [onConfirm]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 backdrop-blur-md">
            <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-2xl p-8 max-w-md mx-4 shadow-2xl border border-white/10">
                {/* Close button */}
                <button
                    onClick={onClose}
                    disabled={isLoading}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all disabled:opacity-50"
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                    <div className="text-4xl">📊</div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-white mb-1">
                            Create Your 2025 Wrapped
                        </h2>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-4 mb-8">
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                        <p className="text-white/80 text-sm leading-relaxed">
                            We'll use your Discord account information to generate a personalized annual report based on your contributions in VirtualStreets.
                        </p>
                    </div>

                    <div className="flex items-start gap-3">
                        <AlertCircle size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
                        <p className="text-white/70 text-sm">
                            <strong>User:</strong> @{userName}
                        </p>
                    </div>

                    <p className="text-white/60 text-xs">
                        Your privacy is important. We only use your Discord ID to fetch your contribution data.
                    </p>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-all disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={isLoading}
                        className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Generating...</span>
                            </>
                        ) : (
                            <>
                                <span>✨ Generate Report</span>
                            </>
                        )}
                    </button>
                </div>

                <p className="text-white/40 text-xs text-center mt-4">
                    This will take a few moments to process
                </p>
            </div>
        </div>
    );
};

export default ReportConfirmationModal;
