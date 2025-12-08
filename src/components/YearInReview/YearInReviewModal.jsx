import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight, Share2, Download } from 'lucide-react';
import { getFlagEmoji } from '../../utils/constants.js';
import { getWeekdayName, getMonthName } from '../../utils/discordAuth.js';

// Slide components
import IntroSlide from './slides/IntroSlide.jsx';
import JourneyStartSlide from './slides/JourneyStartSlide.jsx';
import TotalContributionsSlide from './slides/TotalContributionsSlide.jsx';
import TopCountriesSlide from './slides/TopCountriesSlide.jsx';
import FavoriteTimeSlide from './slides/FavoriteTimeSlide.jsx';
import UpdateTypesSlide from './slides/UpdateTypesSlide.jsx';
import StreakSlide from './slides/StreakSlide.jsx';
import RankingSlide from './slides/RankingSlide.jsx';
import SummarySlide from './slides/SummarySlide.jsx';
import BackgroundMusicPlayer from './BackgroundMusicPlayer.jsx';

/**
 * Year in Review Modal - Netease Cloud Music Style
 * Immersive full-screen story experience
 * 
 * @param {Object} props - Component props
 * @param {Object} props.report - Annual report data
 * @param {Object} props.user - User information
 * @param {Function} props.onClose - Close handler
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {string} props.musicUrl - Optional background music URL (mp3 or m4a)
 */
const YearInReviewModal = ({ report, user, onClose, isOpen, musicUrl }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for prev, 1 for next
    const [isAnimating, setIsAnimating] = useState(false);

    // Define slides based on available data
    const slides = useMemo(() => {
        if (!report) return [];
        
        const slideList = [
            { id: 'intro', component: IntroSlide },
            { id: 'journey-start', component: JourneyStartSlide },
            { id: 'total', component: TotalContributionsSlide },
        ];

        // Add geo slide if has geo data
        if (report.geo_stats?.countries_count > 0) {
            slideList.push({ id: 'countries', component: TopCountriesSlide });
        }

        // Add time stats if available
        if (report.time_stats) {
            slideList.push({ id: 'time', component: FavoriteTimeSlide });
        }

        // Add content stats if available
        if (report.content_stats?.types_distribution) {
            slideList.push({ id: 'types', component: UpdateTypesSlide });
        }

        // Add streak stats if available
        if (report.streak_stats) {
            slideList.push({ id: 'streak', component: StreakSlide });
        }

        // Add ranking if available
        if (report.ranking_stats?.total_rank) {
            slideList.push({ id: 'ranking', component: RankingSlide });
        }

        // Always end with summary
        slideList.push({ id: 'summary', component: SummarySlide });

        return slideList;
    }, [report]);

    const totalSlides = slides.length;

    // Navigation handlers
    const goToNext = useCallback(() => {
        if (currentSlide < totalSlides - 1 && !isAnimating) {
            setIsAnimating(true);
            setDirection(1);
            setCurrentSlide(prev => prev + 1);
            setTimeout(() => setIsAnimating(false), 500);
        }
    }, [currentSlide, totalSlides, isAnimating]);

    const goToPrev = useCallback(() => {
        if (currentSlide > 0 && !isAnimating) {
            setIsAnimating(true);
            setDirection(-1);
            setCurrentSlide(prev => prev - 1);
            setTimeout(() => setIsAnimating(false), 500);
        }
    }, [currentSlide, isAnimating]);

    const goToSlide = useCallback((index) => {
        if (index !== currentSlide && !isAnimating) {
            setIsAnimating(true);
            setDirection(index > currentSlide ? 1 : -1);
            setCurrentSlide(index);
            setTimeout(() => setIsAnimating(false), 500);
        }
    }, [currentSlide, isAnimating]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                goToNext();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                goToPrev();
            } else if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, goToNext, goToPrev, onClose]);

    // Touch swipe support
    const [touchStart, setTouchStart] = useState(null);
    const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
    const handleTouchEnd = (e) => {
        if (!touchStart) return;
        const diff = touchStart - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) goToNext();
            else goToPrev();
        }
        setTouchStart(null);
    };

    if (!isOpen || !report) return null;

    const CurrentSlideComponent = slides[currentSlide]?.component;
    const progress = ((currentSlide + 1) / totalSlides) * 100;

    return (
        <div 
            className="fixed inset-0 z-[9999] bg-black"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Background gradient based on slide */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 transition-all duration-1000" />
            
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse" />
                <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute w-64 h-64 bg-pink-500/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Progress bar at top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-50">
                <div 
                    className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all text-white"
            >
                <X size={24} />
            </button>

            {/* Slide indicators */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 flex gap-1.5">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            index === currentSlide 
                                ? 'w-8 bg-white' 
                                : index < currentSlide 
                                    ? 'w-3 bg-white/60' 
                                    : 'w-3 bg-white/30'
                        }`}
                    />
                ))}
            </div>

            {/* Main content area */}
            <div className="relative h-full flex items-center justify-center px-4 py-20 overflow-hidden">
                <div 
                    className={`w-full max-w-2xl mx-auto transform transition-all duration-500 ease-out ${
                        isAnimating 
                            ? direction > 0 
                                ? 'opacity-0 translate-x-8' 
                                : 'opacity-0 -translate-x-8'
                            : 'opacity-100 translate-x-0'
                    }`}
                >
                    {CurrentSlideComponent && (
                        <CurrentSlideComponent 
                            report={report} 
                            user={user}
                            getFlagEmoji={getFlagEmoji}
                            getWeekdayName={getWeekdayName}
                            getMonthName={getMonthName}
                        />
                    )}
                </div>
            </div>

            {/* Navigation buttons */}
            <div className="absolute bottom-8 left-0 right-0 flex items-center justify-between px-6 z-50">
                <button
                    onClick={goToPrev}
                    disabled={currentSlide === 0}
                    className={`p-4 rounded-full backdrop-blur-sm transition-all ${
                        currentSlide === 0
                            ? 'bg-white/5 text-white/20 cursor-not-allowed'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                >
                    <ChevronLeft size={28} />
                </button>

                {/* Page indicator */}
                <div className="text-white/60 text-sm font-medium">
                    {currentSlide + 1} / {totalSlides}
                </div>

                <button
                    onClick={goToNext}
                    disabled={currentSlide === totalSlides - 1}
                    className={`p-4 rounded-full backdrop-blur-sm transition-all ${
                        currentSlide === totalSlides - 1
                            ? 'bg-white/5 text-white/20 cursor-not-allowed'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                >
                    <ChevronRight size={28} />
                </button>
            </div>

            {/* Tap hint for mobile - only show on first slide */}
            {currentSlide === 0 && (
                <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-white/40 text-xs animate-pulse">
                    Tap or swipe to continue →
                </div>
            )}

            {/* Background Music Player */}
            {musicUrl && (
                <BackgroundMusicPlayer 
                    musicUrl={musicUrl}
                    autoPlay={false}
                />
            )}
        </div>
    );
};

export default YearInReviewModal;
