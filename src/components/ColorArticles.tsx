import React, { useState } from 'react';
import { Language } from '../types';
import { Sparkles, BookOpen, CheckCircle, Flame, Palette, HelpCircle } from 'lucide-react';
import AdZone from './AdZone';

interface ColorArticlesProps {
  language: Language;
}

interface ColorSwatch {
  id: string;
  name: string;
  nameAr: string;
  hex: string;
}

export default function ColorArticles({ language }: ColorArticlesProps) {
  const isAr = language === 'ar';
  const [activeArticleTab, setActiveArticleTab] = useState<number>(0);

  // Playground Shirt State
  const [selectedShirtColor, setSelectedShirtColor] = useState<string>('sage');
  // Playground Trouser State
  const [selectedTrouserColor, setSelectedTrouserColor] = useState<string>('sand');

  const shirts: ColorSwatch[] = [
    { id: 'sage', name: 'Sage Green', nameAr: 'أخضر مريمي', hex: '#8D9B82' },
    { id: 'vanilla', name: 'Vanilla Ivory', nameAr: 'عاجي فانيليا', hex: '#F3E5D8' },
    { id: 'white', name: 'Pristine White', nameAr: 'أبيض ناصع', hex: '#FFFFFF' },
    { id: 'navy', name: 'Midnight Navy', nameAr: 'كحلي داكن', hex: '#1A1A2E' },
    { id: 'terracotta', name: 'Terracotta', nameAr: 'طيني تراكوتا', hex: '#C05C46' },
    { id: 'lavender', name: 'Lavender Pastel', nameAr: 'خزامى لافندر', hex: '#D5C5E3' },
  ];

  const trousers: ColorSwatch[] = [
    { id: 'sand', name: 'Warm Sand', nameAr: 'رملي دافئ', hex: '#E8C4A0' },
    { id: 'charcoal', name: 'Charcoal Grey', nameAr: 'رمادي فاحم', hex: '#3A3F47' },
    { id: 'ecru', name: 'Ecru Cream', nameAr: 'كريمي طبيعي', hex: '#F5F5ED' },
    { id: 'rust', name: 'Terracotta Rust', nameAr: 'برتقالي طيني', hex: '#BD7B67' },
  ];

  const getHarmonyEvaluation = (shirtId: string, trouserId: string) => {
    // Determine harmony quality based on combination
    if (shirtId === 'sage' && trouserId === 'sand') {
      return {
        score: '98%',
        grade: isAr ? 'تناغم واحة غناء' : 'Oasis Harmony Elite',
        comment: isAr 
          ? 'المزيج المطلق لمنتجعات البحر المتوسط والشرق الأوسط. اللون الأخضر المريمي مع الرمل الدافئ يخفف وهج الشمس ويعاكسه بلطف وهدوء.'
          : 'The ultimate Mediterranean and Middle Eastern resort pairing. Sage Green and Warm Sand organically balance the bright sun with high elegancy.',
        theory: isAr ? 'تناغم تناظري ترابي متقاطع' : 'Earthy Analogous Accord'
      };
    }
    if (shirtId === 'vanilla' && trouserId === 'charcoal') {
      return {
        score: '94%',
        grade: isAr ? 'تباين تنفيذي دافئ' : 'Warm Executive Contrast',
        comment: isAr
          ? 'يكسر برود الرمادي الفاحم المعتاد بقرن عاجي كريمي ناعم. يعطي حساً واثقاً ومريحاً في الغرف والاجتماعات القيادية.'
          : 'Breaks the default corporate coldness with smooth milk tones. Exudes tailored confidence and approachability in executive lounges.',
        theory: isAr ? 'تباين ناعم عالي الأهمية' : 'Soft Complementary Contrast'
      };
    }
    if (shirtId === 'white' && trouserId === 'charcoal') {
      return {
        score: '96%',
        grade: isAr ? 'الهيبة الكلاسيكية الرسمية' : 'Commanding Monolithic Classic',
        comment: isAr
          ? 'قميص أبيض ناصع مع بنطال صوف بلون الفحم هو حجر الزاوية لكل بليزر فاخر أو معطف مفتوح. حاد، عصري ومتميز لجميع اللقاءات الكبرى.'
          : 'A structured crisp white with deep charcoal wool trousers forms the cornerstone of prestige clothing. Sharp, calculating, and timeless.',
        theory: isAr ? 'تباين مونوكروم حاد' : 'High-Key Monochromatic Split'
      };
    }
    if (shirtId === 'navy' && trouserId === 'ecru') {
      return {
        score: '97%',
        grade: isAr ? 'أناقة يخوت المارينا الفاخرة' : 'Marina Yachting Club',
        comment: isAr
          ? 'الكحلي الداكن مع الكريمي الناعم يجسد أناقة المدن الساحلية الفخمة كدبي وجدة. يرفع الثقة في عطلات نهاية الأسبوع بشكل مباشر.'
          : 'Midnight navy and natural ecru captures pristine seaside opulence. Immensely balances deep structure with light beach-side ease.',
        theory: isAr ? 'تناسق متمم بحري فاخر' : 'Nautical Complementary Blend'
      };
    }
    if (shirtId === 'terracotta' && trouserId === 'sand') {
      return {
        score: '91%',
        grade: isAr ? 'دفء الصحراء والأصالة ترابية' : 'Warm Desert Dunes',
        comment: isAr
          ? 'درجة التراكوتا الطينية الداكنة تمتزج بروعة مع ركائز الرمل الدافئة لتعطيك مظهراً ملائماً لرحلات واحات العلا أو سهرات البر الراقية.'
          : 'Earthy premium terracotta beautifully melts with sand foundations. Incredibly coordinates with natural desert scéneries and desert sunset camps.',
        theory: isAr ? 'انسجام دافئ متناظر الأطراف' : 'Warm Desert Monochromatic Gradient'
      };
    }
    if (shirtId === 'lavender' && trouserId === 'ecru') {
      return {
        score: '95%',
        grade: isAr ? 'رونق الباستيل العصري الجريء' : 'Modern Pastel Sovereign',
        comment: isAr
          ? 'اللافندر الرقيق مع الكريمي الطبيعي يعطي مظهراً غاية في الصيف والانتعاش البصري. ينصح لمن يبحث عن تصميم معاصر بعيد عن الرتابة.'
          : 'Gentle lavender combined with organic ecru cream provides high-end visual freshness, ideal for spring strolls and contemporary lounges.',
        theory: isAr ? 'ألوان باستيل متجانسة فرعية' : 'Subtle Pastel Analogy'
      };
    }
    
    // Default Fallback
    return {
      score: '88%',
      grade: isAr ? 'تجميع كاجوال متناسق' : 'Assembled Contemporary Fit',
      comment: isAr
        ? 'بنية لونية متوازنة تفي بمعايير الذكاء الاصطناعي لستايل بورد. أضف إكسسوارات جلدية بلون الجمل لتوحيد الرؤية البصرية.'
        : 'A highly tailored, smart-casual blend adhering perfectly to StyleBoards coordinates. Accent with camel-tan leather accessories.',
      theory: isAr ? 'تنسيق محايد مرن' : 'Flexible Neutral Theory'
    };
  };

  const articles = [
    {
      title: 'The Science of Summer Earth Tones',
      titleAr: 'قواعد تناسق الألوان للكتان وأنسجة الصيف بالخليج',
      summary: 'Why Sage Green, Sand, and Ivory dominate GCC resortwear and how to wear them without looking washed out.',
      summaryAr: 'لماذا تهيمن درجات الأخضر المريمي، العاجي، والرملي على ملابس المنتجعات بالخليج وكيف ترتديها بجاذبية وهيبة.',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=80',
      content: [
        {
          heading: isAr ? '١. فلسفة ألوان المنتجعات والواحة' : '1. The Philosophy of Oasis and Resort Palettes',
          body: isAr
            ? 'في الصيف الدافئ ومناطقنا المشمسة، تمتص الألوان الداكنة الحرارة بكثافة، بينما تعاكسها الألوان الفاتحة. سحر الكتان يأتي من تداخله العضوي مع التراب والواحة. الأخضر المريمي (Sage Green) يحاكي واحات النخيل، ومع الرمل الدافئ يخفف تعب العينين ويوحي بالسكينة والفخامة الهادئة.'
            : 'Under the intense Middle-Eastern sun, dark colors absorb ambient heat whereas light, breathable fibers reject it. The magic of premium linen comes from its organic connection to earth elements. Sage Green and Warm Sand pay visual homage to lush desert oases, offering calming prestige.'
        },
        {
          heading: isAr ? '٢. استخدام "التناغم المتناظر" بحرية' : '2. Utilizing Analogous Harmony Safely',
          body: isAr
            ? 'احرص دائماً على أن تكون قطعتك السفلية أغمق بدرجة واحدة على الأقل من الجزء العلوي عند استخدام نفس العائلة اللونية (مثل قميص عاجي مع بنطال رملي دافئ). هذه الفجوة الصغيرة تمنع بهتان الطيف وتوفر هيكلاً صلباً لطول قامتك وجسمك.'
            : 'Always ensure your lower piece is structured slightly darker than your upper shirt when styling monochromatic blends (e.g., a pure vanilla knit shirt with warm sand pleated chinos). This subtle contrast anchors your silhouette, elongating the overall stature.'
        },
        {
          heading: isAr ? '٣. الإكسسوار المكمل كعنصر حسم' : '3. The Sovereign Camel Accent Rule',
          body: isAr
            ? 'عندما يكون الطقم بأكمله فاهياً أو ترابياً هادئاً، فإن الإكسسوارات هي التي ترسم حدود المظهر. اعتمد دائماً على جلود السويدي أو شمواه جملي تان للحذاء والحزام والمحفظة. هذا يربط التجميعة ببعضها بشكل كلاسيكي فوري.'
            : 'When your entire assembly utilizes pastel organic tones, accessories draw the outline of your taste. Rely strictly on warm camel-tan or cognac suede sandals, slides, and woven belts to effortlessly tie the entire visual look together.'
        }
      ]
    },
    {
      title: 'Commanding Contrast in the Boardroom',
      titleAr: 'التباين المدروس لثقة اللقاءات التنفيذية والشركات',
      summary: 'Beyond the default black suit. Mastering deep charcoal, midnight navy, and crisp cotton for strategic dominance.',
      summaryAr: 'ما هو أبعد من البدلة السوداء التقليدية المملة. كيف توظف الرمادي الفاحم وصوف الكحلي مع القطن الناصع لهيبة كبرى.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80',
      content: [
        {
          heading: isAr ? '١. قواعد السيادة والتباين الجاد' : '1. The Mathematics of High-Contrast Authority',
          body: isAr
            ? 'سر الهيبة التنفيذية يرتكز على التباين البصري المريح. القميص الأبيض الناصع (Egyptian White Cottons) بجانب بدلة باللون الفحم الداكن يصنع تقاطعاً بصرياً فورياً يعكس التركيز والجدية الفنية ومراعاة بروتوكولات الملابس للأعمال.'
            : 'Executive commanding presence relies on intentional contrast. A brilliant, clean white custom shirt under a tailored charcoal gray blazer acts as a high-contrast visual focus, conveying focus, sharp analytical precision, and boardroom readiness.'
        },
        {
          heading: isAr ? '٢. بديل الأزرق وذكاء الكحلي الحريري' : '2. The Shift to Indigo and Structural Navy',
          body: isAr
            ? 'اللون الكحلي الداكن (Midnight Navy) ينضح بالدقة والملكية. لكسر جمود اللقاء، يمكن ارتداء البولو التريكو الكحلي محبوكاً من الحرير والقطن مع شينو بيج دافئ. هذا يعبر عن الأناقة الكاجوال المريحة بنضج وحنكة وعصرنة.'
            : 'Midnight navy is the color of classic confidence. Transitioning to a high-end silk-knit navy polo paired with tailored biscuit or sand chinos signals modern power, approachability, and an understanding of contemporary luxury.'
        },
        {
          heading: isAr ? '٣. تنسيق الإكسسوارات الفضية والمذهبة' : '3. Metal Dial Alignment Principles',
          body: isAr
            ? 'مع الألوان الباردة كالرمادي والكحلي، تبدو المعادن الفضية والبلاتينية في الساعات والكبك هي الأنسب والأكثر برودة وبريقاً. أما الذهب فيفضل توظيفه بلمسات مطفية غير لامعة لكي لا تفقد اللقاءات طابع الجوهر والوقار.'
            : 'When wearing cool hues like charcoal and navy, silver, steel, and platinum dials on wristwatches are the ultimate pairing. Keep yellow gold accents to matte finishes or small structural details to preserve genuine dignity and professional poise.'
        }
      ]
    },
    {
      title: 'The Majlis Prestige: Vests, Knits & Traditional Borders',
      titleAr: 'أسرار وجمالية الهيبة في المجالس والأمسيات التراثية',
      summary: 'Crafting sovereign evening looks by styling premium vests with traditional thobe necklines and gilded zari borders.',
      summaryAr: 'كيف تنسق السديري (الفيست) الفاخر فوق الياقات الصينية بلمسة تراثية مذهبة وألوان ملكية لسهرات المجلس الأنيق.',
      image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&w=1200&q=80',
      content: [
        {
          heading: isAr ? '١. هندسة السديري فوق الياقات الصينية' : '1. The Architecture of the Men’s Vest & Mandarin Collars',
          body: isAr
            ? 'سديري الصوف والكتان باللون الكحلي الداكن أو البترولي هو درع الأناقة في المجالس. يرتدى بذكاء فوق قميص كريمي ذو ياقة صينية مرتفعة لإعطاء امتلاء طبيعي للكتفين وصدر مفرود ووقار فوري يحاكي الإرث والأصالة العربية العريقة.'
            : 'The premium wool vest serves as a traditional shield of stature in modern majlises. Laying a structured tailored navy vest over an ivory mandarin-collar shirt adds natural shoulder fullness and immediate heritage prestige.'
        },
        {
          heading: isAr ? '٢. التطريز الذهبي (الزري) والتناسق الحصيف' : '2. Golden Embroidery (Zari) and Chromatic Restraint',
          body: isAr
            ? 'إذا كان المعطف أو البشت مطعماً بالزري أو النقوش المذهبة، يجب أن تكون القاعدة تحتها محايدة بالكامل (مثل قميص فانيليا ناعم بدون نمط وبنطال رملي). التنافس بين النقوش المختلفة يذهب بهالة الفخامة ويجعل المظهر فوضوياً.'
            : 'If your outer cardigan or heritage bisht carries fine gold zari embroidery, keep your base garments strictly neutral and solid. Competing patterns or distracting button hues ruin the regal aesthetic of high luxury.'
        },
        {
          heading: isAr ? '٣. سحر عطور العنبر والصندل المكملة للّون' : '3. Scent-Color Synesthesia: Amber & Sandalwood Accents',
          body: isAr
            ? 'تنسيق الألوان لا يقف عند الشاشات، بل تكتمل لغة الجسد بالرائحة. الألوان الدافئة مثل الكحلي والذهبي والترابي تتناغم بحسية رائعة مع الهالات العطرية الثقيلة كالعود ودهن العنبر والزعفران لإبرام طابع المجلس المهيب.'
            : 'StyleBoard views color coordination as a multi-sensory art. Rich, dark regal colors pair seamlessly with warm olfactory notes such as real agarwood (oud), rich amber blends, and saffron aura for authentic, indelible presence.'
        }
      ]
    }
  ];

  const currentArticle = articles[activeArticleTab];
  const activeCommentary = getHarmonyEvaluation(selectedShirtColor, selectedTrouserColor);

  return (
    <div className="pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all animate-fadeIn">
      {/* Ad Leaderboard */}
      <AdZone type="leaderboard" language={language} />

      {/* Page Header */}
      <div className="text-center mt-6 mb-12">
        <span className="px-3 py-1 bg-[#FAF7F4] dark:bg-[#1A1A2E] text-[#C9A96E] text-[10px] font-black tracking-widest rounded-full uppercase border border-[#E8C4A0]/20 inline-block mb-3">
          ✨ {isAr ? 'مدونة خبراء التنسيق لـ ستايل بورد' : 'STYLEBOARD CURATORS ACADEMY'}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#1A1A2E] dark:text-white leading-tight">
          {isAr ? 'أدلة تنسيق الألوان والأقمشة والملابس' : 'Editorial Guide to Color & Harmony'}
        </h1>
        <p className="mt-4 text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
          {isAr 
            ? 'تعلم أسس التناغم من كبار منسقي الموضة ورسم مظهرك القادم بهيبة مريحة وثقة كاملة مدعومة بالنظرية البصرية.' 
            : 'Master color theory with bespoke, regional commentary written for the gentlemen of high-taste. Style every assembly using physical contrasts.'}
        </p>
      </div>

      {/* INTERACTIVE COLOR HARMONY PLAYGROUND */}
      <section className="bg-white dark:bg-[#1A1A2E]/30 border border-[#E8C4A0]/25 rounded-2xl p-6 sm:p-10 shadow-lg mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-[0.02] dark:opacity-[0.05] text-[#C9A96E] pointer-events-none select-none font-black text-9xl font-serif">
          H_T
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center">
          
          {/* Column 1: Color Selectors & Interactive Character Swatch preview */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <h3 className="font-serif text-xl font-bold text-[#1A1A2E] dark:text-white flex items-center gap-2">
              <Palette className="w-5 h-5 text-[#C9A96E]" />
              <span>{isAr ? 'محاكي تناسق الألوان والمطابقة الفوري' : 'Live Color Theory Playground & Matcher'}</span>
            </h3>
            
            <p className="text-xs text-gray-500">
              {isAr 
                ? 'امزج ودع برمجيتنا الحساسة للألوان تحت ميزان الطيف تقيس دقة وملائمة المظهر.' 
                : 'Select pieces in real-time to trigger instant GCC editorial feedback and scientific match ratings.'}
            </p>

            {/* Select Shirt */}
            <div>
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#C9A96E] block mb-2">
                👕 {isAr ? 'اختر لون القميص الرئيسي' : '1. Main Shirt Hue / Top'}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {shirts.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedShirtColor(s.id)}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                      selectedShirtColor === s.id
                        ? 'border-[#C9A96E] ring-2 ring-[#C9A96E]/20 bg-[#FAF7F4] dark:bg-zinc-950'
                        : 'border-gray-150 dark:border-zinc-800 bg-transparent hover:border-gray-300'
                    }`}
                  >
                    <span 
                      className="w-5 h-5 rounded-full border border-gray-150 shadow-inner" 
                      style={{ backgroundColor: s.hex }} 
                    />
                    <span className="text-[9px] font-bold text-gray-600 dark:text-gray-300 truncate w-full">
                      {isAr ? s.nameAr : s.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Select Trouser */}
            <div>
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#C9A96E] block mb-2">
                👖 {isAr ? 'اختر لون البنطال والشينو' : '2. Trouser / Lower Hue'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {trousers.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTrouserColor(t.id)}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                      selectedTrouserColor === t.id
                        ? 'border-[#C9A96E] ring-2 ring-[#C9A96E]/20 bg-[#FAF7F4] dark:bg-zinc-950'
                        : 'border-gray-150 dark:border-zinc-800 bg-transparent hover:border-gray-300'
                    }`}
                  >
                    <span 
                      className="w-5 h-5 rounded-full border border-gray-150 shadow-inner" 
                      style={{ backgroundColor: t.hex }} 
                    />
                    <span className="text-[9px] font-bold text-gray-600 dark:text-gray-300 truncate w-full">
                      {isAr ? t.nameAr : t.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Swatch Live Preview visualizer card */}
          <div className="w-full lg:w-1/2">
            <div className="border border-[#E8C4A0]/20 bg-[#FAF7F4] dark:bg-zinc-950/40 p-6 rounded-2xl flex flex-col items-center justify-between min-h-[300px] shadow-inner relative">
              
              {/* Score Badging */}
              <div className="absolute top-4 right-4 bg-teal-500 text-white rounded-full font-black text-xs px-2.5 py-1 flex items-center gap-1.5 shadow-md">
                <span>{activeCommentary.score}</span>
                <span className="text-[9px] font-medium tracking-wide">Match Score</span>
              </div>

              {/* Graphical representation of the outfit */}
              <div className="my-auto w-full max-w-[200px] flex flex-col items-center gap-1 my-6">
                
                {/* Hanger line */}
                <div className="w-10 h-10 border-t-2 border-r-2 border-[#C9A96E]/20 rounded-tr-xl flex justify-center items-end opacity-75">
                  <div className="w-3 h-3 border-2 border-[#C9A96E]/20 rounded-full border-b-0 -mb-1" />
                </div>

                {/* Shirt Solid Block */}
                <div 
                  className="w-full aspect-[2/1] rounded-2xl shadow-md border border-gray-200 flex flex-col justify-between p-3 relative transition-all duration-500 scale-100 hover:scale-105"
                  style={{ backgroundColor: shirts.find(s => s.id === selectedShirtColor)?.hex }}
                >
                  <span className="absolute top-1 left-2 font-black text-[7px] text-[#C9A96E] dark:text-[#E8C4A0] mix-blend-difference tracking-widest">
                    {isAr ? 'القطعة العلوية' : 'UPPER BODY'}
                  </span>
                  <div className="text-center w-full flex-1 flex items-center justify-center font-bold text-xs mix-blend-difference text-white">
                    {isAr 
                      ? shirts.find(s => s.id === selectedShirtColor)?.nameAr 
                      : shirts.find(s => s.id === selectedShirtColor)?.name}
                  </div>
                </div>

                {/* Linking stitch line */}
                <div className="h-4 w-0.5 border-l border-dashed border-[#C9A96E]/40" />

                {/* Trouser Solid Block */}
                <div 
                  className="w-full aspect-[2/1.2] rounded-2xl shadow-md border border-gray-200 flex flex-col justify-between p-3 relative transition-all duration-500 scale-100 hover:scale-105"
                  style={{ backgroundColor: trousers.find(t => t.id === selectedTrouserColor)?.hex }}
                >
                  <span className="absolute top-1 left-2 font-black text-[7px] text-[#C9A96E] dark:text-[#E8C4A0] mix-blend-difference tracking-widest">
                    {isAr ? 'القطعة السفلية' : 'LOWER SHINOS'}
                  </span>
                  <div className="text-center w-full flex-1 flex items-center justify-center font-bold text-xs mix-blend-difference text-white">
                    {isAr 
                      ? trousers.find(t => t.id === selectedTrouserColor)?.nameAr 
                      : trousers.find(t => t.id === selectedTrouserColor)?.name}
                  </div>
                </div>
              </div>

              {/* Commentary results */}
              <div className="w-full border-t border-gray-200 dark:border-zinc-800 pt-4 mt-2">
                <span className="bg-[#1A1A2E] text-[#C9A96E] dark:bg-[#C9A96E]/10 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider mb-1 inline-block">
                  🎯 {activeCommentary.theory}
                </span>
                <h5 className="font-serif text-sm font-bold text-[#1A1A2E] dark:text-white capitalize">
                  {activeCommentary.grade}
                </h5>
                <p className="text-[11px] text-gray-500 dark:text-gray-300 mt-1 leading-relaxed">
                  "{activeCommentary.comment}"
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL ARTICLES SECTION */}
      <h3 className="font-serif text-2xl font-bold text-[#1A1A2E] dark:text-white mb-6 text-center">
        📖 {isAr ? 'المقالات والتحليلات الفنية المنشورة' : 'Featured Architectural Fashion Essays'}
      </h3>

      {/* Article Tab switcher */}
      <div className="flex flex-wrap lg:flex-nowrap justify-center sm:justify-start gap-2 mb-8 bg-gray-50 dark:bg-zinc-950/40 p-1.5 rounded-xl border border-gray-150 dark:border-zinc-800">
        {articles.map((art, index) => (
          <button
            key={index}
            onClick={() => setActiveArticleTab(index)}
            className={`flex-1 py-3 px-4 rounded-lg text-[11px] font-extrabold tracking-wider uppercase transition-all duration-300 text-center cursor-pointer ${
              activeArticleTab === index
                ? 'bg-[#1A1A2E] dark:bg-[#C9A96E] text-white dark:text-[#1A1A2E] shadow-sm'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-transparent'
            }`}
          >
            <span>{isAr ? art.titleAr : art.title}</span>
          </button>
        ))}
      </div>

      {/* Active Article Detail View */}
      <div className="bg-white dark:bg-[#1A1A2E]/20 border border-[#E8C4A0]/20 rounded-2xl overflow-hidden shadow-lg mt-4 animate-fadeIn">
        <div className="relative h-60 sm:h-80 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent z-10" />
          <img 
            src={currentArticle.image} 
            alt="Color harmony layout representation"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-t-2xl"
          />
          <div className="absolute bottom-6 left-6 right-6 z-20 text-left">
            <span className="px-2 py-0.5 bg-[#FAF7F4] dark:bg-zinc-950 text-[#C9A96E] text-[8px] font-black tracking-widest rounded-md uppercase mb-2 inline-block">
              {isAr ? 'مقال مصمم الأزياء المعتمد' : 'VERIFIED STYLIST COMMENTARY'}
            </span>
            <h2 className="font-serif text-lg sm:text-2xl font-black text-white leading-tight">
              {isAr ? currentArticle.titleAr : currentArticle.title}
            </h2>
            <p className="text-[11px] text-gray-300 font-sans mt-1">
              {isAr ? currentArticle.summaryAr : currentArticle.summary}
            </p>
          </div>
        </div>

        {/* Article Body Columns */}
        <div className="p-8 sm:p-12 space-y-6">
          {currentArticle.content.map((sec, id) => (
            <div key={id} className="space-y-2 text-left border-b border-gray-50 dark:border-zinc-800 last:border-0 pb-6 last:pb-0">
              <h4 className="font-serif text-base font-extrabold text-[#1A1A2E] dark:text-white flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#C9A96E] shrink-0" />
                <span>{sec.heading}</span>
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed pl-6">
                {sec.body}
              </p>
            </div>
          ))}
          
          <div className="mt-8 p-4 bg-[#FAF7F4]/50 dark:bg-zinc-950/30 rounded-xl flex items-center justify-between text-[11px] text-[#C9A96E] font-bold tracking-widest uppercase">
            <span>⚜ {isAr ? 'نصيحة ستايل بورد للحسابات الشخصية' : 'Curated for Contemporary Arabian Gentlemen'} ⚜</span>
            <span>2026 EDITION</span>
          </div>
        </div>
      </div>

      {/* Dynamic Ad Placement - In Content */}
      <div className="mt-12">
        <AdZone type="in-feed" language={language} />
      </div>
    </div>
  );
}
