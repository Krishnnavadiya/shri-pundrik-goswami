import { Router } from 'express';
import { login, logout, me, changePassword } from '../controllers/auth.controller';
import { asyncHandler } from '../utils/asyncHandler';
import { validate } from '../middleware/validate';
import { loginSchema } from '../validators/schemas';
import { requireAuth } from '../middleware/auth';
import { authLimiter } from '../middleware/rateLimiters';

const router = Router();

router.post('/login', authLimiter, validate(loginSchema), asyncHandler(login));
router.post('/logout', asyncHandler(logout));
router.get('/me', requireAuth, asyncHandler(me));
router.post('/change-password', requireAuth, asyncHandler(changePassword));

export default router;
