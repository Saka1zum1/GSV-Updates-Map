import { DISCORD_CONFIG } from '../config/discord.js';

/**
 * Parse access token from URL hash
 * Discord OAuth2 Implicit Flow returns token in URL hash
 * @returns {string|null} Access token or null if not found
 */
export function parseAccessTokenFromHash() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return params.get('access_token');
}

/**
 * Clear access token from URL hash
 */
export function clearAccessTokenFromUrl() {
    // Remove hash from URL without reloading the page
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
}

/**
 * Fetch Discord user information using access token
 * @param {string} accessToken - Discord OAuth2 access token
 * @returns {Promise<Object>} User information object
 * @throws {Error} If request fails
 */
export async function fetchDiscordUser(accessToken) {
    const response = await fetch(DISCORD_CONFIG.API_ENDPOINTS.USER_INFO, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    
    if (!response.ok) {
        throw new Error(`Failed to fetch user info: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
}

/**
 * Load annual report data from backend API
 * @param {string} userId - Discord user ID
 * @param {number} year - Report year (e.g., 2025)
 * @param {string} type - Optional report type ("update" or "spot")
 * @returns {Promise<Array>} Array of annual reports
 * @throws {Error} If request fails or no data found
 */
export async function loadAnnualReportData(userId, year = 2025, type = null) {
    try {
        // Determine the correct base URL based on environment
        const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const baseUrl = isDevelopment ? 'http://localhost:8888' : '';
        
        let url = `${baseUrl}/.netlify/functions/getAnnualReport?userId=${encodeURIComponent(userId)}&year=${year}`;
        if (type) {
            url += `&type=${encodeURIComponent(type)}`;
        }

        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const error = new Error(errorData.error || `Failed to load annual report data: ${response.status} ${response.statusText}`);
            error.status = response.status;
            throw error;
        }
        
        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error('Annual report data must be an array');
        }
        
        // Backend already flattened the content field, return as-is
        return data;
    } catch (error) {
        console.error('Error loading annual report data:', error);
        // Re-throw to let caller handle the error appropriately
        throw error;
    }
}

/**
 * Find user's annual report by Discord ID
 * @param {Array} reports - Array of annual reports
 * @param {string} userId - Discord user ID
 * @returns {Object|null} User's annual report or null if not found
 */
export function findUserReport(reports, userId) {
    if (!Array.isArray(reports) || !userId) {
        return null;
    }
    
    return reports.find(report => report.author_id === userId) || null;
}

/**
 * Check if user has sufficient data for full report
 * @param {Object} report - Annual report object
 * @param {number} threshold - Minimum data threshold (default: 10)
 * @returns {boolean} True if user has sufficient data
 */
export function hasSufficientData(report, threshold = 10) {
    if (!report || typeof report.total_count !== 'number') {
        return false;
    }
    
    return report.total_count >= threshold;
}

/**
 * Format date string to readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export function formatDate(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Get weekday name from number
 * Note: Uses custom numbering where 0=Monday (not JavaScript's 0=Sunday convention)
 * This matches the backend data structure from VirtualStreets/virtualstreets-update-bot
 * @param {number} day - Day number (0-6, where 0=Monday, 6=Sunday)
 * @returns {string} Weekday name
 */
export function getWeekdayName(day) {
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return weekdays[day] || '';
}

/**
 * Get month name from number (1-12)
 * @param {number} month - Month number (1-12)
 * @returns {string} Month name
 */
export function getMonthName(month) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1] || '';
}
