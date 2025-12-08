# Background Music Player for Annual Report

## Overview

The Background Music Player is a React component that provides an immersive audio experience for the Annual Report feature. It includes music-reactive animations that sync with the audio playback.

## Features

- **Audio Format Support**: Plays MP3 and M4A format audio files
- **Music-Reactive Animation**: Button scales and pulses with the music's rhythm
- **Visual Equalizer**: Real-time frequency visualization with 5 animated bars
- **Volume Control**: Adjustable volume slider with mute functionality
- **Play/Pause Controls**: Easy-to-use playback controls
- **Auto-loop**: Continuous playback throughout the year-in-review experience

## Component Props

```javascript
<BackgroundMusicPlayer
    musicUrl="/path/to/music.mp3"  // URL to MP3 or M4A file
    autoPlay={false}                // Whether to auto-play on mount
    className=""                    // Additional CSS classes
/>
```

### Props Details

- **musicUrl** (string, required): Path to the audio file. Supports:
  - `.mp3` files
  - `.m4a` files
  - Remote URLs (must support CORS)

- **autoPlay** (boolean, optional, default: `false`): 
  - If `true`, music starts playing automatically when the component mounts
  - Note: Browsers may block auto-play until user interaction

- **className** (string, optional): Additional CSS classes for custom styling

## Usage

### In YearInReviewModal

The music player is integrated into the Year in Review Modal:

```javascript
<YearInReviewModal
    report={yearInReviewReport}
    user={yearInReviewUser}
    isOpen={showYearInReview}
    onClose={handleCloseYearInReview}
    musicUrl="/assets/annual-report-bg-music.mp3"
/>
```

### Adding Your Own Music

1. Place your audio file in the `public/assets/` directory:
   ```
   public/assets/annual-report-bg-music.mp3
   ```

2. Reference it in the component:
   ```javascript
   musicUrl="/assets/annual-report-bg-music.mp3"
   ```

3. Alternatively, use a remote URL:
   ```javascript
   musicUrl="https://example.com/music.mp3"
   ```

## Visual Features

### Music-Reactive Button

The play/pause button reacts to the music in real-time:

- **Scale Animation**: Button size increases with audio intensity
- **Pulsing Rings**: Animated rings pulse outward from the button
- **Opacity Changes**: Ring opacity varies with music dynamics
- **Color Gradient**: Blue-to-purple gradient matching the app theme

### Visual Equalizer

5 vertical bars display the audio frequency spectrum:

- Each bar represents a different frequency range
- Bar heights animate in real-time with the music
- Gradient coloring (blue to purple)
- Positioned to the right of the control button

### Volume Control

Hover over the button to reveal volume controls:

- **Volume Slider**: Vertical slider (0-100%)
- **Mute Button**: Toggle sound on/off
- **Percentage Display**: Shows current volume level
- **Smooth Transitions**: Fade in/out on hover

## Technical Implementation

### Audio Analysis

The component uses the Web Audio API to analyze audio in real-time:

```javascript
// Audio Context setup
const audioContext = new AudioContext();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 256; // Frequency resolution

// Connect audio source
const source = audioContext.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioContext.destination);

// Analyze frequency data
const dataArray = new Uint8Array(analyser.frequencyBinCount);
analyser.getByteFrequencyData(dataArray);
```

### Animation Loop

Uses `requestAnimationFrame` for smooth 60fps animations:

```javascript
const updateAudioData = () => {
    analyser.getByteFrequencyData(dataArray);
    setAudioData(new Uint8Array(dataArray));
    animationRef.current = requestAnimationFrame(updateAudioData);
};
```

### Cleanup

Proper cleanup prevents memory leaks:

```javascript
useEffect(() => {
    return () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
        if (audioContext.state !== 'closed') {
            audioContext.close();
        }
    };
}, []);
```

## Browser Compatibility

### Supported Browsers

- ✅ Chrome 34+ (Desktop & Mobile)
- ✅ Firefox 25+
- ✅ Safari 14.1+ (Desktop & iOS)
- ✅ Edge 79+
- ✅ Opera 21+

### Audio Format Support

| Format | Chrome | Firefox | Safari | Edge |
|--------|--------|---------|--------|------|
| MP3    | ✅     | ✅      | ✅     | ✅   |
| M4A    | ✅     | ❌      | ✅     | ✅   |

**Note**: For maximum compatibility, use MP3 format.

## Styling

The component uses Tailwind CSS with custom animations:

```css
/* Music-reactive scaling */
transform: scale(${1 + intensity * 0.15})

/* Pulsing rings */
@keyframes ping {
    75%, 100% {
        transform: scale(2);
        opacity: 0;
    }
}

/* Gradient colors */
background: linear-gradient(to right, #3b82f6, #a855f7)
```

## Performance Considerations

### Optimization Strategies

1. **Conditional Animation**: Only runs when music is playing
2. **RAF Cleanup**: Cancels animation frames when paused
3. **Context Management**: Closes audio context on unmount
4. **Debounced Updates**: 60fps cap prevents excessive re-renders

### Memory Usage

- Audio Context: ~50KB
- Analyser Node: ~16KB
- Animation Frame: Negligible
- **Total**: < 100KB overhead

## Troubleshooting

### Music Won't Play

**Problem**: Click play but no sound
**Solutions**:
- Check browser console for errors
- Verify audio file path is correct
- Ensure file format is supported (MP3 recommended)
- Check browser's audio permissions

### Auto-play Blocked

**Problem**: Auto-play doesn't work
**Solutions**:
- User interaction required by browsers
- Set `autoPlay={false}` and let users click play
- Show a "Click to Play Music" hint on first slide

### Animations Laggy

**Problem**: Choppy button animations
**Solutions**:
- Close other browser tabs
- Disable other visual effects
- Use a more powerful device
- Consider using lower fftSize (e.g., 128)

### Volume Control Not Showing

**Problem**: Hover doesn't reveal volume slider
**Solutions**:
- Ensure sufficient hover time (0.2s delay)
- Check z-index conflicts
- Verify backdrop-blur support in browser

## Examples

### Basic Usage

```javascript
import BackgroundMusicPlayer from './BackgroundMusicPlayer';

function MyComponent() {
    return (
        <BackgroundMusicPlayer
            musicUrl="/music/background.mp3"
        />
    );
}
```

### With Auto-play

```javascript
<BackgroundMusicPlayer
    musicUrl="/music/intro.mp3"
    autoPlay={true}
/>
```

### Custom Styling

```javascript
<BackgroundMusicPlayer
    musicUrl="/music/theme.m4a"
    className="bottom-20 right-10"
/>
```

### Multiple Music Tracks

```javascript
const [currentTrack, setCurrentTrack] = useState(0);
const tracks = [
    '/music/track1.mp3',
    '/music/track2.mp3',
    '/music/track3.mp3'
];

<BackgroundMusicPlayer
    musicUrl={tracks[currentTrack]}
    key={currentTrack} // Force re-mount on track change
/>
```

## Future Enhancements

Potential improvements for future versions:

- [ ] Playlist support with track switching
- [ ] Playback speed control
- [ ] Audio visualization customization
- [ ] Waveform display option
- [ ] Download/share music feature
- [ ] Bass boost and equalizer controls
- [ ] Shuffle and repeat modes
- [ ] Keyboard shortcuts (Space, M for mute)

## License

Same as parent project license.
