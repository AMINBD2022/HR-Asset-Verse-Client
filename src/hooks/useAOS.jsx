import { useEffect } from "react";
import AOS from "aos";
const useAOS = (options = {}) => {
  const defaultOptions = {
    duration: 800,
    easing: "ease-out-cubic",
    once: false,
    mirror: true,
    offset: 100,
    delay: 0,
    ...options,
  };

  useEffect(() => {
    AOS.init(defaultOptions);
    AOS.refresh();
    return () => {
      AOS.refresh();
    };
  }, []);
  const refreshAOS = () => {
    AOS.refresh();
  };

  return { refreshAOS };
};

export default useAOS;
