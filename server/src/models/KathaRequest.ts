import mongoose, { Document, Schema } from 'mongoose';

export type KathaProgramType =
  | 'Katha'
  | 'Pravachan'
  | 'Sankirtan'
  | 'Spiritual Gathering'
  | 'Online Session'
  | 'Other';

export type KathaRequestStatus = 'New' | 'Contacted' | 'Confirmed' | 'Rejected' | 'Completed';

export interface KathaRequestDocument extends Document {
  fullName: string;
  phoneNumber: string;
  whatsappNumber?: string;
  email?: string;
  city: string;
  country: string;
  organizationName?: string;
  programType: KathaProgramType;
  preferredDate: Date;
  alternateDate?: Date;
  expectedAttendees?: number;
  venueAddress: string;
  message?: string;
  consent: boolean;
  status: KathaRequestStatus;
  adminNote?: string;
  createdAt: Date;
  updatedAt: Date;
}

const KathaRequestSchema = new Schema<KathaRequestDocument>(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 200 },
    phoneNumber: { type: String, required: true, trim: true, maxlength: 40 },
    whatsappNumber: { type: String, trim: true, maxlength: 40 },
    email: { type: String, lowercase: true, trim: true, maxlength: 200 },
    city: { type: String, required: true, trim: true, maxlength: 120 },
    country: { type: String, required: true, trim: true, maxlength: 120 },
    organizationName: { type: String, trim: true, maxlength: 250 },
    programType: {
      type: String,
      required: true,
      enum: ['Katha', 'Pravachan', 'Sankirtan', 'Spiritual Gathering', 'Online Session', 'Other'],
      index: true,
    },
    preferredDate: { type: Date, required: true },
    alternateDate: { type: Date },
    expectedAttendees: { type: Number, min: 0 },
    venueAddress: { type: String, required: true, trim: true, maxlength: 1000 },
    message: { type: String, trim: true, maxlength: 5000 },
    consent: { type: Boolean, required: true },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Confirmed', 'Rejected', 'Completed'],
      default: 'New',
      index: true,
    },
    adminNote: { type: String, trim: true, maxlength: 5000 },
  },
  { timestamps: true },
);

KathaRequestSchema.index({ fullName: 'text', city: 'text', organizationName: 'text' });

export const KathaRequest = mongoose.model<KathaRequestDocument>(
  'KathaRequest',
  KathaRequestSchema,
);
