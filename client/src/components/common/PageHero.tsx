import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  image?: string;
  children?: ReactNode;
  className?: string;
  small?: boolean;
}

export const PageHero = ({
  eyebrow,
  title,
  subtitle,
  image,
  children,
  className,
  small = false,
}: PageHeroProps): JSX.Element => {
  const bg = image
    ? `linear-gradient(rgba(67, 20, 7, 0.6), rgba(67, 20, 7, 0.7)), url('${image}')`
    : `linear-gradient(rgba(67, 20, 7, 0.85), rgba(124, 45, 18, 0.75)), url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80')`;

  return (
    <section
      className={cn(
        'relative bg-cover bg-center text-cream-50',
        small ? 'min-h-[40vh] pt-28 pb-16' : 'min-h-[60vh] pt-32 pb-20',
        className,
      )}
      style={{ backgroundImage: bg }}
    >
      <div className="container-wide relative z-10 text-center">
        {eyebrow && (
          <div className="inline-flex items-center gap-3 text-gold-300 text-xs sm:text-sm font-medium uppercase tracking-[0.3em] mb-4">
            <span className="h-px w-12 bg-gold-400/60" />
            {eyebrow}
            <span className="h-px w-12 bg-gold-400/60" />
          </div>
        )}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-tight text-balance mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="font-serif text-lg sm:text-xl text-cream-100/90 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
};
