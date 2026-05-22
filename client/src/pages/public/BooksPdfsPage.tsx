import { useQuery } from '@tanstack/react-query';
import { BookOpen, Download, Eye } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/common/PageHero';
import { Loader, EmptyState } from '@/components/common/Loader';
import { publicApi } from '@/services/publicApi';

const BooksPdfsPage = (): JSX.Element => {
  const { data, isLoading } = useQuery({
    queryKey: ['media', 'pdf'],
    queryFn: () => publicApi.listMedia({ type: 'pdf', limit: 50 }),
  });

  return (
    <>
      <Seo title="Books & PDFs" description="A curated library of devotional books and articles." />
      <PageHero
        eyebrow="Library"
        title="Books & PDFs"
        subtitle="A growing library of devotional books, articles, and scriptural readers — freely available."
      />
      <section className="py-16 bg-cream-50">
        <div className="container-wide">
          {isLoading ? (
            <Loader />
          ) : !data || data.data.length === 0 ? (
            <EmptyState
              icon={<BookOpen className="w-10 h-10" />}
              title="Library coming soon"
              description="The library is being prepared. Please check back shortly."
            />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.data.map((item) => (
                <div key={item._id} className="card flex flex-col">
                  <div
                    className="aspect-[3/4] bg-cover bg-center bg-saffron-100"
                    style={{
                      backgroundImage: item.coverImage
                        ? `url(${item.coverImage})`
                        : 'linear-gradient(135deg, #c2410c, #7c2d12)',
                    }}
                  >
                    {!item.coverImage && (
                      <div className="w-full h-full flex items-center justify-center text-cream-50">
                        <BookOpen className="w-16 h-16" />
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-display text-lg text-saffron-900 mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                    {item.author && (
                      <p className="text-xs text-stone-500 mb-2">by {item.author}</p>
                    )}
                    {item.description && (
                      <p className="text-sm text-stone-600 line-clamp-3 mb-3 flex-1">
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 mt-auto pt-3 border-t border-cream-100">
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-saffron-700 hover:text-saffron-900 text-sm"
                        >
                          <Eye className="w-4 h-4" /> View
                        </a>
                      )}
                      {item.downloadable && item.url && (
                        <a
                          href={item.url}
                          download
                          className="inline-flex items-center gap-1 text-saffron-700 hover:text-saffron-900 text-sm"
                        >
                          <Download className="w-4 h-4" /> Download
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BooksPdfsPage;
