import { getMonthTimestamp } from './constants.js';


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
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    return data;
    
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