const express = require('express');
const helmet = require('helmet');
const app = express();

// Add security headers with Helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],  // Basic CSP to restrict sources
    },
  },
  xFrameOptions: { action: 'deny' },  // Anti-clickjacking
  xContentTypeOptions: 'nosniff',  // Prevent MIME sniffing
  referrerPolicy: 'strict-origin-when-cross-origin',  // Control referrer info
  permissionsPolicy: {
    features: {
      'geolocation': ["'none'"],
      'camera': ["'none'"],
      // Add more as needed
    },
  },
  crossOriginOpenerPolicy: 'same-origin',  // Spectre protection
  crossOriginEmbedderPolicy: 'require-corp',  // Spectre protection
  hidePoweredBy: true,  // Hide X-Powered-By
  noCache: true,  // Disable caching for sensitive content
}));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});