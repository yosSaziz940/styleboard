import React, { useEffect, useRef } from 'react';
import { Language } from '../types';

interface AdZoneProps {
  type: 'leaderboard' | 'rectangle' | 'in-feed' | 'sticky-footer' | 'native';
  language: Language;
}

/**
 * AdZone - High-Performance CPM Ad Network Integrator.
 * 
 * Dynamically mounts and executes the exact keys, heights, and formats
 * provided for the application's advertising program.
 */
export default function AdZone({ type, language }: AdZoneProps) {
  const isAr = language === 'ar';
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous elements to prevent multiple ads rendering on hot reload
    container.innerHTML = '';

    // Handle Native Ad Container
    if (type === 'native') {
      const adDiv = document.createElement('div');
      adDiv.id = 'container-27a6cca675c99e5f60e971b28c914bd0';
      container.appendChild(adDiv);

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://pl30418891.effectivecpmnetwork.com/27a6cca675c99e5f60e971b28c914bd0/invoke.js';
      container.appendChild(script);
      return;
    }

    // Config map for the standard banner slots
    const configs = {
      leaderboard: {
        key: '933d61b7533dc555095c525bf5b34b5a',
        format: 'iframe',
        height: 90,
        width: 728,
        params: {}
      },
      rectangle: {
        key: 'c56887eed1a82494b3be76d5da964eea',
        format: 'iframe',
        height: 250,
        width: 300,
        params: {}
      },
      'in-feed': {
        key: '61a8a35e8709315556bb40a5e933b2c2',
        format: 'iframe',
        height: 60,
        width: 468,
        params: {}
      },
      'sticky-footer': {
        key: 'eb4f1a20be4b9985334f48fd81532e04',
        format: 'iframe',
        height: 50,
        width: 320,
        params: {}
      }
    };

    const config = configs[type];
    if (!config) return;

    // Set the global atOptions configuration object synchronously
    (window as any).atOptions = {
      key: config.key,
      format: config.format,
      height: config.height,
      width: config.width,
      params: config.params
    };

    // Create and inject the network's invoke.js script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.highperformanceformat.com/${config.key}/invoke.js`;
    
    container.appendChild(script);

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [type]);

  // Determine styling layout based on ad type
  const getContainerStyle = () => {
    switch (type) {
      case 'leaderboard':
        return 'w-full max-w-[728px] min-h-[90px] mx-auto my-6 flex items-center justify-center';
      case 'rectangle':
        return 'w-[300px] min-h-[250px] mx-auto my-6 flex items-center justify-center';
      case 'in-feed':
        return 'w-full max-w-[468px] min-h-[60px] mx-auto my-6 flex items-center justify-center';
      case 'sticky-footer':
        return 'fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#121226]/95 border-t border-[#E8C4A0]/20 min-h-[50px] flex items-center justify-center shadow-lg py-1';
      case 'native':
        return 'w-full max-w-[320px] mx-auto my-6 flex items-center justify-center min-h-[250px]';
      default:
        return '';
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div 
        ref={containerRef} 
        className={`${getContainerStyle()} overflow-hidden rounded-xl bg-transparent transition-all duration-300`}
      />
    </div>
  );
}
