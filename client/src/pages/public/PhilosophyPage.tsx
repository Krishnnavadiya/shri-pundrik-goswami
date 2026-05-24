import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/common/PageHero';
import { PageSection } from '@/components/common/PageSection';
import { QuoteCard } from '@/components/common/QuoteCard';
import { Button } from '@/components/ui/Button';

const bhavTypes = [
  {
    title: 'Dasya Bhav',
    text: 'The mood of humble service — seeing oneself as the eternal servant of the Lord, ready to carry out His will with devotion and reverence.',
  },
  {
    title: 'Sakhya Bhav',
    text: 'The mood of friendship — a confidential relationship with Krishna marked by trust, playfulness, and unguarded affection.',
  },
  {
    title: 'Vatsalya Bhav',
    text: 'The mood of parental love — caring for the Lord as a parent cares for a beloved child, protecting and nurturing Him with tenderness.',
  },
  {
    title: 'Madhurya Bhav',
    text: 'The mood of conjugal love — the highest expression of devotion, in which the soul relates to Krishna as the supreme beloved.',
  },
];

const stages = [
  { name: 'Shraddha', desc: 'Faith — the first awakening of trust in the path of bhakti and the words of saintly teachers.' },
  { name: 'Sadhu-sanga', desc: 'Association with devotees — learning through the company of those who live the teachings.' },
  { name: 'Bhajan-kriya', desc: 'The beginning of regulated devotional practice under proper guidance.' },
  { name: 'Anartha-nivritti', desc: 'Gradual clearing of unwanted habits and distractions from the heart.' },
  { name: 'Nishtha', desc: 'Steadiness — devotion becomes consistent and less disturbed by worldly pulls.' },
  { name: 'Ruchi', desc: 'Taste — genuine relish arises in chanting, hearing, and serving.' },
  { name: 'Asakti', desc: 'Attachment — the devotee feels drawn irresistibly toward Krishna and His service.' },
  { name: 'Bhav', desc: 'Spiritual emotion — the first rays of pure love begin to dawn in the heart.' },
  { name: 'Prem', desc: 'Pure love of God — the summit of spiritual life, the gift of divine grace.' },
];

