import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { HeartHandshake, ArrowRight } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/common/PageHero';
import { Loader, EmptyState } from '@/components/common/Loader';
import { publicApi } from '@/services/publicApi';

const ProjectsPage = (): JSX.Element => {
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => publicApi.listProjects(),
  });

  return (
    <>
      <Seo title="Projects & Seva" description="Devotional and community service projects." />
      <PageHero
        eyebrow="Seva"
        title="Projects & Service"
        subtitle="Active devotional, cultural, and community service projects sustained by the love of our community."
      />
      <section className="py-16 bg-cream-50">
        <div className="container-wide">
          {isLoading ? (
            <Loader />
          ) : !data || data.length === 0 ? (
            <EmptyState
              icon={<HeartHandshake className="w-10 h-10" />}
              title="Projects coming soon"
              description="Project details are being prepared."
            />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((project) => (
                <article key={project._id} className="card flex flex-col h-full">
                  {project.heroImage && (
                    <div
                      className="aspect-[16/10] bg-cover bg-center"
                      style={{ backgroundImage: `url(${project.heroImage})` }}
                    />
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <HeartHandshake className="w-8 h-8 text-saffron-700 mb-3" />
                    <h3 className="font-display text-2xl text-saffron-900 mb-2">
                      {project.title}
                    </h3>
                    {project.mission && (
                      <p className="text-stone-600 leading-relaxed mb-4 flex-1">{project.mission}</p>
                    )}
                    <Link
                      to={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 text-saffron-700 hover:text-saffron-900 text-sm font-medium mt-auto"
                    >
                      Learn more <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProjectsPage;
