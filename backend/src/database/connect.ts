import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URL || 'mongodb://localhost:27017/leeloolxp',
      {
        serverSelectionTimeoutMS: 10000, // 30 seconds
      }
    );

    console.log('Mongoose connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
