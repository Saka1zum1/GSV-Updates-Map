/**
 * Discord OAuth2 Configuration
 * Using Implicit Grant Flow for client-side authentication
 */

export const DISCORD_CONFIG = {
    // Discord OAuth2 Client ID - Replace with actual value or use environment variable
    CLIENT_ID: import.meta.env.VITE_DISCORD_CLIENT_ID || (() => {
        console.warn('VITE_DISCORD_CLIENT_ID not set. Please configure environment variables. See DISCORD_OAUTH_SETUP.md');
        return 'YOUR_DISCORD_CLIENT_ID';
    })(),
    
    // OAuth2 Redirect URI - Must match the one registered in Discord Developer Portal
    REDIRECT_URI: import.meta.env.VITE_DISCORD_REDIRECT_URI || `${window.location.origin}/report`,
    
    // OAuth2 Scopes - "identify" is sufficient to get user ID and username
    SCOPES: ['identify'],
    
    // Discord API endpoints
    API_ENDPOINTS: {
        AUTHORIZE: 'https://discord.com/api/oauth2/authorize',
        USER_INFO: 'https://discord.com/api/users/@me'
    },
    
    // Response type for Implicit Grant Flow
    RESPONSE_TYPE: 'token'
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
