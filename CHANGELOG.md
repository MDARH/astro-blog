# Changelog

All notable changes to SomaDhanTech Blog will be documented in this file.

## [2.7.0] - 2025-09-04

### Workflow Simplification
- **Removed Build Steps**: Eliminated Node.js setup, dependency installation, and build steps from GitHub workflow
- **Manual Build Process**: Changed to manual build process where developer runs `npm run build` locally
- **Dist Directory Tracking**: Removed `dist/` from .gitignore to allow committing built files to repository
- **Simplified Deployment**: GitHub Actions now only syncs pre-built files from the repository
- **Faster CI/CD**: Reduced workflow execution time by removing build dependencies

### Technical Changes
- **Updated GitHub Workflow**: Streamlined workflow to only checkout code and sync files
- **Git Tracking**: Built files in dist directory are now version controlled
- **Manual Control**: Developer has full control over when builds are created and deployed

## [2.6.0] - 2025-09-04

### Deployment Optimization
- **Dist-Only Deployment**: Modified GitHub workflow to deploy only the dist directory to cPanel server
- **Reduced Upload Size**: Eliminated unnecessary source files, configuration files, and dependencies from deployment
- **Optimized FTP Sync**: Added local-dir parameter to sync only built files instead of entire project
- **Simplified Exclusions**: Removed extensive exclude patterns since only dist directory is now deployed
- **Enhanced Security**: Source code and configuration files are no longer exposed on the production server

### Technical Improvements
- **Faster Deployments**: Significantly reduced deployment time by uploading only essential built files
- **Better Resource Management**: Server storage optimized by excluding development dependencies
- **Cleaner Production Environment**: Only production-ready files are deployed to the server

## [2.5.0] - 2024-12-28

### Content Management Migration
- **Migrated from JSON to Markdown**: Converted all site content from JSON format to markdown-based content collections
- **New Content Collections**: Created dedicated collections for site data, categories, and advertisements
- **Enhanced Content Structure**: Organized content into logical collections (site, categories, ads) with proper schemas
- **Improved Content Management**: Content is now managed through markdown files with frontmatter for better maintainability

### Content Collections
- **Site Collection**: Hero section, newsletter, and footer configuration in markdown format
- **Categories Collection**: Technology categories (hosting, domains, tutorials, digital products) with structured metadata
- **Ads Collection**: Advertisement management with type, position, and activation controls
- **Enhanced Schema Validation**: Comprehensive Zod schemas for all content types

### Technical Improvements
- **Updated Content Config**: Enhanced content.config.ts with new collection definitions and schemas
- **Removed JSON Dependencies**: Eliminated content.json file and API endpoint for cleaner architecture
- **Component Updates**: Updated index.astro and Footer.astro to use content collections
- **Better Type Safety**: Improved type checking with Astro content collections

### Developer Experience
- **Markdown-First Approach**: All content now editable in markdown format for better version control
- **Function-Level Documentation**: Added comprehensive comments for content collection functions
- **Structured Content**: Organized content files in logical directory structure
- **Schema Validation**: Runtime validation of content structure and types

### Removed Features
- **JSON API Endpoint**: Removed /api/content.json endpoint as content is now handled by collections
- **Legacy JSON Import**: Eliminated direct JSON imports in favor of content collections
- **Static Content Data**: Replaced static JSON with dynamic markdown-based content

## [2.4.0] - 2024-12-28

### GitHub Actions & Deployment
- **Updated GitHub Workflow**: Enhanced deployment workflow with automated build process
- **Build Integration**: Added Node.js setup, dependency installation, and build steps to CI/CD pipeline
- **Optimized File Exclusions**: Updated exclude patterns to only upload necessary build files (dist directory)
- **Removed Unknown Directories**: Cleaned up workflow by removing references to non-existent directories (/resources/js/, /MobileApp/)
- **Added Development File Exclusions**: Excluded source files, configuration files, and development dependencies from deployment

### Bug Fixes
- **Fixed API Endpoint**: Resolved duplicate GET function declaration in content.json.js API endpoint
- **Improved API Documentation**: Enhanced function-level comments for better code maintainability
- **Build Process**: Fixed build errors preventing successful deployment

### Technical Improvements
- **Deployment Optimization**: Only essential build output (dist directory) is now uploaded to production
- **CI/CD Enhancement**: Automated build process ensures consistent deployments
- **Code Quality**: Improved API endpoint structure and error handling

## [2.3.0] - 2024-01-30

### Major Framework Integration
- **TailwindCSS Integration**: Added TailwindCSS framework with @astrojs/tailwind integration
- **Modern Utility-First Styling**: Replaced custom CSS with Tailwind utility classes for better maintainability
- **Enhanced Design System**: Implemented consistent spacing, colors, and responsive design patterns
- **Improved Developer Experience**: Faster styling with utility classes and better code organization

### Component Refactoring
- **MobileMenu Redesign**: Completely refactored MobileMenu component using TailwindCSS
- **Modern Mobile UI**: Enhanced mobile menu with better spacing, animations, and visual hierarchy
- **Dark Mode Support**: Improved dark mode implementation with Tailwind's dark: variants
- **Responsive Design**: Better mobile-first responsive design patterns

