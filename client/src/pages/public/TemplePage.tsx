import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/common/PageHero';
import { PageSection } from '@/components/common/PageSection';
import { TempleLocation } from '@/components/common/TempleLocation';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';

const galleryPlaceholders = [
  'Temple courtyard — image placeholder',
  'Shri Radha Raman Lal deity — image placeholder',
  'Keshi Ghat, Vrindavan — image placeholder',
];

const TemplePage = (): JSX.Element => (
  <>
    <Seo
      title="Shri Radha Raman Lal Temple, Vrindavan"
      description="Visit Shri Radha Raman Lal Temple at Keshi Ghat, Vrindavan — a sacred centre of Gaudiya Vaishnav worship."
    />
    <PageHero
      eyebrow="Sacred Abode"
      title="Shri Radha Raman Lal Temple, Vrindavan"
      subtitle="A living centre of worship on the banks of the Yamuna, rooted in the Gaudiya Vaishnav tradition and the Goswami family lineage."
      image="https://images.unsplash.com/photo-1605369572399-05d8d64b0bbe?auto=format&fit=crop&w=1600&q=80"
    />

    <PageSection title="A Place of Eternal Remembrance">
      <div className="prose-bhakti font-serif text-lg max-w-3xl mx-auto space-y-5 text-stone-700">
        <p>
          Shri Radha Raman Lal Temple stands among the most beloved sanctuaries of Vrindavan — the
          eternal abode where devotees gather to remember Shri Radha and Krishna through arati,
          kirtan, and heartfelt seva. Situated near Keshi Ghat on the sacred Yamuna, the temple
          carries the fragrance of centuries of unbroken devotional culture.
        </p>
        <p>
          This holy place is intimately connected with the Gaudiya Vaishnav tradition and the
          Goswami family lineage that has preserved the worship of Shri Radha Raman Lal across
          generations. Here, the teachings of Shri Chaitanya Mahaprabhu are not merely studied — they
          are lived through daily worship, festival celebration, and service to the Lord and His
          devotees.
        </p>
        <p>
          Pilgrims and seekers who visit find a refuge from the noise of the world — a space where
          the holy names resound, where the deities are adorned with love, and where the mood of
          Vrindavan is kept alive for all who yearn for divine association.
        </p>
      </div>
    </PageSection>

    <PageSection alt title="Temple Gallery" subtitle="Placeholder images — replace with official temple photographs.">
      <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {galleryPlaceholders.map((label) => (
          <div
            key={label}
            className="aspect-[4/3] rounded-lg bg-gradient-to-br from-saffron-100 to-cream-200 border border-cream-300 flex items-end p-4"
          >
            <p className="text-xs text-stone-500 font-medium">{label}</p>
          </div>
        ))}
      </div>
    </PageSection>

    <PageSection title="Visit the Temple">
      <div className="max-w-3xl mx-auto">
        <TempleLocation />
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href={siteConfig.temple.mapsUrl} target="_blank" rel="noreferrer">
            <Button variant="primary">Open in Google Maps</Button>
          </a>
          <Link to="/about/the-goswami-family">
            <Button variant="secondary">
              The Goswami Family <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </PageSection>
  </>
);

export default TemplePage;
