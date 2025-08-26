import React, { useState, useEffect, useRef } from 'react';

const AccordionContainer = ({ children, className = "" }) => {
    const [availableHeight, setAvailableHeight] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const updateHeight = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const maxHeight = windowHeight - rect.top - 20; // 20px margin
                setAvailableHeight(Math.max(200, maxHeight)); // minimum 200px
            }
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);
        
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    // Calculate height for each expanded section
    const expandedCount = React.Children.toArray(children).filter(child => 
        child.props.isExpanded
    ).length;

    const headerHeight = 48; // approximate header height
    const totalHeaderHeight = React.Children.count(children) * headerHeight;
    const availableContentHeight = Math.max(100, availableHeight - totalHeaderHeight);
    const sectionMaxHeight = expandedCount > 0 ? 
        Math.max(150, Math.floor(availableContentHeight / expandedCount)) : 
        300;

    return (
        <div 
            ref={containerRef}
            className={`space-y-3 ${className}`}
            style={{ maxHeight: `${availableHeight}px` }}
        >
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        maxHeight: `${sectionMaxHeight}px`,
                        key: index
                    });
                }
                return child;
            })}
        </div>
    );
};

export default AccordionContainer;
