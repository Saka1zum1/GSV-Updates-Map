import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const CollapsibleSection = ({ 
    title, 
    icon: Icon, 
    badge, 
    children, 
    defaultExpanded = false,
    className = ""
}) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
        <div className={`border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden ${className}`}>
            {/* Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800
                           transition-colors bg-white dark:bg-gray-900"
            >
                <div className="flex items-center space-x-3">
                    <Icon size={18} className="text-gray-600 dark:text-gray-400 flex-shrink-0" />
                    <span className="font-medium text-gray-800 dark:text-gray-200 truncate">{title}</span>
                    {badge && (
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 text-xs px-2 py-1 rounded-full flex-shrink-0">
                            {badge}
                        </span>
                    )}
                </div>
                <div className="flex-shrink-0">
                    {isExpanded ? 
                        <ChevronDown size={16} className="text-gray-600 dark:text-gray-400" /> : 
                        <ChevronRight size={16} className="text-gray-600 dark:text-gray-400" />
                    }
                </div>
            </button>
            
            {/* Content */}
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
                <div className="bg-gray-50 dark:bg-gray-800">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default CollapsibleSection;
