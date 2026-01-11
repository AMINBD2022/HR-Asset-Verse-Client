import { useLoading } from "../AllContexts/LoadingContext";

const GlobalLoader = () => {
  const { isLoading, loadingMessage } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-base-100 rounded-2xl p-8 shadow-2xl border border-base-300 flex flex-col items-center gap-4 min-w-[300px]">
        <div className="loading loading-spinner loading-lg text-primary"></div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-neutral mb-2">
            {loadingMessage}
          </h3>
          <p className="text-sm text-secondary">Please wait a moment...</p>
        </div>
      </div>
    </div>
  );
};

export default GlobalLoader;
