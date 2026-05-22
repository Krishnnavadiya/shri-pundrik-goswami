import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
  className,
}: SectionHeadingProps): JSX.Element => (
  <div
    className={cn(
      align === 'center' ? 'text-center mx-auto' : 'text-left',
      'max-w-3xl mb-10',
      className,
    )}
  >
    {eyebrow && (
      <div
        className={cn(
          'inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.25em] mb-4',
          light ? 'text-gold-300' : 'text-saffron-700',
        )}
      >
        <span
          className={cn('h-px w-10', light ? 'bg-gold-400/60' : 'bg-saffron-300')}
          aria-hidden
        />
        {eyebrow}
        <span
          className={cn('h-px w-10', light ? 'bg-gold-400/60' : 'bg-saffron-300')}
          aria-hidden
        />
      </div>
    )}
    <h2
      className={cn(
        'font-display text-3xl sm:text-4xl md:text-5xl leading-tight text-balance mb-4',
        light ? 'text-cream-50' : 'text-saffron-900',
      )}
    >
      {title}
    </h2>
    {subtitle && (
      <p
        className={cn(
          'font-serif text-lg leading-relaxed',
          light ? 'text-cream-100/80' : 'text-stone-600',
          align === 'center' && 'max-w-2xl mx-auto',
        )}
      >
        {subtitle}
      </p>
    )}
  </div>
);
