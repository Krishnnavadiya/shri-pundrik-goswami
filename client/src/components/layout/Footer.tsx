import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Youtube, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/config/site';

const footerLinks = [
  {
    title: 'About',
    links: [
      { label: 'The Temple', to: '/about/shri-radha-raman-lal-temple-vrindavan' },
      { label: 'Path & Philosophy', to: '/about/the-gaudiya-vaishnav-philosophy' },
      { label: 'Goswami Family', to: '/about/the-goswami-family' },
    ],
  },
  {
    title: 'Spiritual Master',
    links: [
      { label: 'Shri Pundrik Goswami', to: '/shri-pundrik-goswami' },
      { label: 'Lineage / Parampara', to: '/lineage' },
      { label: 'Initiation', to: '/initiation' },
      { label: 'Sankirtans', to: '/sankirtans' },
      { label: 'Katha Request', to: '/katha-request' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Articles', to: '/articles' },
      { label: 'Events Calendar', to: '/events' },
      { label: 'Books & PDFs', to: '/books-pdfs' },
      { label: 'Audio & Video', to: '/audio-video' },
      { label: 'Newsletters', to: '/newsletters' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Projects / Seva', to: '/projects' },
      { label: 'FAQs', to: '/faqs' },
      { label: 'Contact', to: '/contact' },
    ],
  },
];

export const Footer = (): JSX.Element => (
  <footer className="bg-gradient-to-b from-saffron-900 to-saffron-950 text-cream-100 mt-24">
    <div className="container-wide pt-16 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-cream-50 text-saffron-900 flex items-center justify-center font-display text-2xl font-bold">
              ॐ
            </div>
            <div>
              <p className="font-display text-lg leading-tight">Shri Pundrik Goswami</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold-300">
                Servant of Shri Radha Krishna
              </p>
            </div>
          </div>
          <p className="text-sm text-cream-200/80 leading-relaxed font-serif">
            Carrying forward the timeless tradition of bhakti — through sankirtan, scripture, and
            service to the lotus feet of Shri Radha and Krishna.
          </p>
        </div>

        {footerLinks.map((section) => (
          <div key={section.title}>
            <h4 className="font-display text-base text-gold-300 uppercase tracking-widest mb-4">
              {section.title}
            </h4>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-cream-100/80 hover:text-gold-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-saffron-800/50 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-gold-300 mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-cream-50 mb-1">Visit Us</p>
            <address className="not-italic text-cream-200/80 leading-relaxed">
              {siteConfig.temple.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a
              href={siteConfig.temple.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="text-gold-300 hover:text-gold-200 text-xs inline-flex items-center gap-1 mt-1"
            >
              Open in Google Maps <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-gold-300 mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-cream-50 mb-1">Call / WhatsApp</p>
            <a
              href={`tel:${siteConfig.phoneTel}`}
              className="text-cream-200/80 hover:text-gold-300"
            >
              {siteConfig.phoneDisplay}
            </a>
            <br />
            <a
              href={siteConfig.whatsappChannel}
              target="_blank"
              rel="noreferrer"
              className="text-gold-300 hover:text-gold-200 text-xs inline-flex items-center gap-1 mt-1"
            >
              WhatsApp channel <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-gold-300 mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-cream-50 mb-1">Email & Media</p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-cream-200/80 hover:text-gold-300"
            >
              {siteConfig.contactEmail}
            </a>
            <br />
            <a
              href={siteConfig.youtubeChannel}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-gold-300 hover:text-gold-200 text-xs mt-1"
            >
              <Youtube className="w-4 h-4" /> YouTube channel
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-saffron-800/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-200/60">
        <p>© {new Date().getFullYear()} Shri Pundrik Goswami. All rights reserved.</p>
        <p className="font-serif italic">
          &ldquo;Hare Kṛiṣṇa Hare Kṛiṣṇa Kṛiṣṇa Kṛiṣṇa Hare Hare · Hare Rāma Hare Rāma Rāma Rāma Hare
          Hare&rdquo;
        </p>
      </div>
    </div>
  </footer>
);
