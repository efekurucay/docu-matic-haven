
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DocsLayout from "@/components/DocsLayout";
import { getAllDocs, DocMeta } from "@/utils/mdxUtils";
import { ArrowRight, FileText, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const DocsIndex = () => {
  const [docs, setDocs] = useState<DocMeta[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const allDocs = getAllDocs();
    setDocs(allDocs);

    // Extract unique categories
    const uniqueCategories = Array.from(new Set(allDocs.map(doc => doc.category || "Uncategorized")));
    setCategories(uniqueCategories);
  }, []);

  const filteredDocs = searchTerm.trim() 
    ? docs.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (doc.description && doc.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : docs;

  // Group docs by category
  const docsByCategory = categories.reduce((acc, category) => {
    acc[category] = filteredDocs.filter(doc => doc.category === category);
    return acc;
  }, {} as Record<string, DocMeta[]>);

  return (
    <DocsLayout>
      <div className="max-w-5xl mx-auto animate-fade-in">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Documentation</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Browse our documentation to learn everything about the platform.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search documentation..."
              className="w-full pl-10 pr-4 py-3 bg-muted/50 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-colors"
            />
          </div>
        </header>

        {searchTerm && filteredDocs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No documents found matching "{searchTerm}"</p>
          </div>
        ) : (
          <div className="space-y-12">
            {categories.map(category => {
              const categoryDocs = docsByCategory[category];
              
              // Skip empty categories
              if (!categoryDocs || categoryDocs.length === 0) return null;
              
              return (
                <section key={category} className="animate-slide-up">
                  <h2 className="text-2xl font-semibold mb-6 border-b pb-2">{category}</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryDocs.map(doc => (
                      <Link
                        key={doc.slug}
                        to={`/docs/${doc.slug}`}
                        className={cn(
                          "block p-6 rounded-lg border hover:border-primary/40 hover:shadow-sm bg-background transition-all",
                          "group",
                          "hover:scale-[1.02]"
                        )}
                      >
                        <div className="flex items-start">
                          <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4 transition-colors group-hover:bg-primary/20">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">
                              {doc.title}
                            </h3>
                            {doc.description && (
                              <p className="text-muted-foreground text-sm mb-4">
                                {doc.description}
                              </p>
                            )}
                            <span className="inline-flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                              Read more <ArrowRight className="ml-1 h-3 w-3" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </DocsLayout>
  );
};

export default DocsIndex;
