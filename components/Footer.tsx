import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t-[3px] border-black py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="md:max-w-xl">
          <Logo />
          <p className="text-xs text-slate-700 mt-2">
            Bu içerik T.C. Sağlık Bakanlığı, TEMD 2026 Kılavuzu, ADA Standartları ve IDF Diabetes Atlas verileri kaynak alınarak sağlık profesyonelleri ve hastalar için bilgilendirme amaçlı hazırlanmıştır. Tanı ve tedavi için mutlaka hekiminize başvurunuz.
          </p>
        </div>
        <div className="flex flex-col gap-1 md:items-end">
          <div className="flex flex-wrap gap-x-4 text-sm font-bold">
            <a href="https://temd.org.tr/yayinlar/kilavuzlar" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:bg-yellow-300">TEMD Kılavuzu</a>
            <a href="https://professional.diabetes.org/standards-of-care" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:bg-yellow-300">ADA Standartları</a>
            <a href="https://hsgm.saglik.gov.tr/tr/diyabet.html" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:bg-yellow-300">Sağlık Bakanlığı</a>
          </div>
          <p className="text-xs text-slate-700 md:text-right">
            &copy; 2026 <strong className="text-slate-900">Dr. Suat ERBAŞ</strong>. Tüm hakları saklıdır.
            <span className="block">Tasarım, içerik düzenlemesi ve yazılım Dr. Suat ERBAŞ’a aittir; izinsiz çoğaltılamaz.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
