import React, { useState, useEffect } from 'react';
import { Award, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Annual Report Button Component
 * Shows a button to access the year in review feature
 * Adapts to mobile and desktop screens
 */
const AnnualReportButton = ({ className = "" }) => {
    const navigate = useNavigate();
    const [showTooltip, setShowTooltip] = useState(false);

    const handleClick = () => {
        navigate('/report');
    };

    return (
        <>
            {/* Desktop Button */}
            <button
                onClick={handleClick}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className={`hidden lg:flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium
                    bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 
                    text-white shadow-md hover:shadow-lg transform hover:scale-105 border border-transparent
                    ${className}`}
                title="View Your 2024 Year in Review"
            >
                <Award size={20} />
                <span>2024 Year in Review</span>
            </button>

            {/* Mobile/Tablet Button - Icon only */}
            <button
                onClick={handleClick}
                className={`flex lg:hidden items-center justify-center w-8 h-8 rounded-lg transition-all duration-200
                    bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 
                    text-white shadow-md hover:shadow-lg
                    ${className}`}
                title="2024 Year in Review"
            >
                <Award size={18} />
            </button>

            {/* Tooltip for desktop */}
            {showTooltip && (
                <div className="hidden lg:block absolute top-full mt-2 left-1/2 transform -translate-x-1/2 
                    bg-gray-900 dark:bg-gray-700 text-white text-xs px-3 py-2 rounded-lg shadow-lg z-50 
                    whitespace-nowrap pointer-events-none">
                    View your personalized 2024 statistics
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 
                        border-4 border-transparent border-b-gray-900 dark:border-b-gray-700"></div>
                </div>
            )}
        </>
    );
};

export default AnnualReportButton;
