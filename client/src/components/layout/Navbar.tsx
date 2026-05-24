import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import { ContactBar } from '@/components/common/ContactBar';

interface NavChild {
  label: string;
  to: string;
  description?: string;
}

interface NavGroup {
  label: string;
  to?: string;
  children?: NavChild[];
}

const navigation: NavGroup[] = [
  {
    label: 'About',
    children: [
      {
        label: 'The Temple',
        to: '/about/shri-radha-raman-lal-temple-vrindavan',
        description: 'Sacred ground and worship',
      },
      {
        label: 'Path & Philosophy',
        to: '/about/the-gaudiya-vaishnav-philosophy',
        description: 'The way of bhakti',
      },
      {
        label: 'Goswami Family',
        to: '/about/the-goswami-family',
        description: 'Tradition and lineage',
      },
    ],
  },
  {
    label: 'Spiritual Master',
    children: [
      { label: 'Shri Pundrik Goswami', to: '/shri-pundrik-goswami' },
      { label: 'Lineage / Parampara', to: '/lineage' },
      { label: 'Initiation & Guidance', to: '/initiation' },
      { label: 'Sankirtans & Programs', to: '/sankirtans' },
      { label: 'Katha Request', to: '/katha-request' },
      { label: 'Articles', to: '/articles' },
      { label: 'Events Calendar', to: '/events' },
    ],
  },
  {
    label: 'Projects',
    to: '/projects',
  },
  {
    label: 'Explore More',
    children: [
      { label: 'Books & PDFs', to: '/books-pdfs' },
      { label: 'Audio & Video', to: '/audio-video' },
      { label: 'Newsletters', to: '/newsletters' },
      { label: 'FAQs', to: '/faqs' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    label: 'Shop',
    to: '/shop',
  },
];

export const Navbar = (): JSX.Element => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <ContactBar />
      <div
        className={cn(
          'transition-all duration-300',
          scrolled
            ? 'bg-cream-50/95 backdrop-blur-md shadow-sm border-b border-cream-200'
            : 'bg-gradient-to-b from-saffron-950/40 to-transparent',
        )}
      >
        <div className="container-wide flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div
              className={cn(
                'w-10 h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center font-display text-2xl font-bold shadow-md group-hover:scale-105 transition-transform',
                scrolled ? 'bg-saffron-700 text-cream-50' : 'bg-cream-50 text-saffron-900',
              )}
            >
              ॐ
            </div>
            <div className="hidden sm:block">
              <p
                className={cn(
                  'font-display text-lg leading-tight',
                  scrolled ? 'text-saffron-900' : 'text-cream-50',
                )}
              >
                Shri Pundrik Goswami
              </p>
              <p
                className={cn(
                  'text-[10px] uppercase tracking-[0.2em]',
                  scrolled ? 'text-saffron-700/70' : 'text-cream-100/80',
                )}
              >
                Servant of Shri Radha Krishna
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((group) =>
              group.children ? (
                <div key={group.label} className="relative group">
                  <button
                    className={cn(
                      'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      scrolled
                        ? 'text-stone-700 hover:text-saffron-800 hover:bg-cream-100'
                        : 'text-cream-50 hover:text-gold-300',
                    )}
                  >
                    {group.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <div className="absolute top-full left-0 pt-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
                    <div className="w-64 bg-white rounded-lg shadow-xl border border-cream-200 overflow-hidden">
                      {group.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          className={({ isActive }) =>
                            cn(
                              'block px-4 py-3 text-sm hover:bg-cream-50 border-b border-cream-100 last:border-b-0 transition-colors',
                              isActive
                                ? 'text-saffron-800 bg-cream-50'
                                : 'text-stone-700 hover:text-saffron-800',
                            )
                          }
                        >
                          <span className="font-medium">{child.label}</span>
                          {child.description && (
                            <span className="block text-xs text-stone-500 mt-0.5">
                              {child.description}
                            </span>
                          )}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  key={group.label}
                  to={group.to!}
                  className={({ isActive }) =>
                    cn(
                      'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      isActive && scrolled && 'bg-cream-100 text-saffron-800',
                      isActive && !scrolled && 'text-gold-300',
                      !isActive && scrolled && 'text-stone-700 hover:text-saffron-800 hover:bg-cream-100',
                      !isActive && !scrolled && 'text-cream-50 hover:text-gold-300',
                    )
                  }
                >
                  {group.label}
                </NavLink>
              ),
            )}
            <Link
              to="/contact"
              className={cn(
                'ml-3 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                scrolled
                  ? 'bg-saffron-700 hover:bg-saffron-800 text-white'
                  : 'bg-cream-50 text-saffron-900 hover:bg-gold-300',
              )}
            >
              Connect
            </Link>
          </nav>

          <button
            className={cn(
              'lg:hidden p-2 rounded-md',
              scrolled ? 'text-saffron-900' : 'text-cream-50',
            )}
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-cream-200 bg-cream-50 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="px-4 py-3 space-y-1">
              {navigation.map((group) =>
                group.children ? (
                  <div key={group.label}>
                    <button
                      onClick={() =>
                        setMobileExpanded(mobileExpanded === group.label ? null : group.label)
                      }
                      className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-stone-800 hover:bg-cream-100 rounded-md"
                    >
                      {group.label}
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 transition-transform',
                          mobileExpanded === group.label && 'rotate-180',
                        )}
                      />
                    </button>
                    {mobileExpanded === group.label && (
                      <div className="pl-4 space-y-1 mt-1">
                        {group.children.map((child) => (
                          <NavLink
                            key={child.to}
                            to={child.to}
                            className={({ isActive }) =>
                              cn(
                                'block px-3 py-2 text-sm rounded-md',
                                isActive
                                  ? 'bg-saffron-100 text-saffron-800 font-medium'
                                  : 'text-stone-700 hover:bg-cream-100',
                              )
                            }
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    key={group.label}
                    to={group.to!}
                    className={({ isActive }) =>
                      cn(
                        'block px-3 py-2.5 text-sm font-medium rounded-md',
                        isActive
                          ? 'bg-saffron-100 text-saffron-800'
                          : 'text-stone-800 hover:bg-cream-100',
                      )
                    }
                  >
                    {group.label}
                  </NavLink>
                ),
              )}
              <Link
                to="/contact"
                className="block mt-3 px-4 py-2.5 rounded-md text-sm font-medium bg-saffron-700 text-white text-center"
              >
                Connect with Us
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
