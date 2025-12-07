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
    const currentYear = new Date().getFullYear();

    const handleClick = () => {
        navigate('/report');
    };

    return (
        <>
            {/* Desktop Button */}
            <button
                onClick={handleClick}
                className={`hidden lg:flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium
                    bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 
                    text-white shadow-md hover:shadow-lg transform hover:scale-105 border border-transparent
                    ${className}`}
                title={`View Your ${currentYear} Year in Review`}
            >
                <Award size={20} />
                <span>{currentYear} Year in Review</span>
            </button>

            {/* Mobile/Tablet Button - Icon only */}
            <button
                onClick={handleClick}
                className={`flex lg:hidden items-center justify-center w-8 h-8 rounded-lg transition-all duration-200
                    bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 
                    text-white shadow-md hover:shadow-lg
                    ${className}`}
                title={`${currentYear} Year in Review`}
            >
                <Award size={18} />
            </button>
        </>
    );
};

export default AnnualReportButton;
