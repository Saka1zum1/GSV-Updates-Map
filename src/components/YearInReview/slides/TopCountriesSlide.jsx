import React from 'react';

/**
 * Top Countries Slide - Geographic exploration highlights
 * Uses flag emojis and visual bars
 */
const TopCountriesSlide = ({ report, getFlagEmoji }) => {
    const geo = report?.geo;
    const countriesCount = geo?.countries || 0;
    const regionsCount = geo?.regions || 0;
    const topCountries = geo?.top_countries || {};

    // Get top 5 countries sorted by count
    // topCountries format: { "AR": { "rank": 9, "count": 22 }, ... }
    const topCountriesArray = Object.entries(topCountries)
        .map(([code, data]) => [code, data.count])
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    const maxCount = topCountriesArray.length > 0 ? topCountriesArray[0][1] : 1;

    // Country name mapping for common codes
    const countryNames = {
        'JP': 'Japan', 'US': 'USA', 'AR': 'Argentina', 'BR': 'Brazil',
        'MX': 'Mexico', 'TH': 'Thailand', 'TR': 'Turkey', 'SE': 'Sweden',
        'IE': 'Ireland', 'PE': 'Peru', 'SI': 'Slovenia', 'PH': 'Philippines',
        'AU': 'Australia', 'GB': 'UK', 'DE': 'Germany', 'FR': 'France',
        'ES': 'Spain', 'IT': 'Italy', 'CA': 'Canada', 'RU': 'Russia',
        'IN': 'India', 'ID': 'Indonesia', 'MY': 'Malaysia', 'NZ': 'New Zealand',
        'GR': 'Greece', 'NL': 'Netherlands', 'BE': 'Belgium', 'PT': 'Portugal',
        'PL': 'Poland', 'CZ': 'Czechia', 'AT': 'Austria', 'CH': 'Switzerland',
        'NO': 'Norway', 'DK': 'Denmark', 'FI': 'Finland', 'KR': 'South Korea',
        'TW': 'Taiwan', 'HK': 'Hong Kong', 'SG': 'Singapore', 'VN': 'Vietnam',
        'CL': 'Chile', 'CO': 'Colombia', 'EC': 'Ecuador', 'ZA': 'South Africa'
    };

    const getCountryName = (code) => countryNames[code] || code;

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            {/* Header */}
            <p className="text-white/60 text-lg mb-2">
                Your coverage spanned across
            </p>
            
            <div className="flex items-baseline gap-3 mb-8">
                <span className="text-5xl md:text-6xl font-bold text-white">
                    {countriesCount}
                </span>
                <span className="text-xl text-white/70">countries</span>
            </div>

            {/* Top countries list */}
            {topCountriesArray.length > 0 && (
                <div className="w-full max-w-md space-y-3 mb-8">
                    <p className="text-sm text-white/50 uppercase tracking-wider mb-4">
                        Your favorite destinations
                    </p>
                    
                    {topCountriesArray.map(([code, count], index) => {
                        const percentage = (count / maxCount) * 100;
                        return (
                            <div key={code} className="flex items-center gap-3">
                                {/* Rank */}
                                <div className="w-6 text-white/40 text-sm font-medium">
                                    {index + 1}
                                </div>
                                
                                {/* Flag */}
                                <div className="text-2xl w-10">
                                    {getFlagEmoji(code)}
                                </div>
                                
                                {/* Country name and bar */}
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-white font-medium text-sm">
                                            {getCountryName(code)}
                                        </span>
                                        <span className="text-white/60 text-sm">
                                            {count}
                                        </span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-700"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Regions stat */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 inline-flex items-center gap-2">
                <span className="text-2xl font-bold text-purple-400">{regionsCount}</span>
                <span className="text-white/70 text-sm">unique regions explored</span>
            </div>
        </div>
    );
};

export default TopCountriesSlide;
