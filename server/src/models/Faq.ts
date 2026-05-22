import mongoose, { Document, Schema } from 'mongoose';

export interface FaqDocument extends Document {
  question: string;
  answer: string;
  category?: string;
  language: string;
  sortOrder: number;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

const FaqSchema = new Schema<FaqDocument>(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true },
    category: { type: String, index: true },
    language: { type: String, default: 'en', index: true },
    sortOrder: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
      index: true,
    },
  },
  { timestamps: true },
);

FaqSchema.index({ status: 1, language: 1, sortOrder: 1 });

export const Faq = mongoose.model<FaqDocument>('Faq', FaqSchema);
