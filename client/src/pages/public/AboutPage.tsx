import { CmsPage } from '@/components/common/CmsPage';

const AboutPage = (): JSX.Element => (
  <CmsPage
    slug="about"
    fallbackTitle="About the Temple"
    fallbackSubtitle="A sacred ground for the worship of Shri Radha and Krishna"
    fallbackBody={`
      <p>This is the spiritual home of Shri Pundrik Goswami and a refuge for devotees and seekers
      from across the world. The temple is a centre for daily worship, sankirtan, and the
      preservation of devotional culture.</p>
      <p>Replace this placeholder content from the admin dashboard with the authoritative
      history, architecture, and inner life of the temple — including images, opening times,
      and visitor guidance.</p>
    `}
  />
);

export default AboutPage;
