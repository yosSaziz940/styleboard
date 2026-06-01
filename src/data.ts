import { Outfit, WardrobeItem } from './types';

export const SAMPLE_WARDROBE_ITEMS: WardrobeItem[] = [
  // --- SHIRTS ---
  {
    id: 's-1',
    name: 'Sage Linen Resort Shirt',
    nameAr: 'قميص كتان منتجع بلون المريمية',
    category: 'shirt',
    color: '#8D9B82',
    colorName: 'Sage Green',
    colorNameAr: 'أخضر مريمي',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    type: 'Resort/Linen',
    typeAr: 'كتان خفيف'
  },
  {
    id: 's-2',
    name: 'Vanilla Silk-Knit Polo',
    nameAr: 'قميص بولو تريكو حريري بلون الفانيليا',
    category: 'shirt',
    color: '#F3E5D8',
    colorName: 'Vanilla Ivory',
    colorNameAr: 'عاجي فانيليا',
    imageUrl: 'https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?auto=format&fit=crop&w=600&q=80',
    type: 'Knit Polo',
    typeAr: 'بولو تريكو فاخر'
  },
  {
    id: 's-3',
    name: 'Classic Egyptian Cotton Oxford',
    nameAr: 'قميص أكسفورد كلاسيكي من القطن المصري',
    category: 'shirt',
    color: '#FFFFFF',
    colorName: 'Crisp White',
    colorNameAr: 'أبيض ناصع',
    imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80',
    type: 'Tailored Oxford',
    typeAr: 'قطن رسمي مفصل'
  },
  {
    id: 's-4',
    name: 'Midnight Navy Mandarin Collar Shirt',
    nameAr: 'قميص ياقة صينية بلون الكحلي الداكن',
    category: 'shirt',
    color: '#1A1A2E',
    colorName: 'Midnight Navy',
    colorNameAr: 'كحلي داكن',
    imageUrl: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=80',
    type: 'Mandarin Collar',
    typeAr: 'ياقة صينية مريحة'
  },
  {
    id: 's-5',
    name: 'Terracotta Oversized Overshirt',
    nameAr: 'جاكيت خفيف كاجوال بلون التراكوتا',
    category: 'shirt',
    color: '#C05C46',
    colorName: 'Terracotta',
    colorNameAr: 'طيني دافئ',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    type: 'Chore Jacket / Shirt',
    typeAr: 'قميص جاكيت'
  },

  // --- TROUSERS ---
  {
    id: 't-1',
    name: 'Pleated Sand Chinos',
    nameAr: 'بنطلون شينو بكسرات بلون الرمل الدافئ',
    category: 'trouser',
    color: '#E8C4A0',
    colorName: 'Warm Sand',
    colorNameAr: 'رملي دافئ',
    imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80',
    type: 'Pleated Chino',
    typeAr: 'شينو بكسرات كلاسيكية'
  },
  {
    id: 't-2',
    name: 'Bespoke Charcoal Tailored Trousers',
    nameAr: 'بنطلون رسمي مفصل بلون الفحم الداكن',
    category: 'trouser',
    color: '#3A3F47',
    colorName: 'Charcoal Grey',
    colorNameAr: 'رمادي فاحم',
    imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80',
    type: 'Tailored Wool',
    typeAr: 'صوف رسمي مفصل'
  },
  {
    id: 't-3',
    name: 'Ecru Wide-Leg Pleated Trouser',
    nameAr: 'بنطال فضفاض بكسرات لون خيطي طبيعي',
    category: 'trouser',
    color: '#F5F5ED',
    colorName: 'Ecru/Cream',
    colorNameAr: 'كريمي طبيعي',
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80',
    type: 'Relaxed Tailoring',
    typeAr: 'قصة واسعة مريحة'
  },
  {
    id: 't-4',
    name: 'Soft Terracotta Cropped Chinos',
    nameAr: 'بنطلون كاحل مريح باللون الطيني الدافئ',
    category: 'trouser',
    color: '#BD7B67',
    colorName: 'Soft Terracotta',
    colorNameAr: 'برتقالي طيني',
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80',
    type: 'Cropped Fit',
    typeAr: 'قصة كاحل عصرية'
  }
];

