import { useLoading } from "../AllContexts/LoadingContext";

const useGlobalLoading = () => {
  const { showLoading, hideLoading } = useLoading();

  const withLoading = async (asyncFunction, message = "Loading...") => {
    try {
      showLoading(message);
      const result = await asyncFunction();
      return result;
    } finally {
      hideLoading();
    }
  };

  return {
    showLoading,
    hideLoading,
    withLoading,
  };
};

export default useGlobalLoading;
