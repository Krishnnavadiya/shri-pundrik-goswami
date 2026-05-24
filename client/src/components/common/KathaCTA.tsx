import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';

export const KathaCTA = (): JSX.Element => (
  <section className="py-20 bg-gradient-to-br from-saffron-800 via-saffron-900 to-maroon-900 text-cream-50">
    <div className="container-narrow text-center">
      <p className="text-gold-300 text-xs uppercase tracking-[0.3em] mb-4">Program Invitation</p>
      <h2 className="font-display text-3xl sm:text-4xl mb-4">
        Invite Shri Pundrik Goswami Ji for Katha
      </h2>
      <p className="font-serif text-lg text-cream-100/90 max-w-2xl mx-auto leading-relaxed mb-8">
        For Katha, Pravachan, Sankirtan, or devotional programs, please submit a request and the
        official team will contact you.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link to="/katha-request">
          <Button variant="gold" size="lg">
            Request Katha <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <a href={`tel:${siteConfig.phoneTel}`}>
          <Button
            variant="outline"
            size="lg"
            className="border-cream-50 text-cream-50 hover:bg-cream-50 hover:text-saffron-900"
          >
            <Phone className="w-4 h-4" /> Contact Now
          </Button>
        </a>
      </div>
    </div>
  </section>
);
