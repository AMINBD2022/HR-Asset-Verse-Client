import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import {
  IoArrowBackOutline,
  IoArrowForwardOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router";

const HeroSlider = () => {
  const slidesData = [
    {
      id: 1,
      title: "Streamline Your HR",
      subtitle:
        "Empower your HR team with intelligent asset allocation, employee tracking, and comprehensive ",
      image: "/business.webp",
      bgGradient: "from-green-500 to-emerald-600",
      features: ["HR Dashboard", "Employee Assets"],
      stats: [
        { value: "99%", label: "Uptime" },
        { value: "24/7", label: "Support" },
      ],
    },
    {
      id: 2,
      title: "Manage Your Company",
      subtitle:
        "A powerful platform to track, monitor, and manage all your company assets efficiently. real-time updates.",
      image: "/image2.png",
      bgGradient: "from-blue-500 to-indigo-600",
      features: ["Real-time Tracking", "Asset Analytics"],
      stats: [
        { value: "500+", label: "Companies" },
        { value: "99.9%", label: "Accuracy" },
      ],
    },
  ];
  const swiperConfig = {
    modules: [Navigation, Pagination, Autoplay, EffectFade],
    navigation: {
      prevEl: ".custom-prev",
      nextEl: ".custom-next",
    },
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
    autoplay: {
      delay: 5000000,
      disableOnInteraction: false,
    },
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    speed: 800,
    spaceBetween: 0,
    slidesPerView: 1,
  };

  return (
    <div className="w-full">
      <Swiper
        {...swiperConfig}
        className="professional-slider h-[500px] lg:h-[600px]"
      >
        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className={`relative w-full h-full bg-linear-to-br ${slide.bgGradient} overflow-hidden`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-80">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')]"></div>
              </div>

              {/* Main Content Container */}
              <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6 h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full py-12">
                  {/* Right Content - Image & Stats */}
                  <div className="relative lg:order-2 flex justify-center items-center">
                    {/* Main Image Container */}
                    <div className="relative">
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full max-w-md lg:max-w-lg h-80 lg:h-96 object-cover"
                        />

                        {/* Image Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                      </div>

                      {/* Floating Stats */}
                      {slide.stats.map((stat, index) => (
                        <div
                          key={index}
                          className={`absolute bg-white rounded-2xl p-4 shadow-xl border border-gray-100 ${
                            index === 0
                              ? "-top-6 -left-6"
                              : "-bottom-6 -right-6"
                          }`}
                        >
                          <div className="text-2xl font-bold text-primary">
                            {stat.value}
                          </div>
                          <div className="text-xs text-gray-600 font-medium">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                    <div
                      className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                  </div>
                  {/* Left Content */}
                  <div className="space-y-6 lg:space-y-8 text-white">
                    {/* Brand Badge */}
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-white/90 font-medium text-sm tracking-wide uppercase">
                        AssetVerse
                      </span>
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-lg">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {slide.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
                        >
                          <IoCheckmarkCircleOutline className="w-4 h-4 text-white" />
                          <span className="text-sm font-medium text-white">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Link
                      to="/blogs"
                      className="border-2 border-white/30 cursor-pointer text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        {/* Custom Navigation */}
        <button
          className="custom-prev absolute left-6 top-1/2 -translate-y-1/2 z-20 
    bg-white/10 hover:bg-white/30 backdrop-blur-md p-3 rounded-full text-white"
        >
          <IoArrowBackOutline size={20} />
        </button>

        <button
          className="custom-next absolute right-6 top-1/2 -translate-y-1/2 z-20 
    bg-white/10 hover:bg-white/30 backdrop-blur-md p-3 rounded-full text-white"
        >
          <IoArrowForwardOutline size={20} />
        </button>
      </Swiper>
    </div>
  );
};

export default HeroSlider;
