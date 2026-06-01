import React, { useState } from 'react';
import { Outfit, Language, Page } from '../types';
import { FEATURED_OUTFITS } from '../data';
import { ArrowLeft, ArrowRight, Heart, Share2, Sparkles, CheckCircle2 } from 'lucide-react';
import AdZone from './AdZone';

interface OutfitDetailPageProps {
  outfit: Outfit | null;
  setCurrentPage: (page: Page) => void;
  setSelectedOutfit: (outfit: Outfit) => void;
  language: Language;
}

export default function OutfitDetailPage({
  outfit,
  setCurrentPage,
  setSelectedOutfit,
  language
}: OutfitDetailPageProps) {
  const [hasLiked, setHasLiked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const isAr = language === 'ar';

  const localizedText = {
    backBtn: isAr ? 'العودة للتصنيفات' : 'Back to Collection',
    breakdownTitle: isAr ? 'مكونات وعناصر الإطلالة' : 'Anatomy of the Assembly',
    breakdownSub: isAr ? 'تفاصيل كل قطعة وتوجيهات الشراء والتنسيق' : 'Sourcing directories, fibers, and styling details',
    topLabel: isAr ? 'الجزء العلوي (قمصان/سترات)' : 'Upper/Tops',
    bottomLabel: isAr ? 'الجزء السفلي (بناطيل/شينو)' : 'Lower/Trousers',
    shoesLabel: isAr ? 'الحذاء الموصى به' : 'Footwear Preference',
    accLabel: isAr ? 'الإكسسوارات المكملة' : 'Accessories & Accents',
    styleNotes: isAr ? 'ملاحظات خبير التنسيق' : 'Editorial Style Notes',
    similarTitle: isAr ? 'تنسيقات قد تثير اهتمامك' : 'Discover Similar Assemblies',
    copiedMsg: isAr ? 'تم نسخ الرابط الحصري بنجاح!' : 'Curated lookbook URL copied to clipboard!',
    shareLabel: isAr ? 'مشاركة الإطلالة' : 'Share Outfit',
    buyLabel: isAr ? 'متاح للشراء عبر شركائنا المعمدين' : 'Authorized Retail Purchase available',
    luxuryBrand: isAr ? 'الماركة المصنعة' : 'Artisan brand/Sponsor',
    specs: {
      budget: isAr ? 'الميزانية' : 'Budget Segment',
      silhouette: isAr ? 'البنية الملائمة' : 'Body Silhouette',
      season: isAr ? 'الموسم الأفضل' : 'Perfect Season'
    }
  };

  // If no outfit selected (fallback to first outfit)
  const currentOutfit = outfit || FEATURED_OUTFITS[0];

  // Filter similar outfits
  const similarOutfits = FEATURED_OUTFITS
    .filter(o => o.id !== currentOutfit.id && (o.category === currentOutfit.category || o.season === currentOutfit.season))
    .slice(0, 3);

  const handleCopyLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const speakOutfit = (o: Outfit) => {
    setSelectedOutfit(o);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const titleText = isAr ? currentOutfit.titleAr : currentOutfit.title;
  const descText = isAr ? currentOutfit.descriptionAr : currentOutfit.description;
  const itemsList = isAr ? currentOutfit.itemsAr : currentOutfit.items;

  return (
    <div className="pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Leaderboard Banner Ad */}
      <AdZone type="leaderboard" language={language} />

      {/* Back Button */}
      <button
        onClick={() => setCurrentPage('categories')}
        className="group flex items-center gap-2 text-xs font-bold text-[#1A1A2E] dark:text-[#E8C4A0] hover:text-[#C9A96E] dark:hover:text-white transition-colors cursor-pointer mb-6 mt-4"
      >
        {isAr ? <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /> : <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />}
        <span>{localizedText.backBtn}</span>
      </button>

      {/* Main Split: Outfit visual + structured breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left column: Large outfit visualization */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-[#E8C4A0]/20 shadow-lg bg-gray-100 relative">
            <img
              src={currentOutfit.imageUrl}
              alt={titleText}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {/* Soft gold border highlights */}
            <div className="absolute inset-0 border-[3px] border-[#C9A96E]/20 rounded-2xl pointer-events-none" />
          </div>

          {/* Social shares and micro interactions */}
          <div className="flex items-center justify-between border border-[#E8C4A0]/20 bg-white dark:bg-[#1A1A2E]/30 p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setHasLiked(!hasLiked)}
                className={`p-2.5 rounded-xl border border-gray-100 dark:border-gray-800 transition-all ${
                  hasLiked ? 'text-red-500 bg-red-50 dark:bg-red-950/20 scale-105' : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                <Heart className="w-4 h-4 fill-current text-current" />
              </button>
              <span className="text-xs text-gray-500 font-medium">
                {currentOutfit.likes + (hasLiked ? 1 : 0)} {isAr ? 'إعجاب مسبق' : 'likes registered'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-2 border border-[#E8C4A0]/30 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 transition-colors cursor-pointer font-bold"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{localizedText.shareLabel}</span>
              </button>
            </div>
          </div>

          {copiedLink && (
            <div className="p-3 text-xs text-[#1A1A2E] bg-[#E8C4A0]/45 border border-[#C9A96E] rounded-xl text-center font-semibold animate-pulse">
              {localizedText.copiedMsg}
            </div>
          )}
        </div>

        {/* Right column: Styled components and directories */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="pb-6 border-b border-gray-100 dark:border-gray-800 mb-6">
            <span className="px-2.5 py-1 bg-[#1A1A2E] text-white dark:bg-[#C9A96E] dark:text-[#1A1A2E] text-[9px] uppercase tracking-wider font-extrabold rounded-md shadow-sm mb-3 inline-block">
              {currentOutfit.category.toUpperCase()}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1A1A2E] dark:text-white leading-tight tracking-tight mt-1">
              {titleText}
            </h1>
            <p className="text-xs text-[#C9A96E] font-medium mt-1">
              {isAr ? `تأليف: قسم تصميمات الشرق الأوسط — ستايل بورد` : `Bespoke styling concept by StyleBoard Arabia Editors`}
            </p>
          </div>

          {/* Quick Specifications list */}
          <div className="grid grid-cols-3 gap-4 border border-[#E8C4A0]/30 p-4 bg-[#FAF7F4] dark:bg-[#1A1A2E]/50 rounded-xl mb-6">
            <div className="text-center">
              <span className="text-[10px] text-gray-500 dark:text-gray-400 block uppercase font-bold">
                {localizedText.specs.budget}
              </span>
              <span className="text-xs font-semibold text-[#1A1A2E] dark:text-[#E8C4A0] mt-1 block capitalize">
                {isAr 
                  ? (currentOutfit.budget === 'premium' ? 'مفصل فاخر' : currentOutfit.budget === 'medium' ? 'متوسط' : 'مقبول') 
                  : currentOutfit.budget}
              </span>
            </div>
            <div className="text-center border-x border-[#E8C4A0]/20">
              <span className="text-[10px] text-gray-500 dark:text-gray-400 block uppercase font-bold">
                {localizedText.specs.silhouette}
              </span>
              <span className="text-xs font-semibold text-[#1A1A2E] dark:text-[#E8C4A0] mt-1 block capitalize">
                {isAr
                  ? (currentOutfit.bodyType === 'broad-shoulder' ? 'أكتاف عريضة' : currentOutfit.bodyType === 'slim' ? 'رشيق' : 'متوسط')
                  : currentOutfit.bodyType}
              </span>
            </div>
            <div className="text-center">
              <span className="text-[10px] text-gray-500 dark:text-gray-400 block uppercase font-bold">
                {localizedText.specs.season}
              </span>
              <span className="text-xs font-semibold text-[#1A1A2E] dark:text-[#E8C4A0] mt-1 block capitalize">
                {isAr
                  ? (currentOutfit.season === 'summer' ? 'صيفي وملهم' : currentOutfit.season === 'winter' ? 'شتاء دافئ' : 'كل الفصول')
                  : currentOutfit.season}
              </span>
            </div>
          </div>

          {/* Component Breakdown list */}
          <div className="mb-8">
            <h3 className="font-serif text-lg font-bold text-[#1A1A2E] dark:text-white capitalize mb-1">
              {localizedText.breakdownTitle}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              {localizedText.breakdownSub}
            </p>

            <div className="space-y-4">
              {/* Top Piece */}
              <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-[#E8C4A0]/60 transition-all bg-white dark:bg-[#1A1A2E]/20">
                <div className="w-10 h-10 bg-[#E8C4A0]/20 text-[#C9A96E] rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                  01
                </div>
                <div className="flex-1">
                  <span className="text-[10px] uppercase font-mono text-[#C9A96E] tracking-widest font-bold">
                    {localizedText.topLabel}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-[#1A1A2E] dark:text-white mt-1">
                    {itemsList.top}
                  </p>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 block">
                    {localizedText.luxuryBrand}: <strong className="text-[#1A1A2E] dark:text-white">Al-Hama Custom Tailors</strong>
                  </span>
                </div>
              </div>

              {/* Bottom Piece */}
              <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-[#E8C4A0]/60 transition-all bg-white dark:bg-[#1A1A2E]/20">
                <div className="w-10 h-10 bg-[#E8C4A0]/20 text-[#C9A96E] rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                  02
                </div>
                <div className="flex-1">
                  <span className="text-[10px] uppercase font-mono text-[#C9A96E] tracking-widest font-bold">
                    {localizedText.bottomLabel}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-[#1A1A2E] dark:text-white mt-1">
                    {itemsList.bottom}
                  </p>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 block">
                    {localizedText.luxuryBrand}: <strong className="text-[#1A1A2E] dark:text-white">Lebanese Spun Linens Association</strong>
                  </span>
                </div>
              </div>

              {/* Footwear */}
              <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-[#E8C4A0]/60 transition-all bg-white dark:bg-[#1A1A2E]/20">
                <div className="w-10 h-10 bg-[#E8C4A0]/20 text-[#C9A96E] rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                  03
                </div>
                <div className="flex-1">
                  <span className="text-[10px] uppercase font-mono text-[#C9A96E] tracking-widest font-bold">
                    {localizedText.shoesLabel}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-[#1A1A2E] dark:text-white mt-1">
                    {itemsList.shoes}
                  </p>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 block">
                    {localizedText.luxuryBrand}: <strong className="text-[#1A1A2E] dark:text-white">Al Madas Bespoke Footwear, Riyadh</strong>
                  </span>
                </div>
              </div>

              {/* Accessories */}
              <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-[#E8C4A0]/60 transition-all bg-white dark:bg-[#1A1A2E]/20">
                <div className="w-10 h-10 bg-[#E8C4A0]/20 text-[#C9A96E] rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                  04
                </div>
                <div className="flex-1">
                  <span className="text-[10px] uppercase font-mono text-[#C9A96E] tracking-widest font-bold">
                    {localizedText.accLabel}
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {itemsList.accessories.map((acc, key) => (
                      <span
                        key={key}
                        className="text-xs bg-[#FAF7F4] dark:bg-[#12121e] border border-[#E8C4A0]/30 text-[#1A1A2E] dark:text-white px-2.5 py-1 rounded-lg font-medium"
                      >
                        • {acc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Style Notes from Editors */}
          <div className="bg-[#1A1A2E] border border-gold/40 text-[#FAF7F4] p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 pointer-events-none text-[#C9A96E]/20 text-6xl font-serif font-black select-none">
              “
            </div>
            <h3 className="font-serif text-sm font-bold text-[#E8C4A0] flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#C9A96E]" />
              <span>{localizedText.styleNotes}</span>
            </h3>
            <p className="text-xs text-gray-300 font-sans leading-relaxed">
              {descText}
            </p>
            <div className="flex items-center gap-2 mt-4 text-[10px] text-[#C9A96E]">
              <CheckCircle2 className="w-4 h-4 text-[#C9A96E]" />
              <span>{localizedText.buyLabel}</span>
            </div>
          </div>

          {/* Ad Placement: Rectangle */}
          <div className="mt-8">
            <AdZone type="rectangle" language={language} />
          </div>
        </div>
      </div>

      {/* Similar Outfits section below */}
      <section className="mt-16 border-t border-gray-100 dark:border-gray-800 pt-12">
        <h2 className="font-serif text-2xl font-bold text-[#1A1A2E] dark:text-white tracking-tight mb-8">
          {localizedText.similarTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {similarOutfits.map((similar) => (
            <div
              key={similar.id}
              onClick={() => speakOutfit(similar)}
              className="group bg-white dark:bg-[#1A1A2E]/20 border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden hover:border-[#E8C4A0]/60 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="h-72 overflow-hidden">
                <img
                  src={similar.imageUrl}
                  alt={isAr ? similar.titleAr : similar.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h4 className="font-serif text-base font-bold text-[#1A1A2E] dark:text-white line-clamp-1 group-hover:text-[#C9A96E] transition-colors">
                  {isAr ? similar.titleAr : similar.title}
                </h4>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                  {isAr ? similar.descriptionAr : similar.description}
                </p>
                <div className="flex items-center justify-between border-t border-gray-50 dark:border-gray-800 pt-3 mt-4 text-[10px] text-[#C9A96E]">
                  <span>{isAr ? similar.occasionAr : similar.occasion}</span>
                  <span className="flex items-center gap-1 text-gray-400 font-mono">
                    <Heart className="w-3.5 h-3.5 fill-current text-red-400" />
                    {similar.likes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
