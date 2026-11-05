import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

// Listen for connection events
mongoose.connection.on('connected', () => {
  console.log('[MongoDB] Connection established successfully.');
});

mongoose.connection.on('error', (err) => {
  console.error('[MongoDB] Connection runtime error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.warn('[MongoDB] Connection lost.');
});

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (mongoUri) {
    try {
      // Mask password for console security
      const safeUri = mongoUri.replace(/(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)(@.+)/, '$1****$3');
      console.log(`[MongoDB] Attempting to connect to: ${safeUri}`);

      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000
      });
      console.log(`[MongoDB] Connected successfully to database: ${conn.connection.host}/${conn.connection.name}`);
      return conn;
    } catch (err) {
      console.warn(`[MongoDB] Connection to MONGO_URI failed: ${err.message}`);
    }
  } else {
    console.warn(`[MongoDB] No MONGO_URI provided in .env`);
  }

  console.log(`[MongoDB] Starting fallback in-memory MongoDB server for development...`);
  try {
    const mongoServer = await MongoMemoryServer.create();
    const memoryUri = mongoServer.getUri();

    const conn = await mongoose.connect(memoryUri);
    console.log(`[MongoDB] Connected to In-Memory MongoDB at: ${conn.connection.host}`);
    return conn;
  } catch (memErr) {
    console.error(`[MongoDB] Failed to start memory server: ${memErr.message}`);
    process.exit(1);
  }
};