const PhilosophyPage = (): JSX.Element => (
  <>
    <Seo
      title="The Gaudiya Vaishnav Philosophy"
      description="An introduction to the heart of Gaudiya Vaishnav thought — Shri Chaitanya Mahaprabhu, Harinam Sankirtan, and the path of sacred love."
    />
    <PageHero
      eyebrow="The Path"
      title="The Gaudiya Vaishnav Philosophy"
      subtitle="The science of sacred love — as revealed through Shri Chaitanya Mahaprabhu and preserved by the great teachers of Vrindavan."
    />

    <PageSection title="Shri Chaitanya Mahaprabhu — The Golden Avatara">
      <div className="prose-bhakti font-serif text-lg max-w-3xl mx-auto space-y-5 text-stone-700">
        <p>
          Five hundred years ago, Shri Chaitanya Mahaprabhu appeared in Bengal to awaken the world
          to the yuga-dharma of this age — the congregational chanting of the holy names. He did
          not come merely to establish a new sect; He came to distribute the highest treasure of
          spiritual life: pure love for Shri Radha and Krishna.
        </p>
        <p>
          Mahaprabhu Himself lived as the ideal devotee, demonstrating that the deepest truths of
          the Vedas are found not in dry speculation but in the simple, ecstatic remembrance of the
          Lord. His life of kirtan, humility, and compassion became the living foundation of the
          Gaudiya Vaishnav tradition.
        </p>
      </div>
      <QuoteCard
        className="mt-8 max-w-2xl mx-auto"
        quote="In this age of quarrel and hypocrisy, there is no other way, no other way, no other way than the chanting of the holy names."
        attribution="Shri Chaitanya Mahaprabhu"
      />
    </PageSection>

    <PageSection alt title="The Heart of the Philosophy">
      <div className="prose-bhakti font-serif text-lg max-w-3xl mx-auto space-y-5 text-stone-700">
        <p>
          Gaudiya Vaishnav philosophy teaches that the soul is eternally a servant of Krishna, and
          that the natural function of the soul is loving devotion — bhakti. Unlike paths that seek
          impersonal liberation or material enjoyment, this tradition aims at prema: unalloyed love
          for the Supreme Person in His most sweet form as Shri Radha and Krishna.
        </p>
        <p>
          Knowledge, renunciation, and ritual have their place, but they are meant to support the
          flowering of devotion. The ultimate goal is not to merge into a formless light but to
          enter the eternal pastimes of Vrindavan as a loving associate of the Lord.
        </p>
      </div>
    </PageSection>

    <PageSection title="Harinam Sankirtan — Chanting the Holy Names">
      <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
        <div className="aspect-video rounded-lg bg-gradient-to-br from-saffron-200 to-gold-100 border border-cream-300 flex items-end p-4">
          <p className="text-xs text-stone-500">Kirtan gathering — image placeholder</p>
        </div>
        <div className="font-serif text-stone-700 leading-relaxed space-y-4">
          <p>
            The recommended practice for this age is sankirtan — the loud, joyful chanting of the
            maha-mantra: Hare Krishna, Hare Krishna, Krishna Krishna, Hare Hare / Hare Rama, Hare
            Rama, Rama Rama, Hare Hare.
          </p>
          <p>
            Through the holy names, the heart is cleansed, the mind becomes peaceful, and the soul
            begins to taste the nectar of devotion. Sankirtan is both personal meditation and
            congregational celebration — the bridge between the individual seeker and the community
            of devotees.
          </p>
        </div>
      </div>
    </PageSection>

    <PageSection alt title="Shri Radha-Krishna Prema — The Highest Goal">
      <div className="prose-bhakti font-serif text-lg max-w-3xl mx-auto space-y-5 text-stone-700">
        <p>
          The summit of Gaudiya Vaishnav thought is prema-bhakti — love for Krishna in the mood of
          Shri Radha, who represents the highest expression of devotion. Radha&apos;s love is
          selfless, all-consuming, and utterly dedicated to the pleasure of the Beloved.
        </p>
        <p>
          To follow in the footsteps of the gopis of Vrindavan, under proper guidance, is to walk
          the path of raganuga bhakti — devotion inspired by their spontaneous, love-saturated
          example rather than by rigid rules alone.
        </p>
      </div>
    </PageSection>

    <PageSection title="Shri Vrindavan — The Eternal Spiritual Abode">
      <div className="prose-bhakti font-serif text-lg max-w-3xl mx-auto space-y-5 text-stone-700">
        <p>
          Vrindavan is not merely a town in Uttar Pradesh — in the eyes of the devotee, it is the
          eternal realm where Krishna performs His pastimes, where every grove and ghat is
          saturated with divine remembrance. To live in Vrindavan, or to visit with a sincere
          heart, is to step into the atmosphere of the Lord&apos;s personal abode.
        </p>
        <p>
          The Goswamis of Vrindavan established temples, composed literature, and mapped the sacred
          geography so that pilgrims could walk in the footsteps of Krishna and His companions.
          Today, that legacy continues through worship, kirtan, and the preservation of devotional
          culture.
        </p>
      </div>
    </PageSection>

    <PageSection alt title="Devotional Relationships (Bhav)">
      <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
        {bhavTypes.map(({ title, text }) => (
          <div key={title} className="bg-white p-6 rounded-lg border border-cream-200 shadow-soft">
            <h3 className="font-display text-lg text-saffron-900 mb-2">{title}</h3>
            <p className="font-serif text-sm text-stone-600 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </PageSection>

    <PageSection title="Stages of Spiritual Progress">
      <div className="max-w-3xl mx-auto space-y-3">
        {stages.map(({ name, desc }, i) => (
          <div
            key={name}
            className="flex gap-4 items-start bg-white p-4 rounded-lg border border-cream-200"
          >
            <span className="shrink-0 w-8 h-8 rounded-full bg-saffron-100 text-saffron-800 flex items-center justify-center text-sm font-bold">
              {i + 1}
            </span>
            <div>
              <h3 className="font-display text-saffron-900">{name}</h3>
              <p className="font-serif text-sm text-stone-600 mt-1">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </PageSection>

    <PageSection alt title="Sacred Love as the Path">
      <div className="prose-bhakti font-serif text-lg max-w-3xl mx-auto space-y-5 text-stone-700 text-center">
        <p>
          The Gaudiya Vaishnav path is not a philosophy of the intellect alone — it is a way of
          life shaped by love. Through the mercy of the guru, the association of devotees, and the
          chanting of the holy names, the soul awakens to its eternal relationship with Shri
          Krishna and begins the journey home.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4 not-prose">
          <Link to="/sankirtans">
            <Button variant="primary">
              Explore Sankirtans <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/katha-request">
            <Button variant="gold">Request Katha</Button>
          </Link>
        </div>
      </div>
    </PageSection>
  </>
);

export default PhilosophyPage;
