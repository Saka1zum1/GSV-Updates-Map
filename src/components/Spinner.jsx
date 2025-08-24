import React from 'react';

const Spinner = ({ 
    size = 'medium', 
    color = 'blue', 
    className = '',
    showText = false,
    text = 'Loading...'
}) => {
    const sizeClasses = {
        small: 'w-6 h-6 border-2',
        medium: 'w-12 h-12 border-4',
        large: 'w-16 h-16 border-4'
    };

    const colorClasses = {
        blue: 'border-gray-300 dark:border-gray-600 border-t-blue-500 dark:border-t-blue-400',
        green: 'border-gray-300 dark:border-gray-600 border-t-green-500 dark:border-t-green-400',
        red: 'border-gray-300 dark:border-gray-600 border-t-red-500 dark:border-t-red-400',
        purple: 'border-gray-300 dark:border-gray-600 border-t-purple-500 dark:border-t-purple-400',
        orange: 'border-gray-300 dark:border-gray-600 border-t-orange-500 dark:border-t-orange-400'
    };

    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <div 
                className={`
                    ${sizeClasses[size]} 
                    ${colorClasses[color]} 
                    rounded-full 
                    animate-spin
                `}
            ></div>
            {showText && (
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 animate-pulse">
                    {text}
                </div>
            )}
        </div>
    );
};

// 全屏加载组件
export const FullScreenSpinner = ({ 
    title = 'Loading...', 
    subtitle = null,
    color = 'blue'
}) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <Spinner size="large" color={color} />
            <div className="text-xl text-gray-600 dark:text-gray-300 animate-pulse mt-4">
                {title}
            </div>
            {subtitle && (
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {subtitle}
                </div>
            )}
        </div>
    );
};

// 内联加载组件
export const InlineSpinner = ({ 
    text = 'Loading...', 
    size = 'small',
    color = 'blue'
}) => {
    return (
        <div className="flex items-center space-x-2">
            <Spinner size={size} color={color} />
            <span className="text-gray-600 dark:text-gray-300">{text}</span>
        </div>
    );
};

export default Spinner;
