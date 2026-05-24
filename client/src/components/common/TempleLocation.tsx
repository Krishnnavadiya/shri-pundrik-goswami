import { ExternalLink, MapPin } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { cn } from '@/utils/cn';

interface TempleLocationProps {
  showMap?: boolean;
  className?: string;
  compact?: boolean;
}

export const TempleLocation = ({
  showMap = true,
  className,
  compact = false,
}: TempleLocationProps): JSX.Element => (
  <div className={cn('space-y-6', className)}>
    <div className={cn('bg-white rounded-lg border border-cream-200 shadow-soft', compact ? 'p-5' : 'p-6 sm:p-8')}>
      <div className="flex items-start gap-3 mb-4">
        <MapPin className="w-6 h-6 text-saffron-700 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-display text-lg text-saffron-900 mb-2">{siteConfig.temple.name}</h3>
          <address className="not-italic text-sm text-stone-600 leading-relaxed">
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
            className="inline-flex items-center gap-1.5 text-sm text-saffron-700 hover:text-saffron-900 font-medium mt-3"
          >
            Open in Google Maps <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>

    {showMap && (
      <div className="rounded-lg overflow-hidden border border-cream-200 shadow-soft aspect-video bg-stone-100">
        <iframe
          title="Shri Radha Raman Lal Temple, Vrindavan — map"
          src={siteConfig.temple.embedUrl}
          className="w-full h-full min-h-[280px] border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    )}
  </div>
);
