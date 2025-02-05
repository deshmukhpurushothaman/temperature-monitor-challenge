import mongoose from 'mongoose';

/**
 * @description Connects to the MongoDB database using Mongoose.
 * It attempts to establish a connection to the database using the URL defined in
 * the environment variable `MONGODB_URL`. If the environment variable is not set,
 * it defaults to connecting to a local MongoDB instance.
 *
 * The function handles connection errors and logs them to the console.
 *
 * @returns {Promise<void>} A promise that resolves when the connection is established
 * or logs an error message if the connection fails.
 */
export const connectToDatabase = async () => {
  try {
    // Retrieve the MongoDB connection URL from environment variables, or use the default URL.
    const DB_URL =
      process.env.MONGODB_URL || 'mongodb://localhost:27017/leeloolxp';

    // Attempt to connect to MongoDB using Mongoose with a server selection timeout of 10 seconds
    await mongoose.connect(DB_URL, {
      serverSelectionTimeoutMS: 10000, // 10 seconds
    });

    // Log success message once connected
    console.log('Mongoose connected to MongoDB');
  } catch (error) {
    // Log the error if the connection attempt fails
    console.error('Error connecting to MongoDB:', error);
  }
};
