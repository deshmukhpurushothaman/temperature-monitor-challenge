import mongoose, { Document, Schema } from 'mongoose';

/**
 * @interface ITemperature
 * @description Interface defining the structure of a temperature reading document.
 * This interface extends Mongoose's `Document` interface, allowing it to be used
 * with Mongoose's model methods.
 *
 * @property {number} temperature - The temperature value for the reading.
 * @property {'NORMAL' | 'HIGH'} status - The status of the temperature reading (either 'NORMAL' or 'HIGH').
 * @property {Date} timestamp - The timestamp when the temperature reading was recorded.
 * @property {Date} [processedAt] - The timestamp when the temperature was processed (optional).
 * @property {Date} [createdAt] - The timestamp when the document was created (automatically set by Mongoose).
 * @property {Date} [updatedAt] - The timestamp when the document was last updated (automatically set by Mongoose).
 */
export interface ITemperature extends Document {
  temperature: number;
  status: 'NORMAL' | 'HIGH';
  timestamp: Date;
  processedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * @description Mongoose schema definition for the `Temperature` model.
 * This schema defines the structure of a temperature document in MongoDB,
 * including its fields and data types.
 *
 * The `TemperatureSchema` includes fields for:
 * - `temperature`: a number representing the temperature value.
 * - `status`: a string that can either be 'NORMAL' or 'HIGH', representing the status of the reading.
 * - `timestamp`: the date and time when the reading was recorded.
 * - `processedAt`: an optional field for the date when the reading was processed.
 * - `timestamps`: automatically handles `createdAt` and `updatedAt` fields.
 */
const TemperatureSchema = new Schema<ITemperature>(
  {
    temperature: { type: Number, required: true },
    status: { type: String, enum: ['NORMAL', 'HIGH'], default: 'NORMAL' },
    timestamp: { type: Date, required: true },
    processedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

/**
 * @description Mongoose model for `Temperature`.
 * The `Temperature` model allows interaction with the `temperatures` collection in MongoDB,
 * enabling operations like creating, reading, updating, and deleting temperature documents.
 *
 * @type {mongoose.Model<ITemperature>}
 */
export const Temperature = mongoose.model<ITemperature>(
  'Temperature',
  TemperatureSchema
);
