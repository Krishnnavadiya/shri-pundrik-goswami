// Centralized site-wide contact + social configuration.
// Values can be overridden via Vite env vars (VITE_*) at build time.
// Defaults are the official numbers/links provided by the team.

const env = import.meta.env;

export const siteConfig = {
  name: env.VITE_SITE_NAME || 'Shri Pundrik Goswami',
  contactEmail: env.VITE_CONTACT_EMAIL || 'krishnnavadiya@gmail.com',

  /** Display-friendly phone, e.g. "+91 9824659110" */
  phoneDisplay: env.VITE_CONTACT_PHONE || '+91 9824659110',
  /** Tel-uri-safe phone, no spaces, e.g. "+919824659110" */
  phoneTel:
    (env.VITE_CONTACT_PHONE || '+919824659110').replace(/[^+\d]/g, '') || '+919824659110',

  whatsappChannel:
    env.VITE_WHATSAPP_LINK || 'https://whatsapp.com/channel/0029VaB0YbMADTOCrqLc501S',
  youtubeChannel: env.VITE_YOUTUBE_LINK || 'https://www.youtube.com/@SriPundrik',

  temple: {
    name: 'Shri Radha Raman Lal Temple, Vrindavan',
    addressLines: [
      'Shri Radha Raman Lal Temple',
      'Keshi Ghat, Vrindavan',
      'Uttar Pradesh 281121, India',
    ],
    mapsUrl: 'https://maps.app.goo.gl/UCh6YRZ5pMmfb6JK6',
    embedUrl:
      'https://www.google.com/maps?q=Shri+Radha+Raman+Lal+Temple+Vrindavan+Keshi+Ghat&output=embed',
  },
} as const;

export type SiteConfig = typeof siteConfig;
