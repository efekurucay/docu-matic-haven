
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container-fluid">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-primary transition-colors hover:text-primary/80"
          >
            DocuMatic
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={cn(
                "nav-link",
                isActive("/") && "nav-link-active"
              )}
            >
              Home
            </Link>
            <Link
              to="/docs"
              className={cn(
                "nav-link",
                (isActive("/docs") || location.pathname.startsWith("/docs/")) &&
                  "nav-link-active"
              )}
            >
              Documentation
            </Link>
            <Link
              to="/admin"
              className={cn(
                "nav-link",
                isActive("/admin") && "nav-link-active"
              )}
            >
              Admin
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="mt-4 py-4 md:hidden flex flex-col space-y-2 animate-fade-in">
            <Link
              to="/"
              className={cn(
                "nav-link px-4 py-3 text-lg",
                isActive("/") && "nav-link-active"
              )}
            >
              Home
            </Link>
            <Link
              to="/docs"
              className={cn(
                "nav-link px-4 py-3 text-lg",
                (isActive("/docs") || location.pathname.startsWith("/docs/")) &&
                  "nav-link-active"
              )}
            >
              Documentation
            </Link>
            <Link
              to="/admin"
              className={cn(
                "nav-link px-4 py-3 text-lg",
                isActive("/admin") && "nav-link-active"
              )}
            >
              Admin
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
