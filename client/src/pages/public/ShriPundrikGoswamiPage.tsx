import { Link } from 'react-router-dom';
import { ArrowRight, Youtube } from 'lucide-react';
import { CmsPage } from '@/components/common/CmsPage';
import { Button } from '@/components/ui/Button';

const ShriPundrikGoswamiPage = (): JSX.Element => (
  <CmsPage
    slug="shri-pundrik-goswami"
    fallbackTitle="Shri Pundrik Goswami"
    fallbackSubtitle="Spiritual master, scholar, and servant of Shri Radha Krishna"
    fallbackBody={`
      <p>Shri Pundrik Goswami is a revered teacher in the Gaudiya Vaishnava tradition. He serves
      as a living guide for thousands of devotees through scriptural discourse, sankirtans, and
      personal spiritual guidance.</p>
      <p>This page will hold the approved biography — including birth, training, lineage,
      initiation, principal teachers, services, publications, and travels.</p>
    `}
  >
    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
      <Link to="/lineage" className="card p-5 group">
        <h3 className="font-display text-lg text-saffron-900 mb-2">Lineage / Parampara</h3>
        <p className="text-sm text-stone-600">The chain of teachers behind these teachings.</p>
        <span className="inline-flex items-center gap-1 text-saffron-700 text-sm font-medium mt-3 group-hover:text-saffron-900">
          Explore <ArrowRight className="w-4 h-4" />
        </span>
      </Link>
      <Link to="/initiation" className="card p-5 group">
        <h3 className="font-display text-lg text-saffron-900 mb-2">Initiation & Guidance</h3>
        <p className="text-sm text-stone-600">Seek personal initiation and spiritual guidance.</p>
        <span className="inline-flex items-center gap-1 text-saffron-700 text-sm font-medium mt-3 group-hover:text-saffron-900">
          Register <ArrowRight className="w-4 h-4" />
        </span>
      </Link>
      <Link to="/sankirtans" className="card p-5 group">
        <h3 className="font-display text-lg text-saffron-900 mb-2">Sankirtans & Programs</h3>
        <p className="text-sm text-stone-600">Join us for kirtan and discourse.</p>
        <span className="inline-flex items-center gap-1 text-saffron-700 text-sm font-medium mt-3 group-hover:text-saffron-900">
          Programs <ArrowRight className="w-4 h-4" />
        </span>
      </Link>
    </div>
    <div className="text-center mt-12">
      <a
        href={import.meta.env.VITE_YOUTUBE_LINK || '#'}
        target="_blank"
        rel="noreferrer"
        className="inline-block"
      >
        <Button variant="gold">
          <Youtube className="w-4 h-4" /> Visit the YouTube Channel
        </Button>
      </a>
    </div>
  </CmsPage>
);

export default ShriPundrikGoswamiPage;
