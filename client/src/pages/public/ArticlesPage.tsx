import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, BookOpen } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/common/PageHero';
import { ArticleCard } from '@/components/common/ArticleCard';
import { Loader, EmptyState } from '@/components/common/Loader';
import { publicApi } from '@/services/publicApi';
import { Input } from '@/components/ui/Input';

const ArticlesPage = (): JSX.Element => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | undefined>();

  const { data, isLoading } = useQuery({
    queryKey: ['articles', { search, category }],
    queryFn: () => publicApi.listArticles({ search, category, limit: 30 }),
  });

  const categories = Array.from(new Set((data?.data || []).map((a) => a.category).filter(Boolean))) as string[];

  return (
    <>
      <Seo title="Articles" description="Articles, reflections, and discourses on bhakti." />
      <PageHero
        eyebrow="Teachings"
        title="Articles & Reflections"
        subtitle="Discourses on bhakti, scripture, sadhana, and the inner life of devotion."
      />
      <section className="py-16 bg-cream-50">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto mb-10">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <Input
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {categories.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-4 justify-center">
                <button
                  onClick={() => setCategory(undefined)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${!category ? 'bg-saffron-700 text-white border-saffron-700' : 'bg-white text-stone-700 border-stone-300 hover:bg-cream-100'}`}
                >
                  All
                </button>
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${category === c ? 'bg-saffron-700 text-white border-saffron-700' : 'bg-white text-stone-700 border-stone-300 hover:bg-cream-100'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isLoading ? (
            <Loader />
          ) : !data || data.data.length === 0 ? (
            <EmptyState
              icon={<BookOpen className="w-10 h-10" />}
              title="No articles yet"
              description="New articles will appear here as they are published."
            />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.data.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ArticlesPage;
