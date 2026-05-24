import { Phone } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const ContactBar = (): JSX.Element => (
  <div className="hidden md:block bg-saffron-950 text-cream-100/90 text-xs border-b border-saffron-900">
    <div className="container-wide flex items-center justify-between h-9">
      <p className="font-serif italic text-cream-200/70">
        Hare Krishna — welcome to the devotional portal of Shri Pundrik Goswami Ji
      </p>
      <a
        href={`tel:${siteConfig.phoneTel}`}
        className="inline-flex items-center gap-1.5 hover:text-gold-300 transition-colors font-medium"
      >
        <Phone className="w-3.5 h-3.5" />
        {siteConfig.phoneDisplay}
      </a>
    </div>
  </div>
);
