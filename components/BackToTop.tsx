import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

// Appears after scrolling down; sits above the quiz's sticky question bar on Vaka Testleri
const BackToTop: React.FC = () => {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Sayfa başına dön"
      title="Sayfa başına dön"
      className={`fixed right-4 md:right-6 z-40 w-12 h-12 bg-yellow-300 text-black border-[3px] border-black shadow-sm flex items-center justify-center ${pathname === '/vaka-testleri' ? 'bottom-24' : 'bottom-6'}`}
    >
      <ArrowUp size={24} strokeWidth={3} />
    </button>
  );
};

export default BackToTop;
