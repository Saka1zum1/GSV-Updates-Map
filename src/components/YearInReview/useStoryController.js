import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook for controlling story/slide navigation
 * @param {number} totalSlides - Total number of slides
 * @param {boolean} autoPlay - Whether to auto-play slides
 * @param {number} autoPlayInterval - Auto-play interval in milliseconds
 * @returns {Object} Controller object with state and methods
 */
export const useStoryController = (
    totalSlides = 1,
    autoPlay = false,
    autoPlayInterval = 5000
) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isPaused, setIsPaused] = useState(false);

    // Navigate to next slide
    const nextSlide = useCallback(() => {
        setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, [totalSlides]);

    // Navigate to previous slide
    const prevSlide = useCallback(() => {
        setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
    }, [totalSlides]);

    // Go to specific slide
    const goToSlide = useCallback((index) => {
        if (index >= 0 && index < totalSlides) {
            setCurrentSlide(index);
        }
    }, [totalSlides]);

    // Toggle play/pause
    const togglePlay = useCallback(() => {
        setIsPlaying(prev => !prev);
    }, []);

    // Pause playback
    const pause = useCallback(() => {
        setIsPaused(true);
        setIsPlaying(false);
    }, []);

    // Resume playback
    const resume = useCallback(() => {
        setIsPaused(false);
        setIsPlaying(true);
    }, []);

    // Reset to first slide
    const reset = useCallback(() => {
        setCurrentSlide(0);
        setIsPlaying(autoPlay);
        setIsPaused(false);
    }, [autoPlay]);

    // Auto-play effect
    useEffect(() => {
        if (!isPlaying || isPaused) return;

        const timer = setInterval(() => {
            nextSlide();
        }, autoPlayInterval);

        return () => clearInterval(timer);
    }, [isPlaying, isPaused, nextSlide, autoPlayInterval]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    prevSlide();
                    break;
                case 'ArrowRight':
                    nextSlide();
                    break;
                case ' ':
                    event.preventDefault();
                    togglePlay();
                    break;
                case 'Escape':
                    pause();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide, togglePlay, pause]);

    return {
        currentSlide,
        isPlaying,
        isPaused,
        nextSlide,
        prevSlide,
        goToSlide,
        togglePlay,
        pause,
        resume,
        reset,
        isFirstSlide: currentSlide === 0,
        isLastSlide: currentSlide === totalSlides - 1,
        progress: totalSlides > 0 ? ((currentSlide + 1) / totalSlides) * 100 : 0
    };
};

export default useStoryController;
