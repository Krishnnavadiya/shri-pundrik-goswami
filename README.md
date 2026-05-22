# Shri Pundrik Goswami — Full-Stack MERN Devotional Website

A complete MERN (MongoDB, Express, React, Node.js) website for **Shri Pundrik Goswami** — featuring a responsive public site (biography, lineage, articles, events, kirtans, books/PDFs, audio/video, newsletters, projects/seva, FAQs, contact), and a full admin dashboard with JWT-secured CRUD over all content and form submissions.

> The structure is inspired by [shriradharaman.com](https://www.shriradharaman.com/) but every piece of content, copy, image, and branding is replaceable through the admin dashboard.

---

## Highlights

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + React Router + React Query + React Hook Form + Zod + Framer Motion + React Helmet Async.
- **Backend**: Node.js + Express + TypeScript + Mongoose, JWT auth, role-based access control, Zod validation, centralized error handling, rate limiting, CORS, Helmet, mongo-sanitize, Nodemailer, Cloudinary/Multer uploads.
- **Database**: MongoDB (Atlas recommended for production).
- **Admin dashboard**: Login + protected routes, dashboard stats, CRUD for articles, events, FAQs, media (books/PDFs/audio/video/newsletters), projects, lineage, pages, and management of contact + registration submissions.
- **Public site**: Beautiful, devotional UI with hero, biography preview, upcoming events carousel, featured articles, projects, newsletter CTA, accessible navigation, mobile menus, and SEO metadata per page.
- **Forms**: Contact and Initiation/Registration forms with Zod validation, backend storage, email notifications, and spam protection (rate limiting + honeypot field support).

---

## Folder structure

```text
root/
├── client/                       # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── admin/            # Admin-only UI (Modal, StatusBadge, PageHeader)
│   │   │   ├── common/           # Cards, hero, SEO, loaders
│   │   │   ├── home/             # Home page sections
│   │   │   ├── layout/           # Navbar, Footer
│   │   │   └── ui/               # Buttons, inputs, headings
│   │   ├── context/              # AuthContext
│   │   ├── hooks/
│   │   ├── layouts/              # PublicLayout
│   │   ├── pages/
│   │   │   ├── admin/            # Admin pages (Login, Dashboard, CRUD pages)
│   │   │   └── public/           # All public pages
│   │   ├── routes/               # ProtectedRoute
│   │   ├── services/             # api, publicApi, adminApi
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── package.json
├── server/                       # Express + Mongoose backend
│   ├── src/
│   │   ├── config/               # env, database, cloudinary
│   │   ├── controllers/
│   │   ├── middleware/           # auth, validate, error, rate-limiters, upload
│   │   ├── models/
│   │   ├── routes/               # auth, public, admin, index
│   │   ├── services/             # email
│   │   ├── scripts/              # seed.ts
│   │   ├── utils/
│   │   ├── validators/           # Zod schemas
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env.example
│   └── package.json
└── README.md
```

---

## Getting started

### Prerequisites

- Node.js 18+
- MongoDB (local instance or MongoDB Atlas connection string)
- (Optional) Cloudinary account for media uploads
- (Optional) SMTP credentials for email notifications

### 1. Install dependencies

```bash
# Backend
cd server
npm install

# Frontend (in another terminal, from the project root)
cd client
npm install
```

### 2. Configure environment variables

#### `server/.env`

Copy `server/.env.example` to `server/.env` and fill in the values:

```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/shri_pundrik_goswami
JWT_SECRET=replace_this_with_a_long_random_string
FRONTEND_URL=http://localhost:5173

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=ChangeMe@12345
ADMIN_NAME=Super Admin

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
EMAIL_FROM=no-reply@example.com
EMAIL_NOTIFY_TO=info@example.com
```

> If Cloudinary or SMTP variables are blank, the server will safely fall back: uploads will be saved to a local `server/uploads/` folder, and email notifications will be skipped (logged instead).

#### `client/.env`

Copy `client/.env.example` to `client/.env`:

```
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_SITE_NAME=Shri Pundrik Goswami
VITE_CONTACT_EMAIL=info@example.com
VITE_CONTACT_PHONE=+91-00000-00000
VITE_WHATSAPP_LINK=https://wa.me/00000000000
VITE_YOUTUBE_LINK=https://www.youtube.com/
```

### 3. Seed the database

The seed script creates the initial **super admin** user and a baseline of placeholder content (pages, articles, events, FAQs, media items, projects, lineage entries).

```bash
cd server
npm run seed
```

The admin user is created from `ADMIN_EMAIL` / `ADMIN_PASSWORD` in your `.env`.

### 4. Run in development

In one terminal:

```bash
cd server
npm run dev
# → http://localhost:5000  (API base: /api/v1)
```

In another terminal:

```bash
cd client
npm run dev
# → http://localhost:5173
```

The Vite dev server proxies `/api` and `/uploads` to the backend, so the frontend works out of the box.

### 5. Sign in to the admin

Open [http://localhost:5173/admin/login](http://localhost:5173/admin/login) and sign in with the email/password from `.env`.

---

## API overview

All routes are under `/api/v1`.

### Public

| Method | Path                            | Description                       |
| ------ | ------------------------------- | --------------------------------- |
| GET    | `/health`                       | Health check                      |
| GET    | `/pages/:slug`                  | Get a static page                 |
| GET    | `/articles?language&category&search&page&limit` | List articles      |
| GET    | `/articles/:slug`               | Get article by slug               |
| GET    | `/events?upcoming&from&to`      | List events                       |
| GET    | `/events/:slug`                 | Get event by slug                 |
| GET    | `/faqs?search&category`         | List FAQs                         |
| GET    | `/media?type=pdf\|audio\|video\|newsletter` | List media        |
| GET    | `/newsletters`                  | List newsletters                  |
| GET    | `/projects`                     | List projects                     |
| GET    | `/projects/:slug`               | Get project by slug               |
| GET    | `/lineage`                      | List lineage entries              |
| POST   | `/contact`                      | Submit contact form               |
| POST   | `/registrations`                | Submit program/initiation form    |

### Auth

| Method | Path                  | Description           |
| ------ | --------------------- | --------------------- |
| POST   | `/auth/login`         | Admin login           |
| POST   | `/auth/logout`        | Logout                |
| GET    | `/auth/me`            | Current user          |
| POST   | `/auth/change-password` | Change own password |

### Admin (JWT-protected)

CRUD endpoints under `/admin/...` cover **articles, events, faqs, media, projects, lineage, pages, contact-submissions, registrations**, plus:

- `GET /admin/stats` — dashboard counts
- `POST /admin/media/upload` — file upload (image, PDF, audio, video)
- `PATCH /admin/contact-submissions/:id/status` — update submission status
- `PATCH /admin/registrations/:id/status` — update registration status
- `GET/POST/PUT/DELETE /admin/users` — manage admin users (super_admin only)

---

## Data models

See `server/src/models/` for full schemas. Key models:

- **AdminUser** — name, email, password (hashed with bcrypt), role (`admin` | `super_admin`)
- **Page** — slug, title, body (HTML), language, SEO fields, status
- **Article** — slug, title, summary, body, author, language, category, tags, hero image, publishedAt, status
- **Event** — slug, title, dates, location, category, language, registrationUrl, status
- **Faq** — question, answer, category, language, sortOrder, status
- **MediaItem** — title, type (image/pdf/audio/video/newsletter), url, cover image, language, downloadable
- **Project** — slug, title, mission, body, activities, gallery, CTA, status
- **LineagePerson** — name, title, lineageType, parent, portrait, bio, sortOrder
- **ContactSubmission** — name, email, phone, subject, message, routeTo, status
- **Registration** — name, email, phone, dob, programTitle, address, message, consent, status

All collections include `createdAt` / `updatedAt` timestamps and indexed slug/language/status fields.

---

## Security

- **JWT** authentication with bearer tokens (stored in `localStorage` on the client).
- **bcrypt** password hashing.
- **Role-based access control** (`admin`, `super_admin`) on protected routes.
- **Zod** validation on every public/admin write endpoint.
- **express-mongo-sanitize** to strip Mongo operators from inputs.
- **helmet** secure HTTP headers.
- **express-rate-limit** for `/auth/login`, contact/registration submissions, and general API.
- **CORS** restricted to `FRONTEND_URL` in production.
- **Honeypot field** support on contact/registration schemas to slow basic bots.
- Files are validated by MIME type and size-limited (25 MB).

---

## Production deployment

### Backend

- Build: `npm run build`
- Start: `npm start`
- Recommended hosts: Render, Railway, Fly.io, DigitalOcean, AWS, or a VPS behind Nginx.
- Use a managed MongoDB (e.g. MongoDB Atlas) and Cloudinary for media in production.
- Set `NODE_ENV=production`, `FRONTEND_URL`, and the production-grade `JWT_SECRET` (long random string).

### Frontend

- Build: `npm run build` (produces `client/dist/`)
- Deploy to Vercel, Netlify, Cloudflare Pages, or any static host.
- Set `VITE_API_BASE_URL` to your production API URL.

---

## Roadmap (from the SRS, beyond MVP)

- Phase 2: integrated rich-text editor (TipTap/Editor.js), media browser, content versioning.
- Phase 3: multilingual UI (i18n), calendar view (FullCalendar), advanced analytics dashboards, integrated shop/donation flow (Stripe / Razorpay).
- Phase 4: SEO hardening (server-rendered Open Graph for articles via SSR or static prerender), structured data, accessibility audit, performance optimization, content migration.

---

## License

MIT — replace with the appropriate license for the institution prior to launch.

---

> _“Hare Kṛiṣṇa Hare Kṛiṣṇa Kṛiṣṇa Kṛiṣṇa Hare Hare · Hare Rāma Hare Rāma Rāma Rāma Hare Hare”_
