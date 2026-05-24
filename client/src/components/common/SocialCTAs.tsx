import { MessageCircle, Phone, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

interface SocialCTAsProps {
  layout?: 'row' | 'grid';
  showContact?: boolean;
  className?: string;
}

export const SocialCTAs = ({
  layout = 'grid',
  showContact = true,
  className,
}: SocialCTAsProps): JSX.Element => (
  <div
    className={cn(
      layout === 'grid'
        ? 'grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto'
        : 'flex flex-wrap items-center justify-center gap-3',
      className,
    )}
  >
    <a href={siteConfig.whatsappChannel} target="_blank" rel="noreferrer">
      <Button variant="primary" fullWidth={layout === 'grid'}>
        <MessageCircle className="w-4 h-4" /> Join WhatsApp Channel
      </Button>
    </a>
    <a href={siteConfig.youtubeChannel} target="_blank" rel="noreferrer">
      <Button variant="gold" fullWidth={layout === 'grid'}>
        <Youtube className="w-4 h-4" /> Visit YouTube Channel
      </Button>
    </a>
    {showContact && (
      <a href={`tel:${siteConfig.phoneTel}`}>
        <Button variant="secondary" fullWidth={layout === 'grid'}>
          <Phone className="w-4 h-4" /> Contact for Sankirtan
        </Button>
      </a>
    )}
  </div>
);

interface CompactContactProps {
  className?: string;
}

export const CompactContact = ({ className }: CompactContactProps): JSX.Element => (
  <div className={cn('flex flex-wrap items-center gap-4 text-sm', className)}>
    <a
      href={`tel:${siteConfig.phoneTel}`}
      className="inline-flex items-center gap-1.5 text-saffron-800 hover:text-saffron-600 font-medium"
    >
      <Phone className="w-4 h-4" />
      {siteConfig.phoneDisplay}
    </a>
    <span className="text-stone-300">|</span>
    <Link to="/katha-request" className="text-saffron-800 hover:text-saffron-600 font-medium">
      Request Katha
    </Link>
  </div>
);
