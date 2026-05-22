import mongoose, { Document, Schema } from 'mongoose';

export interface ProjectDocument extends Document {
  slug: string;
  title: string;
  mission?: string;
  body?: string;
  activities: string[];
  gallery: string[];
  heroImage?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  language: string;
  sortOrder: number;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<ProjectDocument>(
  {
    slug: { type: String, required: true, lowercase: true, trim: true, index: true },
    title: { type: String, required: true, trim: true },
    mission: { type: String },
    body: { type: String },
    activities: { type: [String], default: [] },
    gallery: { type: [String], default: [] },
    heroImage: { type: String },
    ctaLabel: { type: String, default: 'Support This Seva' },
    ctaUrl: { type: String, default: '/contact' },
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

ProjectSchema.index({ slug: 1, language: 1 }, { unique: true });

export const Project = mongoose.model<ProjectDocument>('Project', ProjectSchema);
