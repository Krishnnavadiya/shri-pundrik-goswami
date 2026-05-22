import mongoose, { Document, Schema } from 'mongoose';

export interface EventDocument extends Document {
  slug: string;
  title: string;
  description?: string;
  body?: string;
  category?: string;
  eventType?: string;
  startDate: Date;
  endDate?: Date;
  lunarDate?: string;
  location?: string;
  image?: string;
  language: string;
  registrationUrl?: string;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<EventDocument>(
  {
    slug: { type: String, required: true, lowercase: true, trim: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String },
    body: { type: String },
    category: { type: String, index: true },
    eventType: { type: String },
    startDate: { type: Date, required: true, index: true },
    endDate: { type: Date },
    lunarDate: { type: String },
    location: { type: String },
    image: { type: String },
    language: { type: String, default: 'en', index: true },
    registrationUrl: { type: String },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
      index: true,
    },
  },
  { timestamps: true },
);

EventSchema.index({ slug: 1, language: 1 }, { unique: true });
EventSchema.index({ status: 1, language: 1, startDate: 1 });

export const Event = mongoose.model<EventDocument>('Event', EventSchema);
