import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Newspaper,
  Calendar,
  HelpCircle,
  Image,
  HeartHandshake,
  Users,
  Inbox,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/utils/cn';
import { Seo } from '@/components/common/Seo';

const nav = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/articles', label: 'Articles', icon: Newspaper },
  { to: '/admin/events', label: 'Events', icon: Calendar },
  { to: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { to: '/admin/media', label: 'Media & PDFs', icon: Image },
  { to: '/admin/projects', label: 'Projects', icon: HeartHandshake },
  { to: '/admin/lineage', label: 'Lineage', icon: Users },
  { to: '/admin/forms', label: 'Form Submissions', icon: Inbox },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

const AdminLayout = (): JSX.Element => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async (): Promise<void> => {
    await logout();
    toast.success('Signed out');
    navigate('/admin/login');
  };

  return (
    <>
      <Seo title="Admin" />
      <div className="min-h-screen bg-stone-100 flex">
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-40 w-64 bg-saffron-900 text-cream-100 transform transition-transform lg:translate-x-0 lg:static lg:inset-0',
            open ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <div className="p-5 flex items-center gap-3 border-b border-saffron-800">
            <div className="w-10 h-10 rounded-full bg-cream-50 text-saffron-900 flex items-center justify-center font-display text-2xl font-bold">
              ॐ
            </div>
            <div>
              <p className="font-display text-lg leading-tight">Admin</p>
              <p className="text-[10px] uppercase tracking-widest text-gold-300">Shri Pundrik Goswami</p>
            </div>
          </div>

          <nav className="px-3 py-4 space-y-1">
            {nav.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors',
                    isActive
                      ? 'bg-saffron-700 text-white'
                      : 'text-cream-100/80 hover:bg-saffron-800 hover:text-cream-50',
                  )
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-saffron-800">
            <p className="text-xs text-cream-100/60">Signed in as</p>
            <p className="text-sm text-cream-50 font-medium truncate">{user?.email}</p>
            <button
              onClick={handleLogout}
              className="mt-3 flex items-center gap-2 text-xs text-gold-300 hover:text-gold-200"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign out
            </button>
          </div>
        </aside>

        {open && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        <div className="flex-1 min-w-0">
          <header className="bg-white border-b border-stone-200 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-20">
            <button onClick={() => setOpen((p) => !p)} className="lg:hidden p-2 text-saffron-900">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="hidden lg:block">
              <p className="text-xs uppercase tracking-widest text-stone-500">Dashboard</p>
              <p className="text-sm font-medium text-stone-800">Welcome, {user?.name}</p>
            </div>
            <Link
              to="/"
              target="_blank"
              className="text-xs text-saffron-700 hover:text-saffron-900"
            >
              View live site →
            </Link>
          </header>
          <main className="p-4 lg:p-8 max-w-7xl">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
