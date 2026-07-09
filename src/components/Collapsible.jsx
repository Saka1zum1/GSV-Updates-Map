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

    const isCapped = maxHeight && maxHeight !== 'auto';

    useEffect(() => {
        if (!contentRef.current) return;

        const updateHeight = () => {
            if (contentRef.current) {
                setHeight(`${contentRef.current.scrollHeight}px`);
            }
        };

        updateHeight();

        resizeObserverRef.current = new ResizeObserver(updateHeight);
        resizeObserverRef.current.observe(contentRef.current);

        return () => {
            if (resizeObserverRef.current && contentRef.current) {
                resizeObserverRef.current.unobserve(contentRef.current);
                resizeObserverRef.current.disconnect();
            }
        };
    }, [children]);

    const computedHeight = isOpen
        ? (isCapped ? `min(${height}, ${maxHeight})` : height)
        : minHeight;

    const isScrollable = isOpen && isCapped;

    const containerStyle = {
        height: computedHeight,
        overflow: isScrollable ? 'auto' : 'hidden',
        transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    };

    return (
        <div
            style={containerStyle}
            className={`${className} transition-all duration-300${isScrollable ? ' custom-scroll filter-section-scroll' : ''}`}
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
