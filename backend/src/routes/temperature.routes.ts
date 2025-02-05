import express from 'express';
import { processTemperatureReading } from '../controllers/temperature.controller';

const router = express.Router();

// Health Check
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// Process Temperature Reading
router.post('/readings/process', processTemperatureReading);

export default router;
