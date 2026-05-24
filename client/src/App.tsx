import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';
import HomePage from '@/pages/public/HomePage';
import TemplePage from '@/pages/public/TemplePage';
import PhilosophyPage from '@/pages/public/PhilosophyPage';
import GoswamiFamilyPage from '@/pages/public/GoswamiFamilyPage';
import ShriPundrikGoswamiPage from '@/pages/public/ShriPundrikGoswamiPage';
import LineagePage from '@/pages/public/LineagePage';
import InitiationPage from '@/pages/public/InitiationPage';
import SankirtansPage from '@/pages/public/SankirtansPage';
import KathaRequestPage from '@/pages/public/KathaRequestPage';
import EventsPage from '@/pages/public/EventsPage';
import EventDetailPage from '@/pages/public/EventDetailPage';
import ArticlesPage from '@/pages/public/ArticlesPage';
import ArticleDetailPage from '@/pages/public/ArticleDetailPage';
import BooksPdfsPage from '@/pages/public/BooksPdfsPage';
import AudioVideoPage from '@/pages/public/AudioVideoPage';
import NewslettersPage from '@/pages/public/NewslettersPage';
import FaqsPage from '@/pages/public/FaqsPage';
import ProjectsPage from '@/pages/public/ProjectsPage';
import ProjectDetailPage from '@/pages/public/ProjectDetailPage';
import ContactPage from '@/pages/public/ContactPage';
import ShopPage from '@/pages/public/ShopPage';
import NotFoundPage from '@/pages/public/NotFoundPage';

import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AdminArticlesPage from '@/pages/admin/AdminArticlesPage';
import AdminEventsPage from '@/pages/admin/AdminEventsPage';
import AdminFaqsPage from '@/pages/admin/AdminFaqsPage';
import AdminMediaPage from '@/pages/admin/AdminMediaPage';
import AdminProjectsPage from '@/pages/admin/AdminProjectsPage';
import AdminLineagePage from '@/pages/admin/AdminLineagePage';
import AdminFormsPage from '@/pages/admin/AdminFormsPage';
import AdminSettingsPage from '@/pages/admin/AdminSettingsPage';
import { ProtectedRoute } from '@/routes/ProtectedRoute';

const App = (): JSX.Element => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/" element={<HomePage />} />

      {/* About section */}
      <Route
        path="/about/shri-radha-raman-lal-temple-vrindavan"
        element={<TemplePage />}
      />
      <Route
        path="/about/the-gaudiya-vaishnav-philosophy"
        element={<PhilosophyPage />}
      />
      <Route path="/about/the-goswami-family" element={<GoswamiFamilyPage />} />
      <Route path="/about" element={<Navigate to="/about/shri-radha-raman-lal-temple-vrindavan" replace />} />
      <Route path="/about/path" element={<Navigate to="/about/the-gaudiya-vaishnav-philosophy" replace />} />
      <Route path="/about/goswami-family" element={<Navigate to="/about/the-goswami-family" replace />} />

      <Route path="/shri-pundrik-goswami" element={<ShriPundrikGoswamiPage />} />
      <Route path="/lineage" element={<LineagePage />} />
      <Route path="/initiation" element={<InitiationPage />} />
      <Route path="/sankirtans" element={<SankirtansPage />} />
      <Route path="/katha-request" element={<KathaRequestPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/:slug" element={<EventDetailPage />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/articles/:slug" element={<ArticleDetailPage />} />
      <Route path="/books-pdfs" element={<BooksPdfsPage />} />
      <Route path="/audio-video" element={<AudioVideoPage />} />
      <Route path="/newsletters" element={<NewslettersPage />} />
      <Route path="/faqs" element={<FaqsPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>

    <Route path="/admin/login" element={<AdminLoginPage />} />
    <Route
      path="/admin"
      element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="dashboard" element={<AdminDashboardPage />} />
      <Route path="articles" element={<AdminArticlesPage />} />
      <Route path="events" element={<AdminEventsPage />} />
      <Route path="faqs" element={<AdminFaqsPage />} />
      <Route path="media" element={<AdminMediaPage />} />
      <Route path="projects" element={<AdminProjectsPage />} />
      <Route path="lineage" element={<AdminLineagePage />} />
      <Route path="forms" element={<AdminFormsPage />} />
      <Route path="settings" element={<AdminSettingsPage />} />
    </Route>
  </Routes>
);

export default App;
