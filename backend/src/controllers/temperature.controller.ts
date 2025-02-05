import { Response } from 'express';
import { processReading } from '../services/temperature.service';

export const processTemperatureReading = async (
  req: any,
  res: Response
): Promise<any> => {
  try {
    const { id, temperature, timestamp } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'id is required!',
      });
    }

    // Call service to process the temperature reading
    const updatedReading = await processReading(id, temperature, timestamp);

    // Emit processed reading event to WebSocket clients
    req.io.emit('processed_reading', updatedReading);

    res.status(200).json({
      success: true,
      reading: updatedReading,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error processing reading',
      error: error.message,
    });
  }
};