export const FEATURED_OUTFITS: Outfit[] = [
  {
    id: 'outfit-1',
    title: 'The Levantine Coast Resort Styled',
    titleAr: 'تنسيق ساحل الشام الأنيق',
    description: 'A breezy resort attire coupling sage-colored loose linen with luxurious warm sand flowing pleated trousers. Pair with classic premium Arab leather slides (Madas Sharqi) for an authentic Levantine aesthetic.',
    descriptionAr: 'مظهر صيفي مريح يجمع بين الكتان الخفيف باللون الأخضر المريمي مع بنطال فضفاض بكسرات بلون الرمل الدافئ. مثالي إذا تم ارتداؤه مع حذاء شرقي مطرز فاخر لإبراز الأصالة العصرية.',
    category: 'casual',
    imageUrl: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=80',
    tags: ['Resort', 'Earthy', 'Linen', 'Contemporary Arab'],
    tagsAr: ['منتجع', 'ترابي', 'كتان', 'عصري عربي'],
    items: {
      top: 'Sage Resort Linen Shirt',
      bottom: 'Warm Sand Wide-Leg Pleated trousers',
      shoes: 'Luxury Camel Hair Madas Sharqi Slides',
      accessories: ['Gold Frame Square Sunglasses', 'Woven Leather Hand-Bracelet']
    },
    itemsAr: {
      top: 'قميص كتان مريمي فاخر بياقة منتجع',
      bottom: 'بنطال بيج رملي بكسرات عريضة',
      shoes: 'حذاء شرقي مطرز يدوي بلون جملي غامق',
      accessories: ['نظارة شمسية ذهبية كلاسيكية دائرية', 'سوار جلدي مجدول']
    },
    likes: 312,
    season: 'summer',
    bodyType: 'average',
    budget: 'medium',
    occasion: 'Weekend Lounge / Resort travel',
    occasionAr: 'عطلة نهاية الأسبوع / سفر للمنتجع'
  },
  {
    id: 'outfit-2',
    title: 'Modern Riyadh Corporate Luxe',
    titleAr: 'أناقة الرياض الرسمية العصرية',
    description: 'An elegant interpretation of modern executive wear. Featuring an Egyptian cotton tailored shirt under an elegant soft gold custom blazer, paired with tailored graphite trousers. Sharp, calculated and majestic.',
    descriptionAr: 'تفسير كلاسيكي أنيق لملابس رجال الأعمال والمهندسين والمدراء. يتميز بقميص مصنوع من القطن المصري الفاخر تحت بليزر ذهبي خافت مع بنطال كحلي أو رمادي فحمي رسمي.',
    category: 'work',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80',
    tags: ['Executive', 'Bespoke', 'Corporate', 'Sharp'],
    tagsAr: ['طابع رسمي', 'مفصل فاخر', 'أعمال', 'حاد وأنيق'],
    items: {
      top: 'Egyptian Cotton Crisp White Oxford + Soft Gold Wool Weave Blazer',
      bottom: 'Charcoal Wool Bespoke Tailored Trousers',
      shoes: 'Italian Dark Brown Leather Oxford Shoes',
      accessories: ['Bespoke Calligraphy Cufflinks', 'Warm Sand Silk Tie', 'Swiss Chronograph']
    },
    itemsAr: {
      top: 'قميص أبيض قطن مصري ناصع + بليزر ناعم باللون الذهبي المطفي الفاخر',
      bottom: 'بنطال صوف كلاسيكي مفصل بلون رمادي داكن',
      shoes: 'أوكسفورد إيطالي من الجلد اللامع البني الداكن',
      accessories: ['أزرار أكمام بنقش الخط العربي', 'رابطة عنق حريرية بلون الرمل', 'ساعة كرونوغراف سويسرية كلاسيكية']
    },
    likes: 450,
    season: 'spring-fall',
    bodyType: 'athletic',
    budget: 'premium',
    occasion: 'Boardroom Meetings / Gallery Openings',
    occasionAr: 'اجتماعات الشركات / افتتاح المعارض والصالونات'
  },
  {
    id: 'outfit-3',
    title: 'The Majlis Evening Sovereignty',
    titleAr: 'هيبة المجلس الأنيقة',
    description: 'Blending high-street minimal styling with traditional heritage elements. A customized deep navy fine wool vest worn over an immaculate vanilla mandarin collar shirt, with structured light trousers and a subtle gold dial wristwatch.',
    descriptionAr: 'مظهر يمزج بين الأناقة الراقية واللمسة التراثية الممتازة للمجلس الفاخر. فيست صوف باللون الكحلي الداكن يرتدى فوق قميص بياقة صينية بلون عاجي دافئ، مع بنطال فاتح وساعة يد بقرص ذهبي أخاذ.',
    category: 'evening',
    imageUrl: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&w=1200&q=80',
    tags: ['Majlis', 'Heritage', 'Minimalist', 'Luxe Navy'],
    tagsAr: ['المجلس', 'تراثي', 'بسيط وراقي', 'كحلي ملكي'],
    items: {
      top: 'Immaculate Vanilla Mandarin Collar shirt + Bespoke Midnight Navy Vest',
      bottom: 'Structured Ivory Cropped Tailored Trousers',
      shoes: 'Premium Matte Black Suede Loafers',
      accessories: ['Gold Accented Arabic Calligraphy Pin', 'Onyx Tasbih Prayer Beads', 'Saffron Cologne Aura']
    },
    itemsAr: {
      top: 'قميص ياقة صينية بلون الفانيليا + سديري (فيست) صوف كحلي داكن مفصل',
      bottom: 'بنطال كريمي مهيكل بقصة كاحل دقيقة',
      shoes: 'حذاء لوفر مخملي بلون أسود مطفي فاخر',
      accessories: ['دبوس صدر مطلي مذهب بعبارة خط عربي', 'سبحة من حجر العقيق والاونيكس الأسود', 'ساعة يد كلاسيكية مطعمة بالذهب']
    },
    likes: 582,
    season: 'winter',
    bodyType: 'broad-shoulder',
    budget: 'premium',
    occasion: 'Social Majlis / Elegant Dinner Dinings',
    occasionAr: 'المجالس الاجتماعية والعائلية / عشاء رسمي راقٍ'
  },
  {
    id: 'outfit-4',
    title: 'Dubai Marina Street Minimalist',
    titleAr: 'بساطة شوارع دبي مارينا الكاجوال',
    description: 'Elevated urban minimalist designed for tropical heat yet remaining exceptionally structured. A luxury heavyweight sand-nude knit polo paired with high-crop slate-grey relaxed trousers and modern white clean minimalist leather trainers.',
    descriptionAr: 'أسلوب تبسيطي رياضي مصمم للتغلب على رطوبة وحرارة الخليج مع الاحتفاظ بالهيكل الفاخر والجاذبية. بولو تريكو ثقيل الوزن بلون الرمل الدافئ يدعمه بنطال مريح رمادي فاتح وحذاء رياضي جلدي كلاسيكي.',
    category: 'sport',
    imageUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=1200&q=80',
    tags: ['Contemporary Sport', 'Urban', 'Sand Nude', 'Minimalist'],
    tagsAr: ['رياضي معاصر', 'عمراني', 'بيج دافئ', 'مبسط جداً'],
    items: {
      top: 'Sand Heavyweight Knit Polo Shirt',
      bottom: 'Relaxed Slate Grey Trousers',
      shoes: 'Flat Minimalist White Italian Leather Sneakers',
      accessories: ['Matte Black Acetate Sunglasses', 'Smart Minimal Ring Set']
    },
    itemsAr: {
      top: 'قميص بولو محبوك سميك بلون بيج رملي دافئ',
      bottom: 'بنطال رمادي مريح كاجوال خفيف الوزن',
      shoes: 'حذاء رياضي أنيق أبيض ناصع من الجلد الإيطالي الحقيقي',
      accessories: ['نظارات شمسية بلون أسود مطفي', 'ساعة ذكية بحزام كحلي عصري']
    },
    likes: 247,
    season: 'summer',
    bodyType: 'slim',
    budget: 'medium',
    occasion: 'Brunch Gatherings / Luxury Shopping Leisure',
    occasionAr: 'تجمعات الفطور المتأخر / التسوق الفخم والترفيه عطلة نهاية الأسبوع'
  },
  {
    id: 'outfit-5',
    title: 'Modernized Fusion Bisht Splendor',
    titleAr: 'تنسيق البشت العصري المدمج',
    description: 'Combining regional heritage outerwear with high-contrast cosmopolitan tailored lines. An open modern black thobe style coat or bisht-cardigan layered over a crisp vanilla Egyptian cotton shirt, complete with detailed gold embroidery highlights.',
    descriptionAr: 'طراز فريد يدمج رداء البشت التقليدي الأصيل بتفاصيله المذهبة الفاخرة مع خطوط ملابس كوزموبوليتانية حادة التباين. يرتدى فوق قميص عاجي ناعم ومع بنطال عازل أو رملي وحذاء فاخر ديربي بيج.',
    category: 'modest',
    imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
    tags: ['Modest Fusion', 'Gold Trim', 'Traditional', 'Grand Occasions'],
    tagsAr: ['نمط محتشم مدمج', 'تطريز مذهب', 'تراثي فاخر', 'المناسبات الكبرى والأعياد'],
    items: {
      top: 'Egyptian Crisp Cotton Shirt + Bespoke Black Bisht-Style Cardigan with Gold Zari',
      bottom: 'Pleated Warm Sand Tailored Trousers',
      shoes: 'Soft Cognac Leather Madas Traditional Sandals',
      accessories: ['Real Agarwood Tasbih (Oud)', 'Premium Gold Metal Sunglasses']
    },
    itemsAr: {
      top: 'قميص قطني خفيف بلون عاجي + كارديجان عصري بتصميم البشت الأسود مع زري ذهبي ناعم رفيع',
      bottom: 'بنطال رملي مفصل ذو كسرات ذي قصة رفيعة',
      shoes: 'حذاء شرقي تقليدي مصنوع يدوياً من جلد الكوجناك الطبيعي الناعم',
      accessories: ['مسبحة عطرية من خشب العود الطبيعي الفخم', 'نظارات شمسية ذات إطار مذهب']
    },
    likes: 673,
    season: 'all',
    bodyType: 'average',
    budget: 'premium',
    occasion: 'Eid Mubarak Celebrations / Marriage Gala',
    occasionAr: 'احتفالات الأعياد السعيدة / أفراح ومناسبات عائلية هامة'
  },
  {
    id: 'outfit-6',
    title: 'Autumnal Olive Orchard Tailoring',
    titleAr: 'تنسيق بستان الزيتون الخريفي مريح',
    description: 'A cozy layered cold-weather outfit designed for late autumn evenings in Amman or Al-Ula. Incorporates rich woodland colors such as terracotta underneath a heavy canvas-style olive overshirt, grounded with thick sand rugged pleated trousers.',
    descriptionAr: 'إطلالة شتوية ودافئة متعددة الطبقات مخصصة لبلدات عمّان أو العلا الباردة ليلاً. تدمج تباينات طينية غامقة تراكوتا تحت قميص ثقيل (أوفرشيرت) بلون الزيتون المطفي الدافئ وبنطال سميك بيج.',
    category: 'casual',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    tags: ['Autumn Layering', 'Rugged Tailored', 'Earth tones', 'Earthy Play'],
    tagsAr: ['طبقات خريفية دافئة', 'كاجوال منسق', 'أوران الأرض', 'طلعة برية راقية'],
    items: {
      top: 'Terracotta Inner-knit Crew + Premium Heavy Denim Olive Jacket-Shirt',
      bottom: 'Robust Beige Rugged Pleated Corduroys/Chinos',
      shoes: 'Weathered Sand Suede Chelsea Boots',
      accessories: ['Vintage Amber Acetate Glasses', 'Camel Cashmere Scarf']
    },
    itemsAr: {
      top: 'بلوفر خفيف داخلي تراكوتا + قميص جاكيت متين من الجينز الزيتوني المغسول الفاخر',
      bottom: 'بنطال قطيفة مضلع أو شينو قوي بلون البيج الدافئ',
      shoes: 'حذاء تشيلسي من الشمواه بلون رملي هادئ',
      accessories: ['نظارة طبية بلون الكهرمان العتيق', 'وشاح من كشمير الماعز ملوّن بلون الجمل']
    },
    likes: 389,
    season: 'winter',
    bodyType: 'broad-shoulder',
    budget: 'medium',
    occasion: 'Campfires / Outdoor Winter Dinners',
    occasionAr: 'جلسات النار الشتوية / مطاعم الشتاء المفتوحة الدافئة'
  },
  {
    id: 'outfit-7',
    title: 'Sunkissed Oasis Summer Breeze',
    titleAr: 'تنسيق واحة الصيف المشمشية الفاخرة',
    description: 'The ultimate beach-front or summer evening resort setup. Features a premium loose-fit beige cream resort linen shirt over linen shorts or light-sand pleated chinos, accented with natural amber shell sunglasses and woven leather slip-ons.',
    descriptionAr: 'التنسيق الصيفي الأرقى للمنتجعات والممشى الشاطئي. يجمع بين قميص الكتان الإيطالي بلون الفانيليا والبيج الفاتح الفضفاض، مع بنطال أبيض قطني ناصع ونظارة شمسية من حجر الكهرمان الطبيعي وسوار خشبي رفيع.',
    category: 'casual',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    tags: ['Summer Comfort', 'Beach Front', 'Sand Linen', 'Oasis'],
    tagsAr: ['أفضل تنسيقات الصيف', 'إطلالة شاطئية', 'كتان هادئ', 'الواحة'],
    items: {
      top: 'Breezy Cream/Beige Linen Resort Shirt',
      bottom: 'Light Ecru Wide-leg Cotton Chinos',
      shoes: 'Handcrafted Sandalwood Tan Suede Mules',
      accessories: ['Amber Acetate D-Frame Sunglasses', 'Linen Blend Hand-Pocket Square']
    },
    itemsAr: {
      top: 'قميص كتان بيج خفيف فضفاض بياقة مفتوحة',
      bottom: 'بنطال قطن مريح بلون عاجي طبيعي ناصع بالكامل',
      shoes: 'حذاء كاجوال خفيف مفتوح من الخلف بلون الموكا الشمواه',
      accessories: ['نظارة شمسية عريضة باللون الكهرماني الخشبي المعمر', 'سوار يد مسبول يدوي بخرز ناعم']
    },
    likes: 412,
    season: 'summer',
    bodyType: 'slim',
    budget: 'budget',
    occasion: 'Daytime Pool Club & Sunset Lounges',
    occasionAr: 'نوادي حمامات السباحة النهارية وجلسات غروب الشمس الشاطئية'
  },
  {
    id: 'outfit-8',
    title: 'Jeddah Business Casual Executive',
    titleAr: 'أناقة العمل التنفيذية بجدة',
    description: 'Curated specifically for elite business environments in warm climates. A rich mercerized cotton charcoal polo knit shirt with elegant structured beige trousers. Perfect styling to remain professional while beating the coastal humidity.',
    descriptionAr: 'تنسيقات مصممة لنخبة مدراء الأعمال والمهندسين في الأجواء الحارة والرطبة. يدمج بولو تريكو مصنوع من القطن الفاخر بلون الفحم الفاخر مع بنطال كريمي مفصل بقصة أنيقة ومستقيمة وساعة ذكية وحذاء كلاسيكي بني.',
    category: 'work',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1201&q=80',
    tags: ['Work Style', 'Corporate Cozy', 'Polo Knit', 'GCC Workwear'],
    tagsAr: ['تنسيقات للعمل', 'رسمي مريح', 'بولو تريكو', 'مظهر مهني'],
    items: {
      top: 'Mercerized Cotton Charcoal Polo Knit Shirt',
      bottom: 'Bespoke Tailored Warm Beige Cotton Chinos',
      shoes: 'Grained Cognac Leather Penny Loafers',
      accessories: ['Silver Frame Aviator Glasses', 'Luxury Saffiano Leather Briefcase']
    },
    itemsAr: {
      top: 'قميص بولو تريكو حرير بلون الفحم الداكن الفاخر',
      bottom: 'بنطال شينو قطن مفصل بلون البيج الرملي الدافئ بكسرات خفيفة',
      shoes: 'لوفر بني بنقشة حبوب الجلد الكلاسيكية الفخمة كوجناك',
      accessories: ['نظارة طبية ذات إطار سلكي فضي', 'حقيبة يد أعمال من جلد السافيانو الأسود']
    },
    likes: 524,
    season: 'all',
    bodyType: 'average',
    budget: 'medium',
    occasion: 'Client Lunches / Office Workdays / Seminars',
    occasionAr: 'غداء العمل مع العملاء / الأيام المكتبية المفتوحة / الندوات الكبرى'
  },
  {
    id: 'outfit-9',
    title: 'Levantine Lavender Chic Resort',
    titleAr: 'إطلالة اللافندر الكاجوال المريحة',
    description: 'A stylish, highly fresh color coordination bringing lavender hues into the modern Arab wardrobe. Layered beautifully with relaxed pleated trousers, offering an outstanding aesthetic balance between comfort and style.',
    descriptionAr: 'تنسيق لوني رائد يدخل درجات اللافندر والخزامى الفاتح في طاقم الرجل العربي العصري. مدمج بذكاء وبساطة مع بنطال أبيض بكسرات ليمنح توازناً بصرياً لافتاً في العيون وجريئاً برقي.',
    category: 'casual',
    imageUrl: 'https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?auto=format&fit=crop&w=1201&q=80',
    tags: ['Casual Chic', 'Fresh Pastel', 'Pleated Chinos', 'Gentle Palette'],
    tagsAr: ['تنسيقات للكاجوال', 'ألوان الباستيل', 'شينو بكسرات', 'إطلالة عصرية'],
    items: {
      top: 'Rich Sateen Cotton Lavender Resort Shirt',
      bottom: 'Ecru Wide-Leg Tailored Fluid Trousers',
      shoes: 'Luxury White Grained Leather Slides',
      accessories: ['Silver Bracelet Ring', 'Aromatic Mint Saffron Aura']
    },
    itemsAr: {
      top: 'قميص قطني ناعم بلون اللافندر الفاخر ذي الياقة الكوبية المفتوحة',
      bottom: 'بنطال فضفاض ذو كسرات واسعة بلون عاجي ناصع خفيف',
      shoes: 'حذاء مسطح مريح بلون الثلج الطبيعي',
      accessories: ['سوار فضي مجدول ناعم', 'نظارات شمسية بعدسات زرقاء سماوية خفيفة']
    },
    likes: 367,
    season: 'summer',
    bodyType: 'slim',
    budget: 'premium',
    occasion: 'High Street Lounging & Weekend Gathering',
    occasionAr: 'التمشي في الأحياء التجارية وتجمعات عطلة نهاية الأسبوع في المقاهي الفاخرة'
  }
];
