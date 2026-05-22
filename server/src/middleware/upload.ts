import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary, { isCloudinaryConfigured } from '../config/cloudinary';

const uploadsDir = path.resolve(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const localStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-');
    cb(null, `${Date.now()}-${base}${ext}`);
  },
});

const cloudStorage = isCloudinaryConfigured()
  ? new CloudinaryStorage({
      cloudinary,
      params: async (_req, file) => {
        let resourceType: 'image' | 'video' | 'raw' = 'raw';
        if (file.mimetype.startsWith('image/')) resourceType = 'image';
        else if (file.mimetype.startsWith('video/') || file.mimetype.startsWith('audio/'))
          resourceType = 'video';
        return {
          folder: 'shri-pundrik-goswami',
          resource_type: resourceType,
        };
      },
    })
  : null;

const fileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
  const allowed = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
    'application/pdf',
    'audio/mpeg',
    'audio/wav',
    'video/mp4',
  ];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`File type ${file.mimetype} is not allowed`));
  }
};

export const upload = multer({
  storage: cloudStorage ?? localStorage,
  limits: { fileSize: 25 * 1024 * 1024 },
  fileFilter,
});

export const uploadDestinationLabel = (): 'cloudinary' | 'local' =>
  cloudStorage ? 'cloudinary' : 'local';
