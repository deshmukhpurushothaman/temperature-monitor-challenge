import mongoose, { Document, Schema } from 'mongoose';

export interface ITemperature extends Document {
  temperature: number;
  status: 'NORMAL' | 'HIGH';
  timestamp: Date;
  processedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

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

export const Temperature = mongoose.model<ITemperature>(
  'Temperature',
  TemperatureSchema
);
