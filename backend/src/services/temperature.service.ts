import { Temperature } from '../models/temperature.model';

/**
 * @function processReading
 * @description Processes a temperature reading by determining its status
 * and updating or creating a record in the database.
 *
 * This function checks if the temperature is above 25°C, in which case it
 * is marked as "HIGH". Otherwise, the status is set to "NORMAL". It then
 * updates the record with the new temperature, status, and timestamp. If no
 * existing record is found (i.e., no `id` is provided), a new record is created.
 *
 * @param {string | undefined} id - The unique identifier of the temperature reading (optional).
 *                                 If not provided, a new record will be created.
 * @param {number} temperature - The temperature value to be processed.
 * @param {Date} timestamp - The timestamp when the reading was recorded.
 *
 * @returns {Object} The updated or newly created temperature reading record.
 *    {
 *      id: string,             // The unique identifier of the reading.
 *      temperature: number,    // The temperature value processed.
 *      timestamp: Date,       // The timestamp of the reading.
 *      status: 'NORMAL' | 'HIGH',  // The determined status based on temperature.
 *      processedAt: Date      // The date and time when the reading was processed.
 *    }
 *
 * @throws {Error} Throws an error if the database operation fails.
 */
export const processReading = async (
  id: string | undefined,
  temperature: number,
  timestamp: Date
) => {
  let status = temperature > 25 ? 'HIGH' : 'NORMAL'; // Determine the status based on temperature

  // Update the existing record or create a new one if no record is found (id is provided)
  const updatedReading = await Temperature.findOneAndUpdate(
    { _id: id }, // Search by _id
    { status, temperature, timestamp, processedAt: new Date() }, // Update or create new record with new data
    { new: true, upsert: true } // Ensure the record is returned and create if not found
  );

  // Return the updated or created record
  return {
    id: updatedReading._id,
    temperature: updatedReading.temperature,
    timestamp: updatedReading.timestamp,
    status: updatedReading.status,
    processedAt: updatedReading.processedAt,
  };
};
