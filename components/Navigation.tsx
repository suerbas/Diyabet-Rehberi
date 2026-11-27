import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { SiteSearch } from './search/SiteSearch';
import { NavLink, Link } from 'react-router-dom';
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
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 bg-white border-b-[3px] border-black py-2.5`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" aria-label="Diyabet Rehberi ana sayfa" className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo />
        </Link>

        <div className="flex items-center gap-2 xl:gap-3">
        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) => `
                nav-link px-3 xl:px-4 py-2 text-[13px] border-2 transition-colors duration-150
                ${isActive
                  ? 'bg-yellow-300 text-black border-black'
                  : 'text-slate-800 border-transparent hover:border-black'
                }
              `}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <SiteSearch />

        {/* Mobile Toggle */}
        <button className="lg:hidden w-11 h-11 flex items-center justify-center border-2 border-black bg-white" onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'} aria-expanded={isOpen} aria-controls="mobile-menu">
          {isOpen ? (
            <X size={28} className="text-slate-800" />
          ) : (
            <Menu size={28} className="text-slate-800" />
          )}
        </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div id="mobile-menu" className="lg:hidden absolute top-full left-0 w-full bg-white border-b-[3px] border-black py-2 px-4 flex flex-col menu-drop">
          {navItems.map((item, i) => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                flex items-baseline gap-3 py-3 px-3 border-b-2 border-black last:border-b-0 text-base font-bold
                ${isActive ? 'bg-yellow-300 text-black' : 'text-slate-900 hover:bg-yellow-100'}
              `}
            >
              <span className="font-mono text-xs text-slate-700">{String(i).padStart(2, '0')}</span>
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;