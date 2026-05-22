import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export type AdminRole = 'admin' | 'super_admin';

export interface AdminUserDocument extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: AdminRole;
  status: 'active' | 'inactive';
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(plain: string): Promise<boolean>;
}

const AdminUserSchema = new Schema<AdminUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'super_admin'],
      default: 'admin',
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    lastLoginAt: { type: Date },
  },
  { timestamps: true },
);

AdminUserSchema.methods.comparePassword = async function (plain: string): Promise<boolean> {
  return bcrypt.compare(plain, this.passwordHash);
};

AdminUserSchema.statics.hashPassword = async (plain: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
};

export const AdminUser = mongoose.model<AdminUserDocument>('AdminUser', AdminUserSchema);
