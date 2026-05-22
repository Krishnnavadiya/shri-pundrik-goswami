import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

const SITE_NAME = import.meta.env.VITE_SITE_NAME || 'Shri Pundrik Goswami';

export const Seo = ({
  title,
  description = 'The official devotional website of Shri Pundrik Goswami — biography, lineage, articles, events, kirtans, books, and seva.',
  image,
  url,
  type = 'website',
}: SeoProps): JSX.Element => {
  const pageTitle = title ? `${title} · ${SITE_NAME}` : SITE_NAME;
  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};
