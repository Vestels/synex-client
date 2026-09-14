'use client';

import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Header from '@/components/Header';
import SideNavigation from '@/components/navigation/SideNavigation';

export default function NavigationShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const headerRef = useRef<HTMLElement>(null);
  const navigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isNavigationOpen) return;

    const handleOutSideClick = (event: MouseEvent) => {
      const target = event.target as Node;

      const isInsideHeader = headerRef.current?.contains(target);
      const isInsideNavigation = navigationRef.current?.contains(target);

      if (!isInsideHeader && !isInsideNavigation) {
        setIsNavigationOpen((previous) => !previous);
      }
    };

    window.addEventListener('mousedown', handleOutSideClick);

    return () => {
      window.removeEventListener('mousedown', handleOutSideClick);
    };
  }, [isNavigationOpen]);

  return (
    <>
      <Header
        ref={headerRef}
        isMobile={isMobile}
        isSideNavigationOpen={isNavigationOpen}
        onMenuOpen={() => setIsNavigationOpen((previous) => !previous)}
      />

      <main className="main">
        <SideNavigation ref={navigationRef} isMobile={isMobile} isOpen={isNavigationOpen} />
        <article className="main-container">{children}</article>
      </main>
    </>
  );
}
