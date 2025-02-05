import mongoose, { Document, Schema } from 'mongoose';

export interface ITemperature extends Document {
  id: string;
  temperature: number;
  status: 'NORMAL' | 'HIGH';
  timestamp: Date;
  processedAt?: Date;
}

const TemperatureSchema = new Schema<ITemperature>({
  id: { type: String, required: true, unique: true },
  temperature: { type: Number, required: true },
  status: { type: String, enum: ['NORMAL', 'HIGH'], default: 'NORMAL' },
  timestamp: { type: Date, required: true },
  processedAt: { type: Date },
});

export const Temperature = mongoose.model<ITemperature>(
  'Temperature',
  TemperatureSchema
);
