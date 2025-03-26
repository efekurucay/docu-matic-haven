
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, FileText, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

type DocLink = {
  title: string;
  path: string;
};

type DocCategory = {
  title: string;
  links: DocLink[];
};

// This would typically come from a backend or file system
const DOCS_STRUCTURE: DocCategory[] = [
  {
    title: "Getting Started",
    links: [
      { title: "Introduction", path: "/docs/introduction" },
      { title: "Installation", path: "/docs/installation" },
      { title: "Quick Start", path: "/docs/quick-start" },
    ],
  },
  {
    title: "Core Concepts",
    links: [
      { title: "Architecture", path: "/docs/architecture" },
      { title: "Components", path: "/docs/components" },
      { title: "Data Flow", path: "/docs/data-flow" },
    ],
  },
  {
    title: "Advanced Guides",
    links: [
      { title: "Performance", path: "/docs/performance" },
      { title: "Security", path: "/docs/security" },
      { title: "Deployment", path: "/docs/deployment" },
    ],
  },
];

const DocsSidebar = () => {
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    DOCS_STRUCTURE.map((category) => category.title)
  );
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCategory = (title: string) => {
    setExpandedCategories((prev) =>
      prev.includes(title)
        ? prev.filter((cat) => cat !== title)
        : [...prev, title]
    );
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Trigger */}
      <div className="lg:hidden fixed left-4 bottom-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="btn btn-primary p-3 rounded-full shadow-lg"
          aria-label="Toggle sidebar"
        >
          {isMobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-72 bg-background border-r overflow-y-auto transition-transform duration-300 ease-in-out z-40 pt-24 pb-8",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="px-6">
          <h3 className="text-xl font-bold mb-4">Documentation</h3>
          <div className="space-y-6">
            {DOCS_STRUCTURE.map((category) => (
              <div key={category.title} className="space-y-2">
                <button
                  onClick={() => toggleCategory(category.title)}
                  className="flex items-center justify-between w-full text-left font-medium hover:text-primary transition-colors"
                >
                  <span>{category.title}</span>
                  {expandedCategories.includes(category.title) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                
                {expandedCategories.includes(category.title) && (
                  <div className="ml-2 pl-3 border-l space-y-1 animate-slide-down">
                    {category.links.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={cn(
                          "flex items-center py-1 px-2 text-sm rounded-md hover:bg-muted hover:text-foreground transition-colors",
                          isActive(link.path) && "bg-accent text-accent-foreground font-medium"
                        )}
                      >
                        <FileText className="h-4 w-4 mr-2 opacity-70" />
                        {link.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden animate-fade-in"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default DocsSidebar;
