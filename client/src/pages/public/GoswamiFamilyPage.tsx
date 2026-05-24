import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/common/PageHero';
import { PageSection } from '@/components/common/PageSection';
import { QuoteCard } from '@/components/common/QuoteCard';
import { Button } from '@/components/ui/Button';

const timeline = [
  { era: '16th Century', event: 'Shri Gopal Bhatt Goswami receives the mercy of Shri Chaitanya Mahaprabhu and establishes the worship of Shri Radharaman.' },
  { era: 'Following Generations', event: 'Damodar Das Goswami and successive acharyas are entrusted with the seva of the deity and the transmission of teachings.' },
  { era: 'Centuries of Preservation', event: 'The family maintains temples, festivals, literature, and initiation lineages through nearly five hundred years.' },
  { era: 'Present Day', event: 'The current generation continues kirtan, guidance, and the living culture of Gaudiya Vaishnav devotion worldwide.' },
];

const roles = [
  'Preserving the daily seva and festival worship of Shri Radharaman Lal',
  'Guarding and sharing the teachings of Gaudiya Vaishnav philosophy',
  'Composing and preserving devotional literature and commentaries',
  'Offering initiation and personal spiritual guidance to sincere seekers',
  'Upholding temple culture, sacred music, and the celebration of Vaishnav festivals',
];

