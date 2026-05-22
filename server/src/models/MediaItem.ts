import mongoose, { Document, Schema } from 'mongoose';

export type MediaType = 'image' | 'pdf' | 'audio' | 'video' | 'newsletter';

export interface MediaItemDocument extends Document {
  title: string;
  type: MediaType;
  url?: string;
  file?: string;
  coverImage?: string;
  author?: string;
  language: string;
  description?: string;
  category?: string;
  downloadable: boolean;
  sortOrder: number;
  status: 'draft' | 'published';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const MediaItemSchema = new Schema<MediaItemDocument>(
  {
    title: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['image', 'pdf', 'audio', 'video', 'newsletter'],
      required: true,
      index: true,
    },
    url: { type: String },
    file: { type: String },
    coverImage: { type: String },
    author: { type: String, default: 'Shri Pundrik Goswami' },
    language: { type: String, default: 'en', index: true },
    description: { type: String },
    category: { type: String, index: true },
    downloadable: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
      index: true,
    },
    publishedAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true },
);

MediaItemSchema.index({ type: 1, status: 1, language: 1, publishedAt: -1 });

export const MediaItem = mongoose.model<MediaItemDocument>('MediaItem', MediaItemSchema);
