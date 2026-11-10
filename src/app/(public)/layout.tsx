import { Suspense, type ReactNode } from "react";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

function NavbarSkeleton() {
  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 px-4 pt-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="mx-auto flex h-20 w-full max-w-[1720px] items-center justify-between gap-6 rounded-[28px] bg-[#1b1b1b] px-5 sm:px-7 lg:h-24 lg:px-10" />
    </header>
  );
}

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Suspense fallback={<NavbarSkeleton />}>
        <Navbar />
      </Suspense>
      {children}
      <Footer />
    </>
  );
};

export default PublicLayout;
