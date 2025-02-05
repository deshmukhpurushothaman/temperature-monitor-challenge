import { Response } from 'express';
import { processReading } from '../services/temperature.service';
import axios from 'axios';

/**
 * @description Handles the processing of temperature readings.
 * This function receives a temperature reading, processes it,
 * and sends the processed data to WebSocket clients.
 * The status of the temperature (either 'NORMAL' or 'HIGH') is determined
 * by the `processReading` service.
 *
 * @param {Object} req - The Express request object containing the reading data in the body.
 * @param {Object} res - The Express response object to send the response back to the client.
 * @returns {Promise<any>} A promise that resolves to a JSON response indicating success or failure.
 */
export const processTemperatureReading = async (
  req: any,
  res: Response
): Promise<any> => {
  try {
    // Destructure the temperature reading data from the request body
    const { id, temperature, timestamp } = req.body;

    // Validate the incoming request data
    if (!id) {
      // If the 'id' is missing, return a 400 response with an error message
      return res.status(400).json({
        success: false,
        message: 'id is required!',
      });
    }

    // Call the service to process the temperature reading and determine its status
    const updatedReading = await processReading(id, temperature, timestamp);

    // Optional: If the reading's status is 'HIGH', you can send an alert via an external service (e.g., n8n).
    // This code is currently commented out.
    // if (updatedReading.status === 'HIGH') {
    //   const response = await axios.post(
    //     'http://n8n:5678/webhook/temperature-alert',
    //     {
    //       id,
    //       temperature,
    //       timestamp,
    //     }
    //   );
    // }
    // console.log('n8n response ', response);
    // const updatedReading = response.data;

    // Emit the processed temperature reading (with status) to connected WebSocket clients
    req.io.emit('processed_reading', updatedReading);

    // Send a successful response back to the client with the updated reading data
    res.status(200).json({
      success: true,
      reading: updatedReading,
    });
  } catch (error: any) {
    // Handle any unexpected errors during processing
    res.status(500).json({
      success: false,
      message: 'Error processing reading',
      error: error.message,
    });
  }
};
