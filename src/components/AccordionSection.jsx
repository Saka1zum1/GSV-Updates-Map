import React from 'react';
import { ChevronDown, ChevronRight, RotateCcw } from 'lucide-react';
import Collapsible from './Collapsible.jsx';

const AccordionSection = ({
    title,
    icon: Icon,
    badge,
    children,
    isExpanded,
    onToggle,
    onReset,
    canReset = false,
    maxHeight = '300px',
    className = ""
}) => {
    return (
        <div className={`accordion-section ${className}`}>
            <div className="accordion-header flex items-center justify-between">
                <button
                    onClick={onToggle}
                    className="flex items-center space-x-3 min-w-0 flex-1 text-left"
                >
                    <Icon size={18} className="flex-shrink-0 accordion-header-icon" />
                    <span className="accordion-header-title">{title}</span>
                    {badge && (
                        <span className="accordion-badge">
                            {badge}
                        </span>
                    )}
                </button>
                <div className="flex items-center gap-1 flex-shrink-0">
                    {canReset && onReset && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onReset();
                            }}
                            className="btn-reset btn-reset--visible"
                            title={`Reset ${title}`}
                        >
                            <RotateCcw size={14} />
                            <span className="hidden sm:inline">Reset</span>
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={onToggle}
                        className="btn-icon"
                        aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
                    >
                        {isExpanded ?
                            <ChevronDown size={16} className="accordion-header-icon" /> :
                            <ChevronRight size={16} className="accordion-header-icon" />
                        }
                    </button>
                </div>
            </div>

            <Collapsible
                isOpen={isExpanded}
                maxHeight={maxHeight}
                className="accordion-content"
            >
                {children}
            </Collapsible>
        </div>
    );
};

export default AccordionSection;
