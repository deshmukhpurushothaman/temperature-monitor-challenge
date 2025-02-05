// src/routes/temperature.routes.ts
import express from 'express';
import { Temperature } from '../models/temperature.model';

const router = express.Router();

// Health Check
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// Process Temperature Reading
router.post('/readings/process', async (req: any, res) => {
  try {
    const { id, temperature, timestamp } = req.body;

    const status = temperature > 25 ? 'HIGH' : 'NORMAL';

    // Update the temperature reading in the database
    const updatedReading = await Temperature.findOneAndUpdate(
      { id },
      { status, processedAt: new Date() },
      { new: true, upsert: true }
    );

    // Emit processed reading event to WebSocket clients
    req.io.emit('processed_reading', {
      id: updatedReading.id,
      temperature: updatedReading.temperature,
      timestamp: updatedReading.timestamp,
      status: updatedReading.status,
      processedAt: updatedReading.processedAt,
    });

    res.status(200).json({
      success: true,
      reading: updatedReading,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Error processing reading', error });
  }
});

export default router;
