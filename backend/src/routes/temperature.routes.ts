import express from 'express';
import { processTemperatureReading } from '../controllers/temperature.controller';

const router = express.Router();

/**
 * @route GET /api/health
 * @description Endpoint for checking the health of the service.
 * @returns {Object} Response with a status of the service and the current timestamp.
 *
 * @response 200: Success
 *    {
 *      "status": "ok",
 *      "timestamp": "2025-02-05T12:00:00Z"
 *    }
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

/**
 * @route POST /api/readings/process
 * @description Endpoint to process a temperature reading.
 * This endpoint expects a temperature reading to be posted, and it will process the reading.
 * The status will be determined based on the temperature value, and the processed
 * data will be returned.
 *
 * @param {string} id - The unique identifier for the temperature reading.
 * @param {number} temperature - The temperature value to be processed.
 * @param {string} timestamp - The timestamp when the reading was recorded.
 *
 * @returns {Object} Response with the processed temperature reading.
 *
 * @response 200: Success
 *    {
 *      "success": true,
 *      "reading": {
 *        "id": "12345",
 *        "temperature": 30,
 *        "status": "HIGH",
 *        "timestamp": "2025-02-05T12:00:00Z",
 *        "processedAt": "2025-02-05T12:00:10Z"
 *      }
 *    }
 *
 * @response 400: Missing `id`
 *    {
 *      "success": false,
 *      "message": "id is required!"
 *    }
 *
 * @response 500: Server Error
 *    {
 *      "success": false,
 *      "message": "Error processing reading",
 *      "error": "Internal server error"
 *    }
 */
router.post('/readings/process', processTemperatureReading);

export default router;
