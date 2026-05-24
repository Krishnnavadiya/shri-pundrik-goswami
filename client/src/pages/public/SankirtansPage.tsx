import { Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CmsPage } from '@/components/common/CmsPage';
import { SocialCTAs } from '@/components/common/SocialCTAs';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';

const SankirtansPage = (): JSX.Element => (
  <CmsPage
    slug="sankirtans"
    fallbackTitle="Sankirtans & Programs"
    fallbackSubtitle="Singing the holy names — the central practice of our tradition"
    fallbackBody={`
      <p>Sankirtan — the congregational chanting of the holy names of Shri Radha and Krishna —
      is the central practice of our tradition.</p>
      <p>Shri Pundrik Goswami leads sankirtans regularly. Join the official WhatsApp channel for
      updates, watch kirtans on YouTube, or contact the team to host a program in your city.</p>
    `}
  >
    <div className="mt-12 space-y-8 max-w-3xl mx-auto">
      <div className="text-center">
        <p className="text-sm text-stone-500 mb-2">Official contact for Sankirtan programs</p>
        <a
          href={`tel:${siteConfig.phoneTel}`}
          className="inline-flex items-center gap-2 font-display text-2xl text-saffron-800 hover:text-saffron-600"
        >
          <Phone className="w-6 h-6" />
          {siteConfig.phoneDisplay}
        </a>
      </div>

      <SocialCTAs />

      <div className="text-center pt-4">
        <Link to="/katha-request">
          <Button variant="secondary">Request a Katha or Sankirtan Program</Button>
        </Link>
      </div>
    </div>
  </CmsPage>
);

export default SankirtansPage;
