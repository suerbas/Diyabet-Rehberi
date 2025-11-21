import React, { useState, useEffect } from 'react';
import { Menu, X, Activity } from 'lucide-react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { id: 'intro', label: 'Genel Bakış', path: '/' },
  { id: 'risk', label: 'Risk & Tanı', path: '/risk-tani' },
  { id: 'lifestyle', label: 'Yaşam Tarzı', path: '/yasam-tarzi' },
  { id: 'treatment', label: 'Tedavi', path: '/tedavi' },
  { id: 'complications', label: 'Komplikasyonlar', path: '/komplikasyonlar' },
  { id: 'special', label: 'Özel Durumlar', path: '/ozel-durumlar' },
  { id: 'cases', label: 'Vaka Testleri', path: '/vaka-testleri' },
];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navbar is solid if scrolled OR if not on home page (since other pages have white bg)
  const isSolid = scrolled || !isHome;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isSolid ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="bg-primary p-2 rounded-lg text-white">
            <Activity size={24} />
          </div>
          <span className={`font-bold text-xl tracking-tight ${isSolid ? 'text-slate-800' : 'text-white'}`}>
            Diyabet<span className="text-primary">Rehberi</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) => `
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${isActive 
                  ? (isSolid ? 'bg-blue-50 text-primary' : 'bg-white/20 text-white backdrop-blur-sm') 
                  : (isSolid ? 'text-slate-600 hover:text-primary hover:bg-slate-50' : 'text-slate-200 hover:text-white hover:bg-white/10')
                }
              `}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <X size={28} className="text-slate-800" />
          ) : (
            <Menu size={28} className={isSolid ? 'text-slate-800' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 py-2 px-4 flex flex-col animate-in slide-in-from-top-5 duration-200">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                text-left font-medium py-3 px-4 rounded-lg mb-1 transition-colors
                ${isActive ? 'bg-blue-50 text-primary' : 'text-slate-600 hover:bg-slate-50'}
              `}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;