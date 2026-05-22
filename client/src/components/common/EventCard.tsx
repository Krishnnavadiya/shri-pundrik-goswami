import { Link } from 'react-router-dom';
import { CalendarDays, MapPin } from 'lucide-react';
import { formatDate } from '@/utils/format';
import type { EventItem } from '@/types';

export const EventCard = ({ event }: { event: EventItem }): JSX.Element => {
  const date = new Date(event.startDate);
  return (
    <article className="card group flex flex-col h-full">
      <Link to={`/events/${event.slug}`} className="flex items-stretch">
        <div className="w-24 sm:w-28 shrink-0 flex flex-col items-center justify-center bg-saffron-800 text-cream-50 p-3 text-center">
          <p className="font-display text-3xl leading-none">{date.getDate()}</p>
          <p className="text-xs uppercase tracking-widest mt-1">
            {date.toLocaleString('en-US', { month: 'short' })}
          </p>
          <p className="text-xs text-cream-200/80">{date.getFullYear()}</p>
        </div>
        <div className="p-5 flex-1">
          {event.category && (
            <span className="inline-block px-2 py-0.5 text-xs bg-gold-100 text-gold-800 rounded-full mb-2">
              {event.category}
            </span>
          )}
          <h3 className="font-display text-lg text-saffron-900 group-hover:text-saffron-700 transition-colors line-clamp-2">
            {event.title}
          </h3>
          <div className="mt-2 space-y-1 text-xs text-stone-600">
            <p className="inline-flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-saffron-600" />
              {formatDate(event.startDate, 'EEE, d MMM yyyy')}
            </p>
            {event.location && (
              <p className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-saffron-600" />
                {event.location}
              </p>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};
