import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { validate } from '../middleware/validate';
import { requireAuth, requireRole } from '../middleware/auth';
import { upload } from '../middleware/upload';
import {
  articleSchema,
  eventSchema,
  faqSchema,
  mediaSchema,
  projectSchema,
  lineageSchema,
  pageSchema,
  submissionStatusSchema,
  kathaRequestStatusSchema,
  adminUserSchema,
} from '../validators/schemas';

import {
  adminListArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../controllers/article.controller';
import {
  adminListEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/event.controller';
import {
  adminListFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
} from '../controllers/faq.controller';
import {
  adminListMedia,
  createMedia,
  updateMedia,
  deleteMedia,
  uploadMedia,
} from '../controllers/media.controller';
import {
  adminListProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller';
import {
  adminListLineage,
  createLineage,
  updateLineage,
  deleteLineage,
} from '../controllers/lineage.controller';
import {
  adminListPages,
  createPage,
  updatePage,
  deletePage,
} from '../controllers/page.controller';
import {
  adminListContactSubmissions,
  adminListRegistrations,
  updateContactStatus,
  updateRegistrationStatus,
  deleteContactSubmission,
  deleteRegistration,
} from '../controllers/form.controller';
import {
  adminListKathaRequests,
  adminGetKathaRequest,
  updateKathaRequestStatus,
  deleteKathaRequest,
} from '../controllers/kathaRequest.controller';
import {
  getDashboardStats,
  listAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
} from '../controllers/admin.controller';

const router = Router();

router.use(requireAuth);

router.get('/stats', asyncHandler(getDashboardStats));

router.get('/articles', asyncHandler(adminListArticles));
router.post('/articles', validate(articleSchema), asyncHandler(createArticle));
router.put('/articles/:id', validate(articleSchema.partial()), asyncHandler(updateArticle));
router.delete('/articles/:id', asyncHandler(deleteArticle));

router.get('/events', asyncHandler(adminListEvents));
router.post('/events', validate(eventSchema), asyncHandler(createEvent));
router.put('/events/:id', validate(eventSchema.partial()), asyncHandler(updateEvent));
router.delete('/events/:id', asyncHandler(deleteEvent));

router.get('/faqs', asyncHandler(adminListFaqs));
router.post('/faqs', validate(faqSchema), asyncHandler(createFaq));
router.put('/faqs/:id', validate(faqSchema.partial()), asyncHandler(updateFaq));
router.delete('/faqs/:id', asyncHandler(deleteFaq));

router.get('/media', asyncHandler(adminListMedia));
router.post('/media', validate(mediaSchema), asyncHandler(createMedia));
router.put('/media/:id', validate(mediaSchema.partial()), asyncHandler(updateMedia));
router.delete('/media/:id', asyncHandler(deleteMedia));
router.post('/media/upload', upload.single('file'), asyncHandler(uploadMedia));

router.get('/projects', asyncHandler(adminListProjects));
router.post('/projects', validate(projectSchema), asyncHandler(createProject));
router.put('/projects/:id', validate(projectSchema.partial()), asyncHandler(updateProject));
router.delete('/projects/:id', asyncHandler(deleteProject));

router.get('/lineage', asyncHandler(adminListLineage));
router.post('/lineage', validate(lineageSchema), asyncHandler(createLineage));
router.put('/lineage/:id', validate(lineageSchema.partial()), asyncHandler(updateLineage));
router.delete('/lineage/:id', asyncHandler(deleteLineage));

router.get('/pages', asyncHandler(adminListPages));
router.post('/pages', validate(pageSchema), asyncHandler(createPage));
router.put('/pages/:id', validate(pageSchema.partial()), asyncHandler(updatePage));
router.delete('/pages/:id', asyncHandler(deletePage));

router.get('/contact-submissions', asyncHandler(adminListContactSubmissions));
router.patch(
  '/contact-submissions/:id/status',
  validate(submissionStatusSchema),
  asyncHandler(updateContactStatus),
);
router.delete('/contact-submissions/:id', asyncHandler(deleteContactSubmission));

router.get('/registrations', asyncHandler(adminListRegistrations));
router.patch(
  '/registrations/:id/status',
  validate(submissionStatusSchema),
  asyncHandler(updateRegistrationStatus),
);
router.delete('/registrations/:id', asyncHandler(deleteRegistration));

router.patch(
  '/submissions/:id/status',
  validate(submissionStatusSchema),
  asyncHandler(updateContactStatus),
);

router.get('/katha-requests', asyncHandler(adminListKathaRequests));
router.get('/katha-requests/:id', asyncHandler(adminGetKathaRequest));
router.patch(
  '/katha-requests/:id/status',
  validate(kathaRequestStatusSchema),
  asyncHandler(updateKathaRequestStatus),
);
router.delete('/katha-requests/:id', asyncHandler(deleteKathaRequest));

router.get('/users', requireRole('super_admin'), asyncHandler(listAdminUsers));
router.post(
  '/users',
  requireRole('super_admin'),
  validate(adminUserSchema),
  asyncHandler(createAdminUser),
);
router.put('/users/:id', requireRole('super_admin'), asyncHandler(updateAdminUser));
router.delete('/users/:id', requireRole('super_admin'), asyncHandler(deleteAdminUser));

export default router;
