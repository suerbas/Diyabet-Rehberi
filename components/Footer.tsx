import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8">
          <span className="text-2xl font-bold text-white tracking-tight">
            Diyabet<span className="text-primary">Rehberi</span>
          </span>
        </div>
        <p className="max-w-2xl mx-auto text-sm mb-8">
          Bu içerik T.C. Sağlık Bakanlığı, TEMD 2024 Kılavuzu, ADA 2025 Standartları ve IDF Diabetes Atlas verileri kaynak alınarak sağlık profesyonelleri ve hastalar için bilgilendirme amaçlı hazırlanmıştır. Tanı ve tedavi için mutlaka hekiminize başvurunuz.
        </p>
        <div className="flex justify-center gap-6 text-sm font-medium">
          <a href="#" className="hover:text-white transition-colors">TEMD Kılavuzu</a>
          <a href="#" className="hover:text-white transition-colors">ADA Standartları</a>
          <a href="#" className="hover:text-white transition-colors">Sağlık Bakanlığı</a>
        </div>
        <div className="mt-8 text-xs text-slate-600">
          &copy; 2025 Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
};

export default Footer;