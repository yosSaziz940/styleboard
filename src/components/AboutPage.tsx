import React, { useState } from 'react';
import { Language } from '../types';
import AdZone from './AdZone';
import { 
  Sparkles, 
  BookOpen, 
  CheckCircle, 
  Mail, 
  ShieldCheck, 
  FileText, 
  Send, 
  Check, 
  Lock, 
  HelpCircle, 
  AlertTriangle, 
  Phone, 
  Building,
  ArrowUpRight
} from 'lucide-react';

interface AboutPageProps {
  language: Language;
  activeSection?: 'about' | 'contact' | 'privacy' | 'terms';
  setActiveSection?: (section: 'about' | 'contact' | 'privacy' | 'terms') => void;
}

export default function AboutPage({ 
  language, 
  activeSection = 'about', 
  setActiveSection 
}: AboutPageProps) {
  const isAr = language === 'ar';
  
  // Local state as fallback if props are not provided
  const [localSection, setLocalSection] = useState<'about' | 'contact' | 'privacy' | 'terms'>('about');
  const currentSection = setActiveSection ? activeSection : localSection;
  const changeSection = (sec: 'about' | 'contact' | 'privacy' | 'terms') => {
    if (setActiveSection) {
      setActiveSection(sec);
    } else {
      setLocalSection(sec);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Contact Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    // Reset form fields
    setTimeout(() => {
      setName('');
      setEmail('');
      setSubject('general');
      setMessage('');
    }, 100);
  };

  return (
    <div className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-300 animate-fadeIn">
      {/* Ad Leaderboard Banner */}
      <AdZone type="leaderboard" language={language} />

      {/* Hero Header */}
      <div className="text-center mt-6 mb-12">
        <span className="px-3 py-1 bg-[#FAF7F4] dark:bg-zinc-900/60 text-[#C9A96E] text-[10px] font-black tracking-widest rounded-full uppercase border border-[#E8C4A0]/20 inline-block mb-3">
          ✨ {isAr ? 'مركز المعلومات والدعم والسياسات' : 'STYLEBOARD TRUST & POLICY CENTER'}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#1A1A2E] dark:text-white leading-tight">
          {isAr ? 'عن ستايل بورد وسياسات النشر والاتصال' : 'Trust, Transparency & Corporate Standards'}
        </h1>
        <p className="mt-4 text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
          {isAr 
            ? 'اطلع على قصة نجاحنا، وتواصل مع خبرائنا، أو راجع سياسات الخصوصية والأحكام العامة المتوافقة مع معايير جوجل إدسينس العالمية.' 
            : 'Access our brand manifesto, reach out to our team, or review our AdSense-compliant privacy framework and terms of use.'}
        </p>
      </div>

      {/* Main Two-Column Hub Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar/Drawer Column */}
        <div className="lg:col-span-1 space-y-3">
          <div className="sticky top-6 bg-white dark:bg-[#1A1A2E]/40 border border-[#E8C4A0]/20 rounded-2xl p-4 sm:p-5 shadow-sm space-y-1.5">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#C9A96E] block mb-3 px-2">
              🧭 {isAr ? 'قائمة الاستكشاف' : 'DOCUMENT INDEX'}
            </span>

            {/* About Us Tab Button */}
            <button
              onClick={() => changeSection('about')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                isAr ? 'text-right' : 'text-left'
              } ${
                currentSection === 'about'
                  ? 'bg-[#1A1A2E] dark:bg-[#C9A96E] text-white dark:text-[#1A1A2E] shadow-sm font-extrabold'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-[#FAF7F4] dark:hover:bg-zinc-900/40 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#C9A96E] shrink-0" />
              <span>{isAr ? 'عن ستايل بورد' : 'About Us / Manifesto'}</span>
            </button>

            {/* Contact Us Tab Button */}
            <button
              onClick={() => changeSection('contact')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                isAr ? 'text-right' : 'text-left'
              } ${
                currentSection === 'contact'
                  ? 'bg-[#1A1A2E] dark:bg-[#C9A96E] text-white dark:text-[#1A1A2E] shadow-sm font-extrabold'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-[#FAF7F4] dark:hover:bg-zinc-900/40 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Mail className="w-4 h-4 text-[#C9A96E] shrink-0" />
              <span>{isAr ? 'اتصل بنا والشكاوى' : 'Contact Us & Helpdesk'}</span>
            </button>

            {/* Privacy Policy Tab Button */}
            <button
              onClick={() => changeSection('privacy')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                isAr ? 'text-right' : 'text-left'
              } ${
                currentSection === 'privacy'
                  ? 'bg-[#1A1A2E] dark:bg-[#C9A96E] text-white dark:text-[#1A1A2E] shadow-sm font-extrabold'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-[#FAF7F4] dark:hover:bg-zinc-900/40 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#C9A96E] shrink-0" />
              <span>{isAr ? 'سياسة الخصوصية والكوكيز' : 'Privacy & Cookie Policy'}</span>
            </button>

            {/* Terms & Conditions Tab Button */}
            <button
              onClick={() => changeSection('terms')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                isAr ? 'text-right' : 'text-left'
              } ${
                currentSection === 'terms'
                  ? 'bg-[#1A1A2E] dark:bg-[#C9A96E] text-white dark:text-[#1A1A2E] shadow-sm font-extrabold'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-[#FAF7F4] dark:hover:bg-zinc-900/40 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4 text-[#C9A96E] shrink-0" />
              <span>{isAr ? 'الشروط والأحكام العامة' : 'Terms & Conditions'}</span>
            </button>

            {/* Regulatory Badge */}
            <div className="pt-4 mt-4 border-t border-gray-150 dark:border-zinc-800 text-[10px] text-gray-400 leading-relaxed px-2 space-y-2">
              <div className="flex items-center gap-1.5 text-[#C9A96E] font-bold">
                <Check className="w-3.5 h-3.5" />
                <span>AdSense Compliant 2026</span>
              </div>
              <p>StyleBoard operates strictly under the Google Publisher Policies & Restrictions guidelines.</p>
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-[#1A1A2E]/20 border border-[#E8C4A0]/20 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-md relative overflow-hidden">
            
            {/* Background design accents */}
            <div className="absolute top-0 right-0 p-8 opacity-[0.02] dark:opacity-[0.04] text-[#C9A96E] pointer-events-none select-none font-serif font-black text-[120px]">
              {currentSection.toUpperCase()}
            </div>

            {/* SECTION 1: ABOUT US */}
            {currentSection === 'about' && (
              <div className="space-y-8 text-left">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C9A96E]">
                    ⚜ {isAr ? 'قصة التأسيس والأثر' : 'EDITORIAL MANIFESTO'}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#1A1A2E] dark:text-white mt-1">
                    {isAr ? 'عن ستوديو ستايل بورد العربي' : 'About StyleBoard Luxury Studio'}
                  </h2>
                </div>

                <div className="prose dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300 space-y-6">
                  <p className="first-letter:text-4xl first-letter:font-black first-letter:text-[#C9A96E] first-letter:mr-2">
                    {isAr 
                      ? 'تأسس ستوديو ستايل بورد كأول منصة رقمية تفاعلية ومجلة دورية متخصصة تهدف لإثراء وبناء خزانة ملابس الرجل العربي المعاصر. من واقع تفاعلي مشمس وتنافس عالمي، نسعى لتقديم رؤى بصرية وألوان ترابية تمنح هيبة مريحة وثقة دائمة تتلاءم مع طبيعة ومناخ الشرق الأوسط والخليج العربي.' 
                      : 'StyleBoard was established as an elite interactive lookbook and editorial platform curated specifically for the contemporary Middle Eastern gentleman. By blending traditional Arab garments—like structured linen vests and clean thobe silhouettes—with modern casual knits, we define what it means to dress with unyielding dignity in warm climates.'}
                  </p>

                  <h3 className="font-serif text-lg font-bold text-[#1A1A2E] dark:text-[#E8C4A0] pt-4">
                    {isAr ? 'رؤيتنا المبتكرة للمستقبل' : 'Our Digital Vision'}
                  </h3>
                  <p>
                    {isAr
                      ? 'نحن نؤمن بأن المظهر الخارجي هو امتداد للهوية العميقة للأفراد. لذلك نوفر أدوات فوتوغرافية ومعاينات مطابقة ذكية تمكنك من دمج القطع العادية مثل قمصان الكتان الإيطالية وبناطيل الشينو بكسرات وتحويلها لأطقم تعبر عن السيادة والرقي في بيئات العمل، المنتجعات الصيفية، والمجالس الفخمة.'
                      : 'We believe styling is an extension of cultural legacy and personal drive. Our mission is to democratize high-level color coordination and fabric pairing. We empower you to build a versatile wardrobe using breathable fabrics and exact chromatic balances, perfect for boardrooms, resorts, and majlises.'}
                  </p>

                  <h3 className="font-serif text-lg font-bold text-[#1A1A2E] dark:text-[#E8C4A0] pt-4">
                    {isAr ? 'تكامل تكنولوجيا الذكاء الاصطناعي مع جيميني' : 'Artificial Intelligence Integration'}
                  </h3>
                  <p>
                    {isAr
                      ? 'لتحقيق هذه الرؤية بالكامل، دمجنا في صميم المنصة برمجيات ذكاء اصطناعي ثورية بالتعاون مع Google Gemini API. تتيح لك هذه الأداة التقاط صور لملابسك الخاصة الحالية، ومقارنتها الذكية لتوليد أطقم وتنسيقات مناسبة لشكل جسمك، والموسم، والمناسبة في غضون ثوانٍ قليلة، مع اقتراح إكسسوارات كلاسيكية تمنح الطقم تفوقاً ملحوظاً.'
                      : 'To fulfill this vision, StyleBoard integrates advanced server-side models powered by Google Gemini. Our custom AI Closet tool analyzes your existing shirts and trousers, computes their exact hex color coordinates, assesses their fit, and returns custom styling reports, seasonal scores, and photorealistic virtual showrooms in real time.'}
                  </p>
                </div>

                {/* Team / Editors Board */}
                <div className="pt-8 border-t border-gray-150 dark:border-zinc-800">
                  <h4 className="font-serif text-xs font-black tracking-widest text-[#C9A96E] uppercase mb-4">
                    {isAr ? 'مجلس التحرير والتقييم الفني' : 'EDITORIAL & STYLE CURATORIAL BOARD'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="p-4 bg-[#FAF7F4] dark:bg-zinc-950/40 rounded-xl border border-gray-100 dark:border-zinc-800">
                      <span className="text-xs font-black text-[#1A1A2E] dark:text-white block">Tariq Al-Mansoor</span>
                      <span className="text-[10px] text-gray-400 block mt-0.5">{isAr ? 'كبير محرري الكتان والمنتجعات' : 'Senior Resortwear Curator'}</span>
                    </div>
                    <div className="p-4 bg-[#FAF7F4] dark:bg-zinc-950/40 rounded-xl border border-gray-100 dark:border-zinc-800">
                      <span className="text-xs font-black text-[#1A1A2E] dark:text-white block">Karim Al-Husseini</span>
                      <span className="text-[10px] text-gray-400 block mt-0.5">{isAr ? 'مستشار بدلات الأعمال والشركات' : 'Corporate Tailoring Lead'}</span>
                    </div>
                    <div className="p-4 bg-[#FAF7F4] dark:bg-zinc-950/40 rounded-xl border border-gray-100 dark:border-zinc-800">
                      <span className="text-xs font-black text-[#1A1A2E] dark:text-white block">Nour Al-Sabah</span>
                      <span className="text-[10px] text-gray-400 block mt-0.5">{isAr ? 'مديرة المطابقة اللونية الرقمية' : 'Head of Digital Chromatics'}</span>
                    </div>
                  </div>
                </div>

                {/* Sub Ad Unit */}
                <div className="pt-4 flex justify-center">
                  <AdZone type="rectangle" language={language} />
                </div>
              </div>
            )}

            {/* SECTION 2: CONTACT US */}
            {currentSection === 'contact' && (
              <div className="space-y-8 text-left">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C9A96E]">
                    📬 {isAr ? 'الدعم السريع وحل الشكاوى' : 'COMMUNICATION & SUPPORT CENTRE'}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#1A1A2E] dark:text-white mt-1">
                    {isAr ? 'اتصل بنا ودعم مستخدمي ستايل بورد' : 'Contact Us & Compliance Feedback'}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {isAr 
                      ? 'يسر فريقنا الفني والتحريري سماع آرائكم. نلتزم بالرد على جميع الرسائل والطلبات القانونية في غضون ٢٤ ساعة.' 
                      : 'Our support and regulatory desks remain fully active. Submit general inquiries, design requests, or ad compliance notices.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Contact Info Sidebar */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-5 bg-[#FAF7F4] dark:bg-zinc-950/40 border border-[#E8C4A0]/20 rounded-2xl space-y-4">
                      <h4 className="font-serif text-sm font-bold text-[#1A1A2E] dark:text-white mb-2">
                        {isAr ? 'معلومات الاتصال المباشر' : 'Direct Contact Nodes'}
                      </h4>

                      <div className="flex items-start gap-3.5 text-xs">
                        <Mail className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold block text-gray-600 dark:text-gray-300">{isAr ? 'البريد الإلكتروني للعلامة التجارية' : 'Direct Editorial Desk'}</span>
                          <span className="font-mono text-[11px] text-gray-400">editorial@styleboard.com</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3.5 text-xs">
                        <ShieldCheck className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold block text-gray-600 dark:text-gray-300">{isAr ? 'شؤون الامتثال وجوجل إدسينس' : 'AdSense Compliance & DPO'}</span>
                          <span className="font-mono text-[11px] text-gray-400">compliance@styleboard.com</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3.5 text-xs">
                        <Building className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold block text-gray-600 dark:text-gray-300">{isAr ? 'المكتب الرئيسي ومقر النشر' : 'HQ Publishing Location'}</span>
                          <span className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                            {isAr 
                              ? 'برج الفخامة، الطابق الرابع، حي دبي للتصميم، دبي، الإمارات العربية المتحدة' 
                              : 'Lux Tower, Level 4, Dubai Design District (d3), Dubai, United Arab Emirates'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 border border-amber-600/20 bg-amber-500/5 rounded-2xl text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed space-y-2">
                      <div className="flex items-center gap-1 text-amber-600 dark:text-amber-500 font-bold">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>{isAr ? 'مكافحة النقر الاحتيالي للأدوات الإعلانية' : 'Fraud Prevention Notice'}</span>
                      </div>
                      <p>
                        {isAr
                          ? 'تطبيقاً لسياسات AdSense، يرجى عدم النقر على الإعلانات بشكل متكرر أو صناعي. يقوم نظامنا بمسح وحظر الزيارات الاحتيالية لحماية المعلنين.'
                          : 'To comply with AdSense rules, please do not click ads repetitively. We inspect all incoming sources and block manipulative traffic patterns.'}
                      </p>
                    </div>
                  </div>

                  {/* Contact Interactive Form */}
                  <div className="lg:col-span-7">
                    {submitted ? (
                      <div className="border border-[#E8C4A0]/20 bg-[#FAF7F4] dark:bg-zinc-950/60 p-8 rounded-2xl text-center space-y-4 transition-all duration-300 animate-scaleIn">
                        <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
                          <Check className="w-6 h-6" />
                        </div>
                        <h4 className="font-serif text-lg font-bold text-[#1A1A2E] dark:text-white">
                          {isAr ? 'تم إرسال رسالتكم بنجاح! ⚜' : 'Message Transmitted Successfully! ⚜'}
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {isAr 
                            ? 'شكراً لتواصلكم معنا. تم تسجيل تذكرة الدعم الخاصة بكم، وسوف يتواصل معكم أحد مراجعي الأناقة أو مسؤولي الامتثال في أقرب وقت ممكن.' 
                            : 'Thank you for reaching out. Your trust ticket has been generated. An expert curator or compliance officer will reply within 24 hours.'}
                        </p>
                        <button 
                          onClick={() => setSubmitted(false)}
                          className="mt-2 text-xs font-extrabold text-[#C9A96E] hover:underline cursor-pointer"
                        >
                          {isAr ? 'إرسال رسالة أخرى' : 'Send Another Inquiry'}
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 block mb-1.5">
                              {isAr ? 'الاسم الكامل' : 'Your Full Name'}
                            </label>
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder={isAr ? 'مثال: فيصل الحربي' : 'e.g. Faisal Al-Harbi'}
                              className="w-full px-4 py-3 bg-[#FAF7F4] dark:bg-zinc-950/40 border border-gray-150 dark:border-zinc-800 rounded-xl text-xs sm:text-sm focus:border-[#C9A96E] focus:outline-none transition-colors"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 block mb-1.5">
                              {isAr ? 'البريد الإلكتروني' : 'Your Email Address'}
                            </label>
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="faisal@example.com"
                              className="w-full px-4 py-3 bg-[#FAF7F4] dark:bg-zinc-950/40 border border-gray-150 dark:border-zinc-800 rounded-xl text-xs sm:text-sm focus:border-[#C9A96E] focus:outline-none transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 block mb-1.5">
                            {isAr ? 'فئة الاستفسار والمطابقة' : 'Inquiry Category'}
                          </label>
                          <select
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full px-4 py-3 bg-[#FAF7F4] dark:bg-zinc-950/40 border border-gray-150 dark:border-zinc-800 rounded-xl text-xs sm:text-sm focus:border-[#C9A96E] focus:outline-none transition-colors"
                          >
                            <option value="general">{isAr ? 'استفسار عام عن الموضة وتنسيق الأطقم' : 'General Styling / Outfit Inquiry'}</option>
                            <option value="adsense">{isAr ? 'ملاحظات وبلاغات الامتثال للإعلانات' : 'AdSense Compliance & Placement'}</option>
                            <option value="privacy">{isAr ? 'حقوق الخصوصية وحذف بيانات الكوكيز' : 'Data Privacy (GDPR/CCPA/AI)'}</option>
                            <option value="partnership">{isAr ? 'شراكات العلامات التجارية الفاخرة' : 'Bespoke Brand Collaborations'}</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 block mb-1.5">
                            {isAr ? 'الرسالة أو تفاصيل بلاغك الفني' : 'Message / Details of Your Report'}
                          </label>
                          <textarea
                            required
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={isAr ? 'اكتب تفاصيل رسالتك أو شكواك هنا...' : 'Explain your feedback or inquiry in detail here...'}
                            className="w-full px-4 py-3 bg-[#FAF7F4] dark:bg-zinc-950/40 border border-gray-150 dark:border-zinc-800 rounded-xl text-xs sm:text-sm focus:border-[#C9A96E] focus:outline-none transition-colors"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-4 bg-[#1A1A2E] hover:bg-[#C9A96E] text-white dark:bg-[#C9A96E] dark:hover:bg-[#E8C4A0] dark:text-[#1A1A2E] font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{isAr ? 'إرسال الرسالة للمراجعة الفورية' : 'Transmit Message to Desk'}</span>
                        </button>
                      </form>
                    )}
                  </div>

                </div>
              </div>
            )}

            {/* SECTION 3: PRIVACY POLICY */}
            {currentSection === 'privacy' && (
              <div className="space-y-8 text-left">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C9A96E]">
                    🛡 {isAr ? 'إفصاح الشفافية والأمان والملفات' : 'TRUST & SECURITY FRAMEWORK'}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#1A1A2E] dark:text-white mt-1">
                    {isAr ? 'سياسة الخصوصية واستخدام كوكيز الإعلانات' : 'Privacy & Cookie Consent Policy'}
                  </h2>
                  <p className="text-[11px] text-gray-400 mt-2">
                    {isAr ? 'آخر تحديث: يوليو ٢٠٢٦' : 'Effective Date: July 14, 2026'}
                  </p>
                </div>

                <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-gray-600 dark:text-gray-300 space-y-6 leading-relaxed">
                  
                  {/* Scope */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-base font-bold text-[#1A1A2E] dark:text-[#E8C4A0] flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#C9A96E]" />
                      <span>{isAr ? '١. مقدمة ونطاق سياسة الخصوصية' : '1. Overview & Data Philosophy'}</span>
                    </h3>
                    <p>
                      {isAr
                        ? 'في ستايل بورد، نضع خصوصية مستخدمينا وزوارنا على رأس أولوياتنا. نلتزم بحماية أي معلومات يتم جمعها أثناء تصفحك للموقع أو استخدام منسق الملابس الذكي. توضح هذه السياسة كيفية تفاعلنا مع بياناتك وكيفية امتثالنا لمعايير حماية البيانات العالمية بما في ذلك اللائحة العامة لحماية البيانات (GDPR) وقانون خصوصية المستهلك في كاليفورنيا (CCPA).'
                        : 'At StyleBoard, your personal privacy and the integrity of your digital workspace are paramount. We collect, host, and proxy information under absolute security parameters. This document clarifies what cookies are placed on your terminal, how we prevent deceptive activity, and how our Google AdSense components operate in total harmony with global data rights.'}
                    </p>
                  </div>

                  {/* Google AdSense, DoubleClick DART Cookies & Third Party Advertising */}
                  <div className="space-y-2 border-l-2 border-[#C9A96E]/30 pl-4">
                    <h3 className="font-serif text-base font-bold text-[#1A1A2E] dark:text-[#E8C4A0] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#C9A96E]" />
                      <span>{isAr ? '٢. كوكيز الإعلانات والطرف الثالث (Google AdSense)' : '2. Google AdSense & DoubleClick Cookies'}</span>
                    </h3>
                    <p>
                      {isAr
                        ? 'يستخدم موقعنا أدوات وبرمجيات إعلانية تقدمها شركة جوجل (Google AdSense) لعرض الإعلانات الممولة للزوار. تستخدم جوجل ملفات تعريف الارتباط (Cookies) لعرض إعلانات مخصصة بناءً على زياراتك السابقة لموقعنا أو مواقع ويب أخرى على الإنترنت.'
                        : 'Google, as a third-party vendor, uses cookies to serve targeted advertisements on StyleBoard. Google’s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.'}
                    </p>
                    <p>
                      {isAr
                        ? 'يمكن للمستخدمين اختيار تعطيل الإعلانات المخصصة عن طريق الانتقال إلى إعدادات إعلانات جوجل. كما يمكنك مراجعة سياسة خصوصية شبكة إعلانات ومحتوى جوجل لمعرفة المزيد حول طرق الحماية المتاحة لك.'
                        : 'Users may opt out of personalized advertising by visiting Google Ads Settings (https://www.google.com/settings/ads) or aboutads.info to opt out of a third-party vendor’s use of cookies for personalized advertising.'}
                    </p>
                  </div>

                  {/* AdSense Program Policies Compliance */}
                  <div className="space-y-2 p-4 bg-amber-500/5 border border-amber-600/10 rounded-2xl">
                    <h3 className="font-serif text-base font-bold text-[#1A1A2E] dark:text-[#E8C4A0] flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#C9A96E]" />
                      <span>{isAr ? '٣. التزام صارم ببروتوكول مكافحة التلاعب بالإعلانات' : '3. AdSense Compliance Integrity Protocol'}</span>
                    </h3>
                    <p>
                      {isAr
                        ? 'نحن في ستايل بورد نمتثل امتثالاً صارماً وغير مشروط لجميع سياسات برنامج Google AdSense. لا نستخدم أو نشجع على النقر الاحتيالي (Invalid Clicks)، ولا نطالب أو نحفز زوارنا على النقر على الإعلانات أو مشاهدتها بشكل قسري أو خداعي. جميع الوحدات الإعلانية معزولة بالكامل، ومميزة بوضوح بعبارة "مساحة إعلانات جوجل" أو "Sponsored Advertisement"، وتوضع في أماكن خالية تماماً من الروابط التفاعلية والتنقل لتفادي النقرات غير المقصودة.'
                        : 'We strictly comply with Google AdSense Publisher Policies. We prohibit the use of manual or automated mechanisms designed to artificially inflate impressions or click-through rates. Under no circumstances do we offer compensation, deceptive visuals, or click incentives. All advertisement zones are fully isolated from primary navigation links, preventing accidental clicks.'}
                    </p>
                  </div>

                  {/* AI Closet & Gemini Data Privacy */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-base font-bold text-[#1A1A2E] dark:text-[#E8C4A0] flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#C9A96E]" />
                      <span>{isAr ? '٤. خصوصية منسق الملابس الذكي وبيانات Gemini' : '4. AI Closet & Google Gemini Data Protocol'}</span>
                    </h3>
                    <p>
                      {isAr
                        ? 'عند استخدام منسق الملابس الذكي ورفع صور ملابسك الخاصة (مثل القمصان والبناطيل): يتم حفظ هذه الصور ومسارها حصرياً وبشكل مؤقت في التخزين المحلي لمتصفحك الخاص (localStorage) من أجل توفير المعاينة الفورية. لا يتم إرسال صورك الفعلية أو وجوهك أو تفاصيلك الحساسة إلى خوادمنا الدائمة، ولا نقوم ببناء قواعد بيانات لحفظ صور المستخدمين الشخصية.'
                        : 'When uploading images or parameters to our AI Closet, all file processing is handled via standard secure server-side APIs that communicate directly with the Google Gemini models. We never store your personal clothing images or biometric details in persistent databases. They remain inside your browser session memory (localStorage) to give you instant local rendering with no structural server risk.'}
                    </p>
                  </div>

                  {/* Global User Rights (GDPR / CCPA) */}
                  <div className="space-y-2 text-xs">
                    <h3 className="font-serif text-base font-bold text-[#1A1A2E] dark:text-[#E8C4A0] flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#C9A96E]" />
                      <span>{isAr ? '٥. حقوقك القانونية وخيار حذف البيانات' : '5. Legal Rights, Opt-Outs & DPO Contact'}</span>
                    </h3>
                    <p>
                      {isAr
                        ? 'بموجب القوانين الدولية لحماية البيانات، لديك الحق في: طلب تصدير البيانات المخزنة، سحب موافقتك على الكوكيز في أي وقت، أو المطالبة بحذف جميع التفضيلات. لتقديم أي طلب متعلق ببياناتك، يرجى تزويدنا بتفاصيلك عبر البريد الإلكتروني المخصص للخصوصية compliance@styleboard.com.'
                        : 'You retain full access, portability, and deletion rights under GDPR/CCPA regulations. If you wish to purge local state data or report third-party ad violations, contact our dedicated Data Protection Officer directly at compliance@styleboard.com.'}
                    </p>
                  </div>

                </div>
              </div>
            )}

            {/* SECTION 4: TERMS & CONDITIONS */}
            {currentSection === 'terms' && (
              <div className="space-y-8 text-left">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C9A96E]">
                    ⚖ {isAr ? 'الاتفاقية والالتزامات القانونية للمستخدم' : 'LEGAL FRAMEWORK AGREEMENT'}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#1A1A2E] dark:text-white mt-1">
                    {isAr ? 'الشروط والأحكام العامة لاستخدام المنصة' : 'Terms & Conditions of Use'}
                  </h2>
                  <p className="text-[11px] text-gray-400 mt-2">
                    {isAr ? 'آخر تحديث: يوليو ٢٠٢٦' : 'Effective Date: July 14, 2026'}
                  </p>
                </div>

                <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-gray-600 dark:text-gray-300 space-y-6 leading-relaxed">
                  
                  {/* Acceptance of Terms */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-base font-bold text-[#1A1A2E] dark:text-[#E8C4A0] flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#C9A96E]" />
                      <span>{isAr ? '١. قبول الاتفاقية والشروط العامة' : '1. Binding Acceptance of Terms'}</span>
                    </h3>
                    <p>
                      {isAr
                        ? 'باستخدامك لموقع ستايل بورد، فإنك توافق بالكامل وبلا قيد أو شرط على الالتزام بهذه الشروط والأحكام وسياسة الخصوصية الخاصة بنا. إذا كنت لا توافق على أي بند من هذه البنود، يرجى التوقف فوراً عن استخدام أدوات الموقع أو تصفح مقالاته.'
                        : 'By entering and browsing StyleBoard, you accept and agree to be bound by these Terms and Conditions. If you do not agree with any of these statements, please discontinue accessing our AI toolsets, blogs, or showrooms immediately.'}
                    </p>
                  </div>

                  {/* Acceptable Use and AdSense Safeguards */}
                  <div className="space-y-2 p-4 bg-[#FAF7F4] dark:bg-zinc-950/40 border border-gray-150 dark:border-zinc-800 rounded-2xl">
                    <h3 className="font-serif text-base font-bold text-[#1A1A2E] dark:text-[#E8C4A0] flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#C9A96E]" />
                      <span>{isAr ? '٢. الاستخدام المقبول وحماية إعلانات جوجل من التلاعب' : '2. Anti-Abuse & Google AdSense Safeguards'}</span>
                    </h3>
                    <p>
                      {isAr
                        ? 'نضع حماية معلني جوجل في صميم سياستنا. يُمنع منعاً باتاً ممارسة أي مما يلي:'
                        : 'To maintain high advertiser trust, users are strictly prohibited from engaging in:'}
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 mt-2 text-gray-500">
                      <li>
                        {isAr
                          ? 'استخدام برمجيات آلية، أو بوتات، أو نقرات مصطنعة لرفع عدد المشاهدات أو معدل النقر على الإعلانات.'
                          : 'Utilizing automated scrapers, bots, or click-inflation programs to simulate artificial page views or clicks.'}
                      </li>
                      <li>
                        {isAr
                          ? 'تنفيذ أي هجوم إلكتروني بهدف إخراج الخدمة أو التلاعب بموقع الإعلانات وجعلها خادعة ومربكة للزوار.'
                          : 'Hijacking ad placements or rewriting stylesheets to intentionally masquerade Google banners as native UI elements.'}
                      </li>
                      <li>
                        {isAr
                          ? 'إساءة استخدام نموذج الاتصال أو نموذج الرفع الذكي برفع ملفات تحتوي برمجيات خبيثة أو محتوى مسيء.'
                          : 'Uploading malicious scripts or spamming our Contact Center with illegal, deceptive, or threatening submissions.'}
                      </li>
                    </ul>
                  </div>

                  {/* Site Behavior & Navigation Safety */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-base font-bold text-[#1A1A2E] dark:text-[#E8C4A0] flex items-center gap-2">
                      <ArrowUpRight className="w-4 h-4 text-[#C9A96E]" />
                      <span>{isAr ? '٣. نزاهة سلوك الموقع وروابط التنقل' : '3. Technical Transparency & Viewing Frames'}</span>
                    </h3>
                    <p>
                      {isAr
                        ? 'تلتزم إدارة ستايل بورد بتوفير بيئة تصفح خالية تماماً من سلوكيات التضليل. لا يحتوي الموقع على نوافذ منبثقة (pop-ups) مزعجة، ولا يقوم بتغيير تفضيلات متصفحك أو إطلاق تحميل ملفات تلقائية دون علمك. جميع الروابط المعروضة تؤدي بدقة إلى محتوى حقيقي متوفر فعلياً في مجلاتنا.'
                        : 'StyleBoard is designed for seamless user interaction with zero deceptive redirects. We guarantee that this portal does not initiate automatic downloads, display pop-unders, or execute malicious background tasks. We also enforce technical compliance if accessed via mobile applications (requiring WebView API for Ads, Chrome Custom Tabs, or iOS SFSafariViewController).'}
                    </p>
                  </div>

                  {/* Intellectual Property & Styling Disclaimer */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-base font-bold text-[#1A1A2E] dark:text-[#E8C4A0] flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#C9A96E]" />
                      <span>{isAr ? '٤. الملكية الفكرية وإخلاء المسؤولية عن تصميمات الذكاء الاصطناعي' : '4. Intellectual Property & Styling Disclaimers'}</span>
                    </h3>
                    <p>
                      {isAr
                        ? 'جميع محتويات المنصة من مقالات فنية، صور، وأكواد تصميمية هي ملك حصري لـ ستايل بورد. إن التوصيات والأطقم المقترحة من قبل الذكاء الاصطناعي هي بغرض الإلهام الفني والاستئناس البصري فقط، ولا تشكل أي التزام أو نصيحة تجارية ملزمة لشراء سلع من علامات تجارية محددة.'
                        : 'All editorial columns, styled catalogs, custom graphic structures, and AI alignment codes are the intellectual property of StyleBoard. AI-generated combinations and style grades are provided for creative inspiration only. We make no warranty that matching retail items are available or discounted.'}
                    </p>
                  </div>

                  {/* Sensitive Events Policy */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-base font-bold text-[#1A1A2E] dark:text-[#E8C4A0] flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#C9A96E]" />
                      <span>{isAr ? '٥. بروتوكول التعامل مع الأحداث الحساسة والأزمات' : '5. Sensitive Events Protocol'}</span>
                    </h3>
                    <p>
                      {isAr
                        ? 'خلال فترات الأزمات العالمية أو الأحداث الحساسة غير المتوقعة، نلتزم بحق مجتمعاتنا في الأمان التام. نحتفظ بالحق الكامل في تعديل توزيع الإعلانات أو تقييد محتويات المنصة مؤقتاً بما يتوافق مع معايير السلامة العامة وسياسات النشر الحساسة لشركة جوجل.'
                        : 'During unforeseen global or regional crises (Sensitive Events), we strictly align our platform with safety guidelines. We reserve the right to alter ad densities or modify editorial contents dynamically to prioritize factual safety and respect.'}
                    </p>
                  </div>

                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
