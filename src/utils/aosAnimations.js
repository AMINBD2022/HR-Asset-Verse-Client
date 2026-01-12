/**
 * AOS Animation Configurations
 * Predefined animation sets for consistent usage across the website
 */

// Basic fade animations
export const fadeAnimations = {
  fadeIn: {
    "data-aos": "fade",
    "data-aos-duration": "800",
    "data-aos-delay": "0",
  },
  fadeUp: {
    "data-aos": "fade-up",
    "data-aos-duration": "800",
    "data-aos-delay": "0",
  },
  fadeDown: {
    "data-aos": "fade-down",
    "data-aos-duration": "800",
    "data-aos-delay": "0",
  },
  fadeLeft: {
    "data-aos": "fade-left",
    "data-aos-duration": "800",
    "data-aos-delay": "0",
  },
  fadeRight: {
    "data-aos": "fade-right",
    "data-aos-duration": "800",
    "data-aos-delay": "0",
  },
};

// Slide animations
export const slideAnimations = {
  slideUp: {
    "data-aos": "slide-up",
    "data-aos-duration": "800",
    "data-aos-delay": "0",
  },
  slideDown: {
    "data-aos": "slide-down",
    "data-aos-duration": "800",
    "data-aos-delay": "0",
  },
  slideLeft: {
    "data-aos": "slide-left",
    "data-aos-duration": "800",
    "data-aos-delay": "0",
  },
  slideRight: {
    "data-aos": "slide-right",
    "data-aos-duration": "800",
    "data-aos-delay": "0",
  },
};

// Zoom animations
export const zoomAnimations = {
  zoomIn: {
    "data-aos": "zoom-in",
    "data-aos-duration": "800",
    "data-aos-delay": "0",
  },
  zoomOut: {
    "data-aos": "zoom-out",
    "data-aos-duration": "800",
    "data-aos-delay": "0",
  },
  zoomInUp: {
    "data-aos": "zoom-in-up",
    "data-aos-duration": "800",
    "data-aos-delay": "0",
  },
  zoomInDown: {
    "data-aos": "zoom-in-down",
    "data-aos-duration": "800",
    "data-aos-delay": "0",
  },
};

// Flip animations
export const flipAnimations = {
  flipLeft: {
    "data-aos": "flip-left",
    "data-aos-duration": "800",
    "data-aos-delay": "0",
  },
  flipRight: {
    "data-aos": "flip-right",
    "data-aos-duration": "800",
    "data-aos-delay": "0",
  },
  flipUp: {
    "data-aos": "flip-up",
    "data-aos-duration": "800",
    "data-aos-delay": "0",
  },
  flipDown: {
    "data-aos": "flip-down",
    "data-aos-duration": "800",
    "data-aos-delay": "0",
  },
};

