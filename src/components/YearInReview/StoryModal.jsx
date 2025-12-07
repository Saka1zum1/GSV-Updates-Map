import React, { useMemo } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import useStoryController from './useStoryController.js';
import OverviewSlide from './slides/OverviewSlide.jsx';
import TimeStatsSlide from './slides/TimeStatsSlide.jsx';
import GeoStatsSlide from './slides/GeoStatsSlide.jsx';
import ContentStatsSlide from './slides/ContentStatsSlide.jsx';
import StreakStatsSlide from './slides/StreakStatsSlide.jsx';
import RankingSlide from './slides/RankingSlide.jsx';
import AchievementsSlide from './slides/AchievementsSlide.jsx';

/**
 * Story Modal Component - Full annual report display
 * @param {Object} props - Component props
 * @param {Object} props.report - Annual report data
 * @param {Function} props.onClose - Close handler
 */
const StoryModal = ({ report, onClose }) => {
    // Define slides configuration
    const slides = useMemo(() => {
        const slideConfig = [
            { component: OverviewSlide, name: 'Overview' },
            { component: TimeStatsSlide, name: 'Time Stats' },
            { component: GeoStatsSlide, name: 'Geography' },
            { component: ContentStatsSlide, name: 'Content' },
            { component: StreakStatsSlide, name: 'Streaks' },
            { component: RankingSlide, name: 'Rankings' },
            { component: AchievementsSlide, name: 'Achievements' }
        ];
        return slideConfig;
    }, []);

    const {
        currentSlide,
        isPlaying,
        nextSlide,
        prevSlide,
        goToSlide,
        togglePlay,
        isFirstSlide,
        isLastSlide,
        progress
    } = useStoryController(slides.length, false, 5000);

    const CurrentSlideComponent = slides[currentSlide]?.component;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative w-full h-full md:h-[90vh] md:max-w-4xl md:rounded-2xl bg-white dark:bg-gray-900 shadow-2xl overflow-hidden">
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 z-10">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Header Controls */}
                <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/30 to-transparent">
                    {/* Slide Indicator */}
                    <div className="flex gap-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`h-1 rounded-full transition-all ${
                                    index === currentSlide
                                        ? 'w-8 bg-white'
                                        : 'w-4 bg-white/50 hover:bg-white/70'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Play/Pause and Close */}
                    <div className="flex gap-2">
                        <button
                            onClick={togglePlay}
                            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-colors"
                            aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Slide Content */}
                <div className="h-full overflow-y-auto pt-12">
                    {CurrentSlideComponent && <CurrentSlideComponent report={report} />}
                </div>

                {/* Navigation Controls */}
                <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between p-6 bg-gradient-to-t from-black/30 to-transparent">
                    <button
                        onClick={prevSlide}
                        disabled={isFirstSlide}
                        className={`p-3 rounded-full backdrop-blur-sm transition-all ${
                            isFirstSlide
                                ? 'bg-white/10 text-white/30 cursor-not-allowed'
                                : 'bg-white/20 hover:bg-white/30 text-white'
                        }`}
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <div className="text-white text-sm font-medium backdrop-blur-sm bg-white/20 px-4 py-2 rounded-full">
                        {currentSlide + 1} / {slides.length}
                    </div>

                    <button
                        onClick={nextSlide}
                        disabled={isLastSlide}
                        className={`p-3 rounded-full backdrop-blur-sm transition-all ${
                            isLastSlide
                                ? 'bg-white/10 text-white/30 cursor-not-allowed'
                                : 'bg-white/20 hover:bg-white/30 text-white'
                        }`}
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Keyboard navigation hint - visible on all screen sizes for accessibility */}
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/50 text-xs backdrop-blur-sm bg-black/20 px-3 py-1 rounded-full">
                    Use ← → arrow keys to navigate
                </div>
            </div>
        </div>
    );
};

export default StoryModal;
