import express from 'express';
import { connectToDatabase } from './database/connect';

// Environment Variables
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

connectToDatabase();

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
