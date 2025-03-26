
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center animate-fade-in">
          <span className="inline-block text-9xl font-bold text-primary">404</span>
          <h1 className="text-3xl font-bold mt-6 mb-4">Page not found</h1>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <Link
            to="/"
            className="btn btn-primary px-6 py-3 rounded-lg inline-flex items-center justify-center"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
