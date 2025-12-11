# Azure Application Insights Setup Guide for Static Web App

## Prerequisites
- Azure Subscription
- Azure CLI installed and logged in
- Resource Group for your website resources
- Azure Static Web Apps configured

## Step 1: Create Application Insights Resource

```bash
# Set variables
RESOURCE_GROUP="your-resource-group-name"
APP_INSIGHTS_NAME="sherifalghali-blog-insights"
LOCATION="southcentralus"

# Create Application Insights resource
az monitor app-insights component create \
  --app $APP_INSIGHTS_NAME \
  --location $LOCATION \
  --resource-group $RESOURCE_GROUP \
  --application-type web \
  --kind web
```

## Step 2: Get Connection String

```bash
# Get the connection string
az monitor app-insights component show \
  --app $APP_INSIGHTS_NAME \
  --resource-group $RESOURCE_GROUP \
  --query connectionString \
  --output tsv
```

## Step 3: Configure Environment Variables for Static Web App

### For Local Development:
1. Copy `.env.example` to `.env.local`
2. Add your connection string:

```env
NEXT_PUBLIC_APPINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key-here;IngestionEndpoint=https://southcentralus-3.in.applicationinsights.azure.com/;LiveEndpoint=https://southcentralus.livediagnostics.monitor.azure.com/
```

### For Azure Static Web Apps Production:
1. Go to your Static Web App in Azure Portal
2. Navigate to Configuration
3. Add Application Setting:
   - **Name**: `NEXT_PUBLIC_APPINSIGHTS_CONNECTION_STRING`
   - **Value**: Your connection string from Step 2

## Step 4: Build and Deploy Static Web App

```bash
# Build for static export
npm run build

# The output will be in the 'out' directory
# This directory should be deployed to Azure Static Web Apps
```

## Step 5: Verify Configuration

After deployment:
1. Visit your deployed site
2. Open browser developer tools (F12)
3. Check console for Application Insights initialization messages
4. Navigate between pages to generate telemetry
5. Check Application Insights dashboard after 5-10 minutes

## Static Web App Specific Configuration

### CSP Headers (staticwebapp.config.json)
Ensure your `public/staticwebapp.config.json` includes Application Insights domains:

```json
{
  "globalHeaders": {
    "Content-Security-Policy": "connect-src 'self' https://*.in.applicationinsights.azure.com https://*.livediagnostics.monitor.azure.com https://*.applicationinsights.azure.com;"
  }
}
```

### Key Features Enabled:
- ✅ Page View Tracking
- ✅ Custom Event Tracking (Article Views, Engagement)
- ✅ Performance Monitoring
- ✅ Error Tracking
- ✅ User Session Analytics
4. Add it to your `.env.local` file

## Step 5: Deploy and Test

After deploying your updated site, you can monitor analytics in:

### Application Insights Dashboard
- Go to Azure Portal
- Navigate to your Application Insights resource
- View metrics in:
  - **Usage** > **Users** - Track unique visitors
  - **Usage** > **Page views** - Track page views
  - **Usage** > **Events** - Track custom events (article views, engagement)
  - **Application Map** - Visualize dependencies
  - **Live Metrics** - Real-time monitoring

### Key Metrics to Monitor
1. **Page Views** - Most popular pages/articles
2. **User Sessions** - User engagement patterns
3. **Custom Events** - Article views and engagement
4. **Performance** - Page load times
5. **Failures** - Any errors or exceptions

### Creating Custom Dashboards

You can create custom dashboards in Azure Portal to monitor:
- Top 10 most viewed articles
- Traffic sources and referrers
- User engagement metrics
- Performance trends over time

### Kusto Queries for Analytics

Use these queries in Application Insights Logs:

```kusto
// Top 10 most viewed articles
customEvents
| where name == "ArticleView"
| summarize ViewCount = count() by tostring(customDimensions.title)
| top 10 by ViewCount desc

// User engagement by article
customEvents
| where name == "ArticleEngagement"
| summarize EngagementEvents = count() by tostring(customDimensions.title)
| top 10 by EngagementEvents desc

// Traffic sources
pageViews
| summarize Sessions = dcount(session_Id) by client_Browser, client_OS
| order by Sessions desc
```

## Cost Considerations

Application Insights pricing is based on data ingestion:
- First 5GB per month: Free
- Additional data: ~$2.30 per GB

For a personal blog, you should easily stay within the free tier.
