import { Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { Button } from '@/components/ui/Button';

const NotFoundPage = (): JSX.Element => (
  <>
    <Seo title="Page not found" />
    <section className="min-h-[80vh] flex items-center justify-center px-4 pt-32 pb-16 bg-cream-50">
      <div className="text-center max-w-md">
        <p className="font-display text-7xl text-saffron-700 mb-2">404</p>
        <h1 className="font-display text-3xl text-saffron-900 mb-3">
          Lost on the path?
        </h1>
        <p className="text-stone-600 mb-6">
          The page you were looking for could not be found. Let us guide you home.
        </p>
        <Link to="/">
          <Button variant="primary">Return Home</Button>
        </Link>
      </div>
    </section>
  </>
);

export default NotFoundPage;