### Technical Improvements
- **Build Optimization**: TailwindCSS purging for smaller bundle sizes
- **Custom Color Palette**: Extended Tailwind config with brand colors
- **Typography System**: Integrated @tailwindcss/typography for better content styling
- **Animation System**: Smooth transitions and animations using Tailwind utilities

### Git Integration
- **Repository Setup**: Initialized Git repository and connected to GitHub
- **Version Control**: Committed all changes with proper commit messages
- **Remote Tracking**: Set up remote origin and pushed to main branch

## [2.2.1] - 2024-01-30

### Bug Fixes
- **Fixed Hamburger Icon**: Corrected hamburger menu to display three distinct lines instead of overlapping single line
- **Removed Social Links**: Cleaned up header by removing social media links from desktop and mobile views
- **Fixed Category Links**: Updated category links to point to `/blog` instead of non-existent category pages
- **Improved Hamburger Styling**: Enhanced spacing and visibility of hamburger menu lines

## [2.2.0] - 2024-01-30

### Major UI/UX Improvements
- **Green Checkmark Favicon**: Created modern green SVG checkmark favicon with gradient and shadow effects
- **Mobile-First Header Redesign**: Completely redesigned header with centered logo, hamburger menu, and optimized mobile layout
- **Sticky Header with Animations**: Implemented smooth sticky header behavior with scroll-based animations and backdrop blur
- **Mobile Responsive Overhaul**: Fixed layout issues across all screen sizes with improved breakpoints and touch-friendly design
- **Social Share Integration**: Added comprehensive social sharing for blog posts (Twitter, Facebook, LinkedIn, WhatsApp, Copy Link)
- **Enhanced Light Mode**: Improved color contrast and accessibility with better color palette

### Navigation & Content Updates
- **Streamlined Navigation**: Removed Subscribe and About links for cleaner header design
- **Mobile Menu System**: Created slide-out mobile menu with smooth animations and touch gestures
- **Social Media Integration**: Replaced newsletter subscription with social media follow buttons
- **Content Restructuring**: Updated hero section and call-to-action buttons for better user flow

### Technical Enhancements
- **Header Script Component**: Centralized JavaScript for header functionality and scroll effects
- **Mobile Menu Component**: Reusable mobile navigation with accessibility features
- **Social Share Component**: Feature-rich sharing component with analytics tracking
- **Improved CSS Variables**: Enhanced theming system with better color management
- **Performance Optimizations**: Reduced layout shifts and improved animation performance

### Accessibility & UX
- **Keyboard Navigation**: Full keyboard support for mobile menu and social sharing
- **Touch Gestures**: Optimized touch interactions for mobile devices
- **Screen Reader Support**: Enhanced ARIA labels and semantic HTML structure
- **Visual Feedback**: Improved hover states and interactive element feedback
- **Smooth Scrolling**: Added smooth scroll behavior for anchor links

## [2.1.0] - 2024-01-30

### Added
- **Custom 404 Page**: Created professional 404 Not Found page with SomaDhanTech branding
- **Interactive 404 Design**: Animated SVG illustration with floating elements
- **Helpful Navigation**: Quick access buttons to Home, Blog, and Go Back functionality
- **Popular Pages Section**: Links to most important content for lost users
- **Keyboard Shortcuts**: Accessibility features with Escape and H key navigation
- **404 Analytics**: Built-in tracking for 404 errors and user behavior

## [2.0.0] - 2024-01-30

### Major Updates
- **Complete Rebranding**: Changed from BD Apex to SomaDhanTech with new SVG logo
- **JSON-Based Content Management**: Moved all content to JSON files with API-style fetching
- **Advertisement System**: Added comprehensive ad management with multiple ad types and positions
- **Enhanced Layout**: Improved spacing, typography, and responsive design
- **Go to Top Button**: Added smooth scroll-to-top functionality
- **Sidebar Layout**: Implemented content-sidebar layout for better ad placement

### Added
- **SVG Logo Component**: Custom animated SomaDhanTech logo with tech elements
- **AdBanner Component**: Flexible advertisement component with multiple layouts (banner, horizontal, square)
- **GoToTop Component**: Smooth scroll-to-top button with visibility controls
- **JSON Content API**: RESTful API endpoint at `/api/content.json` for dynamic content
- **Content Management**: Centralized content in `src/data/content.json`
- **Ad Tracking**: Basic impression and click tracking for advertisements
- **Sticky Header**: Enhanced header with backdrop blur and sticky positioning
- **Improved Typography**: Better font sizing and gradient text effects

### Changed
- **Site Branding**: Updated all references from BD Apex to SomaDhanTech
- **Layout Structure**: Redesigned homepage with sidebar for ads and better content organization
- **Hero Section**: Enhanced with gradient text, better spacing, and improved visuals
- **Responsive Design**: Improved mobile experience with better breakpoints
- **Color Scheme**: Enhanced dark/light mode with better contrast and accessibility
- **Font Size**: Reduced base font size from 20px to 18px for better readability
- **Main Layout**: Removed fixed width constraints for full-width design

