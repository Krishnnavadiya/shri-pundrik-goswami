import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/common/PageHero';
import { EventCard } from '@/components/common/EventCard';
import { Loader, EmptyState } from '@/components/common/Loader';
import { publicApi } from '@/services/publicApi';
import { cn } from '@/utils/cn';
import { CalendarDays } from 'lucide-react';

const EventsPage = (): JSX.Element => {
  const [filter, setFilter] = useState<'upcoming' | 'all'>('upcoming');

  const { data, isLoading } = useQuery({
    queryKey: ['events', filter],
    queryFn: () =>
      publicApi.listEvents(filter === 'upcoming' ? { upcoming: true, limit: 50 } : { limit: 100 }),
  });

  return (
    <>
      <Seo title="Events" description="Upcoming sankirtans, festivals, and programs." />
      <PageHero
        eyebrow="Calendar"
        title="Events & Festivals"
        subtitle="Join us in person or online for sankirtan, katha, and the celebration of sacred festivals."
      />
      <section className="py-16 bg-cream-50">
        <div className="container-wide">
          <div className="flex items-center justify-center gap-2 mb-10">
            {(['upcoming', 'all'] as const).map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                  filter === option
                    ? 'bg-saffron-700 text-white'
                    : 'bg-white text-stone-700 border border-stone-300 hover:bg-cream-100',
                )}
              >
                {option === 'upcoming' ? 'Upcoming' : 'All Events'}
              </button>
            ))}
          </div>

          {isLoading ? (
            <Loader />
          ) : !data || data.data.length === 0 ? (
            <EmptyState
              icon={<CalendarDays className="w-10 h-10" />}
              title="No events found"
              description="Please check back soon. New events are added regularly."
            />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.data.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default EventsPage;
