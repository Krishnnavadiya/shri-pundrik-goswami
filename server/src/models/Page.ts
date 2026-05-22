import mongoose, { Document, Schema } from 'mongoose';

export interface PageDocument extends Document {
  slug: string;
  title: string;
  subtitle?: string;
  body: string;
  heroImage?: string;
  language: string;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

const PageSchema = new Schema<PageDocument>(
  {
    slug: { type: String, required: true, lowercase: true, trim: true, index: true },
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true },
    body: { type: String, default: '' },
    heroImage: { type: String },
    language: { type: String, default: 'en', index: true },
    seoTitle: { type: String },
    seoDescription: { type: String },
    seoImage: { type: String },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
      index: true,
    },
  },
  { timestamps: true },
);

PageSchema.index({ slug: 1, language: 1 }, { unique: true });

export const Page = mongoose.model<PageDocument>('Page', PageSchema);
