import React, { useState } from 'react';
import { Language, WardrobeItem, Outfit, Page } from '../types';
import { SAMPLE_WARDROBE_ITEMS } from '../data';
import { Sparkles, Upload, Check, Compass, AlertCircle, ShoppingBag, Shirt, Plus, Trash2, ArrowRight, User, HelpCircle } from 'lucide-react';
import AdZone from './AdZone';

interface AIOutfitBuilderProps {
  language: Language;
  setCurrentPage?: (page: Page) => void;
  setSelectedOutfit?: (outfit: Outfit) => void;
}

interface CoordinatedOption {
  shirtId: string;
  trouserId: string;
  title: string;
  colorsTheory: string;
  accessoriesSuggestion: string[];
  stylingTips: string;
  occasion: string;
  modelPrompt: string;
}

export default function AIOutfitBuilder({ 
  language,
  setCurrentPage,
  setSelectedOutfit
}: AIOutfitBuilderProps) {
  const isAr = language === 'ar';

  const handleViewDynamicDetail = (
    chosenOption: CoordinatedOption | null, 
    optShirt: WardrobeItem | null, 
    optTrouser: WardrobeItem | null
  ) => {
    if (!setCurrentPage || !setSelectedOutfit || !chosenOption) return;

    const dynamicOutfit: Outfit = {
      id: `dynamic-${chosenOption.shirtId}-${chosenOption.trouserId}`,
      title: chosenOption.title,
      titleAr: isAr ? `تنسيق مخصص: ${chosenOption.title}` : `Bespoke Outfit: ${chosenOption.title}`,
      description: chosenOption.stylingTips,
      descriptionAr: isAr ? `نصيحة وخبرة التنسيق: ${chosenOption.stylingTips}` : `Stylist Commentary: ${chosenOption.stylingTips}`,
      category: 'casual',
      imageUrl: optShirt?.imageUrl || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
      tags: ['AI Coordinated', 'Your Closet', 'Bespoke Match'],
      tagsAr: ['تنسيق مخصص الذكاء الاصطناعي', 'خزانتك الخاصة', 'مطابقة مثالية'],
      items: {
        top: optShirt ? optShirt.name : 'Custom Selected Shirt',
        bottom: optTrouser ? optTrouser.name : 'Custom Selected Trouser',
        shoes: 'Italian Suede Loafers or Premium Slides',
        accessories: chosenOption.accessoriesSuggestion
      },
      itemsAr: {
        top: optShirt ? optShirt.nameAr : 'القميص المختار',
        bottom: optTrouser ? optTrouser.nameAr : 'البنطال المختار',
        shoes: 'حذاء شمواه شرقي مريح أو صندل ناعم خفيف',
        accessories: chosenOption.accessoriesSuggestion.map(a => a)
      },
      likes: 182,
      season: 'summer',
      bodyType: 'average',
      budget: 'medium',
      occasion: chosenOption.occasion,
      occasionAr: isAr ? `مناسبتك المقترحة: ${chosenOption.occasion}` : `Suggested Occasion: ${chosenOption.occasion}`
    };

    setSelectedOutfit(dynamicOutfit);
    setCurrentPage('outfit-detail');
  };

  // State for user's audited/added wardrobe items (starting pre-populated with a few templates for immediate play)
  const [addedShirts, setAddedShirts] = useState<WardrobeItem[]>([
    SAMPLE_WARDROBE_ITEMS[0], // Sage Linen Resort
    SAMPLE_WARDROBE_ITEMS[1], // Vanilla Silk knit polo
  ]);
  const [addedTrousers, setAddedTrousers] = useState<WardrobeItem[]>([
    SAMPLE_WARDROBE_ITEMS[5] || SAMPLE_WARDROBE_ITEMS[0], // Pleated sand
    SAMPLE_WARDROBE_ITEMS[6] || SAMPLE_WARDROBE_ITEMS[1], // Tailored Graphite
  ]);

  // Upload/Input states for custom items
  const [customName, setCustomName] = useState<string>('');
  const [customColor, setCustomColor] = useState<string>('#FFFFFF');
  const [customColorName, setCustomColorName] = useState<string>('Custom Hue');
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [customImageBase64, setCustomImageBase64] = useState<string | null>(null);
  const [customCategory, setCustomCategory] = useState<'shirt' | 'trouser'>('shirt');

  // Interactive style vibes
  const styleVibes = [
    { id: 'Casual', label: 'Casual Levant Resort', labelAr: 'كاجوال رملي مريح' },
    { id: 'Formal', label: 'Riyadh Business Formal', labelAr: 'أعمال رسمي فاخر' },
    { id: 'Majlis', label: 'Majestic Evening Majlis', labelAr: 'مجالس وأمسيات فخمة' },
    { id: 'Sport', label: 'Dubai Marina Street Minimal', labelAr: 'رياضي مبسط هادئ' },
    { id: 'Modest', label: 'Modest Traditional Fusion', labelAr: 'البشت الأصيل المعاصر' }
  ];
  const [selectedStyle, setSelectedStyle] = useState<string>('Casual');

  // Compilation and generation states
  const [loading, setLoading] = useState<boolean>(false);
  const [coordinatedOptions, setCoordinatedOptions] = useState<CoordinatedOption[] | null>(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);

  // Pre-configured templates to browse and add
  const templates = SAMPLE_WARDROBE_ITEMS;

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setCustomImage(base64String);
      setCustomImageBase64(base64String.split(',')[1]);
      if (!customName) {
        setCustomName(file.name.replace(/\.[^/.]+$/, ""));
      }
    };
    reader.readAsDataURL(file);
  };

  const addCustomItem = () => {
    if (!customImage) {
      setErrorText(isAr ? 'يرجى تحميل صورة قطعة الملابس أولاً.' : 'Please upload an image first.');
      return;
    }
    const name = customName.trim() || (customCategory === 'shirt' ? 'My Custom Shirt' : 'My Custom Trouser');
    
    const newItem: WardrobeItem = {
      id: `custom-${Date.now()}`,
      name: name,
      nameAr: isAr ? `ملابس مخصصة: ${name}` : name,
      category: customCategory,
      color: customColor,
      colorName: customColorName,
      colorNameAr: isAr ? `درجة مخصصة: ${customColorName}` : customColorName,
      imageUrl: customImage,
      type: 'Bespoke Custom',
      typeAr: 'تفصيل خاص مميز'
    };

    if (customCategory === 'shirt') {
      setAddedShirts([...addedShirts, newItem]);
    } else {
      setAddedTrousers([...addedTrousers, newItem]);
    }

    // Reset fields
    setCustomName('');
    setCustomImage(null);
    setCustomImageBase64(null);
    setErrorText(null);
  };

  const removeItem = (id: string, category: 'shirt' | 'trouser') => {
    if (category === 'shirt') {
      setAddedShirts(addedShirts.filter(item => item.id !== id));
    } else {
      setAddedTrousers(addedTrousers.filter(item => item.id !== id));
    }
    // Clean states dependent
    setCoordinatedOptions(null);
    setSelectedOptionIndex(null);
  };

  const addItemFromTemplates = (item: WardrobeItem) => {
    if (item.category === 'shirt') {
      if (addedShirts.some(s => s.id === item.id)) return;
      setAddedShirts([...addedShirts, item]);
    } else {
      if (addedTrousers.some(t => t.id === item.id)) return;
      setAddedTrousers([...addedTrousers, item]);
    }
    // Reset output
    setCoordinatedOptions(null);
    setSelectedOptionIndex(null);
  };

  const generateLocalFallbacks = (shirtsList: WardrobeItem[], trousersList: WardrobeItem[], style: string): CoordinatedOption[] => {
    const firstShirt = shirtsList[0];
    const secondShirt = shirtsList[1] || shirtsList[0];
    const firstTrouser = trousersList[0];
    const secondTrouser = trousersList[1] || trousersList[0];

    const fallbackOptions: CoordinatedOption[] = [
      {
        shirtId: firstShirt.id,
        trouserId: firstTrouser.id,
        title: isAr 
          ? `التنسيق الأساسي: هيبة الـ ${isAr ? firstShirt.nameAr : firstShirt.name}` 
          : `Match A: The ${firstShirt.name} Legacy`,
        colorsTheory: isAr 
          ? `انسجام رائع بين اللون الـ ${firstShirt.colorNameAr} للقميص والـ ${firstTrouser.colorNameAr} للبنطال، ملائماً لأجواء الصيف في عواصم الخليج الكبرى.`
          : `Stunning organic dialogue between the ${firstShirt.colorName} upper and the ${firstTrouser.colorName} lower creating an incredibly well-balanced, GCC-weather approved palette.`,
        accessoriesSuggestion: isAr 
          ? ['ساعة كلاسيكية ذات قرص ذهبي', 'سبحة من خشب الصندل العطري', 'لوفر جلدي مريح']
          : ['Fine Gold Dial Dress Wristwatch', 'Tasbih made of aromatic Sandalwood', 'Elegant minimalist leather loafers'],
        stylingTips: isAr 
          ? 'يوصى بارتداء القميص مدسوساً قليلاً مع حزام جلدي مبسط، والياقة مفتوحة لمظهر مريح وأصيل.'
          : 'Roll the sleeves slightly up to the mid-forearm, keep the collar relaxed, and tuck with a contrast sand-nude woven leather belt.',
        occasion: isAr ? 'مجالس القهوة الصباحية وطلعات نهاية الأسبوع' : 'High-profile afternoon lounges and premium majlis gatherings.',
        modelPrompt: `Detailed full-body editorial fashion photograph of a handsome Arab man wearing a ${firstShirt.colorName} ${firstShirt.name} with ${firstTrouser.colorName} ${firstTrouser.name}, standing in Riyadh desert dune sunset, realistic lighting, professional Vogue style, 4k`
      },
      {
        shirtId: secondShirt.id,
        trouserId: secondTrouser.id,
        title: isAr 
          ? `التنسيق البديل: رونق الـ ${isAr ? secondShirt.nameAr : secondShirt.name}` 
          : `Match B: The ${secondShirt.name} Radiance`,
        colorsTheory: isAr 
          ? `مزيج رائع يدمج طبقات الـ ${secondShirt.colorNameAr} والأرضيات التراثية بلون ${secondTrouser.colorNameAr} لمظهر يفيض ثقة.`
          : `Bespoke visual gradient. The contrast between ${secondShirt.colorName} on top and ${secondTrouser.colorName} on bottom forms a rich, highly curated editorial presentation.`,
        accessoriesSuggestion: isAr 
          ? ['نظارة شمسية ذات إطار عسلي دافئ', 'طقم بروش فضي ناعم', 'عطر برائحة العود الفاخر']
          : ['Honey-toned acetated classic sunglasses', 'Silver Calligraphy suit pin', 'Premium Agarwood/Oud olfactory aura'],
        stylingTips: isAr 
          ? 'تصفيف ممتاز يفضل ارتداء القميص منفرداً لإبراز خامة القماش، مع حذاء شرقي أصيل.'
          : 'Leave untucked if the fabric is lightweight linen, pairing it with high-end handmade Arab leather sandals.',
        occasion: isAr ? 'أمسيات المطاعم الرائعة في دبي والمنامة' : 'Cozy weekend dinners in Dubai Marina or Al-Ula nights.',
        modelPrompt: `Detailed full-body editorial fashion photograph of a handsome Arab man wearing a ${secondShirt.colorName} ${secondShirt.name} with ${secondTrouser.colorName} ${secondTrouser.name}, standing in a modern luxury GCC lounge, realistic lighting, professional Vogue style, 4k`
      }
    ];

    return fallbackOptions;
  };

  const handleCoordinateOutfits = async () => {
    if (addedShirts.length === 0 || addedTrousers.length === 0) {
      setErrorText(isAr 
        ? 'الرجاء إضافة قميص واحد وبنطال واحد على الأقل لكوكبة ملابسك للبدء.' 
        : 'Please ensure you have added at least one shirt and one trouser to compile combinations.'
      );
      return;
    }

    setLoading(true);
    setErrorText(null);
    setCoordinatedOptions(null);
    setSelectedOptionIndex(null);

    try {
      const response = await fetch('/api/generate-outfit-options', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shirts: addedShirts.map(s => ({
            id: s.id,
            name: s.name,
            colorName: s.colorName,
            type: s.type
          })),
          trousers: addedTrousers.map(t => ({
            id: t.id,
            name: t.name,
            colorName: t.colorName,
            type: t.type
          })),
          style: selectedStyle,
          language
        })
      });

      const data = await response.json();
      if (data.status === 'success' && data.options && data.options.length >= 2) {
        setCoordinatedOptions(data.options);
      } else {
        // Fallback to beautiful local heuristic matching
        setCoordinatedOptions(generateLocalFallbacks(addedShirts, addedTrousers, selectedStyle));
      }
    } catch (err) {
      console.warn('Compilation API error, loading local matching engine fallbacks', err);
      setCoordinatedOptions(generateLocalFallbacks(addedShirts, addedTrousers, selectedStyle));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all">
      {/* 1. Header & Dynamic Intro */}
      <div className="text-center max-w-3xl mx-auto mt-6 mb-10">
        <span className="px-3 py-1 bg-[#C9A96E]/20 text-[#C9A96E] dark:text-[#E8C4A0] text-[10px] tracking-widest uppercase rounded-full inline-block font-extrabold mb-3">
          ⚜ {isAr ? 'خزانة التنسيق الثنائية الذكية' : 'BESPOKE DOUBLE-OUTFIT ALGORITHMIC LAB'} ⚜
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#1A1A2E] dark:text-white tracking-tight leading-none">
          {isAr ? 'منسق خزانة الملابس المزدوج' : 'Dynamic Multi-Outfit Stylist'}
        </h1>
        <p className="mt-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-sans leading-relaxed">
          {isAr 
            ? 'قم بتجميع وتصفح قطع قمصانك وسراويلك الخاصة، ثم اختر النمط المفضل لديك ليقوم الذكاء الاصطناعي برسم واقتراح أفضل خيارين متناسقين وتركيبهما لتعرضهما فورياً على عارض واقعي.' 
            : 'Build your custom active wardrobe pool. Browse and add multi-garments, select your style theme, review the top 2 generated combinations, choose your favorite option, and render a photo-quality model wearing it.'}
        </p>
      </div>

      {/* Grid: 2 columns - Left: Wardrobe Pool Builder | Right: Template Catalog */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        {/* LEFT COLUMN: ACTIVE WARDROBE LAB */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-[#1A1A2E]/30 border border-[#E8C4A0]/25 rounded-2xl p-6 shadow-sm">
            
            <h3 className="font-serif text-base font-bold text-[#1A1A2E] dark:text-white mb-2 flex items-center gap-2">
              <Shirt className="w-5 h-5 text-[#C9A96E]" />
              <span>{isAr ? 'حقيبة ملابسك المفعلة' : 'Your Audited Active Pool'}</span>
            </h3>
            <p className="text-[11px] text-gray-400 mb-6 font-sans">
              {isAr 
                ? 'أضف ما تشاء من قطع لتتم المقارنة الثنائية والمطابقة الفورية بينها.' 
                : 'Garments added here are used to synthesise and generate the best 2 combinations.'}
            </p>

            <div className="space-y-6">
              {/* SHIRTS ROW */}
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-3">
                  {isAr ? 'القمصان والقطع العلوية المضافة' : '1. Added Upper Pieces (Shirts)'} ({addedShirts.length})
                </span>
                {addedShirts.length === 0 ? (
                  <div className="border border-dashed border-gray-150 dark:border-gray-800 p-6 rounded-xl text-center text-xs text-gray-400">
                    {isAr ? 'حقيبة القمصان فارغة حالياً' : 'No upper garments added yet. Click templates below or upload own.'}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {addedShirts.map((s) => (
                      <div key={s.id} className="flex items-center justify-between p-2.5 border border-gray-100 dark:border-gray-800 bg-[#FAF7F4] dark:bg-[#12121e]/40 rounded-xl">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img src={s.imageUrl} alt={s.name} referrerPolicy="no-referrer" className="w-10 h-10 rounded-lg object-cover bg-gray-50 shrink-0" />
                          <div className="min-w-0">
                            <h4 className="text-[11px] font-bold text-[#1A1A2E] dark:text-white truncate">
                              {isAr ? s.nameAr : s.name}
                            </h4>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="w-2.5 h-2.5 rounded-full border border-gray-200 shrink-0" style={{ backgroundColor: s.color }} />
                              <span className="text-[10px] text-gray-500 truncate">
                                {isAr ? s.colorNameAr : s.colorName}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(s.id, 'shirt')}
                          className="p-1 px-2.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg text-xs transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* TROUSERS ROW */}
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-3">
                  {isAr ? 'البناطيل والسروايل المضافة' : '2. Added Lower Pieces (Trousers)'} ({addedTrousers.length})
                </span>
                {addedTrousers.length === 0 ? (
                  <div className="border border-dashed border-gray-150 dark:border-gray-800 p-6 rounded-xl text-center text-xs text-gray-400">
                    {isAr ? 'حقيبة السراويل فارغة حالياً' : 'No trousers added yet. Select template or upload to register.'}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {addedTrousers.map((t) => (
                      <div key={t.id} className="flex items-center justify-between p-2.5 border border-gray-100 dark:border-gray-800 bg-[#FAF7F4] dark:bg-[#12121e]/40 rounded-xl">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img src={t.imageUrl} alt={t.name} referrerPolicy="no-referrer" className="w-10 h-10 rounded-lg object-cover bg-gray-50 shrink-0" />
                          <div className="min-w-0">
                            <h4 className="text-[11px] font-bold text-[#1A1A2E] dark:text-white truncate">
                              {isAr ? t.nameAr : t.name}
                            </h4>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="w-2.5 h-2.5 rounded-full border border-gray-200 shrink-0" style={{ backgroundColor: t.color }} />
                              <span className="text-[10px] text-gray-500 truncate">
                                {isAr ? t.colorNameAr : t.colorName}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(t.id, 'trouser')}
                          className="p-1 px-2.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg text-xs transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* CUSTOM FILE UPLOADER & DESIGN AGENT */}
          <div className="bg-white dark:bg-[#1A1A2E]/30 border border-[#E8C4A0]/20 rounded-2xl p-6 shadow-sm">
            <h4 className="font-serif text-sm font-bold text-[#1A1A2E] dark:text-white mb-3">
              ➕ {isAr ? 'جرف وصياغة قطعة مخصصة' : 'Upload Own Bespoke Garment'}
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                  {isAr ? 'نوع القطعة' : 'Garment Classification'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setCustomCategory('shirt')}
                    className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      customCategory === 'shirt'
                        ? 'bg-[#1A1A2E] text-white border-[#1A1A2E] dark:bg-[#C9A96E] dark:text-black dark:border-[#C9A96E]'
                        : 'bg-transparent border-gray-200 text-gray-500 hover:border-[#E8C4A0]'
                    }`}
                  >
                    {isAr ? 'قطعة علوية' : 'Upper (Shirt)'}
                  </button>
                  <button
                    onClick={() => setCustomCategory('trouser')}
                    className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      customCategory === 'trouser'
                        ? 'bg-[#1A1A2E] text-white border-[#1A1A2E] dark:bg-[#C9A96E] dark:text-black dark:border-[#C9A96E]'
                        : 'bg-transparent border-gray-200 text-gray-500 hover:border-[#E8C4A0]'
                    }`}
                  >
                    {isAr ? 'قطعة سفلية' : 'Lower (Trouser)'}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                  {isAr ? 'اسم ومواصفات القطعة' : 'Garment Tag Name'}
                </label>
                <input
                  type="text"
                  placeholder={isAr ? 'مثال: قميص كتان أبيض' : 'e.g. Vintage Silk Shirt'}
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full p-2 text-xs border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent focus:ring-1 focus:ring-[#C9A96E] outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                  {isAr ? 'اسم اللون' : 'Color Description'}
                </label>
                <input
                  type="text"
                  placeholder={isAr ? 'مثال: عاجي دافي' : 'e.g. Sand Nude'}
                  value={customColorName}
                  onChange={(e) => setCustomColorName(e.target.value)}
                  className="w-full p-2 text-xs border border-gray-200 dark:border-gray-800 rounded-xl bg-transparent focus:ring-1 focus:ring-[#C9A96E] outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1 anchor">
                  {isAr ? 'لوحة الألوان' : 'Color Picker Hue'}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0"
                  />
                  <span className="text-xs font-mono text-gray-400 uppercase">{customColor}</span>
                </div>
              </div>
            </div>

            {/* Drag & drop file capture field */}
            <div className="mt-4">
              {customImage ? (
                <div className="relative aspect-[16/9] border border-[#E8C4A0]/40 rounded-xl overflow-hidden flex items-center justify-center bg-gray-50">
                  <img src={customImage} alt="Custom uploaded upper garment" className="max-h-full max-w-full object-contain" />
                  <button
                    onClick={() => { setCustomImage(null); setCustomImageBase64(null); }}
                    className="absolute top-2 right-2 p-1 px-2.5 bg-black text-white hover:bg-red-500 rounded-lg text-xs"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed border-[#E8C4A0]/40 hover:border-[#C9A96E] transition-colors rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer">
                  <Upload className="w-7 h-7 text-[#C9A96E] mb-2" />
                  <span className="text-xs text-[#1A1A2E] dark:text-white font-semibold">
                    {isAr ? 'اضغط لتحميل اللقطة' : 'Drag & drop cloth picture, or browse'}
                  </span>
                  <input type="file" accept="image/*" onChange={handleCustomUpload} className="hidden" />
                </label>
              )}
            </div>

            <button
              onClick={addCustomItem}
              disabled={!customImage}
              className="mt-4 w-full p-3 bg-[#1A1A2E] dark:bg-[#C9A96E] hover:bg-[#C9A96E] dark:hover:bg-[#E8C4A0] text-white dark:text-[#1A1A2E] font-bold text-xs rounded-xl tracking-wider transition-colors disabled:opacity-50 cursor-pointer text-center"
            >
              ⚜ {isAr ? 'تسجيل القطعة في خزانة ملابسي' : 'Upload & Add to Active Collection'}
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: REVELATION TEMPLATE CLOSETS */}
        <div className="lg:col-span-5 bg-white dark:bg-[#1A1A2E]/30 border border-[#E8C4A0]/25 rounded-2xl p-6 shadow-sm">
          <h3 className="font-serif text-base font-bold text-[#1A1A2E] dark:text-white mb-1">
            ✨ {isAr ? 'كتالوج عينات التنسيق السريع' : 'High-End Template Repository'}
          </h3>
          <p className="text-[11px] text-gray-400 mb-5 font-sans">
            {isAr ? 'تصفح بضغطة زر وأضف قمصاناً وبناطيلاً فاخرة لتركيبها فورياً.' : 'Browse custom premium designs. Add them to your active pool instantly.'}
          </p>

          <div className="space-y-6 max-h-[750px] overflow-y-auto pr-2 custom-scrollbar">
            
            {/* Template Shirts */}
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block mb-2 tracking-widest pl-1">
                👕 {isAr ? 'قمصان المنسق الفاخرة' : 'Bespoke Upper Templates'}
              </span>
              <div className="space-y-2.5">
                {templates.filter(i => i.category === 'shirt').map((item) => {
                  const alreadyAdded = addedShirts.some(s => s.id === item.id);
                  return (
                    <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50/50 dark:bg-gray-800/20 border border-gray-100 dark:border-gray-850 rounded-xl relative">
                      <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded-lg bg-gray-100" />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-[11px] font-bold text-[#1A1A2E] dark:text-white truncate">
                          {isAr ? item.nameAr : item.name}
                        </h4>
                        <span className="text-[9px] text-[#C9A96E] font-medium block">
                          {isAr ? item.colorNameAr : item.colorName} • {isAr ? item.typeAr : item.type}
                        </span>
                      </div>
                      <button
                        onClick={() => addItemFromTemplates(item)}
                        disabled={alreadyAdded}
                        className={`p-1.5 px-3 rounded-lg text-[10px] font-bold tracking-wider transition-all cursor-pointer ${
                          alreadyAdded 
                            ? 'bg-green-500/20 text-green-600 dark:text-green-400' 
                            : 'bg-[#C9A96E]/20 text-[#C9A96E] hover:bg-[#C9A96E]/30'
                        }`}
                      >
                        {alreadyAdded ? '✓' : <Plus className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Template Trousers */}
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block mb-2 tracking-widest pl-1">
                👖 {isAr ? 'سراويل وشينو للتجربة' : 'Bespoke Lower Templates'}
              </span>
              <div className="space-y-2.5">
                {templates.filter(i => i.category === 'trouser').map((item) => {
                  const alreadyAdded = addedTrousers.some(s => s.id === item.id);
                  return (
                    <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50/50 dark:bg-gray-800/20 border border-gray-100 dark:border-gray-850 rounded-xl relative">
                      <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded-lg bg-gray-100" />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-[11px] font-bold text-[#1A1A2E] dark:text-white truncate">
                          {isAr ? item.nameAr : item.name}
                        </h4>
                        <span className="text-[9px] text-[#C9A96E] font-medium block">
                          {isAr ? item.colorNameAr : item.colorName} • {isAr ? item.typeAr : item.type}
                        </span>
                      </div>
                      <button
                        onClick={() => addItemFromTemplates(item)}
                        disabled={alreadyAdded}
                        className={`p-1.5 px-3 rounded-lg text-[10px] font-bold tracking-wider transition-all cursor-pointer ${
                          alreadyAdded 
                            ? 'bg-green-500/20 text-green-600 dark:text-green-400' 
                            : 'bg-[#C9A96E]/20 text-[#C9A96E] hover:bg-[#C9A96E]/30'
                        }`}
                      >
                        {alreadyAdded ? '✓' : <Plus className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* STYLE VIBE SELECTOR CARD */}
      <section className="max-w-5xl mx-auto border border-[#E8C4A0]/25 rounded-2xl p-6 bg-[#FAF7F4] dark:bg-[#1A1A2E]/20 mb-8 shadow-sm">
        <h4 className="font-serif text-sm font-bold text-[#1A1A2E] dark:text-white mb-2 text-center">
          ⚜ {isAr ? 'تحت أي أسلوب ترغب في المواءمة والتنسيق؟' : 'Select Your Intended Styling Vibe'} ⚜
        </h4>
        <p className="text-[11px] text-gray-500 mx-auto text-center max-w-sm mb-6">
          {isAr ? 'سيقوم نظام الميزان الذكي بحساب تراكب الألوان بما يلائم طبيعة هذه المناسبة.' : 'Our AI coordinates fabrics, tailoring drapes and accents catering to this theme.'}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {styleVibes.map((v) => (
            <div
              key={v.id}
              onClick={() => { setSelectedStyle(v.id); setCoordinatedOptions(null); setSelectedOptionIndex(null); }}
              className={`p-3 border rounded-xl text-center cursor-pointer transition-all hover:scale-103 flex flex-col justify-between h-20 ${
                selectedStyle === v.id
                  ? 'border-[#C9A96E] ring-2 ring-[#C9A96E]/25 bg-[#C9A96E]/10 dark:bg-[#C9A96E]/5 text-[#1A1A2E] dark:text-[#E8C4A0]'
                  : 'border-gray-100 bg-white dark:bg-[#1E1E2F] hover:border-[#E8C4A0] text-gray-600 dark:text-gray-300'
              }`}
            >
              <span className="text-[10px] font-extrabold uppercase tracking-widest block text-gray-400">
                {selectedStyle === v.id ? '✨ ACTIVE ✨' : 'VIBE'}
              </span>
              <span className="text-[11px] font-sans font-bold leading-tight mt-1 truncate">
                {language === 'ar' ? v.labelAr : v.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE COORDINATOR CTA */}
      <div className="text-center max-w-xl mx-auto my-8">
        <button
          onClick={handleCoordinateOutfits}
          disabled={loading || addedShirts.length === 0 || addedTrousers.length === 0}
          className="px-8 py-4 bg-[#1A1A2E] dark:bg-[#C9A96E] hover:bg-[#C9A96E] dark:hover:bg-[#E8C4A0] text-white dark:text-[#1A1A2E] font-bold text-xs sm:text-sm rounded-xl tracking-widest uppercase transition-all disabled:opacity-40 flex items-center justify-center gap-2.5 cursor-pointer shadow-lg w-full"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isAr ? 'صياغة وعرض أفضل خيارين متطابقين (AI)' : 'Compose Best 2 Styling Matches (AI Mode)'}</span>
        </button>
      </div>

      {errorText && (
        <div className="max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2 mb-8">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorText}</span>
        </div>
      )}

      {/* LOADER BLOCKS */}
      {loading && (
        <div className="max-w-4xl mx-auto py-14 text-center bg-white dark:bg-[#12121e]/40 p-8 rounded-2xl border border-dashed border-[#C9A96E]/50 animate-pulse">
          <div className="w-14 h-14 bg-[#C9A96E]/20 text-[#C9A96E] font-black rounded-full flex items-center justify-center mx-auto mb-4 scale-105 animate-spin">
            ⏳
          </div>
          <h4 className="font-serif text-sm font-bold text-[#1A1A2E] dark:text-white">
            {isAr ? 'تقوم العقول الكونية بمطابقة الأقمشة والتطاريز الفخمة لعام ٢٠٢٦...' : 'Running generative algorithms matching textile coordinates...'}
          </h4>
          <p className="text-[10px] text-gray-500 mt-2 max-w-xs mx-auto">
            {isAr ? 'نقارن بين الأطوال، التباينات الهرمية وعقود الموضة الجارية في مجالس دبي وجدة.' : 'Filtering sand gradients and accessory matching sets curated for Riyadh lifestyle.'}
          </p>
        </div>
      )}

      {/* TWO OPTIONS INTERFACE SEGMENT */}
      {coordinatedOptions && !loading && (
        <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
          
          <div className="text-center">
            <span className="px-2 py-0.5 bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400 text-[10px] font-extrabold rounded">
              🎯 {isAr ? 'تم حساب ومطابقة أفضل تنسيقين بنجاح' : 'BEST 2 HARMONIOUS OPTIONS SYNTHESIZED'}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A2E] dark:text-white mt-1">
              {isAr ? 'اختر التنسيق المفضل لديك لعرضه بالتفصيل' : 'Select Your Preferred Option to View Details'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {coordinatedOptions.map((opt, idx) => {
              // Locate active shirt & trouser details to show beautiful custom visuals in options
              const optShirt = addedShirts.find(s => s.id === opt.shirtId) || addedShirts[0];
              const optTrouser = addedTrousers.find(t => t.id === opt.trouserId) || addedTrousers[0];

              const isSelected = selectedOptionIndex === idx;

              return (
                <div
                  key={idx}
                  onClick={() => { setSelectedOptionIndex(idx); }}
                  className={`bg-white dark:bg-[#1A1A2E]/20 border rounded-2xl overflow-hidden p-6 shadow-sm transition-all text-left flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'border-[#C9A96E] ring-4 ring-[#C9A96E]/20 bg-[#FAF7F4] dark:bg-[#1A1A2E]/40'
                      : 'border-[#E8C4A0]/20 hover:border-[#C9A96E]/50'
                  }`}
                  dir={isAr ? 'rtl' : 'ltr'}
                >
                  <div className="space-y-4">
                    {/* Header bar */}
                    <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-800 pb-3">
                      <span className="px-3 py-1 bg-[#1A1A2E] dark:bg-[#C9A96E] text-white dark:text-[#1A1A2E] text-[10px] font-serif font-black rounded-full">
                        {isAr ? `الخيار المقترح ${idx + 1}` : `RECOMMENDED COMPOSITION ${idx + 1}`}
                      </span>
                      {isSelected && (
                        <span className="px-2 py-0.5 bg-green-500 text-white rounded text-[9px] font-bold tracking-widest flex items-center gap-1">
                          ✓ {isAr ? 'محدد' : 'SELECTED'}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-lg font-black text-[#1A1A2E] dark:text-white tracking-tight">
                      {opt.title}
                    </h3>

                    {/* Clothing match indicator */}
                    <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50/50 dark:bg-gray-800/20 border border-gray-100 dark:border-gray-800 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Shirt className="w-4 h-4 text-[#C9A96E] shrink-0" />
                        <div className="min-w-0">
                          <span className="text-[8px] uppercase tracking-wider text-gray-400 block">{isAr ? 'القميص المختلط' : 'Combined Top'}</span>
                          <span className="text-[10px] font-bold text-[#1A1A2E] dark:text-white truncate block">
                            {optShirt ? (isAr ? optShirt.nameAr : optShirt.name) : 'Bespoke shirt'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Compass className="w-4 h-4 text-[#C9A96E] shrink-0" />
                        <div className="min-w-0">
                          <span className="text-[8px] uppercase tracking-wider text-gray-400 block">{isAr ? 'سروال دقيق' : 'Combined Trouser'}</span>
                          <span className="text-[10px] font-bold text-[#1A1A2E] dark:text-white truncate block">
                            {optTrouser ? (isAr ? optTrouser.nameAr : optTrouser.name) : 'Bespoke trouser'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Details lists */}
                    <div className="space-y-3 font-sans text-xs">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-[#C9A96E] block mb-0.5">{isAr ? 'دراسة التناغم اللوني:' : 'Color Harmony Theory:'}</span>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[11px]">{opt.colorsTheory}</p>
                      </div>

                      <div>
                        <span className="text-[9px] uppercase font-bold text-[#C9A96E] block mb-1">{isAr ? 'المجوهرات والإكسسوارات المقترحة:' : 'Matching Accents & Accessories:'}</span>
                        <div className="flex flex-wrap gap-1.5">
                          {opt.accessoriesSuggestion.map((acc, sidx) => (
                            <span key={sidx} className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-[#2E2E3E] text-gray-700 dark:text-gray-300 py-0.5 px-2 rounded font-medium text-[10px]">
                              ⚜ {acc}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-[9px] uppercase font-bold text-[#C9A96E] block mb-0.5">{isAr ? 'توصيات التصفيف للظهور الأبهى:' : 'styling tips:'}</span>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[11px]">{opt.stylingTips}</p>
                      </div>

                      <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                        <span className="text-[9px] uppercase font-bold text-[#C9A96E] block mb-0.5">{isAr ? 'الملائمة لـ:' : 'best suited occasion / vibe:'}</span>
                        <p className="font-semibold text-[#1A1A2E] dark:text-[#E8C4A0] text-[11px]">{opt.occasion}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedOptionIndex(idx); }}
                      className={`w-full py-2.5 rounded-xl font-extrabold text-[11px] tracking-widest uppercase transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#1A1A2E] dark:bg-[#C9A96E] text-white dark:text-[#1A1A2E]'
                          : 'bg-transparent hover:bg-gray-50 border border-gray-200 text-gray-500'
                      }`}
                    >
                      {isSelected ? (isAr ? 'مجموعة محددة حالياً' : 'Current Option Chosen') : (isAr ? 'اختر طاقم الملابس هذا' : 'Select Handcrafted Option')}
                    </button>
                  </div>
                </div>
              );
            })}

          </div>

          {/* DYNAMIC SHOWROOM CANVASES DISPLAY */}
          {selectedOptionIndex !== null && (() => {
            const chosenOption = coordinatedOptions ? coordinatedOptions[selectedOptionIndex] : null;
            const optShirt = chosenOption ? addedShirts.find(s => s.id === chosenOption.shirtId) : null;
            const optTrouser = chosenOption ? addedTrousers.find(t => t.id === chosenOption.trouserId) : null;

            return (
              <div className="max-w-4xl mx-auto bg-white dark:bg-[#1A1A2E]/40 border border-[#E8C4A0]/25 rounded-2xl p-6 sm:p-10 shadow-lg mt-8 text-center animate-fadeIn duration-500">
                
                <div className="max-w-xl mx-auto mb-6">
                  <span className="px-2.5 py-1 bg-[#FAF7F4] dark:bg-[#12121e]/80 text-[#C9A96E] text-[9px] font-black tracking-widest rounded uppercase inline-block mb-3">
                    ⚜ {isAr ? 'استوديو التنسيق الرقمي لملابسك المحددة' : 'DIGITAL FLATLAY COORDINATION STUDIO'} ⚜
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#1A1A2E] dark:text-white mb-2">
                    {isAr 
                      ? `معاينة لقطة المظهر لـ "${chosenOption?.title}"`
                      : `Showroom Preview of "${chosenOption?.title}"`}
                  </h3>
                  <p className="text-[11px] text-gray-400 font-sans">
                    {isAr 
                      ? 'معاينة تفاعلية فورية ومتقاطعة لقطع الملابس المختارة.' 
                      : 'High-fidelity visual blueprint of your actual upper and lower selection styling together.'}
                  </p>
                </div>

                <div className="max-w-xl mx-auto">
                  <div className="relative w-full aspect-[3/4] bg-stone-50 dark:bg-zinc-950/40 rounded-xl border border-stone-200/50 dark:border-zinc-800 flex flex-col justify-between items-center p-6 overflow-hidden shadow-inner">
                    {/* Absolute elegant background accent */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C9A96E_1px,transparent_1px)] [background-size:16px_16px]" />
                    
                    {/* Elegant hanger design */}
                    <div className="w-full flex justify-center relative z-10 -mb-2">
                      <div className="w-16 h-12 border-t-2 border-r-2 border-[#C9A96E]/45 rounded-tr-xl flex justify-center items-end">
                        <div className="w-4 h-4 border-2 border-[#C9A96E]/50 rounded-full border-b-0 -mb-2" />
                      </div>
                    </div>

                    <div className="flex-1 w-full flex flex-col justify-center items-center gap-4 relative z-10">
                      {/* SHIRT BOX */}
                      <div className="w-48 sm:w-56 bg-white dark:bg-zinc-900 border border-stone-200/60 dark:border-zinc-800 p-3 rounded-xl shadow-md rotate-[-2deg] hover:rotate-0 transition-all duration-300 transform scale-100 hover:scale-105">
                        <div className="aspect-square w-full rounded-lg bg-stone-50 dark:bg-zinc-950 overflow-hidden relative">
                          {optShirt?.imageUrl ? (
                            <img 
                              src={optShirt.imageUrl} 
                              alt={isAr ? optShirt.nameAr : optShirt.name} 
                              className="w-full h-full object-contain"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                              <Shirt className="w-10 h-10" />
                            </div>
                          )}
                          <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-[#FAF7F4] dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded text-[8px] font-black tracking-widest text-[#C9A96E] uppercase">
                            {isAr ? 'الأعلى' : 'TOP'}
                          </span>
                        </div>
                        <div className="mt-2 text-center">
                          <h5 className="text-[10.5px] font-bold text-stone-800 dark:text-stone-100 truncate">
                            {isAr ? optShirt?.nameAr : optShirt?.name}
                          </h5>
                          <div className="flex items-center justify-center gap-1.5 mt-1">
                            <span className="w-2 h-2 rounded-full border border-stone-200" style={{ backgroundColor: optShirt?.color }} />
                            <span className="text-[9px] text-stone-500">
                              {isAr ? optShirt?.colorNameAr : optShirt?.colorName}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Dynamic golden stitching match line */}
                      <div className="flex flex-col items-center">
                        <div className="h-4 w-0.5 border-l border-dashed border-[#C9A96E]/40" />
                        <div className="w-5 h-5 bg-[#FAF7F4] dark:bg-zinc-900 rounded-full border border-[#C9A96E]/30 flex items-center justify-center text-[9px] text-[#C9A96E] shadow-sm font-black animate-pulse">
                          ✨
                        </div>
                        <div className="h-4 w-0.5 border-l border-dashed border-[#C9A96E]/40" />
                      </div>

                      {/* TROUSER BOX */}
                      <div className="w-48 sm:w-56 bg-white dark:bg-zinc-900 border border-stone-200/60 dark:border-zinc-800 p-3 rounded-xl shadow-md rotate-[2deg] hover:rotate-0 transition-all duration-300 transform scale-100 hover:scale-105">
                        <div className="aspect-square w-full rounded-lg bg-stone-50 dark:bg-zinc-950 overflow-hidden relative">
                          {optTrouser?.imageUrl ? (
                            <img 
                              src={optTrouser.imageUrl} 
                              alt={isAr ? optTrouser.nameAr : optTrouser.name} 
                              className="w-full h-full object-contain"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                              <Compass className="w-10 h-10" />
                            </div>
                          )}
                          <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-[#FAF7F4] dark:bg-[#12121e]/80 border border-stone-200 dark:border-zinc-800 rounded text-[8px] font-black tracking-widest text-[#C9A96E] uppercase">
                            {isAr ? 'الأسفل' : 'BOTTOM'}
                          </span>
                        </div>
                        <div className="mt-2 text-center">
                          <h5 className="text-[10.5px] font-bold text-stone-800 dark:text-stone-100 truncate">
                            {isAr ? optTrouser?.nameAr : optTrouser?.name}
                          </h5>
                          <div className="flex items-center justify-center gap-1.5 mt-1">
                            <span className="w-2 h-2 rounded-full border border-stone-200" style={{ backgroundColor: optTrouser?.color }} />
                            <span className="text-[9px] text-stone-500">
                              {isAr ? optTrouser?.colorNameAr : optTrouser?.colorName}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer tracking lines */}
                    <div className="w-full text-center mt-3 pt-3 border-t border-stone-200/40 dark:border-zinc-800/30 flex justify-between items-center text-[8px] text-stone-400 dark:text-zinc-500 font-sans tracking-widest">
                      <span>{isAr ? 'منسق فعال ومضمون ١٠٠٪' : 'ACTIVE PERSONAL OUTFIT'}</span>
                      <span>{isAr ? 'ستايل بورد ٢٠٢٦' : 'STYLEBOARD STUDIO 2026'}</span>
                    </div>
                  </div>

                  <div className="mt-4 p-4 border border-[#E8C4A0]/20 bg-[#FAF7F4]/50 dark:bg-[#12121e]/30 rounded-xl text-xs text-stone-600 dark:text-gray-300 font-sans leading-relaxed text-center">
                    🌟 {isAr 
                      ? 'هذه المعاينة تعرض بدقة صور ملابسك الحقيقية ومطابقتها الفورية معاً.'
                      : 'This showroom canvas displays the exact photos of your selected upper and lower pieces blended dynamically.'}
                  </div>

                  {setCurrentPage && setSelectedOutfit && (
                    <button
                      onClick={() => handleViewDynamicDetail(chosenOption, optShirt, optTrouser)}
                      className="mt-6 w-full py-4 bg-[#1A1A2E] hover:bg-[#C9A96E] text-white dark:bg-[#C9A96E] dark:hover:bg-[#E8C4A0] dark:text-[#1A1A2E] font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isAr ? 'عرض الصفحة التفصيلية الكاملة لتنسيقك الفردي ⚜' : 'View Full Details Page of Your Bespoke Combination ⚜'}</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })()}

        </div>
      )}

      {/* FOOTER AD SPACE INTEGRATED */}
      <div className="mt-14 pt-8">
        <AdZone type="in-feed" language={language} />
      </div>
    </div>
  );
}
