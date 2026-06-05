# TODO & Improvement Ideas

## Features to Add
- [ ] Smart search suggestions (temporarily removed) - re-implement with better filtering
- [ ] Bookmarks management UI with tags/categories
- [ ] Browser history search functionality
- [ ] Add ability to customize Bible verses on index.html
- [ ] Dark/Light theme toggle
- [ ] Custom proxy URL routing configuration
- [ ] Session persistence (save open tabs)
- [ ] Proxy URL customization (allow users to change from qoao2 to custom prefix)
- [ ] Add site-specific proxy settings/rules
- [ ] Import/Export bookmarks functionality

## Performance Improvements
- [ ] Minify and compress CSS files
- [ ] Implement lazy loading for heavy resources
- [ ] Add service worker caching strategies
- [ ] Optimize Scramjet WASM files loading
- [ ] Reduce initial bundle size
- [ ] Implement request debouncing for address bar
- [ ] Cache decoded URLs to avoid repeated decoding

## Security Enhancements
- [ ] Add Content Security Policy (CSP) headers
- [ ] Implement URL validation/sanitization for proxy
- [ ] Add CORS handling improvements
- [ ] Rate limiting for proxy requests
- [ ] Add domain blacklist configuration
- [ ] Implement CSP bypass detection
- [ ] Add certificate pinning for secure connections

## Code Quality
- [ ] Add error handling for failed Scramjet initialization
- [ ] Improve error messages shown to users
- [ ] Add logging/debugging mode
- [ ] Refactor browser-chrome.js into smaller modules
- [ ] Add TypeScript for type safety
- [ ] Add unit tests for URL rewriting functions
- [ ] Add integration tests for proxy functionality
- [ ] Improve code comments and documentation

## UI/UX Improvements
- [ ] Add loading spinner on frame transitions
- [ ] Implement search history dropdown
- [ ] Add keyboard shortcuts help overlay
- [ ] Improve mobile responsiveness
- [ ] Add animation transitions for toolbar
- [ ] Better error page styling
- [ ] Add dark mode support
- [ ] Improve Bible verse display styling
- [ ] Add tool tips for toolbar buttons

## Configuration & Deployment
- [ ] Add environment variable configuration
- [ ] Implement Docker setup for deployment
- [ ] Add CI/CD pipeline
- [ ] Implement automated testing in GitHub Actions
- [ ] Add production build optimization
- [ ] Implement health check endpoint
- [ ] Add monitoring/logging infrastructure
- [ ] Create comprehensive documentation

## Browser Chrome Features
- [ ] Add download manager
- [ ] Implement tab management (multiple tabs)
- [ ] Add more toolbar customization
- [ ] Implement print functionality
- [ ] Add extension/plugin system
- [ ] Improve back/forward navigation UX
- [ ] Add page reload indicator
- [ ] Implement zoom controls

## URL Rewriting & Proxy
- [ ] Create admin panel for URL prefix management
- [ ] Add support for multiple proxy prefixes simultaneously
- [ ] Implement custom header injection
- [ ] Add proxy bypass rules
- [ ] Implement request/response interceptors
- [ ] Add cookie management improvements
- [ ] Better handling of WebSocket connections

## Documentation
- [ ] Add API documentation
- [ ] Create user guide for Bible verse customization
- [ ] Add developer setup guide
- [ ] Document URL rewriting logic
- [ ] Create troubleshooting guide
- [ ] Add configuration examples
- [ ] Document environment variables

## Testing
- [ ] Unit tests for URL rewriting (rewriteUrl function)
- [ ] Unit tests for URL decoding (decodeProxyUrl function)
- [ ] Integration tests for proxy navigation
- [ ] E2E tests for full workflow
- [ ] Performance benchmarks
- [ ] Cross-browser compatibility testing
- [ ] Load testing for concurrent users

## Known Issues to Fix
- [ ] Smart search was removed - evaluate if it should be re-added with better implementation
- [ ] Bible verse styling might need improvement on different screen sizes
- [ ] Address bar autocomplete could cause UX issues
- [ ] History/bookmarks localStorage might have size limits
- [ ] Scramjet URL decoding could fail on certain encoded characters

## Future Enhancements
- [ ] Multi-language support
- [ ] Custom themes/skins
- [ ] Analytics dashboard
- [ ] User authentication system
- [ ] Cloud sync for bookmarks/history
- [ ] Advanced proxy chaining
- [ ] Built-in VPN-like features
- [ ] Browser extension version
