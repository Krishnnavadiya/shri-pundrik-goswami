/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_SITE_NAME?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_CONTACT_PHONE?: string;
  readonly VITE_WHATSAPP_LINK?: string;
  readonly VITE_YOUTUBE_LINK?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
