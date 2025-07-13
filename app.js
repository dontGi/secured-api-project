// app.js
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Rate Limiting (General)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'https://yourdomain.com'], // Adjust as needed
  methods: ['GET', 'POST'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Helmet for Security Headers
app.use(helmet());

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:"],
  }
}));

app.use(helmet.hsts({
  maxAge: 63072000,
  includeSubDomains: true,
  preload: true
}));

// Parse incoming JSON
app.use(express.json());

// API Key Middleware
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
  }
  next();
});

// Secured Route
app.get('/secure-data', (req, res) => {
  res.json({ message: 'You accessed a secured endpoint!' });
});

// Brute-force protection for /login route (Fail2Ban alternative)
const failedLoginAttempts = {};

app.post('/login', (req, res) => {
  const ip = req.ip;
  const { username, password } = req.body;

  // Dummy login check
  const validUser = username === 'admin' && password === 'secret';

  if (!validUser) {
    failedLoginAttempts[ip] = (failedLoginAttempts[ip] || 0) + 1;

    if (failedLoginAttempts[ip] > 5) {
      return res.status(429).json({ message: 'Too many failed login attempts. Try again later.' });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Reset on successful login
  failedLoginAttempts[ip] = 0;

  res.json({ message: 'Login successful!' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
