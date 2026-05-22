import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, HeartHandshake } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/common/PageHero';
import { Loader } from '@/components/common/Loader';
import { Button } from '@/components/ui/Button';
import { publicApi } from '@/services/publicApi';

const ProjectDetailPage = (): JSX.Element => {
  const { slug = '' } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['project', slug],
    queryFn: () => publicApi.getProject(slug),
    retry: 0,
  });

  if (isLoading)
    return (
      <div className="pt-32 pb-16">
        <Loader />
      </div>
    );

  if (error || !data)
    return (
      <div className="pt-32 pb-16 text-center">
        <p className="text-stone-600 mb-4">Project not found.</p>
        <Link to="/projects" className="text-saffron-700 hover:underline">
          ← Back to projects
        </Link>
      </div>
    );

  return (
    <>
      <Seo title={data.title} description={data.mission} image={data.heroImage} />
      <PageHero
        eyebrow="Seva"
        title={data.title}
        subtitle={data.mission}
        image={data.heroImage}
      />
      <section className="py-16 bg-cream-50">
        <div className="container-narrow">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1 text-saffron-700 mb-6 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> All projects
          </Link>

          {data.body && (
            <div
              className="prose-bhakti font-serif text-lg mb-10"
              dangerouslySetInnerHTML={{ __html: data.body }}
            />
          )}

          {data.activities && data.activities.length > 0 && (
            <div className="mb-10">
              <h2 className="font-display text-2xl text-saffron-900 mb-4">Activities</h2>
              <ul className="space-y-2">
                {data.activities.map((a, i) => (
                  <li key={i} className="flex items-start gap-3 text-stone-700">
                    <HeartHandshake className="w-5 h-5 text-saffron-700 mt-0.5 shrink-0" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.gallery && data.gallery.length > 0 && (
            <div className="mb-10">
              <h2 className="font-display text-2xl text-saffron-900 mb-4">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {data.gallery.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="aspect-square object-cover rounded-md w-full"
                  />
                ))}
              </div>
            </div>
          )}

          {data.ctaUrl && (
            <div className="text-center pt-6">
              <Link to={data.ctaUrl}>
                <Button variant="primary" size="lg">
                  {data.ctaLabel || 'Support This Seva'}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProjectDetailPage;