### Technical Improvements
- **API Integration**: Content now fetched from JSON API for future Laravel integration
- **Component Architecture**: Better separation of concerns with reusable components
- **CSS Custom Properties**: Added missing CSS variables for consistent theming
- **Smooth Scrolling**: Added smooth scroll behavior for better UX
- **Performance**: Optimized layout shifts and improved loading performance

### Advertisement Features
- **Multiple Ad Types**: Banner, horizontal, and square ad formats
- **Strategic Placement**: Sidebar, content, and footer ad positions
- **Responsive Ads**: Ads adapt to different screen sizes
- **Hover Effects**: Interactive animations and visual feedback
- **Tracking Ready**: Built-in impression and click tracking infrastructure

### SEO & Accessibility
- **Updated Meta Tags**: Refreshed all meta descriptions and titles
- **Structured Data**: Enhanced JSON-LD for better search engine understanding
- **Accessibility**: Improved ARIA labels and keyboard navigation
- **Social Media**: Updated Open Graph and Twitter Card metadata

## [1.0.0] - 2024-01-30

### Added
- **Initial Release**: Complete blog website built with Astro technology
- **Blog System**: Full-featured blog with content management using Astro's content collections
- **Dark/Light Mode**: Theme toggle functionality with persistent user preference
- **Responsive Design**: Mobile-first responsive design that works on all devices
- **SEO Optimization**: Comprehensive SEO implementation including:
  - Meta tags for social media (Open Graph, Twitter Cards)
  - Structured data (JSON-LD) for articles and breadcrumbs
  - Sitemap.xml generation
  - Robots.txt configuration
  - Canonical URLs and proper meta descriptions
- **Subscription System**: Newsletter subscription form with user interest selection
- **Content Categories**: Organized content by technology topics:
  - Web Hosting guides and tutorials
  - Domain management best practices
  - Programming tutorials (React, JavaScript, etc.)
  - Digital product development strategies
  - Cloud computing and DevOps practices

### Blog Posts Created
- "Choosing the Right Web Hosting for Your Business" - Comprehensive hosting guide
- "Domain Name Best Practices: Building Your Digital Identity" - Domain management strategies
- "React Hooks: A Complete Guide for Modern Development" - Advanced React tutorial
- "Building Successful Digital Products in 2024" - Product development guide
- "Cloud DevOps Best Practices: Streamlining Development and Deployment" - DevOps strategies

### Technical Features
- **Framework**: Astro v5.13.5 with TypeScript support
- **Styling**: Custom CSS with CSS custom properties for theming
- **Images**: Picsum integration for placeholder images
- **Performance**: Optimized loading with image optimization and preloading
- **Accessibility**: WCAG compliant with proper ARIA labels and semantic HTML
- **Security**: Content Security Policy headers and secure defaults

### Components
- **Header**: Navigation with theme toggle and social links
- **Footer**: Multi-column footer with links and social media
- **BaseHead**: Enhanced SEO component with structured data
- **ThemeToggle**: Dark/light mode switcher with system preference detection
- **FormattedDate**: Consistent date formatting across the site

### Pages
- **Homepage**: Hero section, featured posts, categories, and newsletter CTA
- **Blog Index**: Complete blog post listing with pagination
- **Individual Blog Posts**: Optimized blog post layout with SEO metadata
- **About Page**: Company information and team details
- **Subscribe Page**: Newsletter subscription with interest selection
- **Sitemap**: Dynamic XML sitemap generation
- **Robots.txt**: Search engine crawling instructions

### SEO Enhancements
- Schema.org structured data for articles and organization
- Open Graph and Twitter Card meta tags
- Breadcrumb navigation with structured data
- Optimized meta descriptions and titles
- Canonical URL implementation
- XML sitemap with proper priorities and change frequencies

### Performance Optimizations
- Image lazy loading and optimization
- CSS and JavaScript minification
- Font preloading for better performance
- Efficient CSS custom properties for theming
- Minimal JavaScript for enhanced performance

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

### Development Features
- Hot module replacement for development
- TypeScript support throughout
- ESLint and Prettier configuration
- Git integration with proper .gitignore
- NPM scripts for development and production builds

---

## Future Enhancements (Planned)

### Version 2.1.0
- [ ] Laravel API Integration
- [ ] Advanced ad management dashboard
- [ ] Real-time content updates
- [ ] Enhanced analytics and reporting
- [ ] A/B testing for ads

### Version 2.2.0
- [ ] Search functionality
- [ ] Comment system integration
- [ ] Related posts suggestions
- [ ] Reading time estimation
- [ ] Social sharing buttons

### Version 3.0.0
- [ ] Multi-language support
- [ ] Advanced filtering and tagging
- [ ] Author profiles and bio pages
- [ ] Newsletter integration with email service
- [ ] User authentication and profiles
- [ ] E-commerce integration for digital products

---

**Note**: This changelog follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format and adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).