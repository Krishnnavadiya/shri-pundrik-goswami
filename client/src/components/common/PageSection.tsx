import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface PageSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  alt?: boolean;
}

export const PageSection = ({
  id,
  title,
  subtitle,
  children,
  className,
  alt = false,
}: PageSectionProps): JSX.Element => (
  <section
    id={id}
    className={cn('py-14 sm:py-16', alt ? 'bg-cream-100' : 'bg-cream-50', className)}
  >
    <div className="container-narrow">
      {title && (
        <header className="mb-8 text-center max-w-2xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl text-saffron-900 mb-3">{title}</h2>
          {subtitle && <p className="font-serif text-stone-600 leading-relaxed">{subtitle}</p>}
        </header>
      )}
      {children}
    </div>
  </section>
);
