import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/common/PageHero';
import { Loader, EmptyState } from '@/components/common/Loader';
import { publicApi } from '@/services/publicApi';
import { Input } from '@/components/ui/Input';
import { cn } from '@/utils/cn';

const FaqsPage = (): JSX.Element => {
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: ['faqs', search],
    queryFn: () => publicApi.listFaqs({ search }),
  });

  return (
    <>
      <Seo title="FAQs" description="Frequently asked questions about Shri Pundrik Goswami." />
      <PageHero
        eyebrow="Help"
        title="Frequently Asked Questions"
        subtitle="Answers to the most common questions about initiation, visiting, seva, and resources."
      />
      <section className="py-16 bg-cream-50">
        <div className="container-narrow">
          <div className="relative mb-8 max-w-xl mx-auto">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <Input
              placeholder="Search FAQs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {isLoading ? (
            <Loader />
          ) : !data || data.length === 0 ? (
            <EmptyState
              icon={<HelpCircle className="w-10 h-10" />}
              title="No FAQs found"
              description="Try a different search or check back later."
            />
          ) : (
            <div className="space-y-3">
              {data.map((faq) => (
                <div
                  key={faq._id}
                  className="bg-white border border-cream-200 rounded-lg overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setOpenId(openId === faq._id ? null : faq._id)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-cream-50 transition-colors"
                  >
                    <div>
                      {faq.category && (
                        <span className="inline-block text-xs uppercase tracking-widest text-saffron-700 mb-1">
                          {faq.category}
                        </span>
                      )}
                      <h3 className="font-display text-lg text-saffron-900">{faq.question}</h3>
                    </div>
                    <ChevronDown
                      className={cn(
                        'w-5 h-5 text-saffron-700 shrink-0 transition-transform',
                        openId === faq._id && 'rotate-180',
                      )}
                    />
                  </button>
                  {openId === faq._id && (
                    <div
                      className="px-5 pb-5 prose-bhakti font-serif text-base border-t border-cream-100 pt-4"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default FaqsPage;
