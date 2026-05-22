import { cn } from '@/utils/cn';

interface Props {
  status: string;
}

const styles: Record<string, string> = {
  published: 'bg-emerald-100 text-emerald-700',
  draft: 'bg-stone-100 text-stone-600',
  new: 'bg-maroon-100 text-maroon-700',
  reviewed: 'bg-blue-100 text-blue-700',
  contacted: 'bg-saffron-100 text-saffron-700',
  closed: 'bg-stone-200 text-stone-600',
  active: 'bg-emerald-100 text-emerald-700',
  inactive: 'bg-stone-200 text-stone-600',
};

export const StatusBadge = ({ status }: Props): JSX.Element => (
  <span
    className={cn(
      'inline-block px-2 py-0.5 text-xs font-medium rounded-full capitalize',
      styles[status] || 'bg-stone-100 text-stone-700',
    )}
  >
    {status.replace('_', ' ')}
  </span>
);
