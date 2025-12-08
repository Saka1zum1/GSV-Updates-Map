import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';

/**
 * Background Music Player Component
 * Supports MP3 and M4A formats with music-reactive animations
 * 
 * @param {Object} props - Component props
 * @param {string} props.musicUrl - URL to the music file (mp3 or m4a)
 * @param {boolean} props.autoPlay - Whether to auto-play on mount
 * @param {string} props.className - Additional CSS classes
 */
const BackgroundMusicPlayer = ({ musicUrl, autoPlay = false, className = '' }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [audioData, setAudioData] = useState(new Uint8Array(0));
    
    const audioRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const sourceRef = useRef(null);
    const animationRef = useRef(null);

    // Initialize audio context and analyser
    useEffect(() => {
        if (!musicUrl) return;

        const audio = audioRef.current;
        if (!audio) return;

        try {
            // Create audio context and analyser
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) {
                console.warn('Web Audio API not supported in this browser');
                return;
            }

            const audioContext = new AudioContext();
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            
            const source = audioContext.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(audioContext.destination);

            audioContextRef.current = audioContext;
            analyserRef.current = analyser;
            sourceRef.current = source;
        } catch (err) {
            console.error('Error initializing audio context:', err);
            // Graceful degradation - player will still work without visualization
            return;
        }

        // Auto-play if requested
        if (autoPlay) {
            audio.play().then(() => {
                setIsPlaying(true);
            }).catch(err => {
                console.warn('Auto-play prevented:', err);
            });
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            if (audioContext.state !== 'closed') {
                audioContext.close();
            }
        };
    }, [musicUrl, autoPlay]);

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
        const audioContext = audioContextRef.current;

        if (!audio) return;

        // Resume audio context if suspended
        if (audioContext && audioContext.state === 'suspended') {
            await audioContext.resume();
        }

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch (err) {
                console.error('Playback error:', err);
            }
        }
    };

    // Toggle mute
    const toggleMute = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    // Handle volume change
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
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
        <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
            {/* Hidden audio element */}
            <audio
                ref={audioRef}
                src={musicUrl}
                loop
                preload="auto"
                hidden
            />

            {/* Control button with music-reactive animation */}
            <div className="relative group">
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

                {/* Main button */}
                <button
                    onClick={togglePlay}
                    className="relative w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 
                               text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center
                               transform hover:scale-110 active:scale-95"
                    style={{
                        transform: isPlaying ? `scale(${1 + intensity * 0.15})` : 'scale(1)',
                        transition: isPlaying ? 'transform 0.1s ease-out' : 'transform 0.2s ease'
                    }}
                    title={isPlaying ? 'Pause Music' : 'Play Music'}
                >
                    {isPlaying ? (
                        <Pause className="w-6 h-6" fill="currentColor" />
                    ) : (
                        <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
                    )}
                </button>

                {/* Volume control (shows on hover) */}
                <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                    <div className="bg-gray-900/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 shadow-xl">
                        <div className="flex flex-col items-center gap-2">
                            {/* Mute button */}
                            <button
                                onClick={toggleMute}
                                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                                title={isMuted ? 'Unmute' : 'Mute'}
                            >
                                {isMuted ? (
                                    <VolumeX className="w-4 h-4" />
                                ) : (
                                    <Volume2 className="w-4 h-4" />
                                )}
                            </button>

                            {/* Volume slider */}
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer
                                         [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
                                         [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
                                         [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 
                                         [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0"
                                style={{ writingMode: 'bt-lr', webkitAppearance: 'slider-vertical' }}
                                orient="vertical"
                            />

                            {/* Volume percentage */}
                            <span className="text-white text-xs">
                                {Math.round(volume * 100)}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Visual equalizer bars when playing */}
                {isPlaying && (
                    <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 flex items-end gap-1 h-10">
                        {Array.from({ length: 5 }).map((_, i) => {
                            // Use different frequency ranges for each bar
                            const startIdx = Math.floor((audioData.length / 5) * i);
                            const endIdx = Math.floor((audioData.length / 5) * (i + 1));
                            const slice = audioData.slice(startIdx, endIdx);
                            const barIntensity = slice.length > 0 
                                ? slice.reduce((a, b) => a + b, 0) / slice.length / 255 
                                : 0;
                            const barHeight = 4 + barIntensity * 36; // 4px to 40px

                            return (
                                <div
                                    key={i}
                                    className="w-1 bg-gradient-to-t from-blue-400 to-purple-400 rounded-full"
                                    style={{
                                        height: `${barHeight}px`,
                                        transition: 'height 0.1s ease-out'
                                    }}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BackgroundMusicPlayer;
