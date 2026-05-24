'use client';

import { useEffect, useRef } from 'react';

export function TurnstileWidget({ onVerify }: { onVerify: (token: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!;

  useEffect(() => {
    if (!window.turnstile && !document.getElementById('turnstile-script')) {
      const script = document.createElement('script');
      script.id = 'turnstile-script';
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    const renderWidget = () => {
      if (window.turnstile && containerRef.current && siteKey) {
        window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => onVerify(token),
          theme: 'auto', // Adapts to user's dark/light mode
        });
      }
    };

    // Render immediately if script is already loaded, else wait for load
    if (window.turnstile) renderWidget();
    else window.addEventListener('load', renderWidget);

    return () => window.removeEventListener('load', renderWidget);
  }, [siteKey, onVerify]);

  return <div ref={containerRef} className="my-4 flex justify-center" />;
}

// Global declaration for TypeScript
declare global {
  interface Window {
    turnstile?: any;
  }
}
