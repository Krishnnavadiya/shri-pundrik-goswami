import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CalendarDays, MapPin, Tag, ArrowLeft, ExternalLink } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/common/PageHero';
import { Loader } from '@/components/common/Loader';
import { publicApi } from '@/services/publicApi';
import { formatDate } from '@/utils/format';
import { Button } from '@/components/ui/Button';

const EventDetailPage = (): JSX.Element => {
  const { slug = '' } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['event', slug],
    queryFn: () => publicApi.getEvent(slug),
    retry: 0,
  });

  if (isLoading) {
    return (
      <div className="pt-32 pb-16">
        <Loader label="Loading event..." />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="pt-32 pb-16 text-center">
        <p className="text-stone-600 mb-4">Event not found.</p>
        <Link to="/events" className="text-saffron-700 hover:underline">
          ← Back to events
        </Link>
      </div>
    );
  }

  return (
    <>
      <Seo title={data.title} description={data.description} image={data.image} />
      <PageHero
        eyebrow="Event"
        title={data.title}
        subtitle={data.description}
        image={data.image}
      />
      <section className="py-16 bg-cream-50">
        <div className="container-narrow">
          <Link to="/events" className="inline-flex items-center gap-1 text-saffron-700 mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to events
          </Link>

          <div className="bg-white rounded-lg shadow-soft p-6 sm:p-8 border border-cream-200">
            <div className="grid sm:grid-cols-3 gap-4 mb-6 text-sm">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-saffron-700" />
                <div>
                  <p className="text-stone-500 text-xs uppercase tracking-widest">When</p>
                  <p className="text-stone-800 font-medium">
                    {formatDate(data.startDate, 'EEE, d MMM yyyy')}
                    {data.endDate && ` – ${formatDate(data.endDate, 'd MMM yyyy')}`}
                  </p>
                </div>
              </div>
              {data.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-saffron-700" />
                  <div>
                    <p className="text-stone-500 text-xs uppercase tracking-widest">Where</p>
                    <p className="text-stone-800 font-medium">{data.location}</p>
                  </div>
                </div>
              )}
              {data.category && (
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-saffron-700" />
                  <div>
                    <p className="text-stone-500 text-xs uppercase tracking-widest">Category</p>
                    <p className="text-stone-800 font-medium">{data.category}</p>
                  </div>
                </div>
              )}
            </div>

            {data.body && (
              <div className="prose-bhakti font-serif" dangerouslySetInnerHTML={{ __html: data.body }} />
            )}

            {data.registrationUrl && (
              <div className="mt-8">
                <a href={data.registrationUrl} target="_blank" rel="noreferrer">
                  <Button variant="primary">
                    Register / Learn More <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default EventDetailPage;
