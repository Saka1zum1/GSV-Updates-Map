# Annual Report Feature

This document describes the annual report feature implementation for the GSV Updates Map project.

## Overview

The annual report feature allows users to view their personalized year-in-review statistics by logging in with their Discord account. The feature uses Discord OAuth2 Implicit Flow for authentication and displays comprehensive statistics about the user's contributions throughout the year.

## Features

- **Discord OAuth2 Authentication**: Secure login using Discord's Implicit Grant Flow
- **Personalized Statistics**: View your contributions, time patterns, geographic distribution, and more
- **Interactive Slideshow**: Navigate through different aspects of your year with an engaging presentation
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Fully compatible with the application's dark theme

## File Structure

```
src/
├── components/
│   ├── Auth/
│   │   └── DiscordLogin.jsx          # Discord login button component
│   ├── YearInReview/
│   │   ├── StoryModal.jsx            # Main report modal with slideshow
│   │   ├── LowDataMessage.jsx        # Message for users with insufficient data
│   │   ├── slides/                   # Individual slide components
│   │   │   ├── OverviewSlide.jsx     # Overall statistics
│   │   │   ├── TimeStatsSlide.jsx    # Time-based statistics
│   │   │   ├── GeoStatsSlide.jsx     # Geographic statistics
│   │   │   ├── ContentStatsSlide.jsx # Content type statistics
│   │   │   ├── StreakStatsSlide.jsx  # Consistency and streaks
│   │   │   ├── RankingSlide.jsx      # User rankings
│   │   │   └── AchievementsSlide.jsx # Achievements and milestones
│   │   └── useStoryController.js     # Hook for slide navigation logic
├── pages/
│   └── AnnualReportPage.jsx          # Main page component
├── types/
│   └── annualReport.js               # TypeScript-style type definitions
├── config/
│   └── discord.js                    # Discord OAuth configuration
├── utils/
│   └── discordAuth.js                # Authentication and data utilities
└── styles/
    └── annual-report.css             # Custom styles with glass morphism effects
```

## Configuration

### Discord OAuth Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application or use an existing one
3. Navigate to OAuth2 settings
4. Add redirect URI: `https://yourdomain.com/report` (or `http://localhost:5173/report` for development)
5. Copy the Client ID

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_DISCORD_CLIENT_ID=your_client_id_here
VITE_DISCORD_REDIRECT_URI=http://localhost:5173/report
```

For production, update these values accordingly.

## Data Format

The annual report data is loaded from `/public/data/user_annual_report_2024.json`. The data structure matches the backend model from `VirtualStreets/virtualstreets-update-bot`.

Example structure:

```json
[
  {
    "author_id": "123456789012345678",
    "author_name": "Username",
    "report_year": 2024,
    "report_type": "update",
    "total_count": 150,
    "daily_average": 0.41,
    "time_stats": { ... },
    "geo_stats": { ... },
    "content_stats": { ... },
    "streak_stats": { ... },
    "ranking_stats": { ... },
    "interaction_stats": { ... },
    "milestones": { ... }
  }
]
```

## Usage

### Accessing the Annual Report

Users can access their annual report by navigating to `/report`:

```
https://yourdomain.com/report
```

### User Flow

1. **Not Logged In**: User sees a login page with a "Login with Discord" button
2. **Authorization**: User is redirected to Discord for authorization
3. **Callback**: After authorization, user returns to `/report` with access token
4. **Data Loading**: Application fetches user info and loads annual report data
5. **Display**:
   - **Sufficient Data (≥10 records)**: Full interactive report is shown
   - **Insufficient Data (<10 records)**: Encouraging message is displayed

### Slideshow Navigation

- **Arrow Keys**: Navigate between slides (← →)
- **Space Bar**: Toggle auto-play
- **Escape**: Pause slideshow
- **Navigation Buttons**: Click prev/next buttons
- **Slide Indicators**: Click to jump to specific slide

## Customization

### Minimum Data Threshold

Adjust the threshold for displaying full report in `src/types/annualReport.js`:

```javascript
export const MIN_DATA_THRESHOLD = 10; // Change this value
```

### Slide Order

Modify slide order in `src/components/YearInReview/StoryModal.jsx`:

```javascript
const slides = useMemo(() => {
    const slideConfig = [
        { component: OverviewSlide, name: 'Overview' },
        // Add, remove, or reorder slides here
    ];
    return slideConfig;
}, []);
```

### Styling

Glass morphism effects and custom styles are in `src/styles/annual-report.css`. Adjust these for different visual effects:

```css
.glass-effect {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
}
```

## Security Considerations

1. **No Token Storage**: Access tokens are only stored in memory for the current session
2. **HTTPS Required**: Use HTTPS in production for secure OAuth flow
3. **Client-Side Only**: This implementation is purely client-side with no backend token handling
4. **Rate Limiting**: Discord API has rate limits; implement appropriate handling if needed

## Development

### Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Testing

1. Set up Discord OAuth application
2. Configure `.env` with development redirect URI
3. Place test data in `public/data/user_annual_report_2024.json`
4. Navigate to `http://localhost:5173/report`
5. Login with Discord and verify data display

## Troubleshooting

### "Failed to load annual report data"

- Check that `public/data/user_annual_report_2024.json` exists
- Verify JSON format is valid
- Check browser console for network errors

### Discord Login Not Working

- Verify `VITE_DISCORD_CLIENT_ID` is set correctly
- Ensure redirect URI matches Discord application settings exactly
- Check that OAuth2 scopes include "identify"

### No Data Displayed After Login

- Verify your Discord user ID exists in the JSON data
- Check browser console for errors
- Ensure data structure matches expected format

## Future Enhancements

- Add export functionality for reports
- Implement social sharing features
- Add more visualization types (charts, graphs)
- Support for multiple years
- Add animation effects between slides
- Implement report caching

## Contributing

When adding new slides:

1. Create new slide component in `src/components/YearInReview/slides/`
2. Import and add to slide configuration in `StoryModal.jsx`
3. Ensure responsive design works on all screen sizes
4. Test with both light and dark themes

## License

Same as the main project license.
