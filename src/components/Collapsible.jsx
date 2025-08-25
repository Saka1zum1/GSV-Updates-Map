import React, { useState, useRef, useEffect } from 'react';

const Collapsible = ({ 
    isOpen, 
    children, 
    className = "",
    maxHeight = 'auto',
    minHeight = '0px'
}) => {
    const [height, setHeight] = useState('0px');
    const contentRef = useRef(null);
    const resizeObserverRef = useRef(null);

    // Calculate content height
    useEffect(() => {
        if (!contentRef.current) return;

        const updateHeight = () => {
            if (contentRef.current) {
                const scrollHeight = contentRef.current.scrollHeight;
                setHeight(`${scrollHeight}px`);
            }
        };

        // Initial calculation
        updateHeight();

        // Setup resize observer
        resizeObserverRef.current = new ResizeObserver(() => {
            updateHeight();
        });

        resizeObserverRef.current.observe(contentRef.current);

        return () => {
            if (resizeObserverRef.current && contentRef.current) {
                resizeObserverRef.current.unobserve(contentRef.current);
                resizeObserverRef.current.disconnect();
            }
        };
    }, [children]);

    const computedHeight = isOpen ? 
        (maxHeight === 'auto' ? height : `min(${height}, ${maxHeight})`) : 
        minHeight;

    const containerStyle = {
        height: computedHeight,
        overflow: isOpen ? 'auto' : 'hidden',
        transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    };

    return (
        <div
            style={containerStyle}
            className={`${className} transition-all duration-300`}
            data-scope="collapsible"
            data-state={isOpen ? 'open' : 'closed'}
        >
            <div ref={contentRef}>
                {children}
            </div>
        </div>
    );
};

export default Collapsible;
