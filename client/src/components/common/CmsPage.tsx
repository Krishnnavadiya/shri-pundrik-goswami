import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/common/PageHero';
import { Loader } from '@/components/common/Loader';
import { publicApi } from '@/services/publicApi';

interface CmsPageProps {
  slug: string;
  fallbackTitle: string;
  fallbackSubtitle?: string;
  fallbackBody?: string;
  fallbackImage?: string;
  children?: ReactNode;
}

export const CmsPage = ({
  slug,
  fallbackTitle,
  fallbackSubtitle,
  fallbackBody,
  fallbackImage,
  children,
}: CmsPageProps): JSX.Element => {
  const { data, isLoading } = useQuery({
    queryKey: ['page', slug],
    queryFn: () => publicApi.getPage(slug),
    retry: 0,
  });

  const title = data?.title || fallbackTitle;
  const subtitle = data?.subtitle || fallbackSubtitle;
  const body = data?.body || fallbackBody || '';
  const image = data?.heroImage || fallbackImage;

  return (
    <>
      <Seo
        title={data?.seoTitle || title}
        description={data?.seoDescription || subtitle}
        image={image}
      />
      <PageHero eyebrow="Shri Pundrik Goswami" title={title} subtitle={subtitle} image={image} />
      <section className="py-16 bg-cream-50">
        <div className="container-narrow">
          {isLoading && !data ? (
            <Loader />
          ) : (
            <div
              className="prose-bhakti font-serif text-lg max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          )}
          {children}
        </div>
      </section>
    </>
  );
};
