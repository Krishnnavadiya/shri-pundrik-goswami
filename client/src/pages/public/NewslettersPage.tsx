import { useQuery } from '@tanstack/react-query';
import { Newspaper, Download } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/common/PageHero';
import { Loader, EmptyState } from '@/components/common/Loader';
import { publicApi } from '@/services/publicApi';
import { formatDate } from '@/utils/format';

const NewslettersPage = (): JSX.Element => {
  const { data, isLoading } = useQuery({
    queryKey: ['newsletters'],
    queryFn: () => publicApi.listNewsletters(),
  });

  return (
    <>
      <Seo title="Newsletters" description="Monthly newsletters from Shri Pundrik Goswami." />
      <PageHero
        eyebrow="Updates"
        title="Newsletter Archive"
        subtitle="Monthly devotional updates, announcements, and reflections."
      />
      <section className="py-16 bg-cream-50">
        <div className="container-narrow">
          {isLoading ? (
            <Loader />
          ) : !data || data.length === 0 ? (
            <EmptyState
              icon={<Newspaper className="w-10 h-10" />}
              title="Archive coming soon"
              description="Past issues will be available here as they are published."
            />
          ) : (
            <div className="space-y-3">
              {data.map((item) => (
                <a
                  key={item._id}
                  href={item.url || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-5 bg-white border border-cream-200 rounded-lg shadow-sm hover:shadow-md transition group"
                >
                  <div className="w-12 h-12 rounded-md bg-saffron-100 text-saffron-700 flex items-center justify-center shrink-0">
                    <Newspaper className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg text-saffron-900 group-hover:text-saffron-700">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-stone-600 line-clamp-1">{item.description}</p>
                    )}
                    {item.publishedAt && (
                      <p className="text-xs text-stone-500 mt-1">{formatDate(item.publishedAt)}</p>
                    )}
                  </div>
                  <Download className="w-5 h-5 text-saffron-700 shrink-0" />
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default NewslettersPage;
