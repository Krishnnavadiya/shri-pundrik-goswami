import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, CalendarDays, Tag, User2 } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { Loader } from '@/components/common/Loader';
import { publicApi } from '@/services/publicApi';
import { formatDate } from '@/utils/format';

const ArticleDetailPage = (): JSX.Element => {
  const { slug = '' } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => publicApi.getArticle(slug),
    retry: 0,
  });

  if (isLoading) {
    return (
      <div className="pt-32 pb-16">
        <Loader label="Loading article..." />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="pt-32 pb-16 text-center">
        <p className="text-stone-600 mb-4">Article not found.</p>
        <Link to="/articles" className="text-saffron-700 hover:underline">
          ← Back to articles
        </Link>
      </div>
    );
  }

  const heroImage =
    data.heroImage ||
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1800&q=80';

  return (
    <>
      <Seo
        title={data.title}
        description={data.summary}
        image={data.heroImage}
        type="article"
      />
      <section
        className="pt-32 pb-16 bg-cover bg-center text-cream-50"
        style={{
          backgroundImage: `linear-gradient(rgba(67,20,7,0.65), rgba(67,20,7,0.85)), url(${heroImage})`,
        }}
      >
        <div className="container-narrow text-center">
          {data.category && (
            <span className="inline-block px-3 py-1 bg-gold-500/30 text-gold-200 text-xs uppercase tracking-widest rounded-full mb-4">
              {data.category}
            </span>
          )}
          <h1 className="font-display text-3xl sm:text-5xl leading-tight text-balance mb-4">
            {data.title}
          </h1>
          {data.summary && (
            <p className="font-serif text-lg text-cream-100/90 max-w-2xl mx-auto">{data.summary}</p>
          )}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-cream-200/80">
            {data.authorName && (
              <span className="inline-flex items-center gap-1">
                <User2 className="w-4 h-4" /> {data.authorName}
              </span>
            )}
            {data.publishedAt && (
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="w-4 h-4" /> {formatDate(data.publishedAt)}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-cream-50">
        <div className="container-narrow">
          <Link
            to="/articles"
            className="inline-flex items-center gap-1 text-saffron-700 mb-8 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> All articles
          </Link>

          <article
            className="prose-bhakti font-serif text-lg max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: data.body }}
          />

          {data.tags && data.tags.length > 0 && (
            <div className="max-w-3xl mx-auto mt-12 flex flex-wrap items-center gap-2 pt-6 border-t border-cream-200">
              <Tag className="w-4 h-4 text-stone-400" />
              {data.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-cream-100 text-stone-700 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {(data.authorName || data.authorBio) && (
            <div className="max-w-3xl mx-auto mt-10 p-6 bg-white border border-cream-200 rounded-lg shadow-soft flex items-start gap-4">
              {data.authorImage ? (
                <img
                  src={data.authorImage}
                  alt={data.authorName}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-saffron-100 text-saffron-700 flex items-center justify-center font-display text-2xl">
                  {data.authorName?.[0] || 'A'}
                </div>
              )}
              <div>
                <p className="font-display text-lg text-saffron-900">{data.authorName}</p>
                {data.authorBio && (
                  <p className="text-sm text-stone-600 mt-1 leading-relaxed">{data.authorBio}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ArticleDetailPage;
