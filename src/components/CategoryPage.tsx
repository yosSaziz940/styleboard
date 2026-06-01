import React, { useState, useEffect, useRef } from 'react';
import { Outfit, Language, Page } from '../types';
import { FEATURED_OUTFITS } from '../data';
import { Filter, Eye, Heart, RotateCcw, AlertCircle } from 'lucide-react';
import AdZone from './AdZone';

interface CategoryPageProps {
  setCurrentPage: (page: Page) => void;
  setSelectedOutfit: (outfit: Outfit) => void;
  language: Language;
  activeSearch: string;
  setActiveSearch: (search: string) => void;
  activeQuickTab: 'all' | 'summer' | 'work' | 'casual';
  setActiveQuickTab: (tab: 'all' | 'summer' | 'work' | 'casual') => void;
}

export default function CategoryPage({
  setCurrentPage,
  setSelectedOutfit,
  language,
  activeSearch,
  setActiveSearch,
  activeQuickTab,
  setActiveQuickTab
}: CategoryPageProps) {
  // Filters State
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [selectedBodyType, setSelectedBodyType] = useState<string>('all');
  const [selectedBudget, setSelectedBudget] = useState<string>('all');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');

  // Infinite Scroll & Loader state
  const [loadedCount, setLoadedCount] = useState<number>(4);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const scrollSentinelRef = useRef<HTMLDivElement | null>(null);

  const isAr = language === 'ar';

  // Available unique options derived from our data
  const occasions = [
    { value: 'all', label: isAr ? 'كل المناسبات' : 'All Occasions' },
    { value: 'resort', label: isAr ? 'سفر ومنتجعات' : 'Resorts' },
    { value: 'boardroom', label: isAr ? 'رسمي واجتماعات' : 'Executive/Boardroom' },
    { value: 'majlis', label: isAr ? 'المجالس الاجتماعية' : 'Social Majlis' },
    { value: 'brunch', label: isAr ? 'كاجوال وفطور' : 'Brunch & Dining' },
    { value: 'wedding', label: isAr ? 'مناسبات كبرى وأعياد' : 'Traditional/Wedding' }
  ];

  const localizedTags = {
    filtersTitle: isAr ? 'خيارات التنسيق المتقدمة' : 'Refine Your Style',
    seasonLabel: isAr ? 'الموسم' : 'Season',
    bodyTypeLabel: isAr ? 'بنية الجسم' : 'Body Silhouette',
    budgetLabel: isAr ? 'فئة الميزانية' : 'Pricing & Segment',
    occasionLabel: isAr ? 'المناسبة' : 'Occasion / Vibe',
    resetLabel: isAr ? 'إعادة ضبط التصفية' : 'Reset All Filters',
    resultsLabel: isAr ? 'النتائج المتوافقة' : 'Matched Designs',
    noResults: isAr ? 'عذراً، لم نجد نتائج تطابق خياراتك الحالية.' : 'No assemblies match your specific filters yet.',
    noResultsSub: isAr ? 'جرّب تغيير فئة الميزانية أو تصفح الكل لتجد الأفكار الملهمة.' : 'Try selecting different silhouettes or explore our Casual range.',
    loadMoreLabel: isAr ? 'تحميل المزيد من التنسيقات' : 'Show Elegant Suggestions',
    seasons: [
      { id: 'all', name: isAr ? 'كل المواسم' : 'All Seasons' },
      { id: 'summer', name: isAr ? 'صيف معتدل' : 'Breezy Summer' },
      { id: 'winter', name: isAr ? 'شتاء دافئ' : 'Layered Winter' },
      { id: 'spring-fall', name: isAr ? 'ربيع وخريف' : 'Spring/Autumn' },
    ],
    bodyTypes: [
      { id: 'all', name: isAr ? 'كل البنيات' : 'All Silhouettes' },
      { id: 'slim', name: isAr ? 'نحيف / رفيع' : 'Slim Fit' },
      { id: 'average', name: isAr ? 'متوسط / رياضي خفيف' : 'Average Height/Build' },
      { id: 'broad-shoulder', name: isAr ? 'أكتاف عريضة' : 'Broad Shoulder' },
    ],
    budgets: [
      { id: 'all', name: isAr ? 'كل الفئات' : 'All Budgets' },
      { id: 'budget', name: isAr ? 'مقبول / معتدل' : 'Smart Value' },
      { id: 'medium', name: isAr ? 'خطوط تجميع متوسطة' : 'Premium Retail' },
      { id: 'premium', name: isAr ? 'مفصل فاخر (بيسبوك)' : 'Luxury Bespoke' },
    ]
  };

  const handleReset = () => {
    setActiveQuickTab('all');
    setSelectedSeason('all');
    setSelectedBodyType('all');
    setSelectedBudget('all');
    setSelectedOccasion('all');
    setActiveSearch('');
    setLoadedCount(4);
  };

  // Filtering Logic
  const allFilteredOutfits = FEATURED_OUTFITS.filter((outfit) => {
    // Quick Filters
    if (activeQuickTab === 'summer' && outfit.season !== 'summer') {
      return false;
    }
    if (activeQuickTab === 'work' && outfit.category !== 'work') {
      return false;
    }
    if (activeQuickTab === 'casual' && outfit.category !== 'casual') {
      return false;
    }
    // 1. Search Query Match
    if (activeSearch) {
      const q = activeSearch.toLowerCase();
      const matchTitleEn = outfit.title.toLowerCase().includes(q);
      const matchTitleAr = outfit.titleAr.includes(q);
      const matchDescEn = outfit.description.toLowerCase().includes(q);
      const matchDescAr = outfit.descriptionAr.includes(q);
      const matchTagsEn = outfit.tags.some(t => t.toLowerCase().includes(q));
      const matchTagsAr = outfit.tagsAr.some(t => t.includes(q));
      if (!matchTitleEn && !matchTitleAr && !matchDescEn && !matchDescAr && !matchTagsEn && !matchTagsAr) {
        return false;
      }
    }

    // 2. Season Match
    if (selectedSeason !== 'all' && outfit.season !== selectedSeason && outfit.season !== 'all') {
      return false;
    }

    // 3. Body Silhouette Match
    if (selectedBodyType !== 'all' && outfit.bodyType !== selectedBodyType) {
      return false;
    }

    // 4. Budget Match
    if (selectedBudget !== 'all' && outfit.budget !== selectedBudget) {
      return false;
    }

    // 5. Occasion Vibe Match
    if (selectedOccasion !== 'all') {
      const occStr = outfit.occasion.toLowerCase() + ' ' + outfit.title.toLowerCase();
      if (selectedOccasion === 'resort' && !occStr.includes('resort') && !occStr.includes('travel')) return false;
      if (selectedOccasion === 'boardroom' && !occStr.includes('boardroom') && !occStr.includes('meeting') && !occStr.includes('corporate')) return false;
      if (selectedOccasion === 'majlis' && !occStr.includes('majlis') && !occStr.includes('heritage')) return false;
      if (selectedOccasion === 'brunch' && !occStr.includes('brunch') && !occStr.includes('dining') && !occStr.includes('lounge')) return false;
      if (selectedOccasion === 'wedding' && !occStr.includes('marriage') && !occStr.includes('eid') && !occStr.includes('gala')) return false;
    }

    return true;
  });

  const displayedOutfits = allFilteredOutfits.slice(0, loadedCount);

  // Infinite Scroll simulation with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && loadedCount < allFilteredOutfits.length && !loadingMore) {
        setLoadingMore(true);
        // Simulate premium fashion cache fetching
        setTimeout(() => {
          setLoadedCount((prev) => Math.min(prev + 4, allFilteredOutfits.length));
          setLoadingMore(false);
        }, 800);
      }
    }, {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    });

    if (scrollSentinelRef.current) {
      observer.observe(scrollSentinelRef.current);
    }

    return () => {
      if (scrollSentinelRef.current) {
        observer.unobserve(scrollSentinelRef.current);
      }
    };
  }, [scrollSentinelRef, allFilteredOutfits.length, loadedCount, loadingMore]);

  const viewOutfit = (outfit: Outfit) => {
    setSelectedOutfit(outfit);
    setCurrentPage('outfit-detail');
  };

  return (
    <div className="pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Dynamic Header Ad Banner */}
      <AdZone type="leaderboard" language={language} />

      <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] dark:text-white tracking-tight mb-2 mt-6">
        {isAr ? 'مكتبة ستايل بورد الفخمة للإطلالات' : 'StyleBoard Luxury Looks Library'}
      </h1>
      <p className="text-xs text-gray-500 mb-6 dark:text-gray-400">
        • {allFilteredOutfits.length} {isAr ? 'تنسيق متوفر يعبر عن السيادة والموضة' : 'Sovereign layouts matching luxury criteria'} — {isAr ? 'تصفح فوري ذكي وملهم' : 'Live Curated Design Grid'}
      </p>

      {/* Summer, Work, and Casual Curated High-Profile Quick Tabs */}
      <div className="flex flex-col sm:flex-row gap-2.5 mb-8 bg-[#FAF7F4] dark:bg-zinc-900/40 p-2.5 rounded-2xl border border-[#E8C4A0]/20 shadow-sm">
        <button
          onClick={() => setActiveQuickTab('all')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeQuickTab === 'all'
              ? 'bg-[#1A1A2E] dark:bg-[#C9A96E] text-[#E8C4A0] dark:text-[#1A1A2E] shadow-sm font-extrabold'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/10'
          }`}
        >
          <span>🌟</span>
          <span>{isAr ? 'تصفح كل التنسيقات' : 'Browse All Looks'}</span>
        </button>
        <button
          onClick={() => setActiveQuickTab('summer')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeQuickTab === 'summer'
              ? 'bg-amber-600 dark:bg-amber-500 text-white shadow-sm font-extrabold scale-[1.02]'
              : 'text-gray-500 dark:text-gray-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10'
          }`}
        >
          <span>☀️</span>
          <span>{isAr ? 'أفضل تنسيقات الصيف' : 'Best Summer Outfits'}</span>
        </button>
        <button
          onClick={() => setActiveQuickTab('work')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeQuickTab === 'work'
              ? 'bg-blue-800 dark:bg-blue-600 text-white shadow-sm font-extrabold scale-[1.02]'
              : 'text-gray-500 dark:text-gray-400 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-600/10'
          }`}
        >
          <span>💼</span>
          <span>{isAr ? 'تنسيقات للعمل' : 'Office / Work Outfits'}</span>
        </button>
        <button
          onClick={() => setActiveQuickTab('casual')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeQuickTab === 'casual'
              ? 'bg-[#B1533E] text-white shadow-sm font-extrabold scale-[1.02]'
              : 'text-gray-500 dark:text-gray-400 hover:text-[#B1533E] hover:bg-red-50 dark:hover:bg-[#B1533E]/10'
          }`}
        >
          <span>☕</span>
          <span>{isAr ? 'تنسيقات للكاجوال' : 'Relaxed / Casual Outfits'}</span>
        </button>
      </div>

      {/* Main split: Sidebar Filter Column + Pinterest Masonry Grid Column */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1 bg-white dark:bg-[#1A1A2E]/30 border border-[#E8C4A0]/25 rounded-2xl p-6 h-fit static lg:sticky lg:top-24 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800 mb-5">
            <h3 className="font-serif text-sm font-bold text-[#1A1A2E] dark:text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#C9A96E]" />
              <span>{localizedTags.filtersTitle}</span>
            </h3>
            <button
              onClick={handleReset}
              className="text-[10px] text-[#C9A96E] hover:text-[#1A1A2E] dark:hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-bold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{isAr ? 'مسح' : 'Clear'}</span>
            </button>
          </div>

          {/* Search indicator */}
          {activeSearch && (
            <div className="mb-4 p-2.5 rounded-xl bg-[#E8C4A0]/10 border border-[#E8C4A0]/30 flex items-center justify-between">
              <span className="text-[10px] text-[#1A1A2E] dark:text-white truncate max-w-[130px]">
                {isAr ? 'البحث عن:' : 'Query:'} "{activeSearch}"
              </span>
              <button
                onClick={() => setActiveSearch('')}
                className="text-[10px] font-bold text-gray-400 hover:text-red-500 font-mono"
              >
                ✕
              </button>
            </div>
          )}

          {/* Filter Group: Season */}
          <div className="mb-6">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 block mb-2">
              {localizedTags.seasonLabel}
            </label>
            <div className="grid grid-cols-1 gap-1.5">
              {localizedTags.seasons.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSeason(s.id)}
                  className={`px-3 py-2 text-xs rounded-xl font-medium text-left cursor-pointer transition-all flex items-center justify-between ${
                    selectedSeason === s.id
                      ? 'bg-[#E8C4A0]/30 text-[#1A1A2E] dark:text-[#E8C4A0] font-semibold'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/20'
                  }`}
                >
                  <span>{s.name}</span>
                  {selectedSeason === s.id && <span className="w-1.5 h-1.5 bg-[#C9A96E] rounded-full" />}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Group: Occasion / Vibe */}
          <div className="mb-6">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 block mb-2">
              {localizedTags.occasionLabel}
            </label>
            <select
              value={selectedOccasion}
              onChange={(e) => setSelectedOccasion(e.target.value)}
              className="w-full bg-[#FAF7F4] dark:bg-[#1A1A2E]/50 border border-[#E8C4A0]/40 rounded-xl px-3 py-2 text-xs text-[#2D2D2D] dark:text-white"
            >
              {occasions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Group: Body Silhouette */}
          <div className="mb-6">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 block mb-2">
              {localizedTags.bodyTypeLabel}
            </label>
            <div className="grid grid-cols-1 gap-1.5">
              {localizedTags.bodyTypes.map((bt) => (
                <button
                  key={bt.id}
                  onClick={() => setSelectedBodyType(bt.id)}
                  className={`px-3 py-2 text-xs rounded-xl font-medium text-left cursor-pointer transition-all flex items-center justify-between ${
                    selectedBodyType === bt.id
                      ? 'bg-[#E8C4A0]/30 text-[#1A1A2E] dark:text-[#E8C4A0] font-semibold'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/20'
                  }`}
                >
                  <span>{bt.name}</span>
                  {selectedBodyType === bt.id && <span className="w-1.5 h-1.5 bg-[#C9A96E] rounded-full" />}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Group: Budget */}
          <div className="mb-6">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 block mb-2">
              {localizedTags.budgetLabel}
            </label>
            <div className="grid grid-cols-1 gap-1.5">
              {localizedTags.budgets.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBudget(b.id)}
                  className={`px-3 py-2 text-xs rounded-xl font-medium text-left cursor-pointer transition-all flex items-center justify-between ${
                    selectedBudget === b.id
                      ? 'bg-[#E8C4A0]/30 text-[#1A1A2E] dark:text-[#E8C4A0] font-semibold'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/20'
                  }`}
                >
                  <span>{b.name}</span>
                  {selectedBudget === b.id && <span className="w-1.5 h-1.5 bg-[#C9A96E] rounded-full" />}
                </button>
              ))}
            </div>
          </div>

          {/* Ad Placement: Rectangle Ad inside filtering Column */}
          <div className="mt-8 border-t border-gray-100 dark:border-gray-800 pt-6">
            <AdZone type="rectangle" language={language} />
          </div>
        </aside>

        {/* Pinterest Masonry Grid */}
        <main className="lg:col-span-3">
          {displayedOutfits.length === 0 ? (
            <div className="py-16 text-center border border-dashed border-[#E8C4A0]/50 rounded-2xl bg-white dark:bg-[#1A1A2E]/10 p-8">
              <AlertCircle className="w-12 h-12 text-[#C9A96E] mx-auto mb-4" />
              <h3 className="font-serif text-lg font-bold text-[#1A1A2E] dark:text-white">
                {localizedTags.noResults}
              </h3>
              <p className="text-xs text-gray-500 mt-2">
                {localizedTags.noResultsSub}
              </p>
              <button
                onClick={handleReset}
                className="mt-6 px-4 py-2.5 bg-[#1A1A2E] dark:bg-[#C9A96E] text-white dark:text-[#1A1A2E] text-xs font-semibold rounded-xl cursor-pointer"
              >
                {localizedTags.resetLabel}
              </button>
            </div>
          ) : (
            <div className="masonry-columns">
              {displayedOutfits.map((outfit, index) => {
                const outfitTitle = isAr ? outfit.titleAr : outfit.title;
                const outfitDesc = isAr ? outfit.descriptionAr : outfit.description;

                return (
                  <React.Fragment key={outfit.id}>
                    <div
                      onClick={() => viewOutfit(outfit)}
                      className="masonry-item group bg-white dark:bg-[#1A1A2E]/30 rounded-2xl overflow-hidden border border-[#E8C4A0]/20 shadow-sm hover:shadow-lg transition-all duration-300 relative cursor-pointer"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={outfit.imageUrl}
                          alt={outfitTitle}
                          referrerPolicy="no-referrer"
                          className="w-full object-cover rounded-t-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <span className="absolute top-3 left-3 bg-[#1A1A2E] text-white dark:bg-[#C9A96E] dark:text-[#1A1A2E] text-[8px] font-bold tracking-widest px-2 py-0.5 rounded uppercase">
                          {outfit.season.toUpperCase()}
                        </span>
                      </div>

                      <div className="p-4">
                        <h4 className="font-serif text-sm sm:text-base font-bold text-[#1A1A2E] dark:text-white line-clamp-1 leading-snug group-hover:text-[#C9A96E] transition-colors">
                          {outfitTitle}
                        </h4>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 mt-2 leading-relaxed">
                          {outfitDesc}
                        </p>

                        <div className="flex flex-wrap gap-1 mt-3">
                          {(isAr ? outfit.tagsAr : outfit.tags).slice(0, 2).map((tag, i) => (
                            <span key={i} className="text-[9px] bg-gray-50 dark:bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-3 mt-4 text-[10px] text-gray-400">
                          <span className="font-medium text-[#C9A96E]">
                            {isAr ? outfit.occasionAr : outfit.occasion}
                          </span>
                          <span className="flex items-center gap-1 font-mono">
                            <Heart className="w-3 h-3 text-red-400 fill-current" />
                            {outfit.likes}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Ad banner embedded after exactly 4 cards dynamically */}
                    {index === 3 && (
                      <div className="masonry-item">
                        <AdZone type="rectangle" language={language} />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}

          {/* Infinite Scroll sentinel and skeletal loading effect */}
          {loadedCount < allFilteredOutfits.length && (
            <div ref={scrollSentinelRef} className="py-12 flex flex-col items-center justify-center">
              {loadingMore ? (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {[1, 2].map((n) => (
                    <div key={n} className="border border-gray-100 dark:border-gray-800 rounded-2xl bg-white dark:bg-[#1A1A2E]/20 p-4 shadow-sm animate-pulse">
                      <div className="w-full h-64 bg-gray-200 dark:bg-gray-800 rounded-xl shimmer" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg w-2/3 mt-4 shimmer" />
                      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-lg w-1/2 mt-2 shimmer" />
                    </div>
                  ))}
                </div>
              ) : (
                <button
                  onClick={() => setLoadedCount(prev => Math.min(prev + 4, allFilteredOutfits.length))}
                  className="px-6 py-3 border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#1A1A2E] rounded-xl text-xs font-bold transition-all transform hover:scale-105 cursor-pointer"
                >
                  {localizedTags.loadMoreLabel}
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
