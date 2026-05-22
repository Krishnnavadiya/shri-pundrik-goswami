import { Router } from 'express';
import authRoutes from './auth.routes';
import publicRoutes from './public.routes';
import adminRoutes from './admin.routes';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ success: true, service: 'shri-pundrik-goswami-api', uptime: process.uptime() });
});

router.use('/auth', authRoutes);
router.use('/', publicRoutes);
router.use('/admin', adminRoutes);

export default router;
