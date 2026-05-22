import mongoose, { Document, Schema } from 'mongoose';

export interface ArticleDocument extends Document {
  slug: string;
  title: string;
  summary?: string;
  body: string;
  authorName?: string;
  authorBio?: string;
  authorImage?: string;
  language: string;
  category?: string;
  tags: string[];
  heroImage?: string;
  publishedAt?: Date;
  status: 'draft' | 'published';
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<ArticleDocument>(
  {
    slug: { type: String, required: true, lowercase: true, trim: true, index: true },
    title: { type: String, required: true, trim: true },
    summary: { type: String },
    body: { type: String, default: '' },
    authorName: { type: String, default: 'Shri Pundrik Goswami' },
    authorBio: { type: String },
    authorImage: { type: String },
    language: { type: String, default: 'en', index: true },
    category: { type: String, index: true },
    tags: { type: [String], default: [] },
    heroImage: { type: String },
    publishedAt: { type: Date },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
      index: true,
    },
    seoTitle: { type: String },
    seoDescription: { type: String },
    seoImage: { type: String },
  },
  { timestamps: true },
);

ArticleSchema.index({ slug: 1, language: 1 }, { unique: true });
ArticleSchema.index({ status: 1, language: 1, publishedAt: -1 });

export const Article = mongoose.model<ArticleDocument>('Article', ArticleSchema);
