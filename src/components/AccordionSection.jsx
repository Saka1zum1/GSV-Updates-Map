import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Collapsible from './Collapsible.jsx';

const AccordionSection = ({ 
    title, 
    icon: Icon, 
    badge, 
    children, 
    isExpanded,
    onToggle,
    maxHeight = '300px',
    className = ""
}) => {
    return (
        <div className={`border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden ${className}`}>
            {/* Header */}
            <button
                onClick={onToggle}
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
            <Collapsible 
                isOpen={isExpanded}
                maxHeight={maxHeight}
                className="bg-gray-50 dark:bg-gray-800"
            >
                {children}
            </Collapsible>
        </div>
    );
};

export default AccordionSection;
