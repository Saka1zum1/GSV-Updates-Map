import { getMonthTimestamp } from './constants.js';

// Cache for ongoing requests to prevent duplicates
const ongoingRequests = new Map();

// Load table data from API
export const loadTableData = async ({ table, since, before, key, value }) => {
  
  try {

    const params = new URLSearchParams();
    params.append('table', table);
    
    if (since) {
      params.append('since', since);
    } else if (!key && !value) {

      params.append('since', getMonthTimestamp());
    }
    
    if (before) {
      params.append('before', before);
    }
    
    if (key && value) {
      params.append('key', key);
      params.append('value', value);
    }
    
    const url = `/.netlify/functions/getData?${params.toString()}`;
    
    // Check if we already have an ongoing request for this URL
    if (ongoingRequests.has(url)) {
      console.log('Reusing ongoing request for:', url);
      return await ongoingRequests.get(url);
    }
    
    // Create new request and cache it
    const requestPromise = fetch(url).then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      return data;
    }).finally(() => {
      // Remove from cache when request completes
      ongoingRequests.delete(url);
    });
    
    ongoingRequests.set(url, requestPromise);
    
    return await requestPromise;
    
  } catch (error) {
    console.error(`Error loading ${table} data:`, error);
    
    throw error;
  }
};

export const loadCountriesData = async () => {
  try {
    const response = await fetch('/countries.json');
    if (!response.ok) throw new Error('Failed to load countries data');
    return await response.json();
  } catch (error) {
    console.error('Error loading countries data:', error);
    return {};
  }
};

// Query data by location
export const queryByLocation = async (lat, lng, radius) => {
  try {
    const response = await fetch(
      `/.netlify/functions/queryByLocation?` +
      `lat=${lat}&lng=${lng}&radius=${radius}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    return data;
  } catch (error) {
    console.error('Error querying by location:', error);
    throw error;
  }
};

// Reverse geocode coordinates to get address and country info
export const reverseGeocode = async (lat, lng, language = null) => {
  try {
    const userLanguage = language || navigator.language || navigator.languages?.[0] || 'en';
    
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?` +
      `lat=${lat}&lon=${lng}&format=json&addressdetails=1&accept-language=${userLanguage}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      display_name: data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
      countryCode: data.address?.country_code?.toUpperCase() || null,
      country: data.address?.country || null,
      city: data.address?.city || data.address?.town || data.address?.village || null,
      state: data.address?.state || null,
      raw: data
    };
  } catch (error) {
    console.error('Error in reverse geocoding:', error);
    // Return fallback data
    return {
      display_name: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
      countryCode: null,
      country: null,
      city: null,
      state: null,
      raw: null
    };
  }
};

// Forward geocode address to get coordinates and location info
export const geocode = async (query, language = null, limit = 5) => {
  try {
    // Check if query is coordinates (lat,lng format)
    const coordMatch = query.match(/^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/);
    if (coordMatch) {
      const lat = parseFloat(coordMatch[1]);
      const lng = parseFloat(coordMatch[2]);
      
      if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        return [{
          id: 'coordinates',
          display_name: `Coordinates: ${lat}, ${lng}`,
          lat: lat,
          lon: lng,
          countryCode: null,
          type: 'coordinates'
        }];
      }
    }
    
    const userLanguage = language || navigator.language || navigator.languages?.[0] || 'en';
    
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?` +
      `q=${encodeURIComponent(query)}&` +
      `format=json&` +
      `addressdetails=1&` +
      `limit=${limit}&` +
      `extratags=1&` +
      `accept-language=${userLanguage}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    const results = data.map((item, index) => ({
      id: `${item.place_id || index}`,
      display_name: item.display_name,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      countryCode: item.address?.country_code?.toUpperCase(),
      type: item.type || 'place',
      importance: item.importance || 0,
      raw: item
    }));
    
    // Sort by importance
    results.sort((a, b) => (b.importance || 0) - (a.importance || 0));
    
    return results;
  } catch (error) {
    console.error('Error in geocoding:', error);
    return [];
  }
};