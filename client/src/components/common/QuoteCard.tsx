import { cn } from '@/utils/cn';

interface QuoteCardProps {
  quote: string;
  attribution?: string;
  className?: string;
}

export const QuoteCard = ({ quote, attribution, className }: QuoteCardProps): JSX.Element => (
  <blockquote
    className={cn(
      'relative bg-gradient-to-br from-saffron-50 to-cream-100 border-l-4 border-saffron-600 px-6 py-5 rounded-r-lg',
      className,
    )}
  >
    <p className="font-serif text-lg text-saffron-900 leading-relaxed italic">&ldquo;{quote}&rdquo;</p>
    {attribution && (
      <footer className="mt-3 text-sm text-saffron-700/80 font-medium not-italic">— {attribution}</footer>
    )}
  </blockquote>
);
