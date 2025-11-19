# 🚀 Confluence OAuth 2.0 Setup Guide

This guide will help you set up OAuth 2.0 authentication for direct pushing to Confluence from the Markdown to Confluence Converter.

## Prerequisites

- A Confluence Cloud instance (OAuth 2.0 for Atlassian Cloud)
- Administrative or page creation permissions in your Confluence space
- An Atlassian account with developer access

## Step 1: Register an OAuth 2.0 Application

### Create OAuth App in Atlassian Developer Console

1. Go to [https://developer.atlassian.com/console/myapps/](https://developer.atlassian.com/console/myapps/)
2. Click **Create** → **OAuth 2.0 integration**
3. Enter an app name (e.g., "Markdown to Confluence Converter")
4. Click **Create**

### Configure OAuth 2.0 Settings

1. In your new app, go to **Settings** → **OAuth 2.0 (3LO)**
2. Click **Add** under "Callback URL"
3. Enter your callback URL:
   - **For local use**: `http://localhost:8080/` or wherever you're running the app
   - **For hosted**: `https://yourdomain.com/path/to/app/`
   - **Important**: The URL must match exactly where you access index.html
4. Click **Save changes**

### Get Client Credentials

1. In the app settings, find the **Client ID** and **Secret**
2. **Copy both** - you'll need these in the converter app
3. Keep the secret secure (treat it like a password)

### Set Permissions (Scopes)

1. Go to **Permissions** → **Add** → **Confluence API**
2. Select the following scopes:
   - ✅ `read:confluence-content.all` - Read Confluence content
   - ✅ `write:confluence-content` - Write and update pages
   - ✅ `read:confluence-space.summary` - Read space information
   - ✅ `read:confluence-props` - Read page properties
   - ✅ `write:confluence-file` - Upload attachments
3. Click **Save**

## Step 2: Find Your Confluence Information

### 1. Confluence URL
- **Confluence Cloud**: `https://your-domain.atlassian.net`
- Example: `https://mycompany.atlassian.net`
- **Note**: Don't include `/wiki` - just the base domain

### 2. Space Key
- Navigate to your Confluence space
- Look at the URL: `https://your-domain.atlassian.net/wiki/spaces/SPACEKEY/`
- The `SPACEKEY` is what you need (usually uppercase, e.g., `DEV`, `DOCS`, `TEAM`)

### 3. Parent Page ID (Optional)
If you want to create pages under a specific parent page:
- Navigate to the parent page
- Look at the URL: `https://your-domain.atlassian.net/wiki/spaces/SPACE/pages/123456/Page+Title`
- The number `123456` is the Page ID

### 4. Cloud ID (Auto-Detected)
- This will be automatically detected after OAuth authorization
- No manual action needed!

## Step 3: Configure the Application

1. Open the Markdown to Confluence Converter (`index.html`)
2. Fill in the **Confluence Configuration** section:
   - **Confluence URL**: Your Confluence base URL (e.g., `https://your-domain.atlassian.net`)
   - **OAuth Client ID**: From Step 1
   - **OAuth Client Secret**: From Step 1
   - **Space Key**: The space where you want to create/update pages (e.g., `DEV`)
   - **Page Title**: The title for your page (or leave it to use the filename)
   - **Parent Page ID**: (Optional) The ID of the parent page

3. Click **💾 Save Config** to save these settings for future use

## Step 4: Authorize with Confluence

1. After saving your config, click **🔐 Authorize with Confluence**
2. You'll be redirected to Atlassian's authorization page
3. **Review the permissions** requested by the app
4. Click **Accept** to grant access
5. You'll be redirected back to the converter
6. The app will automatically:
   - Exchange the authorization code for access tokens
   - Retrieve your Cloud ID
   - Update the OAuth Status to "✓ Connected to Confluence"

### OAuth Status Indicators

- 🔴 **Not connected** - Need to authorize
- 🟢 **✓ Connected to Confluence** - Ready to push!

## Step 5: Push Content to Confluence

1. **Select a markdown file** with the file picker
2. Click **🔄 Process & Save Files** to convert your markdown
3. Click **🚀 Push to Confluence** to upload directly to Confluence

### What Happens When You Push:

✅ The app uses your OAuth access token for authentication

✅ Searches for an existing page with the same title
- If found: Updates the existing page (increments version)
- If not found: Creates a new page

✅ Uploads all draw.io diagrams as attachments

✅ Opens a link to view your page in Confluence

### Token Management

- **Access tokens** expire after 1 hour
- The app automatically **refreshes tokens** when needed
- **Refresh tokens** last for longer periods (typically months)
- If refresh fails, you'll need to re-authorize

## Understanding Confluence Storage Format

The application converts your markdown to **Confluence Storage Format**, which is the native format Confluence uses internally. This includes:

- **Headings** → Confluence heading tags
- **Lists** → Confluence list macros
- **Code blocks** → Confluence code macro with syntax highlighting
- **Tables** → Confluence table format
- **Mermaid diagrams** → draw.io macro with embedded XML

## Troubleshooting

### Error: "OAuth error: access_denied"
❌ **Problem**: User denied authorization or app lacks permissions
✅ **Solution**: 
- Click Authorize again and accept the permissions
- Check your OAuth app has the required Confluence scopes
- Verify your Atlassian account has access to Confluence

### Error: "Token exchange failed"
❌ **Problem**: Invalid client credentials or callback URL mismatch
✅ **Solution**:
- Verify Client ID and Secret are correct (no extra spaces)
- Ensure callback URL in Developer Console matches your app URL exactly
- Check you're accessing the app from the registered URL

### Error: "No accessible Confluence sites found"
❌ **Problem**: OAuth worked but no Confluence sites accessible
✅ **Solution**:
- Verify your Atlassian account has access to at least one Confluence site
- Check the OAuth scopes include Confluence permissions
- Make sure Confluence is enabled for your organization

### Error: "Confluence API error: 401"
❌ **Problem**: OAuth token expired or invalid
✅ **Solution**: 
- Click **Disconnect** and then **Authorize** again
- The app should auto-refresh tokens, but re-authorization may be needed
- Check your OAuth app is still active in Developer Console

### Error: "Confluence API error: 403"
❌ **Problem**: Permission denied
✅ **Solution**:
- Ensure OAuth app has all required Confluence scopes
- Verify you have permission to create/edit pages in the space
- Re-authorize to ensure latest permissions

### Error: "Confluence API error: 404"
❌ **Problem**: Space or parent page not found
✅ **Solution**:
- Verify your Space Key is correct
- Check the Parent Page ID exists
- Ensure the Cloud ID is correct (should auto-populate)

### Error: CORS issues
❌ **Problem**: Browser blocking requests
✅ **Solution**:
- OAuth 2.0 uses Atlassian's API which has proper CORS headers
- If issues persist, check browser console for specific errors
- Ensure you're using HTTPS for hosted versions

### Diagrams Not Showing
❌ **Problem**: Draw.io diagrams not rendering
✅ **Solution**:
- Ensure the draw.io/diagrams.net plugin is installed in Confluence
- Check that attachments were uploaded successfully
- Verify diagram filenames match the references in the page

## Security Best Practices

⚠️ **Important Security Notes**:

1. **Never share your Client Secret** - treat it like a password
2. **Don't commit secrets to git** - they're stored in browser localStorage only
3. **Use specific scopes** - only grant permissions your app needs
4. **Rotate credentials regularly** - regenerate secrets in Developer Console periodically
5. **Register specific callback URLs** - don't use wildcards in production
6. **Clear browser data carefully** - localStorage will lose tokens and config
7. **HTTPS for production** - always use HTTPS for OAuth callback URLs in production
8. **Monitor OAuth app usage** - check Developer Console for suspicious activity

## API Rate Limits

Confluence Cloud has rate limits:
- **Confluence Cloud**: ~200 requests per minute
- This app makes 2-5 requests per push (depending on number of attachments)
- You're unlikely to hit limits with normal usage

## Advanced Configuration

### Custom Page Templates

To use a Confluence page template, you need to modify the `createPage` function in `app.js` to include the template ID.

### Bulk Operations

For processing multiple markdown files:
1. Process each file individually
2. Use different page titles for each
3. Consider using a common parent page

### Programmatic Updates

You can automate updates by:
- Pre-filling the config fields via URL parameters
- Using browser automation tools like Puppeteer
- Creating a Node.js script that uses the same API calls

## Examples

### Example Configuration

```
Confluence URL: https://mycompany.atlassian.net
OAuth Client ID: ABC123xyz789
OAuth Client Secret: ****************
Cloud ID: (auto-populated after authorization)
Space Key: DEV
Page Title: API Documentation
Parent Page ID: 123456789
OAuth Status: ✓ Connected to Confluence
```

### Example Use Cases

1. **Documentation Updates**: Update your docs directly from markdown files
2. **Meeting Notes**: Convert markdown meeting notes to Confluence
3. **Technical Specs**: Push technical diagrams and specifications
4. **Team Wikis**: Maintain team knowledge base from markdown
5. **Automated Docs**: Integrate with CI/CD to push docs automatically

## Limitations

- **Confluence Markup**: Some advanced Confluence macros aren't supported
- **Attachments**: Only draw.io diagrams are automatically uploaded
- **Images**: External images in markdown need to be uploaded separately
- **Permissions**: Can't modify page permissions via this tool
- **Comments**: Doesn't preserve or create page comments

## Getting Help

If you encounter issues:

1. Check the browser console (F12) for detailed error messages
2. Verify all configuration values are correct
3. Test with a simple markdown file first
4. Check Confluence's status page for outages
5. Review the Confluence REST API documentation: [https://developer.atlassian.com/cloud/confluence/rest/](https://developer.atlassian.com/cloud/confluence/rest/)

## Next Steps

Once you have everything set up:
- ✅ Process and push your first page
- ✅ Save your configuration for future use
- ✅ Explore the draw.io integration
- ✅ Consider automating your workflow

---

**Ready to push to Confluence!** 🎉
