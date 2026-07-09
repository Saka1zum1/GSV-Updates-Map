import React, { useState, useEffect, useRef } from 'react';

const AccordionContainer = ({ children, className = "" }) => {
    const [availableHeight, setAvailableHeight] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const updateHeight = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const maxHeight = window.innerHeight - rect.top - 20;
                setAvailableHeight(Math.max(200, maxHeight));
            }
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    const childArray = React.Children.toArray(children);
    const expandedCount = childArray.filter(
        (child) => React.isValidElement(child) && child.props.isExpanded
    ).length;

    const headerHeight = 48;
    const totalHeaderHeight = childArray.length * headerHeight;
    const availableContentHeight = Math.max(100, availableHeight - totalHeaderHeight);
    const sectionMaxHeight = expandedCount > 0
        ? Math.max(150, Math.floor(availableContentHeight / expandedCount))
        : 300;

    return (
        <div
            ref={containerRef}
            className={`space-y-3 overflow-hidden ${className}`}
            style={{ maxHeight: `${availableHeight}px` }}
        >
            {childArray.map((child, index) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        maxHeight: child.props.isExpanded ? `${sectionMaxHeight}px` : 'auto',
                        key: child.key ?? index,
                    });
                }
                return child;
            })}
        </div>
    );
};

export default AccordionContainer;
