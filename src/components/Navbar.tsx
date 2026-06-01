import React, { useState } from 'react';
import { Language, Page } from '../types';
import { Sparkles, Sun, Moon, Search, Globe, Menu, X, Shirt } from 'lucide-react';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  activeSearch: string;
  setActiveSearch: (search: string) => void;
}

export default function Navbar({
  currentPage,
  setCurrentPage,
  language,
  setLanguage,
  darkMode,
  setDarkMode,
  activeSearch,
  setActiveSearch
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAr = language === 'ar';

  const navItems = [
    { id: 'home', label: isAr ? 'الرئيسية' : 'Home' },
    { id: 'categories', label: isAr ? 'مكتبة الإطلالات' : 'Looks Library' },
    { id: 'articles', label: isAr ? 'تنسيق الألوان' : 'Color Styling' },
    { id: 'ai-builder', label: isAr ? 'منسق الملابس الذكي' : 'AI Closet' },
    { id: 'about', label: isAr ? 'حول ستايل بورد' : 'About' },
  ];

  const searchPlaceholder = isAr ? 'ابحث عن إطلالة خريفية، بليزر...' : 'Search linen, luxury blazers, casual chic...';
  const logoText = isAr ? 'ستايل بورد' : 'StyleBoard';
  const logoSub = isAr ? 'الموضة والرجولة العصرية' : 'Menswear & Heritage';

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/90 dark:bg-[#12121e]/90 backdrop-blur-md border-b border-[#E8C4A0]/20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Part */}
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
            >
              <div className="w-11 h-11 bg-[#1A1A2E] dark:bg-[#C9A96E] rounded-xl flex items-center justify-center text-[#E8C4A0] dark:text-[#1A1A2E] shadow-md transition-transform group-hover:scale-105">
                <Shirt className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1A1A2E] dark:text-white">
                  {logoText}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#C9A96E] font-medium -mt-1 hidden sm:inline">
                  {logoSub}
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id as Page)}
                  className={`relative font-medium text-sm py-2 tracking-wide transition-all cursor-pointer ${
                    currentPage === item.id
                      ? 'text-[#C9A96E] dark:text-[#E8C4A0] font-semibold'
                      : 'text-gray-500 hover:text-[#1A1A2E] dark:text-gray-400 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                  {currentPage === item.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A96E] rounded-full" />
                  )}
                  {item.id === 'ai-builder' && (
                    <span className="absolute -top-2.5 -right-3 px-1 py-0.5 bg-[#D4A5A5] text-white text-[8px] rounded-full uppercase scale-90 flex items-center gap-0.5 font-bold animate-pulse">
                      <Sparkles className="w-2 h-2" /> AI
                    </span>
                  )}
                </button>
              ))}
            </nav>

            {/* Search, Theme, Language */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative w-64">
                <input
                  type="text"
                  value={activeSearch}
                  onChange={(e) => {
                    setActiveSearch(e.target.value);
                    if (currentPage !== 'categories' && currentPage !== 'home') {
                      setCurrentPage('categories');
                    }
                  }}
                  placeholder={searchPlaceholder}
                  className="w-full bg-[#FAF7F4] dark:bg-[#1A1A2E]/50 border border-[#E8C4A0]/50 rounded-xl px-4 py-2 text-xs focus:ring-1 focus:ring-[#C9A96E] focus:border-[#C9A96E] dark:text-white placeholder:text-gray-400 transition-colors"
                />
                <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
              </div>

              {/* Language Switch */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="p-2 border border-[#E8C4A0]/40 rounded-xl hover:bg-[#E8C4A0]/10 text-gray-600 dark:text-gray-300 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'en' ? 'العربية' : 'English'}</span>
              </button>

              {/* Dark Mode */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 border border-[#E8C4A0]/40 rounded-xl hover:bg-[#E8C4A0]/10 text-gray-600 dark:text-gray-300 transition-colors"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            {/* Mobile Utility Buttons */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="p-1 px-2 border border-[#E8C4A0]/40 rounded-lg text-gray-600 dark:text-gray-300 text-xs transition-colors"
              >
                {language === 'en' ? 'ar' : 'en'}
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 border border-[#E8C4A0]/40 rounded-lg text-gray-600 dark:text-gray-300 transition-colors"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 border border-[#E8C4A0]/40 rounded-lg text-gray-600 dark:text-gray-300"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E8C4A0]/20 bg-[#FAF7F4] dark:bg-[#12121e]">
            <div className="px-4 pt-4 pb-6 space-y-3">
              {/* Mobile Search */}
              <div className="relative">
                <input
                  type="text"
                  value={activeSearch}
                  onChange={(e) => {
                    setActiveSearch(e.target.value);
                    if (currentPage !== 'categories') {
                      setCurrentPage('categories');
                    }
                  }}
                  placeholder={searchPlaceholder}
                  className="w-full bg-[#FAF7F4] dark:bg-[#1A1A2E]/50 border border-[#E8C4A0]/50 rounded-xl px-4 py-2.5 text-xs text-black dark:text-white"
                />
                <Search className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
              </div>

              {/* Mobile Navigation links */}
              <div className="grid grid-cols-1 gap-2 pt-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id as Page);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === item.id
                        ? 'bg-[#E8C4A0]/40 text-[#1A1A2E] dark:text-[#E8C4A0]'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      {item.label}
                      {item.id === 'ai-builder' && (
                        <span className="px-2 py-0.5 bg-[#D4A5A5] text-white text-[9px] rounded-full uppercase">
                          NEW AI
                        </span>
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
