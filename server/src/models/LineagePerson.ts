import mongoose, { Document, Schema } from 'mongoose';

export interface LineagePersonDocument extends Document {
  name: string;
  title?: string;
  position?: string;
  lineageType: 'primary' | 'branch';
  parentId?: mongoose.Types.ObjectId | null;
  portrait?: string;
  bio?: string;
  birthYear?: string;
  passingYear?: string;
  language: string;
  sortOrder: number;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

const LineagePersonSchema = new Schema<LineagePersonDocument>(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String },
    position: { type: String },
    lineageType: {
      type: String,
      enum: ['primary', 'branch'],
      default: 'primary',
      index: true,
    },
    parentId: { type: Schema.Types.ObjectId, ref: 'LineagePerson', default: null, index: true },
    portrait: { type: String },
    bio: { type: String },
    birthYear: { type: String },
    passingYear: { type: String },
    language: { type: String, default: 'en', index: true },
    sortOrder: { type: Number, default: 0, index: true },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
      index: true,
    },
  },
  { timestamps: true },
);

export const LineagePerson = mongoose.model<LineagePersonDocument>(
  'LineagePerson',
  LineagePersonSchema,
);
