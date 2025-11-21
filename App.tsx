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

// Helper to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 font-sans antialiased selection:bg-blue-200 selection:text-blue-900 flex flex-col">
        <ScrollToTop />
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/risk-tani" element={
              <div className="pt-16 min-h-screen">
                <DiagnosisSection />
              </div>
            } />
            <Route path="/yasam-tarzi" element={
              <div className="pt-16 min-h-screen">
                <Lifestyle />
              </div>
            } />
            <Route path="/tedavi" element={
              <div className="pt-16 min-h-screen">
                <Treatment />
              </div>
            } />
            <Route path="/komplikasyonlar" element={
              <div className="pt-16 min-h-screen">
                <Complications />
              </div>
            } />
            <Route path="/ozel-durumlar" element={
              <div className="pt-16 min-h-screen">
                <SpecialGroups />
              </div>
            } />
            <Route path="/vaka-testleri" element={
              <div className="pt-16 min-h-screen">
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