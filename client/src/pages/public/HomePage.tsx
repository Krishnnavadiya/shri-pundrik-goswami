import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, BookOpen, Calendar, HeartHandshake, Mail, Music, Newspaper } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { publicApi } from '@/services/publicApi';
import { ArticleCard } from '@/components/common/ArticleCard';
import { EventCard } from '@/components/common/EventCard';
import { Loader } from '@/components/common/Loader';

const HomePage = (): JSX.Element => {
  const { data: articlesResp } = useQuery({
    queryKey: ['articles', 'home'],
    queryFn: () => publicApi.listArticles({ limit: 3 }),
  });

  const { data: eventsResp } = useQuery({
    queryKey: ['events', 'upcoming'],
    queryFn: () => publicApi.listEvents({ upcoming: true, limit: 4 }),
  });

  const { data: projects } = useQuery({
    queryKey: ['projects', 'home'],
    queryFn: () => publicApi.listProjects(),
  });

  return (
    <>
      <Seo title="Home" />
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center bg-cover bg-center text-cream-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(58, 16, 16, 0.55), rgba(67, 20, 7, 0.7)), url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1800&q=80')",
        }}
      >
        <div className="container-wide pt-24 pb-16 text-center">
          <div className="inline-flex items-center gap-3 text-gold-300 text-xs sm:text-sm font-medium uppercase tracking-[0.35em] mb-5 animate-fade-in">
            <span className="h-px w-12 bg-gold-400/60" />
            Servant of Shri Radha Krishna
            <span className="h-px w-12 bg-gold-400/60" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl leading-tight text-balance mb-6 animate-slide-up">
            Shri Pundrik Goswami
          </h1>
          <p className="font-serif text-lg sm:text-2xl text-cream-100/90 max-w-3xl mx-auto leading-relaxed mb-10 animate-slide-up">
            A life rooted in the eternal teachings of bhakti — guiding seekers through scripture,
            sankirtan, and the sweet remembrance of Shri Radha and Krishna.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 animate-slide-up">
            <Link to="/shri-pundrik-goswami">
              <Button variant="gold" size="lg">
                Read Biography <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/initiation">
              <Button variant="outline" size="lg" className="border-cream-50 text-cream-50 hover:bg-cream-50 hover:text-saffron-900">
                Seek Initiation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Biography preview */}
      <section className="py-20 bg-cream-50">
        <div className="container-wide grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div
              className="aspect-[4/5] bg-cover bg-center rounded-lg shadow-soft"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1605369572399-05d8d64b0bbe?auto=format&fit=crop&w=900&q=80')",
              }}
            />
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-saffron-700 text-cream-50 p-5 rounded-lg shadow-glow max-w-xs">
              <p className="font-display text-sm uppercase tracking-widest text-gold-300 mb-2">
                A Living Tradition
              </p>
              <p className="font-serif text-base leading-relaxed">
                Carrying forward the unbroken parampara of Shri Chaitanya Mahaprabhu.
              </p>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="About"
              title="A life devoted to bhakti and seva"
              align="left"
            />
            <div className="prose-bhakti font-serif text-lg">
              <p>
                Shri Pundrik Goswami is a revered teacher in the Gaudiya Vaishnava tradition. His
                life centres on the worship of Shri Radha and Krishna, the scriptural transmission
                of the path of bhakti, and tireless service to seekers across the world.
              </p>
              <p>
                Through daily worship, regular sankirtans, classes, and personal guidance, he
                continues a tradition that reaches back through the Six Goswamis of Vrindavan to
                Shri Chaitanya Mahaprabhu Himself.
              </p>
            </div>
            <Link to="/shri-pundrik-goswami" className="inline-block mt-6">
              <Button variant="primary">
                Read Full Biography <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="py-20 bg-gradient-to-b from-cream-100 to-cream-50">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Calendar"
            title="Upcoming Sankirtans & Festivals"
            subtitle="Join us in person or online for kirtan, katha, and the celebration of sacred festivals."
          />
          {!eventsResp ? (
            <Loader label="Loading upcoming events..." />
          ) : eventsResp.data.length === 0 ? (
            <p className="text-center text-stone-500">No upcoming events at the moment. Please check back soon.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              {eventsResp.data.slice(0, 4).map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link to="/events">
              <Button variant="secondary">
                <Calendar className="w-4 h-4" /> View Full Calendar
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured articles */}
      <section className="py-20 bg-cream-50">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Teachings"
            title="Featured Articles"
            subtitle="Reflections on bhakti, scripture, and the inner life of devotion."
          />
          {!articlesResp ? (
            <Loader />
          ) : articlesResp.data.length === 0 ? (
            <p className="text-center text-stone-500">Articles coming soon.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {articlesResp.data.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link to="/articles">
              <Button variant="primary">
                Read All Articles <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured resources */}
      <section className="py-20 bg-gradient-to-br from-saffron-900 via-saffron-800 to-maroon-900 text-cream-50">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Resources"
            title="Wisdom in Every Form"
            subtitle="Books, kirtans, lectures, and newsletters — the teachings of bhakti, freely shared."
            light
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: BookOpen,
                title: 'Books & PDFs',
                description: 'A curated library of devotional reading.',
                to: '/books-pdfs',
              },
              {
                icon: Music,
                title: 'Audio & Video',
                description: 'Kirtans, classes, and recorded lectures.',
                to: '/audio-video',
              },
              {
                icon: Newspaper,
                title: 'Newsletters',
                description: 'Monthly devotional updates and news.',
                to: '/newsletters',
              },
              {
                icon: HeartHandshake,
                title: 'Projects / Seva',
                description: 'Temple seva, cow protection, food distribution.',
                to: '/projects',
              },
            ].map(({ icon: Icon, title, description, to }) => (
              <Link
                key={title}
                to={to}
                className="group bg-saffron-950/40 hover:bg-saffron-950/60 border border-saffron-700/40 backdrop-blur p-6 rounded-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-md bg-gold-500/20 text-gold-300 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl mb-2">{title}</h3>
                <p className="text-sm text-cream-100/80 leading-relaxed">{description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 bg-cream-50">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Projects"
            title="Seva: The Heart of Bhakti"
            subtitle="Active devotional projects sustained by the love and contributions of our community."
          />
          {!projects ? (
            <Loader />
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {projects.slice(0, 3).map((project) => (
                <Link
                  to={`/projects/${project.slug}`}
                  key={project._id}
                  className="card group p-6"
                >
                  <HeartHandshake className="w-8 h-8 text-saffron-700 mb-3" />
                  <h3 className="font-display text-xl text-saffron-900 mb-2 group-hover:text-saffron-700 transition-colors">
                    {project.title}
                  </h3>
                  {project.mission && (
                    <p className="text-stone-600 text-sm leading-relaxed">{project.mission}</p>
                  )}
                  <span className="inline-flex items-center gap-1 text-saffron-700 text-sm font-medium mt-4">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-gold-50 to-cream-100">
        <div className="container-narrow text-center">
          <Mail className="w-10 h-10 text-saffron-700 mx-auto mb-4" />
          <SectionHeading
            title="Stay Connected"
            subtitle="Receive monthly newsletters, event announcements, and inspirations directly to your inbox."
          />
          <Link to="/contact?routeTo=newsletter">
            <Button variant="primary" size="lg">
              Subscribe to Updates
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