const GoswamiFamilyPage = (): JSX.Element => (
  <>
    <Seo
      title="The Goswami Family"
      description="The unbroken spiritual lineage connected with Shri Radharaman Temple — nearly five centuries of seva, teaching, and devotion."
    />
    <PageHero
      eyebrow="Sacred Lineage"
      title="The Goswami Family"
      subtitle="An unbroken chain of teachers, servants, and guardians of the Gaudiya Vaishnav tradition — from the Six Goswamis of Vrindavan to the present day."
      image="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80"
    />

    <PageSection title="Origin of the Lineage">
      <div className="prose-bhakti font-serif text-lg max-w-3xl mx-auto space-y-5 text-stone-700">
        <p>
          The Goswami family traces its spiritual origin to the intimate circle of Shri Chaitanya
          Mahaprabhu and the Six Goswamis of Vrindavan — the saintly scholars and devotees who
          established the theological, architectural, and cultural foundations of modern Gaudiya
          Vaishnavism. Among them, Shri Gopal Bhatt Goswami holds a place of singular honour.
        </p>
        <p>
          The lineage connected with Shri Radharaman Temple represents one of the most enduring
          threads of hereditary seva in Vrindavan — a living tradition in which the worship of the
          deity, the study of scripture, and the guidance of seekers pass from one generation to
          the next as a sacred trust rather than a mere inheritance.
        </p>
      </div>
    </PageSection>

    <PageSection alt title="Shri Gopal Bhatt Goswami">
      <div className="grid md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">
        <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-saffron-100 to-cream-200 border border-cream-300 flex items-end p-4">
          <p className="text-xs text-stone-500">Portrait of Shri Gopal Bhatt Goswami — image placeholder</p>
        </div>
        <div className="font-serif text-stone-700 leading-relaxed space-y-4">
          <p>
            Shri Gopal Bhatt Goswami was one of the Six Goswamis — direct associates of Shri
            Chaitanya Mahaprabhu who were empowered to establish the path of devotion in
            Vrindavan. Born in a learned South Indian family, he received the direct mercy of
            Mahaprabhu and was later sent to Vrindavan to serve under the guidance of Shri
            Rupa and Sanatana Goswami.
          </p>
          <p>
            He is especially revered for his role in the appearance of Shri Radharaman — the
            self-manifest deity who emerged from a sacred shaligram shila. Through his pure
            devotion and scholarship, Gopal Bhatt Goswami helped anchor the worship of Radha and
            Krishna in the holy dham for generations to come.
          </p>
        </div>
      </div>
    </PageSection>

    <PageSection title="Damodar Das Goswami and the Continuation of Seva">
      <div className="prose-bhakti font-serif text-lg max-w-3xl mx-auto space-y-5 text-stone-700">
        <p>
          When Shri Gopal Bhatt Goswami entered his final pastimes, the responsibility of seva
          was entrusted to Damodar Das Goswami — a devoted disciple who carried forward the worship
          of Shri Radharaman with the same care and reverence as his spiritual master. This moment
          established the pattern that would define the family for centuries: seva is not owned, it
          is received and passed on in humility.
        </p>
        <p>
          Each successive generation accepted this duty — maintaining arati, festivals, and the
          daily rhythm of temple life while also teaching, initiating, and guiding those who came
          seeking the path of bhakti.
        </p>
      </div>
      <QuoteCard
        className="mt-8 max-w-2xl mx-auto"
        quote="Seva is not a title to be claimed but a service to be offered — generation after generation, with ever-renewed humility."
      />
    </PageSection>

    <PageSection alt title="Generations of Service">
      <div className="prose-bhakti font-serif text-lg max-w-3xl mx-auto space-y-5 text-stone-700 mb-8">
        <p>
          For nearly five hundred years, the Goswami family has preserved an unbroken current of
          Vaishnav tradition. Through periods of peace and periods of challenge, the worship of
          Shri Radharaman Lal continued, the teachings were transmitted, and the culture of
          kirtan and festival celebration was kept alive.
        </p>
      </div>
      <div className="max-w-3xl mx-auto space-y-4">
        {timeline.map(({ era, event }) => (
          <div key={era} className="flex gap-4 bg-white p-5 rounded-lg border border-cream-200">
            <div className="shrink-0 w-28 text-sm font-display text-saffron-800">{era}</div>
            <p className="font-serif text-sm text-stone-600 leading-relaxed">{event}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 max-w-3xl mx-auto aspect-[16/6] rounded-lg bg-cream-200 border border-cream-300 flex items-center justify-center">
        <p className="text-sm text-stone-500">Family lineage tree — diagram placeholder</p>
      </div>
    </PageSection>

    <PageSection title="Role of the Goswami Family Today">
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <ul className="space-y-3 font-serif text-stone-700">
          {roles.map((role) => (
            <li key={role} className="flex gap-2 text-sm leading-relaxed">
              <span className="text-saffron-600 shrink-0">✦</span>
              {role}
            </li>
          ))}
        </ul>
        <div className="space-y-4">
          <div className="aspect-video rounded-lg bg-gradient-to-br from-gold-100 to-saffron-50 border border-cream-300 flex items-end p-4">
            <p className="text-xs text-stone-500">Historical photograph — placeholder</p>
          </div>
          <div className="aspect-video rounded-lg bg-gradient-to-br from-saffron-50 to-cream-100 border border-cream-300 flex items-end p-4">
            <p className="text-xs text-stone-500">Goswami biography archive — placeholder</p>
          </div>
        </div>
      </div>
    </PageSection>

    <PageSection alt title="Legacy of Devotion">
      <div className="prose-bhakti font-serif text-lg max-w-3xl mx-auto space-y-5 text-stone-700 text-center">
        <p>
          The importance of hereditary seva lies not in privilege but in responsibility — the
          solemn duty to protect what previous acharyas sacrificed to preserve. The Goswami family
          stands as a living bridge between the golden age of Mahaprabhu&apos;s associates and the
          devotees of today who seek authentic guidance on the path of sacred love.
        </p>
        <p>
          Shri Pundrik Goswami Ji continues this devotional responsibility in the modern world —
          through sankirtan, katha, personal guidance, and the tireless sharing of the teachings
          that have illuminated hearts for centuries.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4 not-prose">
          <Link to="/shri-pundrik-goswami">
            <Button variant="primary">
              Learn About Shri Pundrik Goswami Ji <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/katha-request">
            <Button variant="gold">Request Katha</Button>
          </Link>
          <Link to="/about/shri-radha-raman-lal-temple-vrindavan">
            <Button variant="secondary">Visit Temple Page</Button>
          </Link>
        </div>
      </div>
    </PageSection>
  </>
);

export default GoswamiFamilyPage;
