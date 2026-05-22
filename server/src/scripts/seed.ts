import bcrypt from 'bcryptjs';
import { connectDatabase, disconnectDatabase } from '../config/database';
import { env } from '../config/env';
import {
  AdminUser,
  Page,
  Article,
  Event,
  Faq,
  MediaItem,
  Project,
  LineagePerson,
} from '../models';
import { logger } from '../utils/logger';

const seed = async (): Promise<void> => {
  await connectDatabase();
  logger.info('Seeding database...');

  const existingAdmin = await AdminUser.findOne({ email: env.admin.email.toLowerCase() });
  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(env.admin.password, salt);
    await AdminUser.create({
      name: env.admin.name,
      email: env.admin.email.toLowerCase(),
      passwordHash,
      role: 'super_admin',
    });
    logger.info(`Admin user created: ${env.admin.email}`);
  } else {
    logger.info(`Admin user already exists: ${env.admin.email}`);
  }

  const pages = [
    {
      slug: 'about',
      title: 'About Shri Pundrik Goswami',
      subtitle: 'A life dedicated to devotion, scripture, and service',
      body: `<p>Shri Pundrik Goswami is a revered teacher in the Gaudiya Vaishnava tradition. His life is rooted in the worship of Shri Radha and Krishna, the study of devotional scripture, and tireless service to seekers around the world.</p><p>This biography placeholder will be replaced with the authoritative life narrative, photographs, quotes, and milestones approved by the institution.</p>`,
    },
    {
      slug: 'about/path',
      title: 'The Path and Philosophy',
      subtitle: 'Bhakti, the path of loving devotion',
      body: `<p>The teachings followed and shared by Shri Pundrik Goswami emphasize bhakti — pure, loving devotional service — as the heart of human life.</p><p>This placeholder will be replaced with a detailed exposition of the philosophy, including key verses, lineage perspective, and practical guidance for sadhana.</p>`,
    },
    {
      slug: 'about/goswami-family',
      title: 'The Goswami Family and Tradition',
      subtitle: 'A sacred lineage of teachers',
      body: `<p>The Goswami family carries a sacred trust handed down across generations — guarding scripture, ritual, and the inner culture of devotion.</p><p>This placeholder will be replaced with original content about the family, its temples, and its service.</p>`,
    },
    {
      slug: 'shri-pundrik-goswami',
      title: 'Shri Pundrik Goswami',
      subtitle: 'Spiritual master, scholar, and servant of Shri Radha Krishna',
      body: `<p>Shri Pundrik Goswami serves as a living guide for thousands of devotees. His sankirtans, classes, and personal guidance illuminate the path of bhakti for sincere seekers.</p>`,
    },
    {
      slug: 'initiation',
      title: 'Initiation and Spiritual Guidance',
      subtitle: 'A sacred beginning on the path of devotion',
      body: `<p>Initiation marks a sacred turning in the life of a sadhaka — a formal acceptance into a lineage of teachers and a deeper commitment to spiritual discipline.</p><p>Those who wish to seek initiation or personal guidance from Shri Pundrik Goswami may use the registration form below. Each request is reviewed personally.</p><h3>What to bring</h3><ul><li>A clean, ironed cloth or simple devotional dress</li><li>A flower offering</li><li>An open heart and willingness to follow the practices</li></ul>`,
    },
    {
      slug: 'sankirtans',
      title: 'Sankirtans and Programs',
      subtitle: 'Singing the holy names together',
      body: `<p>Sankirtan — the congregational chanting of the holy names of Shri Radha and Krishna — is the central practice of our tradition.</p><p>Shri Pundrik Goswami leads sankirtans regularly. For invitations, satsangs, or to host a program in your city, please reach out through the contact page or our WhatsApp channel.</p>`,
    },
  ];
  for (const page of pages) {
    await Page.updateOne(
      { slug: page.slug, language: 'en' },
      { $setOnInsert: page },
      { upsert: true },
    );
  }
  logger.info(`Pages seeded (${pages.length})`);

  const articles = [
    {
      slug: 'the-meaning-of-bhakti',
      title: 'The Meaning of Bhakti',
      summary: 'Why loving devotion is the highest pursuit of human life.',
      body: `<p>Bhakti is not a sentiment, nor a duty. It is the natural inclination of the soul toward its source — Shri Radha and Krishna.</p><p>In this article, Shri Pundrik Goswami reflects on what it means to live a life of bhakti: how the holy name, scripture, sadhus, and service form the four pillars of practice.</p>`,
      category: 'Philosophy',
      tags: ['bhakti', 'philosophy', 'sadhana'],
      authorName: 'Shri Pundrik Goswami',
      status: 'published' as const,
    },
    {
      slug: 'the-glory-of-the-holy-name',
      title: 'The Glory of the Holy Name',
      summary: 'The transformative power of chanting the names of Shri Radha and Krishna.',
      body: `<p>In Kali-yuga, the chanting of the holy names is described as the foremost means of spiritual realisation.</p><p>This essay explores the spiritual potency of the holy name and the inner attitude that nourishes it.</p>`,
      category: 'Practice',
      tags: ['holy name', 'chanting', 'kirtan'],
      authorName: 'Shri Pundrik Goswami',
      status: 'published' as const,
    },
    {
      slug: 'the-disciplic-succession',
      title: 'The Disciplic Succession',
      summary: 'How the teachings of bhakti reach us, intact, across centuries.',
      body: `<p>The strength of any spiritual teaching lies in the integrity of its transmission. Our parampara has carried the message of Shri Chaitanya Mahaprabhu unbroken across more than five centuries.</p>`,
      category: 'Lineage',
      tags: ['parampara', 'guru', 'lineage'],
      authorName: 'Shri Pundrik Goswami',
      status: 'published' as const,
    },
  ];
  for (const article of articles) {
    await Article.updateOne(
      { slug: article.slug, language: 'en' },
      { $setOnInsert: { ...article, publishedAt: new Date() } },
      { upsert: true },
    );
  }
  logger.info(`Articles seeded (${articles.length})`);

  const events = [
    {
      slug: 'monthly-satsang',
      title: 'Monthly Satsang and Sankirtan',
      description: 'A gathering of devotees for kirtan, discourse, and prasadam.',
      category: 'Sankirtan',
      eventType: 'Recurring',
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      location: 'Main temple hall',
      status: 'published' as const,
    },
    {
      slug: 'janmashtami-celebration',
      title: 'Shri Krishna Janmashtami Celebration',
      description: 'A full day of worship, abhishek, kirtan, and discourse to honour the appearance of Bhagavan Shri Krishna.',
      category: 'Festival',
      eventType: 'Annual',
      startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      location: 'Main temple',
      status: 'published' as const,
    },
    {
      slug: 'radhashtami-festival',
      title: 'Shri Radhashtami Festival',
      description: 'Celebration of the appearance of Shrimati Radharani with abhishek, kirtan, and Vraja lila katha.',
      category: 'Festival',
      eventType: 'Annual',
      startDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      location: 'Main temple',
      status: 'published' as const,
    },
  ];
  for (const event of events) {
    await Event.updateOne(
      { slug: event.slug, language: 'en' },
      { $setOnInsert: event },
      { upsert: true },
    );
  }
  logger.info(`Events seeded (${events.length})`);

  const faqs = [
    {
      question: 'How can I receive initiation from Shri Pundrik Goswami?',
      answer:
        'Please complete the registration form on the Initiation page. Each request is reviewed personally and you will be contacted with guidance on the next steps.',
      category: 'Initiation',
      sortOrder: 1,
    },
    {
      question: 'Can I visit the temple in person?',
      answer:
        'Yes, devotees and seekers are welcome to visit. Please refer to the Contact page for the address, timings, and travel guidance.',
      category: 'Visiting',
      sortOrder: 2,
    },
    {
      question: 'How can I support the seva projects?',
      answer:
        'You may volunteer your time, sponsor specific seva, or contribute through the channels listed on the Projects and Contact pages.',
      category: 'Seva',
      sortOrder: 3,
    },
    {
      question: 'Are talks and kirtans available online?',
      answer:
        'Yes. You can find audio and video recordings in the Audio/Video section, and you can also subscribe to our YouTube channel.',
      category: 'Resources',
      sortOrder: 4,
    },
  ];
  for (const faq of faqs) {
    await Faq.updateOne(
      { question: faq.question, language: 'en' },
      { $setOnInsert: faq },
      { upsert: true },
    );
  }
  logger.info(`FAQs seeded (${faqs.length})`);

  const media = [
    {
      title: 'Introduction to Bhakti — Lecture Series',
      type: 'video' as const,
      url: 'https://www.youtube.com/results?search_query=bhakti+lecture',
      description: 'An introductory lecture series on the foundations of bhakti.',
      author: 'Shri Pundrik Goswami',
      category: 'Lectures',
    },
    {
      title: 'Names of Shri Radha — Kirtan',
      type: 'audio' as const,
      url: '#',
      description: 'A devotional kirtan glorifying the names of Shri Radha.',
      author: 'Shri Pundrik Goswami',
      category: 'Kirtan',
    },
    {
      title: 'The Path of Bhakti (PDF)',
      type: 'pdf' as const,
      url: '#',
      description: 'A short reader on the foundations of devotional life.',
      author: 'Shri Pundrik Goswami',
      category: 'Books',
      downloadable: true,
    },
    {
      title: 'Monthly Newsletter — Sample Issue',
      type: 'newsletter' as const,
      url: '#',
      description: 'A sample issue of the monthly devotional newsletter.',
      category: 'Newsletter',
    },
  ];
  for (const item of media) {
    await MediaItem.updateOne(
      { title: item.title, type: item.type },
      { $setOnInsert: item },
      { upsert: true },
    );
  }
  logger.info(`Media seeded (${media.length})`);

  const projects = [
    {
      slug: 'temple-seva',
      title: 'Temple Seva',
      mission: 'Caring for the daily worship of Shri Radha Krishna.',
      body: '<p>Our primary devotional project is the maintenance and daily worship of the temple deities — including abhishek, bhog, aarti, decoration, and the upkeep of the temple itself.</p>',
      activities: ['Daily worship and aarti', 'Festival celebrations', 'Devotee accommodation'],
      ctaLabel: 'Support Temple Seva',
      ctaUrl: '/contact',
      sortOrder: 1,
    },
    {
      slug: 'go-seva',
      title: 'Go Seva (Cow Protection)',
      mission: 'Loving care for cows, calves, and bulls.',
      body: '<p>Cow protection is central to Vedic culture and to the devotional traditions of Vraja. Our go-shala provides shelter, food, and medical care to cows and bulls.</p>',
      activities: ['Daily feeding and care', 'Medical treatment', 'Pasture maintenance'],
      ctaLabel: 'Sponsor Cow Care',
      ctaUrl: '/contact',
      sortOrder: 2,
    },
    {
      slug: 'annadan',
      title: 'Annadan (Food Distribution)',
      mission: 'Sanctified food for all who come.',
      body: '<p>Following the tradition of our acharyas, sanctified prasadam is offered freely to all visitors and distributed during festivals to the wider community.</p>',
      activities: ['Daily prasadam', 'Festival distribution', 'Community kitchens'],
      ctaLabel: 'Sponsor a Meal',
      ctaUrl: '/contact',
      sortOrder: 3,
    },
  ];
  for (const project of projects) {
    await Project.updateOne(
      { slug: project.slug, language: 'en' },
      { $setOnInsert: project },
      { upsert: true },
    );
  }
  logger.info(`Projects seeded (${projects.length})`);

  const lineage = [
    {
      name: 'Shri Chaitanya Mahaprabhu',
      title: 'The Golden Avatar',
      position: 'Founder of the Gaudiya Vaishnava sampradaya',
      lineageType: 'primary' as const,
      bio: 'Shri Chaitanya Mahaprabhu (1486–1534) inaugurated the sankirtan movement and revealed the highest sweetness of devotion to Shri Radha and Krishna.',
      sortOrder: 1,
    },
    {
      name: 'Shri Nityananda Prabhu',
      title: 'Adi-guru of the parampara',
      lineageType: 'primary' as const,
      bio: 'The very life of Shri Chaitanya Mahaprabhu and the original spiritual master of the sampradaya.',
      sortOrder: 2,
    },
    {
      name: 'The Six Goswamis of Vrindavan',
      title: 'Acharyas of the tradition',
      lineageType: 'primary' as const,
      bio: 'Shri Rupa, Sanatana, Raghunatha Bhatta, Gopala Bhatta, Raghunatha Dasa, and Jiva Goswami — who recovered the holy places of Vraja and established the philosophy of bhakti through their writings.',
      sortOrder: 3,
    },
    {
      name: 'Shri Pundrik Goswami',
      title: 'Present acharya in our parampara',
      lineageType: 'primary' as const,
      bio: 'Carrying forward the teachings of his predecessors through teaching, sankirtan, and personal guidance to disciples around the world.',
      sortOrder: 99,
    },
  ];
  for (const person of lineage) {
    await LineagePerson.updateOne(
      { name: person.name, language: 'en' },
      { $setOnInsert: person },
      { upsert: true },
    );
  }
  logger.info(`Lineage seeded (${lineage.length})`);

  logger.info('Seeding complete.');
  await disconnectDatabase();
};

seed().catch(async (err) => {
  logger.error('Seed failed:', err);
  await disconnectDatabase();
  process.exit(1);
});