// Page-specific animation sets
export const pageAnimations = {
  // Hero section animations
  hero: {
    title: {
      "data-aos": "fade-right",
      "data-aos-duration": "1000",
      "data-aos-delay": "200",
    },
    subtitle: {
      "data-aos": "fade-right",
      "data-aos-duration": "800",
      "data-aos-delay": "400",
    },
    buttons: {
      "data-aos": "fade-up",
      "data-aos-duration": "800",
      "data-aos-delay": "600",
    },
    image: {
      "data-aos": "fade-left",
      "data-aos-duration": "1000",
      "data-aos-delay": "300",
    },
  },

  // Features section animations
  features: {
    title: {
      "data-aos": "fade-up",
      "data-aos-duration": "800",
      "data-aos-delay": "0",
    },
    card: (index) => ({
      "data-aos": "fade-up",
      "data-aos-duration": "800",
      "data-aos-delay": `${index * 100}`,
    }),
    icon: {
      "data-aos": "zoom-in",
      "data-aos-duration": "600",
      "data-aos-delay": "200",
    },
  },

  // About section animations
  about: {
    title: {
      "data-aos": "fade-down",
      "data-aos-duration": "800",
      "data-aos-delay": "0",
    },
    content: {
      "data-aos": "fade-right",
      "data-aos-duration": "800",
      "data-aos-delay": "200",
    },
    image: {
      "data-aos": "fade-left",
      "data-aos-duration": "800",
      "data-aos-delay": "300",
    },
  },

  // Testimonials animations
  testimonials: {
    title: {
      "data-aos": "fade-up",
      "data-aos-duration": "800",
      "data-aos-delay": "0",
    },
    card: (index) => ({
      "data-aos": "flip-up",
      "data-aos-duration": "800",
      "data-aos-delay": `${index * 150}`,
    }),
  },

  // Blog animations
  blog: {
    title: {
      "data-aos": "fade-down",
      "data-aos-duration": "800",
      "data-aos-delay": "0",
    },
    card: (index) => ({
      "data-aos": "fade-up",
      "data-aos-duration": "800",
      "data-aos-delay": `${(index % 3) * 100}`,
    }),
    loadMore: {
      "data-aos": "zoom-in",
      "data-aos-duration": "600",
      "data-aos-delay": "0",
    },
  },

  // Dashboard animations
  dashboard: {
    header: {
      "data-aos": "slide-down",
      "data-aos-duration": "600",
      "data-aos-delay": "0",
    },
    card: (index) => ({
      "data-aos": "fade-up",
      "data-aos-duration": "600",
      "data-aos-delay": `${index * 100}`,
    }),
    chart: {
      "data-aos": "zoom-in",
      "data-aos-duration": "800",
      "data-aos-delay": "300",
    },
  },

  // Form animations
  form: {
    container: {
      "data-aos": "fade-up",
      "data-aos-duration": "800",
      "data-aos-delay": "0",
    },
    field: (index) => ({
      "data-aos": "fade-right",
      "data-aos-duration": "600",
      "data-aos-delay": `${index * 100}`,
    }),
    button: {
      "data-aos": "zoom-in",
      "data-aos-duration": "600",
      "data-aos-delay": "200",
    },
  },

  // Error page animations
  error: {
    container: {
      "data-aos": "fade-up",
      "data-aos-duration": "800",
      "data-aos-delay": "0",
    },
    title: {
      "data-aos": "zoom-in",
      "data-aos-duration": "1000",
      "data-aos-delay": "200",
    },
    message: {
      "data-aos": "fade-up",
      "data-aos-duration": "800",
      "data-aos-delay": "400",
    },
    redirect: {
      "data-aos": "fade-up",
      "data-aos-duration": "800",
      "data-aos-delay": "600",
    },
  },

  // Legal pages animations
  legal: {
    header: {
      "data-aos": "fade-down",
      "data-aos-duration": "800",
      "data-aos-delay": "0",
    },
    content: {
      "data-aos": "fade-up",
      "data-aos-duration": "800",
      "data-aos-delay": "200",
    },
    section: (index) => ({
      "data-aos": "fade-up",
      "data-aos-duration": "600",
      "data-aos-delay": `${300 + index * 100}`,
    }),
  },

  // Employee dashboard animations
  employeeDashboard: {
    header: {
      "data-aos": "slide-down",
      "data-aos-duration": "600",
      "data-aos-delay": "0",
    },
    card: (index) => ({
      "data-aos": "fade-up",
      "data-aos-duration": "600",
      "data-aos-delay": `${index * 100}`,
    }),
    chart: {
      "data-aos": "zoom-in",
      "data-aos-duration": "800",
      "data-aos-delay": "300",
    },
    action: (index) => ({
      "data-aos": "zoom-in",
      "data-aos-duration": "600",
      "data-aos-delay": `${400 + index * 100}`,
    }),
  },

  // Asset management pages animations
  assetManagement: {
    header: {
      "data-aos": "fade-down",
      "data-aos-duration": "800",
      "data-aos-delay": "0",
    },
    table: {
      "data-aos": "fade-up",
      "data-aos-duration": "800",
      "data-aos-delay": "200",
    },
    row: (index) => ({
      "data-aos": "fade-up",
      "data-aos-duration": "400",
      "data-aos-delay": `${index * 50}`,
    }),
    button: {
      "data-aos": "zoom-in",
      "data-aos-duration": "600",
      "data-aos-delay": "100",
    },
  },
};

// Utility function to create custom animations
export const createAnimation = (
  type,
  duration = 800,
  delay = 0,
  easing = "ease-out-cubic"
) => ({
  "data-aos": type,
  "data-aos-duration": duration.toString(),
  "data-aos-delay": delay.toString(),
  "data-aos-easing": easing,
});

// Staggered animations helper
export const createStaggeredAnimation = (
  type,
  baseDelay = 0,
  increment = 100
) => {
  return (index) => ({
    "data-aos": type,
    "data-aos-duration": "800",
    "data-aos-delay": `${baseDelay + index * increment}`,
  });
};

// Animation presets for common use cases
export const animationPresets = {
  // Quick animations
  quick: {
    duration: 400,
    easing: "ease-out",
  },

  // Slow animations
  slow: {
    duration: 1200,
    easing: "ease-out-cubic",
  },

  // Bouncy animations
  bouncy: {
    duration: 800,
    easing: "ease-out-back",
  },

  // Smooth animations
  smooth: {
    duration: 800,
    easing: "ease-out-cubic",
  },
};
