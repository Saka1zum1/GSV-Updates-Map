/**
 * Determine the correct redirect URI based on current environment
 */
const getRedirectUri = () => {
    // If explicitly set in environment, use it
    if (import.meta.env.VITE_DISCORD_REDIRECT_URI) {
        return import.meta.env.VITE_DISCORD_REDIRECT_URI;
    }

    // Auto-detect based on current location
    const origin = window.location.origin;
    
    // For localhost/127.0.0.1 development, always use http://localhost:8888 (Netlify Dev)
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
        return 'http://localhost:8888';
    }
    
    // For production, use the current origin (main page)
    return origin;
};

export const DISCORD_CONFIG = {
    // Discord OAuth2 Client ID - Must be set via environment variable
    CLIENT_ID: import.meta.env.VITE_DISCORD_CLIENT_ID || (() => {
        console.error(
            '❌ Discord Client ID is not configured!\n' +
            'Please set VITE_DISCORD_CLIENT_ID in your .env.local file.\n' +
            'Get your Client ID from: https://discord.com/developers/applications'
        );
        return 'YOUR_DISCORD_CLIENT_ID';
    })(),
    
    // OAuth2 Redirect URI - Automatically determined based on environment
    REDIRECT_URI: getRedirectUri(),
    
    // OAuth2 Scopes - "identify" is sufficient to get user ID and username
    SCOPES: ['identify'],
    
    // Discord API endpoints
    API_ENDPOINTS: {
        AUTHORIZE: 'https://discord.com/api/oauth2/authorize',
        USER_INFO: 'https://discord.com/api/users/@me'
    },
    
    // Response type for Implicit Grant Flow
    RESPONSE_TYPE: 'token',
    
    // Pre-computed Authorization URL
    get AUTH_URL() {
        const params = new URLSearchParams({
            client_id: this.CLIENT_ID,
            redirect_uri: this.REDIRECT_URI,
            response_type: this.RESPONSE_TYPE,
            scope: this.SCOPES.join(' ')
        });
        return `${this.API_ENDPOINTS.AUTHORIZE}?${params.toString()}`;
    }
};

/**
 * Generate Discord OAuth2 authorization URL
 * @returns {string} Authorization URL
 */
export function getAuthorizationUrl() {
    const params = new URLSearchParams({
        client_id: DISCORD_CONFIG.CLIENT_ID,
        redirect_uri: DISCORD_CONFIG.REDIRECT_URI,
        response_type: DISCORD_CONFIG.RESPONSE_TYPE,
        scope: DISCORD_CONFIG.SCOPES.join(' ')
    });
    
    return `${DISCORD_CONFIG.API_ENDPOINTS.AUTHORIZE}?${params.toString()}`;
}

export default DISCORD_CONFIG;
