import React, { useRef, useEffect, useState } from 'react';

const CustomScrollArea = ({ children, className = "", maxHeight = "400px" }) => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const scrollThumbRef = useRef(null);
    const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [scrollRatio, setScrollRatio] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;
        const thumb = scrollThumbRef.current;

        if (!container || !content || !thumb) return;

        const updateScrollbar = () => {
            const containerHeight = container.clientHeight;
            const contentHeight = content.scrollHeight;
            const scrollTop = container.scrollTop;

            // Check if scrollbar should be visible
            const shouldShowScrollbar = contentHeight > containerHeight;
            setIsScrollbarVisible(shouldShowScrollbar);

            if (shouldShowScrollbar) {
                // Calculate thumb height and position
                const thumbHeight = Math.max((containerHeight / contentHeight) * containerHeight, 20);
                const maxScrollTop = contentHeight - containerHeight;
                const thumbTop = (scrollTop / maxScrollTop) * (containerHeight - thumbHeight);

                thumb.style.height = `${thumbHeight}px`;
                thumb.style.transform = `translateY(${thumbTop}px)`;
                
                setScrollRatio(scrollTop / maxScrollTop);
            }
        };

        const handleScroll = () => {
            updateScrollbar();
        };

        const handleMouseDown = (e) => {
            if (e.target === thumb) {
                setIsDragging(true);
                e.preventDefault();
            }
        };

        const handleMouseMove = (e) => {
            if (!isDragging) return;

            const container = containerRef.current;
            const rect = container.getBoundingClientRect();
            const containerHeight = container.clientHeight;
            const contentHeight = content.scrollHeight;
            
            const mouseY = e.clientY - rect.top;
            const thumbHeight = thumb.offsetHeight;
            const maxThumbTop = containerHeight - thumbHeight;
            const thumbTop = Math.max(0, Math.min(maxThumbTop, mouseY - thumbHeight / 2));
            
            const scrollRatio = thumbTop / maxThumbTop;
            const maxScrollTop = contentHeight - containerHeight;
            container.scrollTop = scrollRatio * maxScrollTop;
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        container.addEventListener('scroll', handleScroll);
        container.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        // Initial update
        updateScrollbar();

        // Observe content changes
        const resizeObserver = new ResizeObserver(updateScrollbar);
        resizeObserver.observe(content);

        return () => {
            container.removeEventListener('scroll', handleScroll);
            container.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            resizeObserver.disconnect();
        };
    }, [isDragging]);

    return (
        <div className={`relative ${className}`} style={{ maxHeight }}>
            {/* Scrollable content */}
            <div
                ref={containerRef}
                className="h-full overflow-hidden hover:pr-2 transition-all duration-200"
                style={{ 
                    paddingRight: isScrollbarVisible ? '8px' : '0',
                    maxHeight 
                }}
            >
                <div ref={contentRef} className="h-full">
                    {children}
                </div>
            </div>

            {/* Custom scrollbar */}
            {isScrollbarVisible && (
                <div className="absolute right-0 top-0 w-2 h-full bg-gray-100 dark:bg-gray-800 rounded-full opacity-60 hover:opacity-100 transition-opacity">
                    <div
                        ref={scrollThumbRef}
                        className={`w-full bg-gray-400 dark:bg-gray-600 rounded-full cursor-pointer transition-colors ${
                            isDragging ? 'bg-gray-600 dark:bg-gray-400' : 'hover:bg-gray-500 dark:hover:bg-gray-500'
                        }`}
                        style={{ minHeight: '20px' }}
                    />
                </div>
            )}
        </div>
    );
};

export default CustomScrollArea;
