import React, { useState, useEffect } from 'react';
import DiscordLogin from '../components/Auth/DiscordLogin.jsx';
import StoryModal from '../components/YearInReview/StoryModal.jsx';
import LowDataMessage from '../components/YearInReview/LowDataMessage.jsx';
import { FullScreenSpinner } from '../components/Spinner.jsx';
import {
    parseAccessTokenFromHash,
    clearAccessTokenFromUrl,
    fetchDiscordUser,
    loadAnnualReportData,
    findUserReport,
    hasSufficientData
} from '../utils/discordAuth.js';
import { MIN_DATA_THRESHOLD } from '../types/annualReport.js';

/**
 * Annual Report Page Component
 * Handles authentication, data loading, and display logic
 */
const AnnualReportPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [userReport, setUserReport] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const initAuth = async () => {
            try {
                setLoading(true);
                setError(null);

                // Check for access token in URL hash
                const token = parseAccessTokenFromHash();

                if (token) {
                    // Clear token from URL
                    clearAccessTokenFromUrl();
                    setAccessToken(token);

                    // Fetch user information from Discord
                    const discordUser = await fetchDiscordUser(token);
                    setUser(discordUser);

                    // Load annual report data
                    const reports = await loadAnnualReportData(2024);

                    // Find user's report
                    const report = findUserReport(reports, discordUser.id);

                    if (report) {
                        setUserReport(report);

                        // Check if user has sufficient data
                        if (hasSufficientData(report, MIN_DATA_THRESHOLD)) {
                            setShowModal(true);
                        }
                    }
                }
            } catch (err) {
                console.error('Authentication or data loading error:', err);
                setError(err.message || 'Failed to load your annual report');
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    // Handle modal close
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Loading state
    if (loading) {
        return (
            <FullScreenSpinner
                title="Loading Your Year in Review..."
                subtitle="Please wait while we fetch your data"
                color="blue"
            />
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100 dark:bg-gray-900">
                <div className="glass-effect rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
                    <div className="text-red-500 dark:text-red-400 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                        Oops! Something went wrong
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {error}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Not logged in - show login page
    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <DiscordLogin />
            </div>
        );
    }

    // Logged in but no report or insufficient data
    if (!userReport || !hasSufficientData(userReport, MIN_DATA_THRESHOLD)) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <LowDataMessage
                    userName={user.username || user.global_name || 'Explorer'}
                    dataCount={userReport?.total_count || 0}
                    year={2024}
                />
            </div>
        );
    }

    // Show full report in modal
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
            {showModal ? (
                <StoryModal report={userReport} onClose={handleCloseModal} />
            ) : (
                <div className="glass-effect rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
                    <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Welcome back, @{user.username}!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Ready to see your {userReport.report_year} year in review?
                    </p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
                    >
                        View My Report
                    </button>
                </div>
            )}
        </div>
    );
};

export default AnnualReportPage;
