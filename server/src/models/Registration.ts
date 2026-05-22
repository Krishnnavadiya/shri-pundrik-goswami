import mongoose, { Document, Schema } from 'mongoose';

export interface RegistrationDocument extends Document {
  programId?: string;
  programTitle?: string;
  name: string;
  dob?: Date;
  email: string;
  phone?: string;
  address?: string;
  message?: string;
  consent: boolean;
  status: 'new' | 'reviewed' | 'contacted' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

const RegistrationSchema = new Schema<RegistrationDocument>(
  {
    programId: { type: String },
    programTitle: { type: String },
    name: { type: String, required: true, trim: true },
    dob: { type: Date },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: { type: String, trim: true },
    address: { type: String },
    message: { type: String },
    consent: { type: Boolean, required: true, default: false },
    status: {
      type: String,
      enum: ['new', 'reviewed', 'contacted', 'closed'],
      default: 'new',
      index: true,
    },
  },
  { timestamps: true },
);

export const Registration = mongoose.model<RegistrationDocument>(
  'Registration',
  RegistrationSchema,
);
