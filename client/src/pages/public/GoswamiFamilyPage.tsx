import { CmsPage } from '@/components/common/CmsPage';

const GoswamiFamilyPage = (): JSX.Element => (
  <CmsPage
    slug="about/goswami-family"
    fallbackTitle="The Goswami Family and Tradition"
    fallbackSubtitle="A sacred lineage of teachers, scholars, and servants of the Lord"
    fallbackBody={`
      <p>The Goswami family carries a sacred trust handed down across many generations —
      guarding scripture, ritual, sankirtan culture, and the inner mood of devotion.</p>
      <p>Replace this content with the family's history, lineage holders, principal temples,
      and the unique contributions of the family to the broader tradition.</p>
    `}
  />
);

export default GoswamiFamilyPage;
