import React, { useState, useEffect } from 'react';
import { Page, Language, Outfit } from './types';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import CategoryPage from './components/CategoryPage';
import OutfitDetailPage from './components/OutfitDetailPage';
import AboutPage from './components/AboutPage';
import AIOutfitBuilder from './components/AIOutfitBuilder';
import ColorArticles from './components/ColorArticles';
import AdZone from './components/AdZone';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeSearch, setActiveSearch] = useState<string>('');
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [looksLibraryTab, setLooksLibraryTab] = useState<'all' | 'summer' | 'work' | 'casual'>('all');
  const [aboutActiveSection, setAboutActiveSection] = useState<'about' | 'contact' | 'privacy' | 'terms'>('about');

  const isAr = language === 'ar';

  // Toggle dark mode class on html/body element
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Synchronise page scroll to top on change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [currentPage]);

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Homepage
            setCurrentPage={setCurrentPage}
            setSelectedOutfit={setSelectedOutfit}
            language={language}
            setLooksLibraryTab={setLooksLibraryTab}
          />
        );
      case 'categories':
        return (
          <CategoryPage
            setCurrentPage={setCurrentPage}
            setSelectedOutfit={setSelectedOutfit}
            language={language}
            activeSearch={activeSearch}
            setActiveSearch={setActiveSearch}
            activeQuickTab={looksLibraryTab}
            setActiveQuickTab={setLooksLibraryTab}
          />
        );
      case 'outfit-detail':
        return (
          <OutfitDetailPage
            outfit={selectedOutfit}
            setCurrentPage={setCurrentPage}
            setSelectedOutfit={setSelectedOutfit}
            language={language}
          />
        );
      case 'about':
        return (
          <AboutPage 
            language={language} 
            activeSection={aboutActiveSection}
            setActiveSection={setAboutActiveSection}
          />
        );
      case 'ai-builder':
        return (
          <AIOutfitBuilder
            language={language}
            setCurrentPage={setCurrentPage}
            setSelectedOutfit={setSelectedOutfit}
          />
        );
      case 'articles':
        return <ColorArticles language={language} />;
      default:
        return (
          <Homepage
            setCurrentPage={setCurrentPage}
            setSelectedOutfit={setSelectedOutfit}
            language={language}
            setLooksLibraryTab={setLooksLibraryTab}
          />
        );
    }
  };

  const footerText = {
    rights: isAr 
      ? '© ٢٠٢٦ جميع الحقوق محفوظة لستوديو ستايل بورد العالمي.' 
      : '© 2026 StyleBoard International Ltd. All Rights Reserved.',
    manifesto: isAr
      ? 'نؤمن بأحقية وحرية التعبير الشخصي الرفيع، مدمجاً بجمال وثراء الإرث العربي.'
      : 'Emboldening Middle Eastern gentlemen with tailored confidence and heritage.',
    privacy: isAr ? 'سياسة الخصوصية واستخدام الذكاء الاصطناعي' : 'Privacy Policies & AI Guidelines',
    terms: isAr ? 'شروط الخدمة والاتصال' : 'Terms & Sourcing Registry'
  };

  return (
    <div 
      className="min-h-screen flex flex-col font-sans transition-colors duration-300 bg-[#FAF7F4] text-[#2D2D2D] dark:bg-[#12121e] dark:text-[#E2E2E2]"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* 1. Header/Navbar area */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeSearch={activeSearch}
        setActiveSearch={setActiveSearch}
      />

      {/* 2. Primary Page Context */}
      <main className="flex-grow pt-4">
        {renderActivePage()}
      </main>

      {/* 3. Footer Segment */}
      <footer className="bg-white dark:bg-[#12121e] border-t border-[#E8C4A0]/25 py-12 px-4 transition-colors">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          
          {/* Logo & Manifesto */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-serif text-lg font-black text-[#1A1A2E] dark:text-[#E8C4A0] tracking-wide">
              {isAr ? 'ستايل بورد ستايلز' : 'StyleBoard Styles'}
            </span>
            <p className="text-[11px] text-gray-500 max-w-xs leading-relaxed">
              {footerText.manifesto}
            </p>
          </div>

          {/* Sourcing badges & Compliance */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-[#C9A96E] bg-[#E8C4A0]/15 border border-[#C9A96E]/20 rounded-md">
              {isAr ? 'دمج بالذكاء الاصطناعي' : 'AI-Engine Coordinated'}
            </span>
            <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-gray-500 bg-gray-150 border border-gray-100 dark:border-gray-800 rounded-md">
              {isAr ? 'معتمد للرجل الشرقي' : 'GCC Sourced Heritage'}
            </span>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col items-center md:items-end gap-1.5 text-[11px] text-[#C9A96E] font-medium">
            <div className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-1.5">
              <button 
                onClick={() => { setAboutActiveSection('about'); setCurrentPage('about'); }}
                className="hover:text-[#1A1A2E] dark:hover:text-white transition-colors cursor-pointer"
              >
                {isAr ? 'عن ستايل بورد' : 'About Us'}
              </button>
              <button 
                onClick={() => { setAboutActiveSection('contact'); setCurrentPage('about'); }}
                className="hover:text-[#1A1A2E] dark:hover:text-white transition-colors cursor-pointer"
              >
                {isAr ? 'اتصل بنا والشكاوى' : 'Contact Us'}
              </button>
              <button 
                onClick={() => { setAboutActiveSection('privacy'); setCurrentPage('about'); }}
                className="hover:text-[#1A1A2E] dark:hover:text-white transition-colors cursor-pointer"
              >
                {footerText.privacy}
              </button>
              <button 
                onClick={() => { setAboutActiveSection('terms'); setCurrentPage('about'); }}
                className="hover:text-[#1A1A2E] dark:hover:text-white transition-colors cursor-pointer"
              >
                {footerText.terms}
              </button>
            </div>
            <span className="text-gray-400 text-[10px] block mt-2 text-center md:text-right">
              {footerText.rights}
            </span>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Footer Ad zone (Google AdSense mobile compliance) */}
      <AdZone type="sticky-footer" language={language} />
    </div>
  );
}
