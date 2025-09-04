# Analytics Setup Guide

This guide will help you set up Google Analytics (GA4) tracking for your Astro blog to monitor visitors, pageviews, and user interactions.

## 🚀 Quick Setup

### 1. Get Your Google Analytics ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property or use an existing one
3. Set up a GA4 data stream for your website
4. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Configure Analytics

Edit `src/config/analytics.ts`:

```typescript
export const ANALYTICS_CONFIG = {
  // Replace with your actual GA4 Measurement ID
  GOOGLE_ANALYTICS_ID: 'G-YOUR-ACTUAL-ID',
  
  // Enable analytics in development (optional)
  ENABLE_IN_DEV: false,
};
```

### 3. Deploy and Test

1. Build and deploy your site
2. Visit your website
3. Check Google Analytics Real-time reports to see if data is coming in

## 📊 What Gets Tracked

### Automatic Tracking
- **Page Views**: Every page visit
- **External Link Clicks**: Links to other websites
- **Scroll Depth**: 25%, 50%, 75%, 90% scroll milestones
- **Page Load Time**: Performance metrics

### Custom Event Tracking
- **Post Clicks**: When users click on blog posts
- **Search Queries**: Blog search functionality
- **Category Filters**: When users filter posts by category
- **Social Shares**: Social media sharing buttons

## 🛠️ Custom Event Usage

You can track custom events anywhere in your code:

```javascript
// Track a custom event
window.trackEvent('button_click', {
  button_name: 'subscribe',
  location: 'header'
});

// Track post clicks
window.trackPostClick('My Blog Post', '/blog/my-post', 'tutorial');

// Track search
window.trackSearch('react hooks', 5);

// Track category filtering
window.trackCategoryFilter('laravel', 12);

// Track social sharing
window.trackSocialShare('twitter', 'My Blog Post', '/blog/my-post');
```

## 📈 Analytics Dashboard

Once set up, you can view detailed analytics in your Google Analytics dashboard:

### Key Metrics to Monitor
- **Users**: Total and new visitors
- **Sessions**: Number of visits
- **Page Views**: Most popular content
- **Bounce Rate**: User engagement
- **Traffic Sources**: Where visitors come from
- **Device Types**: Mobile vs Desktop usage
- **Geographic Data**: Visitor locations

### Custom Reports
- **Content Performance**: Which blog posts are most popular
- **Search Behavior**: What users search for
- **Category Engagement**: Which categories get the most attention
- **External Link Clicks**: Which outbound links are clicked most

## 🔧 Advanced Configuration

### Custom Dimensions

You can set up custom dimensions in Google Analytics to track:
- Page categories (Blog, Tutorial, Guide)
- User types (New, Returning)
- Content groups

### Enhanced Ecommerce (Optional)

If you plan to sell digital products or courses, you can enable enhanced ecommerce tracking.

### Privacy Compliance

The analytics setup includes:
- Anonymized IP addresses
- Respect for Do Not Track headers
- GDPR-compliant data collection

## 🚫 Troubleshooting

### Analytics Not Working?

1. **Check the Measurement ID**: Ensure it's correct in `analytics.ts`
2. **Development Mode**: Analytics is disabled in development by default
3. **Ad Blockers**: Some users may have ad blockers that prevent tracking
4. **Real-time Reports**: Check Google Analytics real-time reports for immediate feedback

### Common Issues

- **No data in GA**: Wait 24-48 hours for data to appear in standard reports
- **Events not tracking**: Check browser console for JavaScript errors
- **Development testing**: Set `ENABLE_IN_DEV: true` to test locally

## 🔒 Privacy Considerations

- Analytics data is processed by Google according to their privacy policy
- Consider adding a privacy policy to your website
- Users can opt-out using browser settings or extensions
- All tracking respects user privacy preferences

## 📚 Additional Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [GA4 Event Tracking Guide](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Privacy and GDPR Compliance](https://support.google.com/analytics/answer/9019185)

---

**Need Help?** Check the Google Analytics Help Center or consult the GA4 documentation for advanced configuration options.