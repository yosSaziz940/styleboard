import React from 'react';
import { Language } from '../types';
import AdZone from './AdZone';

interface AboutPageProps {
  language: Language;
}

export default function AboutPage({ language }: AboutPageProps) {
  const isAr = language === 'ar';

  const localizedText = {
    editorialSubtitle: isAr ? 'بيان الموضة وتكامل الأصالة' : 'EDITORIAL MANIFESTO',
    headLine: isAr 
      ? 'ستوديو ستايل بورد — إعادة تعريف الأناقة الكلاسيكية لرجال الشرق الأوسط' 
      : 'StyleBoard Studio — Redefining Classical Majesty for the Modern GCC Gentleman',
    p1: isAr 
      ? 'في قلب الشرق الأوسط، حيث تتلاقى عراقة المجلس العربي وثراء البشت مع خطوط الموضة الأوروبية الحديثة، ولد ستوديو ستايل بورد كأول منصة ومجلة موضة رقمية تفاعلية مخصصة كلية لأناقة الرجل العربي العصري.' 
      : 'At the historical crossroads where the luxury of the Majlis meets European minimalist lines, StyleBoard exists as the premier interactive digital lookbook dedicated to modern Middle Eastern menswear. We synthesize high-end bespoke garments tailored for the GCC climate.',
    secTitle: isAr ? 'رؤية الموضة الرقمية ٢٠٢٥' : 'Our Digital Vision for 2025',
    secText: isAr 
      ? 'الموضة ليست مجرد قوالب، بل هي امتداد للهوية. من بولو الرياض للتنسيق الرياضي الحديث، إلى الكتان المعكوس لساحل البحر المتوسط الشامي، نسعى لتمكين الشباب والرجال من تنسيق قطعهم الخاصة والتواصل مع هويتهم وثقافتهم بحرية تامة.' 
      : 'Style is an extension of cultural legacy. From Riyadh modular linen shirts to Levante-coastal relaxed trousers, our platform empowers young men in Dubai, Jeddah, Amman and beyond to curate daily outfits while honoring their cultural identity.',
    aiTitle: isAr ? 'دقة الخياطة وتناغم الذكاء الاصطناعي' : 'Artisan Meets AI Integration',
    aiText: isAr 
      ? 'لقد دمجنا أحدث نماذج التعلم العميق والذكاء الاصطناعي من جوجل (جيميني) لنقوم بتحليل صور قطع ملابسك الخاصة (القمصان والسروايل) ونقوم بإعادة دمجها واقتراح تنسيقات واقعية فوتوغرافية تظهرك بأبهى مظهر بشكل لحظي، وبشكل يتناسب مع شكل جسمك وميزانيتك.' 
      : 'We have combined age-old bespoke rules with state-of-the-art Google Gemini Visual intelligence. Modern men can upload shirts and trousers, letting our automated algorithms advise custom color palettes, proper accessories, and render photorealistic styled predictions.',
    closing: isAr ? 'تحت رعاية محرري الأناقة في دبي وبيروت والمنامة' : 'Coordinated by high-style editors across Dubai, Beirut and Riyadh.',
  };

  return (
    <div className="pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Top Leaderboard Banner */}
      <AdZone type="leaderboard" language={language} />

      <div className="max-w-3xl mx-auto mt-8 bg-white dark:bg-[#1A1A2E]/30 border border-[#E8C4A0]/20 rounded-2xl p-8 sm:p-12 shadow-sm">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#C9A96E] block mb-2 text-center">
          ⚜ {localizedText.editorialSubtitle} ⚜
        </span>
        
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] dark:text-white tracking-tight leading-snug text-center mb-8">
          {localizedText.headLine}
        </h1>

        {/* Vintage Styled separator */}
        <div className="w-12 h-1 bg-[#C9A96E] mx-auto mb-10 rounded-full" />

        {/* First big paragraph with big Dropcap */}
        <div className="prose dark:prose-invert">
          <p className="font-sans text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 first-letter:text-5xl first-letter:font-serif first-letter:font-black first-letter:text-[#C9A96E] first-letter:mr-2">
            {localizedText.p1}
          </p>

          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A2E] dark:text-[#E8C4A0] tracking-tight mt-10 mb-4">
            {localizedText.secTitle}
          </h2>
          <p className="font-sans text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            {localizedText.secText}
          </p>

          {/* Core Ad Zone */}
          <div className="my-8 flex justify-center">
            <AdZone type="rectangle" language={language} />
          </div>

          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A2E] dark:text-[#E8C4A0] tracking-tight mt-10 mb-4">
            {localizedText.aiTitle}
          </h2>
          <p className="font-sans text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            {localizedText.aiText}
          </p>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 pt-6 mt-12 text-center">
          <span className="font-serif italic text-xs text-[#C9A96E]">
            {localizedText.closing}
          </span>
        </div>
      </div>
    </div>
  );
}
