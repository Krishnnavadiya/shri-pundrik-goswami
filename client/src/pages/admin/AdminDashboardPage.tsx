import { useQuery } from '@tanstack/react-query';
import {
  Newspaper,
  Calendar,
  Inbox,
  UserPlus,
  Image,
  HelpCircle,
  HeartHandshake,
  Mic2,
} from 'lucide-react';
import { adminApi } from '@/services/adminApi';
import { Loader } from '@/components/common/Loader';

const cards = [
  { key: 'articles', label: 'Articles', icon: Newspaper, color: 'bg-saffron-100 text-saffron-800' },
  { key: 'events', label: 'Events', icon: Calendar, color: 'bg-gold-100 text-gold-800' },
  { key: 'contacts', label: 'Contact Inquiries', icon: Inbox, color: 'bg-maroon-100 text-maroon-800' },
  {
    key: 'registrations',
    label: 'Registrations',
    icon: UserPlus,
    color: 'bg-emerald-100 text-emerald-800',
  },
  {
    key: 'kathaRequests',
    label: 'Katha Requests',
    icon: Mic2,
    color: 'bg-orange-100 text-orange-800',
  },
  { key: 'media', label: 'Media Library', icon: Image, color: 'bg-blue-100 text-blue-800' },
  { key: 'faqs', label: 'FAQs', icon: HelpCircle, color: 'bg-purple-100 text-purple-800' },
  {
    key: 'projects',
    label: 'Projects',
    icon: HeartHandshake,
    color: 'bg-pink-100 text-pink-800',
  },
];

const AdminDashboardPage = (): JSX.Element => {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: adminApi.stats,
  });

  return (
    <div>
      <h1 className="font-display text-2xl text-stone-900 mb-1">Dashboard</h1>
      <p className="text-sm text-stone-500 mb-8">An overview of your site content and submissions.</p>

      {isLoading ? (
        <Loader />
      ) : !data ? (
        <p className="text-stone-500">No data.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cards.map(({ key, label, icon: Icon, color }) => {
            const stat = data[key];
            if (!stat) return null;
            return (
              <div
                key={key}
                className="bg-white rounded-lg border border-stone-200 p-5 shadow-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-md ${color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {stat.new !== undefined && stat.new > 0 && (
                    <span className="text-xs px-2 py-1 bg-maroon-50 text-maroon-700 font-medium rounded-full">
                      {stat.new} new
                    </span>
                  )}
                </div>
                <p className="text-sm text-stone-500">{label}</p>
                <p className="font-display text-3xl text-stone-900 mt-1">{stat.total}</p>
                {stat.published !== undefined && (
                  <p className="text-xs text-stone-500 mt-1">{stat.published} published</p>
                )}
                {stat.upcoming !== undefined && (
                  <p className="text-xs text-stone-500 mt-1">{stat.upcoming} upcoming</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
