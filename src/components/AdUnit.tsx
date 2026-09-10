'use client';
import React, { useEffect, useRef, useState } from 'react';

interface AdUnitProps {
  slotId?: string;
  className?: string;
}

const AdUnit: React.FC<AdUnitProps> = ({ slotId = "1234567890", className = "" }) => {
  const adRef = useRef<HTMLModElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
        if (initialized.current) return;
        
        try {
            const ads = (window as any).adsbygoogle;
            if (ads && adRef.current && adRef.current.offsetWidth > 0) {
                ads.push({});
                initialized.current = true;
                // Heuristic: If push works without error, assume load might succeed
                // Real ad fill check requires specific AdSense callbacks not always available in standard tags
                setAdLoaded(true);
            }
        } catch (e) {
            console.error("AdSense error (likely blocked):", e);
        }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`w-full my-10 flex flex-col justify-center items-center transition-all duration-500 ${className} ${adLoaded ? 'min-h-[250px]' : 'min-h-0 h-auto'}`}>
      
      {/* Placeholder for Development/Pending Approval - Hidden if AdBlock is active or Production fills it */}
      {!adLoaded && process.env.NODE_ENV === 'development' && (
          <div className="w-full bg-zinc-50 dark:bg-zinc-900 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-center">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Ad Space Reserved</span>
          </div>
      )}

      {/* Ad Container */}
      <div className="w-full text-center overflow-hidden">
        <ins className="adsbygoogle"
             ref={adRef}
             style={{ display: 'block', minWidth: '250px', width: '100%' }}
             data-ad-client="ca-pub-6313859650856618"
             data-ad-slot={slotId}
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
    </div>
  );
};

export default AdUnit;