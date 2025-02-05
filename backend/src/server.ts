import express from 'express';

// Environment Variables
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
