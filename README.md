# GSV Updates Map - React + Tailwind CSS Version

A modern, responsive web application for visualizing Google Street View updates and spotting data on an interactive map. Built with React, Tailwind CSS, and Leaflet.

## Features

### Core Functionality
- **Interactive Map**: Powered by Leaflet with multiple base layers (Roadmap, Satellite, OSM)
- **Google Street View Coverage**: Display GSV coverage with customizable colors
- **Data Visualization**: Switch between marker clusters and heatmap views
- **Real-time Filtering**: Filter data by update types, dates, countries, and regions
- **Drawing Tools**: Create polygons to filter data by geographic areas

### Enhanced UI/UX
- **Modern Design**: Clean, responsive interface built with Tailwind CSS
- **Icon Integration**: Lucide React icons for intuitive controls
- **Interactive Tooltips**: Hover effects with helpful information
- **Mobile Responsive**: Works seamlessly on desktop and mobile devices

### Data Management
- **Mock Data Support**: Development mode with sample data
- **API Integration**: Production-ready API calls to Netlify functions
- **Caching**: Efficient data loading and caching mechanisms
- **Export Features**: Copy data as JSON or CSV format

## Project Structure

```
src/
├── components/
│   ├── MapContainer.jsx      # Main map component with Leaflet integration
│   ├── ControlPanel.jsx      # Right-side control buttons
│   ├── FilterPanel.jsx       # Left-side filter controls
│   └── CalendarWidget.jsx    # Date picker and calendar controls
├── hooks/
│   └── useMapData.js         # Custom hooks for data management
├── utils/
│   ├── constants.js          # App constants and utility functions
│   └── api.js               # API calls and mock data
├── App.jsx                  # Main application component
├── main.jsx                 # React entry point
└── index.css                # Tailwind CSS styles
```

## Development

### Prerequisites
- Node.js >= 16.0.0
- npm or yarn

### Setup
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
```

## Features Migration

All original features have been preserved and enhanced:

✅ **Preserved Features:**
- Google Street View coverage layers
- Multiple base map options
- Marker clustering
- Heatmap visualization
- Date filtering with special date indicators
- Country/region filtering
- Drawing tools for polygon selection
- Update type filtering
- Peak and spot location modes
- JSON/CSV export
- Color theme switching

🎨 **Enhanced Features:**
- Modern, responsive UI design
- Better icon integration
- Improved tooltips and hover effects
- Smoother animations and transitions
- Mobile-friendly interface
- Component-based architecture
- Better code organization and maintainability
