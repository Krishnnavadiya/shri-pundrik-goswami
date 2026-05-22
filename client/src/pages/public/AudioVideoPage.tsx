import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Music, Play, ExternalLink } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/common/PageHero';
import { Loader, EmptyState } from '@/components/common/Loader';
import { publicApi } from '@/services/publicApi';
import { cn } from '@/utils/cn';

const AudioVideoPage = (): JSX.Element => {
  const [filter, setFilter] = useState<'video' | 'audio'>('video');
  const { data, isLoading } = useQuery({
    queryKey: ['media', filter],
    queryFn: () => publicApi.listMedia({ type: filter, limit: 30 }),
  });

  return (
    <>
      <Seo title="Audio & Video" description="Kirtans, classes, and recorded discourses." />
      <PageHero
        eyebrow="Media"
        title="Audio & Video"
        subtitle="Kirtans, classes, and recorded discourses for daily devotional listening."
      />
      <section className="py-16 bg-cream-50">
        <div className="container-wide">
          <div className="flex items-center justify-center gap-2 mb-10">
            {(['video', 'audio'] as const).map((option) => (
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
                {option === 'video' ? 'Videos' : 'Audio / Kirtans'}
              </button>
            ))}
          </div>

          {isLoading ? (
            <Loader />
          ) : !data || data.data.length === 0 ? (
            <EmptyState
              icon={<Music className="w-10 h-10" />}
              title="Coming soon"
              description="Media will be added here as recordings become available."
            />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.data.map((item) => (
                <a
                  key={item._id}
                  href={item.url || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="card group flex flex-col"
                >
                  <div
                    className="aspect-video bg-cover bg-center bg-saffron-200 relative"
                    style={{
                      backgroundImage: item.coverImage
                        ? `url(${item.coverImage})`
                        : 'linear-gradient(135deg, #ea580c, #7c2d12)',
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center bg-saffron-950/30 group-hover:bg-saffron-950/40 transition-colors">
                      <div className="w-14 h-14 rounded-full bg-cream-50/95 text-saffron-800 flex items-center justify-center shadow-lg">
                        <Play className="w-6 h-6 ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg text-saffron-900 mb-1 line-clamp-2 group-hover:text-saffron-700">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-stone-600 line-clamp-2">{item.description}</p>
                    )}
                    <span className="inline-flex items-center gap-1 text-saffron-700 text-xs font-medium mt-3">
                      Open <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AudioVideoPage;
