import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { validate } from '../middleware/validate';
import { formLimiter } from '../middleware/rateLimiters';
import {
  contactSchema,
  registrationSchema,
  kathaRequestSchema,
} from '../validators/schemas';

import {
  listArticles,
  getArticleBySlug,
} from '../controllers/article.controller';
import {
  listEvents,
  getEventBySlug,
} from '../controllers/event.controller';
import { listFaqs } from '../controllers/faq.controller';
import {
  listMedia,
  listNewsletters,
} from '../controllers/media.controller';
import {
  listProjects,
  getProjectBySlug,
} from '../controllers/project.controller';
import { listLineage } from '../controllers/lineage.controller';
import { getPageBySlug } from '../controllers/page.controller';
import {
  submitContact,
  submitRegistration,
} from '../controllers/form.controller';
import { submitKathaRequest } from '../controllers/kathaRequest.controller';

const router = Router();

router.get('/pages/:slug', asyncHandler(getPageBySlug));

router.get('/articles', asyncHandler(listArticles));
router.get('/articles/:slug', asyncHandler(getArticleBySlug));

router.get('/events', asyncHandler(listEvents));
router.get('/events/:slug', asyncHandler(getEventBySlug));

router.get('/faqs', asyncHandler(listFaqs));

router.get('/media', asyncHandler(listMedia));
router.get('/newsletters', asyncHandler(listNewsletters));

router.get('/projects', asyncHandler(listProjects));
router.get('/projects/:slug', asyncHandler(getProjectBySlug));

router.get('/lineage', asyncHandler(listLineage));

router.post(
  '/contact',
  formLimiter,
  validate(contactSchema),
  asyncHandler(submitContact),
);
router.post(
  '/registrations',
  formLimiter,
  validate(registrationSchema),
  asyncHandler(submitRegistration),
);

router.post(
  '/katha-requests',
  formLimiter,
  validate(kathaRequestSchema),
  asyncHandler(submitKathaRequest),
);

export default router;
