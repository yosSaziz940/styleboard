import React, { useEffect } from 'react';
import { Language } from '../types';

interface AdZoneProps {
  type: 'leaderboard' | 'rectangle' | 'in-feed' | 'sticky-footer';
  language: Language;
}

/**
 * AdZone - Empty Google AdSense Placeholder Integrator.
 * 
 * To activate Google AdSense on your live website:
 * 1. Put the main Google AdSense script in your `/index.html` <head>:
 *    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID" crossorigin="anonymous"></script>
 * 
 * 2. In this file, replace "ca-pub-YOUR_PUBLISHER_ID" with your real AdSense Publisher ID.
 * 3. Replace the "YOUR_AD_SLOT_ID" with the specific Ad Unit IDs you created in your Google AdSense Dashboard.
 */
export default function AdZone({ type, language }: AdZoneProps) {
  const isAr = language === 'ar';

  useEffect(() => {
    // This triggers the AdSense script to load the ad inside the placeholder
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // Suppress logs in dev if AdSense script is not loaded yet
    }
  }, []);

  // Map ad configurations to their corresponding dimensions & classes
  const getAdConfig = () => {
    switch (type) {
      case 'leaderboard':
        return {
          className: 'w-full max-w-[728px] min-h-[90px] mx-auto my-4 flex items-center justify-center',
          slotId: '1234567890', // Replace with your Leaderboard Ad Slot ID
          format: 'horizontal',
        };
      case 'rectangle':
        return {
          className: 'w-[300px] min-h-[250px] mx-auto my-4 flex items-center justify-center',
          slotId: '2345678901', // Replace with your Medium Rectangle Ad Slot ID
          format: 'rectangle',
        };
      case 'in-feed':
        return {
          className: 'w-full max-w-[600px] min-h-[120px] mx-auto my-4 flex items-center justify-center',
          slotId: '3456789012', // Replace with your In-Feed Ad Slot ID
          format: 'fluid',
        };
      case 'sticky-footer':
        return {
          className: 'fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#12121e]/95 border-t border-gray-200 dark:border-gray-800 min-h-[50px] md:hidden flex items-center justify-center',
          slotId: '4567890123', // Replace with your Sticky Anchor Ad Slot ID
          format: 'horizontal',
        };
      default:
        return null;
    }
  };

  const config = getAdConfig();
  if (!config) return null;

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Dev preview border so you know where Google will render your Adsense banner */}
      <div className="w-full text-center">
        <span className="text-[8px] uppercase tracking-widest text-gray-400 font-mono block mb-1">
          {isAr ? 'مساحة إعلانات جوجل التلقائية' : 'Google AdSense Zone'}
        </span>
      </div>

      <div className={`${config.className} overflow-hidden border border-dashed border-gray-200 dark:border-gray-800/60 rounded-xl bg-transparent`}>
        {/* Real Google AdSense Tag Structure */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client="2345678901" // Replace with your Google Publisher ID
          data-ad-slot={config.slotId}
          data-ad-format={config.format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
