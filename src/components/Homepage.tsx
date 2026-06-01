import React, { useState } from 'react';
import { Outfit, Language, Page } from '../types';
import { FEATURED_OUTFITS } from '../data';
import { Sparkles, Heart, ChevronRight, Eye, ArrowRight, ArrowLeft } from 'lucide-react';
import AdZone from './AdZone';

interface HomepageProps {
  setCurrentPage: (page: Page) => void;
  setSelectedOutfit: (outfit: Outfit) => void;
  language: Language;
  setLooksLibraryTab: (tab: 'all' | 'summer' | 'work' | 'casual') => void;
}

export default function Homepage({ 
  setCurrentPage, 
  setSelectedOutfit, 
  language,
  setLooksLibraryTab 
}: HomepageProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'casual' | 'work' | 'evening' | 'sport' | 'modest'>('all');
  const [likesCount, setLikesCount] = useState<Record<string, number>>({});
  const [likedList, setLikedList] = useState<Record<string, boolean>>({});

  const isAr = language === 'ar';

  const localizedText = {
    tagline: isAr ? 'إلهامك اليومي لتنسيق الملابس' : 'Your Daily Outfit Inspiration',
    subTagline: isAr 
      ? 'دليل مصمم بعناية خاصة لرجل الشرق الأوسط العصري. اكتشف تصاميم ممتازة تجمع بين الفخامة وحرية التعبير التراثي.' 
      : 'A bespoke editorial handbook crafted for the modern Middle Eastern gentleman. Discover custom assemblies marrying European minimalism with Arabic heritage.',
    categories: isAr ? 'التصنيفات المميزة' : 'Featured Wardrobe Categories',
    featuredTitle: isAr ? 'تنسيقات هذا الأسبوع الفاخرة' : 'Curated Outfits of the Week',
    exploreAll: isAr ? 'استكشف المجموعات الكاملة' : 'Discover All Collections',
    aiPromoTitle: isAr ? 'منسق الملابس الرقمي المدعوم بالذكاء الاصطناعي' : 'Your Personal AI Wardrobe Stylist',
    aiPromoSub: isAr
      ? 'هل تملك قميصاً وتريد بنطالاً مثالياً ملاءماً له؟ التقط صوراً لملابسك الخاصة، ودع خوارزمياتنا المفصلة تصنع لك طقساً متناسقاً على عارضين واقعيين ثلاثيي الأبعاد بشكل فوري.'
      : 'Own a favourite shirt but unsure how to dress it? Upload snapshots of your shirts and trousers, and our specialized AI will weave styled outfits rendered instantly on a realistic model.',
    getStarted: isAr ? 'ابدأ تجربة المنسق العبقري مجاناً' : 'Try AI Stylist Free',
    likeLabel: isAr ? 'إعجاب' : 'Like',
    detailsLabel: isAr ? 'تفاصيل الإطلالة' : 'View Editorial Details',
    categoriesList: [
      { id: 'all', name: isAr ? 'الكل' : 'All Assemblies' },
      { id: 'casual', name: isAr ? 'كاجوال هادئ' : 'Coastal Casual' },
      { id: 'work', name: isAr ? 'عملي رسمي' : 'Executive Elite' },
      { id: 'evening', name: isAr ? 'السهرات والمجالس' : 'Evening Majlis' },
      { id: 'sport', name: isAr ? 'رياضي عصري' : 'Urban Sport' },
      { id: 'modest', name: isAr ? 'أناقة محتشمة' : 'Modest & Traditional' },
    ]
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentLiked = likedList[id];
    setLikedList(prev => ({ ...prev, [id]: !currentLiked }));
    setLikesCount(prev => ({
      ...prev,
      [id]: (prev[id] !== undefined ? prev[id] : 0) + (currentLiked ? -1 : 1)
    }));
  };

  const speakOutfit = (outfit: Outfit) => {
    setSelectedOutfit(outfit);
    setCurrentPage('outfit-detail');
  };

  const filteredOutfits = activeCategory === 'all'
    ? FEATURED_OUTFITS
    : FEATURED_OUTFITS.filter(o => o.category === activeCategory);

  return (
    <div className="pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all">
      {/* 1. Leaderboard ad banner at top */}
      <AdZone type="leaderboard" language={language} />

      {/* 2. Hero Section */}
      <section className="relative rounded-3xl overflow-hidden shadow-xl mb-12 border border-[#E8C4A0]/20 bg-[#1A1A2E]">
        {/* Dynamic Abstract luxury background overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A2E] via-[#1A1E33]/90 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=2000&q=80"
          alt="StyleBoard Editorial Men Model"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-75 scale-105 transform group-hover:scale-100 transition-transform duration-1000"
        />

        {/* Content Container */}
        <div className="relative z-20 px-8 py-16 sm:py-24 sm:px-16 flex flex-col justify-center max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A96E]/20 border border-[#C9A96E]/50 rounded-full w-fit mb-4">
            <Sparkles className="w-4 h-4 text-[#C9A96E]" />
            <span className="text-[10px] tracking-widest text-[#E8C4A0] uppercase font-bold">
              {isAr ? 'عولمة الأناقة العربية ٢٠٢٥' : 'Arabic High-Fashion Forecast 2025'}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
            {localizedText.tagline}
          </h1>

          <p className="mt-4 text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
            {localizedText.subTagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => setCurrentPage('ai-builder')}
              className="px-6 py-3.5 bg-[#C9A96E] hover:bg-[#E8C4A0] text-[#1A1A2E] font-bold rounded-xl text-xs sm:text-sm tracking-wide transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAr ? 'جرّب المنسق الذكي' : 'Try Custom AI Outfit Builder'}</span>
            </button>
            <button
              onClick={() => setCurrentPage('categories')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium border border-white/20 rounded-xl text-xs sm:text-sm transition-all"
            >
              {isAr ? 'تصفح الكتالوج' : 'Browse All Assemblies'}
            </button>
          </div>
        </div>
      </section>

      {/* Short-path Capsule collections (Summer, Work, Casual) */}
      <section className="mb-16">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A2E] dark:text-white tracking-tight mb-2 text-center md:text-left">
          {isAr ? 'مجموعات الكبسولة المنسقة بعناية' : 'Curated Style Capsule Collections'}
        </h2>
        <p className="text-xs text-gray-500 mb-8 text-center md:text-left dark:text-gray-400 font-medium">
          {isAr ? 'اضغط على تجميعاتنا الخاصة للانتقال السريع والاطلاع على التنسيقات التفصيلية لكل مناسبة' : 'Select quick-access capsules compiled directly by premium stylists and color matchers.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Capsule Card 1: Summer */}
          <div 
            onClick={() => {
              setLooksLibraryTab('summer');
              setCurrentPage('categories');
            }}
            className="group relative h-72 rounded-2xl overflow-hidden border border-[#E8C4A0]/20 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80" 
              alt="Best summer styling lookbook"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 z-20 bg-amber-500 text-white font-extrabold text-[8px] tracking-widest uppercase px-2 py-0.5 rounded">
              {isAr ? 'موسم الحرارة والواحات' : 'SUMMER 2026'}
            </div>
            <div className="absolute bottom-5 left-5 right-5 z-20 text-left">
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                {isAr ? '☀️ أفضل تنسيقات الصيف' : '☀️ Best Summer Outfits'}
              </h3>
              <p className="text-[10px] text-gray-300 mt-1 line-clamp-2">
                {isAr 
                  ? 'ملابس الكتان الخفيفة، والألوان العاجية الترابية لنوادي الشاطئ والأمسيات الساحلية.' 
                  : 'Breathable linen fabrics and warm ivory combinations suited for relaxed sunny days.'}
              </p>
              <span className="inline-flex items-center gap-1 text-[9px] font-black tracking-wider uppercase text-amber-400 mt-2">
                {isAr ? 'تصفح الكبسولة الصيفية ←' : 'Browse Summer Capsule ←'}
              </span>
            </div>
          </div>

          {/* Capsule Card 2: Workwear */}
          <div 
            onClick={() => {
              setLooksLibraryTab('work');
              setCurrentPage('categories');
            }}
            className="group relative h-72 rounded-2xl overflow-hidden border border-[#E8C4A0]/20 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80" 
              alt="Executive workwear looks"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 z-20 bg-blue-600 text-white font-extrabold text-[8px] tracking-widest uppercase px-2 py-0.5 rounded">
              {isAr ? 'لقاءات العمل الواثقة' : 'BOARDROOM ELITE'}
            </div>
            <div className="absolute bottom-5 left-5 right-5 z-20 text-left">
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                {isAr ? '💼 تنسيقات للعمل والشركات' : '💼 Office / Work Outfits'}
              </h3>
              <p className="text-[10px] text-gray-300 mt-1 line-clamp-2">
                {isAr 
                  ? 'أناقة عملية بالبولو التريكو الفاخر وشينو البيج، لتجمع الفخامة وراحة المكاتب.' 
                  : 'High-contrast elite pairings mapping charcoal, deep navy, and crisp cotton textures.'}
              </p>
              <span className="inline-flex items-center gap-1 text-[9px] font-black tracking-wider uppercase text-blue-300 mt-2">
                {isAr ? 'تصفح التنسيق العملي ←' : 'Browse Office Capsule ←'}
              </span>
            </div>
          </div>

          {/* Capsule Card 3: Casual */}
          <div 
            onClick={() => {
              setLooksLibraryTab('casual');
              setCurrentPage('categories');
            }}
            className="group relative h-72 rounded-2xl overflow-hidden border border-[#E8C4A0]/20 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?auto=format&fit=crop&w=600&q=80" 
              alt="Casual urban outfits library"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 z-20 bg-red-500 text-white font-extrabold text-[8px] tracking-widest uppercase px-2 py-0.5 rounded">
              {isAr ? 'إجازة كاجوال مبتكرة' : 'COASTAL CHIC'}
            </div>
            <div className="absolute bottom-5 left-5 right-5 z-20 text-left">
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                {isAr ? '☕ تنسيقات للكاجوال وعقد اللقاءات' : '☕ Relaxed / Casual Outfits'}
              </h3>
              <p className="text-[10px] text-gray-300 mt-1 line-clamp-2">
                {isAr 
                  ? 'ألوان الباستيل العصرية واللافندر والقمصان المفتوحة لثقة إضافية في اللطافة.' 
                  : 'Relaxed layouts with pastel tones, breathable loose chinos, and street aesthetics.'}
              </p>
              <span className="inline-flex items-center gap-1 text-[9px] font-black tracking-wider uppercase text-red-400 mt-2">
                {isAr ? 'تصفح التجميع الكاجوال ←' : 'Browse Casual Capsule ←'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Filter Bar */}
      <section className="mb-10 text-center">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A2E] dark:text-white mb-6">
          {localizedText.categories}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-white dark:bg-[#1A1A2E]/40 border border-[#E8C4A0]/20 p-2 rounded-2xl w-fit mx-auto shadow-sm">
          {localizedText.categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#1A1A2E] text-white dark:bg-[#C9A96E] dark:text-[#1A1A2E] shadow-sm'
                  : 'text-gray-500 hover:text-[#1A1A2E] hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800/40'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* 4. Featured Outfit Cards Grid (3 Columns) */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A2E] dark:text-white tracking-tight">
            {localizedText.featuredTitle}
          </h2>
          <button
            onClick={() => setCurrentPage('categories')}
            className="group flex items-center gap-1.5 text-xs font-bold text-[#C9A96E] hover:text-[#1A1A2E] dark:text-[#E8C4A0] dark:hover:text-white transition-colors cursor-pointer"
          >
            <span>{localizedText.exploreAll}</span>
            {isAr ? <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> : <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOutfits.slice(0, 3).map((outfit) => {
            const hasLiked = likedList[outfit.id];
            const displayLikes = outfit.likes + (likesCount[outfit.id] || 0);

            return (
              <div
                key={outfit.id}
                onClick={() => speakOutfit(outfit)}
                className="group flex flex-col bg-white dark:bg-[#1A1A2E]/30 rounded-2xl overflow-hidden border border-[#E8C4A0]/20 shadow-md hover:shadow-xl transition-all duration-300 relative cursor-pointer"
              >
                {/* Image Wrap */}
                <div className="h-96 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <img
                    src={outfit.imageUrl}
                    alt={isAr ? outfit.titleAr : outfit.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category Accent Badge */}
                  <span className="absolute top-4 left-4 bg-[#FAF7F4] dark:bg-[#1A1A2E] text-[#1A1A2E] dark:text-white text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full shadow-sm z-20">
                    {isAr ? outfit.category.toUpperCase() : outfit.category.toUpperCase()}
                  </span>

                  {/* Micro interaction buttons inside image */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-xs text-white font-medium truncate drop-shadow">
                      {isAr ? outfit.occasionAr : outfit.occasion}
                    </span>
                    <button
                      onClick={(e) => handleLike(outfit.id, e)}
                      className={`p-2 bg-[#FAF7F4] hover:bg-white rounded-full shadow transition-all ${
                        hasLiked ? 'text-red-500 scale-110' : 'text-[#1A1A2E]'
                      }`}
                    >
                      <Heart className="w-4 h-4 fill-current text-current" />
                    </button>
                  </div>
                </div>

                {/* Info block */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#1A1A2E] dark:text-white leading-snug group-hover:text-[#C9A96E] dark:group-hover:text-[#E8C4A0] transition-colors">
                      {isAr ? outfit.titleAr : outfit.title}
                    </h3>

                    {/* Tag bubbles */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {(isAr ? outfit.tagsAr : outfit.tags).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mt-4 leading-relaxed">
                      {isAr ? outfit.descriptionAr : outfit.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <span className="text-xs font-serif font-black tracking-widest uppercase text-[#C9A96E] dark:text-[#E8C4A0] flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{localizedText.detailsLabel}</span>
                    </span>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-red-400 fill-current" />
                      <span>{displayLikes}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Dynamic Ad Place - In Content */}
      <AdZone type="in-feed" language={language} />

      {/* 6. AI Closet Promo Section */}
      <section className="bg-gradient-to-br from-[#1A1A2E] to-[#121226] border border-[#E8C4A0]/25 rounded-3xl p-8 sm:p-12 relative overflow-hidden mt-12 shadow-xl group">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-[#C9A96E]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-gradient-to-tr from-[#D4A5A5]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7">
            <span className="px-3 py-1 bg-[#D4A5A5] text-white text-[9px] uppercase tracking-widest font-extrabold rounded-full w-fit mb-4 block">
              {isAr ? 'عصر الذكاء الاصطناعي لتناسق الألوان' : 'GEN-AI OUTFIT MATCHING ENGINE'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              {localizedText.aiPromoTitle}
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
              {localizedText.aiPromoSub}
            </p>
            <button
              onClick={() => setCurrentPage('ai-builder')}
              className="mt-8 px-6 py-3.5 bg-white text-[#1A1A2E] hover:bg-[#E8C4A0] hover:text-[#1A1A2E] font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow"
            >
              <Sparkles className="w-4 h-4 text-[#C9A96E]" />
              <span>{localizedText.getStarted}</span>
            </button>
          </div>

          <div className="lg:col-span-5 h-64 lg:h-80 rounded-2xl overflow-hidden shadow-2xl relative border border-[#E8C4A0]/20 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80')]">
            <div className="absolute inset-0 bg-[#1A1A2E]/70 flex flex-col justify-center items-center text-center p-6 backdrop-blur-[2px]">
              <div className="w-16 h-16 bg-[#C9A96E]/20 text-[#C9A96E] rounded-full flex items-center justify-center font-bold mb-4 border border-[#C9A96E]/55 scale-110 animate-bounce">
                ✨
              </div>
              <h4 className="text-white text-sm font-serif font-bold">
                {isAr ? 'احصل على صورك المفصلة الخاصة' : 'Get Your Bespoke Visuals'}
              </h4>
              <p className="text-[11px] text-gray-400 mt-1 max-w-xs">
                {isAr ? 'خوارزميات مبرمجة تفصل تفاصيل الملابس بدقة لتصنع تحفاً فوتوغرافية.' : 'Trained model matching coordinates high-definition tailored garments perfectly.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
