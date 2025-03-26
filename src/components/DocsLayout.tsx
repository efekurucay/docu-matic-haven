
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import DocsSidebar from "./DocsSidebar";

interface DocsLayoutProps {
  children: React.ReactNode;
}

const DocsLayout: React.FC<DocsLayoutProps> = ({ children }) => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow pt-20">
        <DocsSidebar />
        <main className="flex-1 lg:ml-72 px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
          <div className="max-w-3xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocsLayout;
