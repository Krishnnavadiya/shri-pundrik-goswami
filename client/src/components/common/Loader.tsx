import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

export const Loader = ({
  className,
  label,
  light = false,
}: {
  className?: string;
  label?: string;
  light?: boolean;
}): JSX.Element => (
  <div
    className={cn(
      'flex flex-col items-center justify-center py-16 gap-3',
      light ? 'text-cream-100' : 'text-saffron-700',
      className,
    )}
  >
    <Loader2 className="w-8 h-8 animate-spin" />
    {label && <p className="text-sm">{label}</p>}
  </div>
);

export const EmptyState = ({
  title,
  description,
  icon,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}): JSX.Element => (
  <div className="text-center py-16 px-4">
    {icon && <div className="mx-auto mb-3 text-saffron-500">{icon}</div>}
    <h3 className="font-display text-2xl text-saffron-900 mb-2">{title}</h3>
    {description && <p className="text-stone-600 max-w-md mx-auto">{description}</p>}
  </div>
);

export const ErrorState = ({
  message = 'Something went wrong loading this section.',
}: {
  message?: string;
}): JSX.Element => (
  <div className="text-center py-12 px-4">
    <p className="text-maroon-700">{message}</p>
  </div>
);
