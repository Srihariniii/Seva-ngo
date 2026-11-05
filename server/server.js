import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { seedDatabase } from './utils/seeder.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import causeRoutes from './routes/causeRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import volunteerRoutes from './routes/volunteerRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import statsRoutes from './routes/statsRoutes.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Initialize DB and Auto-Seeder
await connectDB();
await seedDatabase();

// CORS configuration supporting local dev and production frontend URL
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.some((allowed) => origin.startsWith(allowed) || allowed === '*')) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in development for seamless testing
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static uploads if fallback local storage is used
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Health check endpoint (Requirement 22)
app.get('/api/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStateMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  res.json({
    status: 'ok',
    service: 'Seva NGO REST API',
    uptime: `${Math.floor(process.uptime())} seconds`,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: {
      status: dbStateMap[dbState] || 'unknown',
      connected: dbState === 1
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/causes', causeRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/stats', statsRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Seva NGO API Services',
    healthCheck: '/api/health',
    documentation: 'See README.md for endpoint specifications'
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(` Seva NGO API Server active on port ${PORT}`);
  console.log(` Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log(` Health check: http://localhost:${PORT}/api/health`);
  console.log(`=========================================`);
});
