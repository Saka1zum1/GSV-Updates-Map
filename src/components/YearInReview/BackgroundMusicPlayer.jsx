import React, { useState, useRef, useEffect, useImperativeHandle } from 'react';
import { MdMusicNote, MdMusicOff } from 'react-icons/md';
/**
 * Background Music Player Component
 * Supports MP3 and M4A formats with music-reactive animations
 * 
 * @param {Object} props - Component props
 * @param {string} props.musicUrl - URL to the music file (mp3 or m4a)
 * @param {boolean} props.autoPlay - Whether to auto-play on mount
 * @param {string} props.className - Additional CSS classes
 */
const BackgroundMusicPlayer = React.forwardRef(({ musicUrl, autoPlay = false, className = '' }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [audioData, setAudioData] = useState(new Uint8Array(0));
    
    const audioRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const sourceRef = useRef(null);
    const animationRef = useRef(null);

    // Function to initialize Web Audio API (only called on user interaction)
    const initAudioContext = () => {
        if (audioContextRef.current) {
            if (audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume();
            }
            return;
        }

        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;

            const audioContext = new AudioContext();
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            
            const audio = audioRef.current;
            // Important for Web Audio API to work with media elements
            if (audio) {
                const source = audioContext.createMediaElementSource(audio);
                source.connect(analyser);
                analyser.connect(audioContext.destination);

                audioContextRef.current = audioContext;
                analyserRef.current = analyser;
                sourceRef.current = source;
            }
        } catch (err) {
            console.error('Error initializing audio context:', err);
        }
    };

    // expose imperative play/pause methods to parent via ref
    useImperativeHandle(ref, () => ({
        play: async () => {
            const audio = audioRef.current;
            if (!audio) return;
            try {
                initAudioContext();
                // resume audio context if needed
                if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
                    await audioContextRef.current.resume();
                }
                await audio.play();
                setIsPlaying(true);
                setHasInteracted(true);
            } catch (err) {
                console.warn('Imperative play failed:', err);
            }
        },
        pause: () => {
            const audio = audioRef.current;
            if (!audio) return;
            audio.pause();
            setIsPlaying(false);
        }
    }));

    // Handle Autoplay (Simple playback without Web Audio initially)
    useEffect(() => {
        if (autoPlay && !hasInteracted) {
            const audio = audioRef.current;
            if (audio) {
                // Try to play directly
                const playPromise = audio.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        setIsPlaying(true);
                        setHasInteracted(true);
                    }).catch(error => {
                        console.warn('Autoplay prevented:', error);
                        setIsPlaying(false);
                    });
                }
            }
        }
    }, [autoPlay, hasInteracted]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close();
            }
        };
    }, []);

    // Analyze audio data for visualization
    useEffect(() => {
        if (!isPlaying || !analyserRef.current) {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
            return;
        }

        const analyser = analyserRef.current;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const updateAudioData = () => {
            analyser.getByteFrequencyData(dataArray);
            setAudioData(new Uint8Array(dataArray));
            animationRef.current = requestAnimationFrame(updateAudioData);
        };

        updateAudioData();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isPlaying]);

    // Toggle play/pause
    const togglePlay = async () => {
        const audio = audioRef.current;
        
        if (!audio) return;

        // Initialize Web Audio on first interaction
        initAudioContext();

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            try {
                await audio.play();
                setIsPlaying(true);
                setHasInteracted(true);
            } catch (err) {
                console.error('Playback error:', err);
                setIsPlaying(false);
            }
        }
    };

    // Calculate average frequency for animation
    const getAverageFrequency = () => {
        if (audioData.length === 0) return 0;
        const sum = audioData.reduce((a, b) => a + b, 0);
        return sum / audioData.length / 255; // Normalize to 0-1
    };

    const intensity = getAverageFrequency();

    // Calculate scale based on audio intensity
    const scale = 1 + intensity * 0.3; // Scale from 1.0 to 1.3
    const opacity = 0.7 + intensity * 0.3; // Opacity from 0.7 to 1.0

    if (!musicUrl) {
        return null;
    }

    return (
        <div className={`fixed top-4 left-4 z-40 ${className}`}>
            {/* Hidden audio element */}
            <audio
                ref={audioRef}
                src={musicUrl}
                loop
                preload="auto"
                crossOrigin="anonymous"
            />

            {/* Control button with music-reactive animation */}
            <div className="relative">
                {/* Pulsing ring effect when playing */}
                {isPlaying && (
                    <>
                        <div
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-75 animate-ping"
                            style={{
                                transform: `scale(${scale})`,
                                opacity: opacity * 0.5
                            }}
                        />
                        <div
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
                            style={{
                                transform: `scale(${scale})`,
                                opacity: opacity * 0.3,
                                transition: 'transform 0.1s ease-out, opacity 0.1s ease-out'
                            }}
                        />
                    </>
                )}

                {/* Main button with music note icon */}
                <button
                    onClick={togglePlay}
                    className="relative w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm
                               text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center
                               transform hover:scale-110 active:scale-95"
                    style={{
                        transform: isPlaying ? `scale(${1 + intensity * 0.15})` : 'scale(1)',
                        transition: isPlaying ? 'transform 0.1s ease-out' : 'transform 0.2s ease'
                    }}
                    title={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
                >
                    {isPlaying ? (
                        <MdMusicNote className="w-6 h-6" />
                    ) : (
                        <MdMusicOff className="w-6 h-6" />
                    )}
                </button>

            </div>
        </div>
    );
});

export default BackgroundMusicPlayer;
