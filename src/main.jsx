import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import AuthProvider from "./AllContexts/AuthProvider.jsx";
import { LoadingProvider } from "./AllContexts/LoadingContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./Routes/Route.jsx";
import "aos/dist/aos.css";
import AOS from "aos";
import { ToastContainer } from "react-toastify";
import GlobalLoader from "./Components/GlobalLoader.jsx";
import PageLoader from "./Components/PageLoader.jsx";

const queryClient = new QueryClient();

// Enhanced AOS configuration
AOS.init({
  // Animation duration
  duration: 800,

  // Animation easing
  easing: "ease-out-cubic",

  // Whether animation should happen only once
  once: false,

  // Whether elements should animate out while scrolling past them
  mirror: true,

  // Offset (in px) from the original trigger point
  offset: 120,

  // Delay (in ms) before animation starts
  delay: 0,

  // Values from 0 to 3.0, with step size 0.1
  anchorPlacement: "top-bottom",

  // Disable AOS on mobile devices
  disable: false,

  // Start events
  startEvent: "DOMContentLoaded",

  // Animation init class name
  initClassName: "aos-init",

  // Animation animated class name
  animatedClassName: "aos-animate",

  // Use CSS3 transforms
  useClassNames: false,

  // Disable mutation observer
  disableMutationObserver: false,

  // Debug mode
  debugMode: false,

  // Throttle delay on resize
  throttleDelay: 99,

  // Debounce delay on resize
  debounceDelay: 50,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
        <AuthProvider>
          <PageLoader />
          <GlobalLoader />
          <RouterProvider router={router}></RouterProvider>
        </AuthProvider>
      </LoadingProvider>
      <ToastContainer />
    </QueryClientProvider>
  </StrictMode>
);
