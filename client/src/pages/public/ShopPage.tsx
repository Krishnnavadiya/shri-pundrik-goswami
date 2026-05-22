import { ShoppingBag, ExternalLink } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/common/PageHero';
import { Button } from '@/components/ui/Button';

const ShopPage = (): JSX.Element => (
  <>
    <Seo title="Shop" description="Books, devotional items, and seva sponsorships." />
    <PageHero
      eyebrow="Offerings"
      title="Shop & Donations"
      subtitle="Books, devotional items, and ways to support the seva projects of the institution."
    />
    <section className="py-16 bg-cream-50">
      <div className="container-narrow text-center">
        <ShoppingBag className="w-12 h-12 text-saffron-700 mx-auto mb-4" />
        <h2 className="font-display text-3xl text-saffron-900 mb-3">Coming soon</h2>
        <p className="text-stone-600 max-w-xl mx-auto mb-8">
          A dedicated shop and donations portal is under preparation. In the meantime, please
          reach out through the contact page for books, items, or seva sponsorships.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href="/contact">
            <Button variant="primary">Contact for Offerings</Button>
          </a>
          <a href="https://razorpay.com/" target="_blank" rel="noreferrer">
            <Button variant="gold">
              Donate via Razorpay <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  </>
);

export default ShopPage;
