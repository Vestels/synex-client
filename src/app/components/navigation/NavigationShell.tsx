"use client";

import { useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Header from "@/app/components/Header";
import SideNavigation from "@/app/components/navigation/SideNavigation";

export default function NavigationShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  // const pathname = usePathname();

  // useEffect(() => {
  //   setIsNavigationOpen(false);
  // }, [pathname]);

  return (
    <>
      <Header
        isMobile={isMobile}
        isSideNavigationOpen={isNavigationOpen}
        onMenuOpen={() => setIsNavigationOpen((previous) => !previous)}
      />

      <main className="main">
        <SideNavigation isMobile={isMobile} isOpen={isNavigationOpen} />
        <article className="main-container">{children}</article>
      </main>
    </>
  );
}
