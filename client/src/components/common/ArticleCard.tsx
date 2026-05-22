import { Link } from 'react-router-dom';
import { CalendarDays, ArrowRight } from 'lucide-react';
import type { Article } from '@/types';
import { formatDate, stripHtml, truncate } from '@/utils/format';

export const ArticleCard = ({ article }: { article: Article }): JSX.Element => {
  const summary = article.summary || truncate(stripHtml(article.body), 160);
  const fallbackImage =
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80';

  return (
    <article className="card group flex flex-col h-full">
      <Link to={`/articles/${article.slug}`} className="block overflow-hidden">
        <div
          className="aspect-[4/3] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{ backgroundImage: `url(${article.heroImage || fallbackImage})` }}
        />
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs text-stone-500 mb-2">
          {article.category && (
            <span className="px-2 py-1 bg-saffron-100 text-saffron-800 rounded-full font-medium">
              {article.category}
            </span>
          )}
          {article.publishedAt && (
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="w-3.5 h-3.5" />
              {formatDate(article.publishedAt)}
            </span>
          )}
        </div>
        <h3 className="font-display text-xl text-saffron-900 mb-2 line-clamp-2 group-hover:text-saffron-700 transition-colors">
          <Link to={`/articles/${article.slug}`}>{article.title}</Link>
        </h3>
        {summary && <p className="text-sm text-stone-600 line-clamp-3 mb-4 flex-1">{summary}</p>}
        <Link
          to={`/articles/${article.slug}`}
          className="inline-flex items-center gap-1 text-saffron-700 hover:text-saffron-900 text-sm font-medium mt-auto"
        >
          Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
};
