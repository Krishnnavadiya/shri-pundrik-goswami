import { MessageCircle, Youtube, Mail } from 'lucide-react';
import { CmsPage } from '@/components/common/CmsPage';
import { Button } from '@/components/ui/Button';

const SankirtansPage = (): JSX.Element => {
  const whatsapp = import.meta.env.VITE_WHATSAPP_LINK || '#';
  const youtube = import.meta.env.VITE_YOUTUBE_LINK || '#';
  return (
    <CmsPage
      slug="sankirtans"
      fallbackTitle="Sankirtans & Programs"
      fallbackSubtitle="Singing the holy names — the central practice of our tradition"
      fallbackBody={`
        <p>Sankirtan — the congregational chanting of the holy names of Shri Radha and Krishna —
        is the central practice of our tradition.</p>
        <p>Shri Pundrik Goswami leads sankirtans regularly. For invitations, satsangs, or to host
        a program in your city, please reach out through the contact channels below.</p>
      `}
    >
      <div className="mt-12 grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
        <a href={whatsapp} target="_blank" rel="noreferrer">
          <Button variant="primary" fullWidth>
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </Button>
        </a>
        <a href={youtube} target="_blank" rel="noreferrer">
          <Button variant="gold" fullWidth>
            <Youtube className="w-4 h-4" /> YouTube
          </Button>
        </a>
        <a href="/contact">
          <Button variant="secondary" fullWidth>
            <Mail className="w-4 h-4" /> Email Us
          </Button>
        </a>
      </div>
    </CmsPage>
  );
};

export default SankirtansPage;
