import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import DiagnosisSection from './components/DiagnosisSection';
import Lifestyle from './components/Lifestyle';
import Treatment from './components/Treatment';
import Complications from './components/Complications';
import SpecialGroups from './components/SpecialGroups';
import CaseStudies from './components/CaseStudies';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Ticker from './components/Ticker';
import { SearchLanding } from './components/search/SiteSearch';

// Helper to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
};

// Cards fade up as they enter the viewport; also picks up content rendered by tab switches
const REVEAL = 'main [class*="rounded"][class*="shadow"], main .page-header, main table';
const useReveal = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) {
        const el = e.target as HTMLElement;
        el.classList.add('in');
        io.unobserve(el);
        window.setTimeout(() => { el.style.transitionDelay = ''; }, 900);
      } });
    }, { rootMargin: '0px 0px -8% 0px' });
    const scan = () => {
      document.querySelectorAll<HTMLElement>(REVEAL).forEach(el => {
        if (el.dataset.rv || el.matches('button, a, label, input') || el.closest('nav, [role="tablist"], .tabbar') || el.parentElement?.closest('.reveal')) return;
        el.dataset.rv = '1';
        const sib = el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0;
        el.style.transitionDelay = `${Math.min(sib, 4) * 60}ms`;
        el.classList.add('reveal');
        io.observe(el);
      });
    };
    scan();
    const main = document.querySelector('main');
    const mo = new MutationObserver(scan);
    if (main) mo.observe(main, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
};

const App: React.FC = () => {
  useReveal();
  return (
    <HashRouter>
      <div className="min-h-screen font-sans antialiased flex flex-col">
        <ScrollToTop />
        <SearchLanding />
        <BackToTop />
        <Navigation />
        <main className="flex-grow pt-[66px]">
          <Ticker />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/risk-tani" element={
              <div>
                <DiagnosisSection />
              </div>
            } />
            <Route path="/yasam-tarzi" element={
              <div>
                <Lifestyle />
              </div>
            } />
            <Route path="/tedavi" element={
              <div>
                <Treatment />
              </div>
            } />
            <Route path="/komplikasyonlar" element={
              <div>
                <Complications />
              </div>
            } />
            <Route path="/ozel-durumlar" element={
              <div>
                <SpecialGroups />
              </div>
            } />
            <Route path="/vaka-testleri" element={
              <div>
                <CaseStudies />
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;