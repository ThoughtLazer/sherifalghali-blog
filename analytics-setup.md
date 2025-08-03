# Azure Application Insights Setup Guide

## Prerequisites
- Azure Subscription
- Azure CLI installed and logged in
- Resource Group for your website resources

## Step 1: Create Application Insights Resource

```bash
# Set variables
RESOURCE_GROUP="your-resource-group-name"
APP_INSIGHTS_NAME="sherifalghali-blog-insights"
LOCATION="eastus"

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

## Step 3: Configure Environment Variables

1. Copy the connection string from Step 2
2. Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_APPINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key-here;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Step 4: Set up Google Analytics (Optional)

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property for your website
3. Get your Measurement ID (format: G-XXXXXXXXXX)
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
