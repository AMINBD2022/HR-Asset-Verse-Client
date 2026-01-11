import { useEffect, useState } from "react";

const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-base-100 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <img
            src="/logo.png"
            alt="AssetVerse"
            className="w-20 h-20 mx-auto mb-4 animate-pulse"
          />
          <h1 className="text-3xl font-bold text-primary mb-2">AssetVerse</h1>
          <p className="text-secondary">HR Management</p>
        </div>
        <div className="loading loading-spinner loading-lg text-primary"></div>
        <p className="text-neutral mt-4 font-medium">Loading Application...</p>
      </div>
    </div>
  );
};

export default PageLoader;
