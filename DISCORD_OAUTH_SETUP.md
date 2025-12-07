# Discord OAuth2 Setup Guide

This guide will help you set up Discord OAuth2 for the Annual Report feature.

## Prerequisites

- A Discord account
- Access to [Discord Developer Portal](https://discord.com/developers/applications)

## Step-by-Step Setup

### 1. Create a Discord Application

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **"New Application"** button
3. Enter a name for your application (e.g., "GSV Updates Map")
4. Accept the Terms of Service
5. Click **"Create"**

### 2. Configure OAuth2 Settings

1. In your application settings, click **"OAuth2"** in the left sidebar
2. Click on **"OAuth2"** (not OAuth2 URL Generator)
3. In the **"Redirects"** section, click **"Add Redirect"**
4. Add your redirect URI(s):
   - **Development**: `http://localhost:5173/report`
   - **Production**: `https://yourdomain.com/report`
5. Click **"Save Changes"**

### 3. Get Your Client ID

1. Go to **"OAuth2"** → **"General"** section
2. Copy your **"Client ID"** (you'll need this for environment variables)

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env` in your project root:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Discord Client ID:
   ```env
   VITE_DISCORD_CLIENT_ID=your_client_id_here
   VITE_DISCORD_REDIRECT_URI=http://localhost:5173/report
   ```

3. For production, update the redirect URI to your production domain

### 5. Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:5173/report`

3. Click "Login with Discord"

4. You should be redirected to Discord's authorization page

5. After authorizing, you'll be redirected back to your application

## Important Notes

### Security

- **Never commit your `.env` file** - it's already in `.gitignore`
- Keep your Client ID secure but note it's not sensitive (it's sent to the client)
- Never share or commit your Client Secret (not needed for Implicit Flow)

### Redirect URIs

- The redirect URI in your `.env` must **exactly match** the one in Discord settings
- Include the protocol (`http://` or `https://`)
- Include the port for development (`:5173`)
- No trailing slashes

### OAuth2 Flow

This implementation uses the **Implicit Grant Flow**, which:
- Doesn't require a client secret
- Tokens are only valid for the current session
- Best for client-side applications
- Tokens are not stored permanently

### Rate Limits

Discord API has rate limits:
- 50 requests per second per IP
- Additional per-route limits
- Handle 429 responses appropriately

## Troubleshooting

### "Invalid Redirect URI"

**Problem**: Discord shows an error about invalid redirect URI

**Solution**:
- Verify the URI in `.env` exactly matches Discord settings
- Check for typos, extra spaces, or trailing slashes
- Ensure protocol (http/https) matches

### "Invalid Client"

**Problem**: Can't authenticate with Discord

**Solution**:
- Verify `VITE_DISCORD_CLIENT_ID` is correct
- Check that your Discord application is not deleted
- Ensure environment variables are loaded (restart dev server)

### Can't See Environment Variables

**Problem**: Application shows "YOUR_DISCORD_CLIENT_ID"

**Solution**:
- Make sure you created the `.env` file
- Restart your development server (`npm run dev`)
- Verify `.env` is in the project root
- Check that variable names start with `VITE_`

### Authorization Works But No Data Shows

**Problem**: Login successful but no report appears

**Solution**:
- Check browser console for errors
- Verify `public/data/user_annual_report_2024.json` exists
- Ensure your Discord user ID is in the JSON data
- Check that JSON structure matches expected format

## Production Deployment

### Netlify

1. Go to Site Settings → Build & Deploy → Environment
2. Add environment variables:
   ```
   VITE_DISCORD_CLIENT_ID=your_client_id
   VITE_DISCORD_REDIRECT_URI=https://yourdomain.com/report
   ```
3. Update Discord application redirect URI
4. Redeploy your site

### Vercel

1. Go to Project Settings → Environment Variables
2. Add variables for Production:
   ```
   VITE_DISCORD_CLIENT_ID=your_client_id
   VITE_DISCORD_REDIRECT_URI=https://yourdomain.com/report
   ```
3. Update Discord application redirect URI
4. Redeploy

### Other Platforms

Most platforms support environment variables through their dashboard or CLI. Consult your platform's documentation for specifics.

## Testing Without Discord Application

If you want to test the UI without setting up Discord OAuth:

1. Create a mock user object in `AnnualReportPage.jsx`:
   ```javascript
   // For testing only - remove in production
   useEffect(() => {
       setUser({ id: '123456789012345678', username: 'TestUser' });
       // Load and set userReport...
   }, []);
   ```

2. This bypasses authentication but requires your user ID in the test data

## Additional Resources

- [Discord OAuth2 Documentation](https://discord.com/developers/docs/topics/oauth2)
- [Discord Developer Portal](https://discord.com/developers/applications)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

## Support

If you encounter issues not covered here:

1. Check the browser console for errors
2. Review Discord Developer Portal audit logs
3. Verify network requests in browser dev tools
4. Check that all files were created correctly

## Example Complete Setup

Here's what a working setup looks like:

**Discord Application**:
- Name: "GSV Updates Map"
- Redirect URIs: 
  - `http://localhost:5173/report`
  - `https://gsv-map.example.com/report`

**.env file**:
```env
VITE_DISCORD_CLIENT_ID=1234567890123456789
VITE_DISCORD_REDIRECT_URI=http://localhost:5173/report
```

**Production Environment Variables**:
```
VITE_DISCORD_CLIENT_ID=1234567890123456789
VITE_DISCORD_REDIRECT_URI=https://gsv-map.example.com/report
```

That's it! You should now have a working Discord OAuth2 setup for the Annual Report feature.
