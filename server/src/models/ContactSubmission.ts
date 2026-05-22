import mongoose, { Document, Schema } from 'mongoose';

export interface ContactSubmissionDocument extends Document {
  routeTo?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'new' | 'reviewed' | 'contacted' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

const ContactSubmissionSchema = new Schema<ContactSubmissionDocument>(
  {
    routeTo: { type: String, default: 'general' },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: { type: String, trim: true },
    subject: { type: String, trim: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'reviewed', 'contacted', 'closed'],
      default: 'new',
      index: true,
    },
  },
  { timestamps: true },
);

export const ContactSubmission = mongoose.model<ContactSubmissionDocument>(
  'ContactSubmission',
  ContactSubmissionSchema,
);
