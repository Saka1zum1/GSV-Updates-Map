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
 * Load annual report data from JSON file
 * @param {number} year - Report year (e.g., 2024)
 * @returns {Promise<Array>} Array of annual reports
 */
export async function loadAnnualReportData(year = 2024) {
    try {
        const response = await fetch(`/data/user_annual_report_${year}.json`);
        
        if (!response.ok) {
            throw new Error(`Failed to load annual report data: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error loading annual report data:', error);
        return [];
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
 * Get weekday name from number (0-6, 0=Monday)
 * @param {number} day - Day number (0-6)
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
