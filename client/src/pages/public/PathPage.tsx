import { CmsPage } from '@/components/common/CmsPage';

const PathPage = (): JSX.Element => (
  <CmsPage
    slug="about/path"
    fallbackTitle="The Path and Philosophy"
    fallbackSubtitle="Bhakti — the natural inclination of the soul toward Shri Radha Krishna"
    fallbackBody={`
      <p>The teachings followed and shared by Shri Pundrik Goswami emphasize bhakti — pure,
      loving devotional service — as the heart of human life.</p>
      <p>This page will hold a detailed exposition of the philosophy: the nature of the self
      and the Lord, the role of guru and parampara, the practices of sadhana, and the
      destination of pure devotion.</p>
    `}
  />
);

export default PathPage;
