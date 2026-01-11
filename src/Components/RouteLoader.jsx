import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const RouteLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200); // Show loader for 500ms on route change

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-40 bg-base-200/80 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-base-100 rounded-xl p-6 shadow-lg border border-base-300 flex items-center gap-4">
        <div className="loading loading-spinner loading-md text-primary"></div>
        <span className="text-neutral font-medium">Navigating...</span>
      </div>
    </div>
  );
};

export default RouteLoader;
