'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { runEzoic } from '@/lib/ezoic';

export function EzoicProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    runEzoic(() => {
      if (!window.ezstandalone?.hasInit) {
        // Initial Page Load
        window.ezstandalone?.enable();
        window.ezstandalone?.display();
        if (window.ezstandalone) window.ezstandalone.hasInit = true;
      } else {
        // SPA Route Change Navigation
        window.ezstandalone?.destroyAll();
        // Allow Next.js layout to settle before scanning for new placeholders
        setTimeout(() => {
          window.ezstandalone?.refresh();
        }, 100);
      }
    });
  }, [pathname, searchParams]);

  return null;
}
