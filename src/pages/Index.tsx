
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { ChevronRight, FileText, Settings, Book } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container-fluid">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Modern Documentation Platform
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Beautiful documentation <br className="hidden sm:block" />
              <span className="text-primary">made simple</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create, manage, and publish beautiful documentation with our 
              modern MDX-powered platform. Focus on content while we handle the rest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/docs"
                className="btn btn-primary px-6 py-3 rounded-lg text-base font-medium"
              >
                View Documentation
              </Link>
              <Link
                to="/admin"
                className="btn btn-secondary px-6 py-3 rounded-lg text-base font-medium"
              >
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/50">
        <div className="container-fluid">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-slide-up animate-delay-100">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Powerful Features
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to create and manage professional documentation.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-background rounded-lg p-6 shadow-sm border animate-scale-in animate-delay-200">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">MDX Support</h3>
                <p className="text-muted-foreground mb-4">
                  Write in Markdown with the power of JSX components. The best of both worlds.
                </p>
                <Link 
                  to="/docs/introduction" 
                  className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium"
                >
                  Learn more
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              {/* Feature 2 */}
              <div className="bg-background rounded-lg p-6 shadow-sm border animate-scale-in animate-delay-300">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Admin Panel</h3>
                <p className="text-muted-foreground mb-4">
                  Manage content with our intuitive admin interface. No technical knowledge required.
                </p>
                <Link 
                  to="/admin" 
                  className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium"
                >
                  Try it out
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              {/* Feature 3 */}
              <div className="bg-background rounded-lg p-6 shadow-sm border animate-scale-in animate-delay-400">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Book className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Beautiful Design</h3>
                <p className="text-muted-foreground mb-4">
                  Clean, modern, and responsive design that puts your content first.
                </p>
                <Link 
                  to="/docs/components" 
                  className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium"
                >
                  View components
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-fluid">
          <div className="max-w-4xl mx-auto bg-primary/5 rounded-lg p-8 md:p-12 text-center animate-fade-in animate-delay-500">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to create amazing documentation?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start with our comprehensive guides and examples to build your perfect documentation site.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/docs/quick-start"
                className="btn btn-primary px-6 py-3 rounded-lg text-base font-medium"
              >
                Quick Start Guide
              </Link>
              <Link
                to="/docs"
                className="btn btn-secondary px-6 py-3 rounded-lg text-base font-medium"
              >
                Browse Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/30 border-t">
        <div className="container-fluid">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <Link to="/" className="text-2xl font-bold text-primary">
                  DocuMatic
                </Link>
                <p className="text-muted-foreground mt-2">
                  Modern documentation platform
                </p>
              </div>
              <div className="flex gap-8">
                <div>
                  <h4 className="font-semibold mb-3">Product</h4>
                  <ul className="space-y-2">
                    <li><Link to="/docs" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</Link></li>
                    <li><Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors">Admin</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Resources</h4>
                  <ul className="space-y-2">
                    <li><Link to="/docs/quick-start" className="text-muted-foreground hover:text-foreground transition-colors">Getting Started</Link></li>
                    <li><Link to="/docs/components" className="text-muted-foreground hover:text-foreground transition-colors">Components</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="border-t mt-12 pt-6 text-center text-muted-foreground text-sm">
              <p>&copy; {new Date().getFullYear()} DocuMatic. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
