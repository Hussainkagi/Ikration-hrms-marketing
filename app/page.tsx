"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Building2, X, Sparkles } from "lucide-react";
import Howitwork from "@/components/Sections/howitwork";
import Features from "@/components/Sections/features";
import Image from "next/image";
import banner3 from "@/public/Images/ban5.png";

declare global {
  interface Window {
    google?: any;
  }
}

function TypingEffect({ texts }: { texts: string[] }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = texts[currentTextIndex];

      if (!isDeleting) {
        if (currentText.length < fullText.length) {
          setCurrentText(fullText.substring(0, currentText.length + 1));
          setTypingSpeed(100);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        } else {
          setCurrentText(fullText.substring(0, currentText.length - 1));
          setTypingSpeed(50);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTextIndex, texts, typingSpeed]);

  return (
    <span className="inline-flex items-baseline">
      {currentText}
      <span className="inline-block w-0.5 h-8 bg-orange-600 ml-1 animate-pulse" />
    </span>
  );
}

function StatCard({ value, label, index }: any) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`text-center transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="text-4xl font-bold text-orange-600">{value}</div>
      <p className="text-slate-600 mt-2">{label}</p>
    </div>
  );
}

function GoogleMapWithGeofences() {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initMap();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    };

    const initMap = () => {
      if (!mapRef.current || !window.google) return;

      const googleMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 25.1883, lng: 55.2633 },
        zoom: 15.5,
        styles: [
          {
            featureType: "all",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#c9e9f6" }],
          },
        ],
      });

      const offices = [
        { lat: 25.1883, lng: 55.2633, name: "Main Office", radius: 120 },
        { lat: 25.1905, lng: 55.2655, name: "Branch Office 1", radius: 100 },
        { lat: 25.1865, lng: 55.2615, name: "Branch Office 2", radius: 110 },
        { lat: 25.1895, lng: 55.2595, name: "Warehouse", radius: 130 },
      ];

      offices.forEach((office) => {
        new window.google.maps.Marker({
          position: { lat: office.lat, lng: office.lng },
          map: googleMap,
          title: office.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#ea580c",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          },
        });

        new window.google.maps.Circle({
          strokeColor: "#ea580c",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#ea580c",
          fillOpacity: 0.15,
          map: googleMap,
          center: { lat: office.lat, lng: office.lng },
          radius: office.radius,
        });
      });
    };

    loadGoogleMaps();
  }, []);

  return <div ref={mapRef} className="w-full h-full rounded-2xl" />;
}

export default function Home() {
  const heroRef = useRef(null);
  const [heroVisible, setHeroVisible] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);
  const imageRef = useRef<any>(null);
  const [imageScale, setImageScale] = useState(0.9);
  const [imageOpacity, setImageOpacity] = useState(0);
  const [imageY, setImageY] = useState(40);
  const videoRef = useRef<any>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoBlur, setVideoBlur] = useState(8);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const typingTexts = [
    "Precision",
    "Geofencing",
    "Real-Time Tracking",
    "Smart Analytics",
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementHeight = rect.height;

        const elementCenter = rect.top + elementHeight / 2;
        const viewportCenter = windowHeight / 2;

        // Calculate distance from center (0 = perfectly centered, 1 = far away)
        const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
        const maxDistance = windowHeight * 0.8;

        // Proximity to center: 1 = centered, 0 = far away
        const centerProximity = Math.max(
          0,
          Math.min(1, 1 - distanceFromCenter / maxDistance)
        );

        // Apple-style easing for smooth zoom
        const easeInOutQuart = (t: number) =>
          t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
        const easedProgress = easeInOutQuart(centerProximity);

        // Scale: starts at 0.7, peaks at 1.0 when centered, goes back to 0.7
        const scale = 0.7 + easedProgress * 0.3;
        setImageScale(scale);

        // Fade in/out based on distance from center
        setImageOpacity(Math.min(1, centerProximity * 1.2));

        // Subtle parallax - moves less when centered
        const yOffset = (1 - easedProgress) * 30;
        setImageY(yOffset);
      }

      if (videoRef.current) {
        const rect = videoRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const windowCenter = windowHeight / 2;
        const videoCenter = rect.top + rect.height / 2;

        // Distance from center (0 = center, 1 = edge)
        const distanceFromCenter = Math.abs(videoCenter - windowCenter);
        const maxDistance = windowHeight * 0.7;
        const centerProximity = Math.max(
          0,
          Math.min(1, 1 - distanceFromCenter / maxDistance)
        );

        // Apple-style easing for smooth focus effect
        const easeInOutQuart = (t: number) =>
          t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
        const easedProgress = easeInOutQuart(centerProximity);

        setVideoProgress(easedProgress);

        // Blur effect for depth (8px → 0px)
        const blur = 8 - easedProgress * 8;
        setVideoBlur(blur);

        // Auto-play when in view
        if (videoElementRef.current) {
          if (
            centerProximity > 0.3 &&
            rect.top < windowHeight &&
            rect.bottom > 0
          ) {
            videoElementRef.current.play().catch(() => {});
          } else {
            videoElementRef.current.pause();
          }
        }
      }
    };

    // Use requestAnimationFrame for smoother 60fps animations
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center shadow-md">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">Ikration</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-slate-600 hover:text-slate-900 transition"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-slate-600 hover:text-slate-900 transition"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="text-slate-600 hover:text-slate-900 transition"
            >
              Contact
            </a>
          </div>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100/80 backdrop-blur-sm rounded-full mb-6 border border-orange-200/50">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-semibold text-orange-700">
                AI-Powered Workforce Platform
              </span>
            </div>
            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6">
              <span className="text-slate-900">Manage Your</span>
              <br />
              <span className="text-slate-900">Workforce with</span>
              <br />
              <span className="text-orange-600 block min-h-[1.2em]">
                <TypingEffect texts={typingTexts} />
              </span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
              Accurate employee attendance tracking with geofencing technology.
              Create companies, manage employees, and get real-time insights
              into your workforce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8">
              <button className="bg-orange-600 hover:bg-orange-700 text-white text-lg h-12 px-8 flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-slate-300 hover:border-slate-400 text-slate-700 text-lg h-12 px-8 rounded-lg font-medium transition-all duration-200 hover:shadow-md bg-white">
                Watch Demo
              </button>
            </div>
            <p className="text-sm mt-4 sm:mt-6 text-slate-500">
              ✓ No credit card required • ✓ 14-day free trial • ✓ Setup in
              minutes
            </p>
          </div>
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              heroVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="rounded-2xl aspect-square flex items-center justify-center overflow-hidden shadow-xl">
              <GoogleMapWithGeofences />
            </div>

            {showTooltip && (
              <div className="absolute bottom-4 -left-4 lg:-left-12 z-10 animate-in fade-in slide-in-from-left-4 duration-700 delay-1500">
                <div className="relative">
                  <div className="bg-white rounded-lg shadow-2xl border-2 border-orange-200 p-4 max-w-[280px] relative">
                    <button
                      onClick={() => setShowTooltip(false)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-orange-600 hover:bg-orange-700 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                      aria-label="Close tooltip"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <p className="text-sm text-slate-700 leading-relaxed">
                      This is how our trusted partners have enabled{" "}
                      <span className="font-semibold text-orange-600">
                        geofencing
                      </span>{" "}
                      for their accurate{" "}
                      <span className="font-semibold text-slate-900">
                        employee attendance management
                      </span>
                    </p>
                  </div>

                  <div className="absolute top-8 -right-12 w-12 hidden lg:block">
                    <svg
                      width="48"
                      height="2"
                      viewBox="0 0 48 2"
                      fill="none"
                      className="absolute top-0 left-0"
                    >
                      <line
                        x1="0"
                        y1="1"
                        x2="48"
                        y2="1"
                        stroke="#ea580c"
                        strokeWidth="2"
                      />
                    </svg>
                    <div className="absolute -top-1.5 right-0 w-4 h-4 bg-orange-600 rounded-full border-2 border-white shadow-sm" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section
        ref={imageRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 relative overflow-hidden"
      >
        <div className="relative flex items-center justify-center perspective-1000">
          <div
            className="w-full will-change-transform"
            style={{
              transform: `scale(${imageScale}) translateY(${imageY}px) translateZ(0)`,
              opacity: imageOpacity,
              transition: "none",
            }}
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_10px_40px_rgb(0,0,0,0.15),0_25px_80px_rgb(0,0,0,0.1)] group cursor-pointer">
              <Image
                src={banner3}
                alt="Ikration Banner"
                className="w-full h-auto transition-all duration-500 group-hover:blur-[2px] group-hover:brightness-50"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-8">
                <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                    Seamless Dashboard Experience
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                    Ikration provides you with a seamless dashboard to keep
                    track of all data, take backups, export and analyze your
                    reports effectively
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-12 sm:py-20 md:py-32 min-h-[80vh] sm:min-h-screen flex items-center">
        {/* Cinema background - fades to black when video is in focus */}
        <div
          className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-700"
          style={{
            opacity: videoProgress * 0.92,
            backgroundColor: "rgba(0, 0, 0, 1)",
          }}
        />

        {/* Enhanced vignette for cinema effect */}
        <div
          className="fixed inset-0 pointer-events-none z-35"
          style={{
            opacity: videoProgress,
            background: `radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, rgba(0, 0, 0, ${
              0.4 * videoProgress
            }) 100%)`,
            transition: "opacity 0.5s ease-out",
          }}
        />

        <div
          ref={videoRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50 w-full"
        >
          <div
            className="relative will-change-transform"
            style={{
              transform: `scale(${0.94 + videoProgress * 0.06}) translateZ(0)`,
              filter: `blur(${videoBlur}px)`,
              transition: "none",
            }}
          >
            {/* Video container with premium shadow that intensifies in cinema mode */}
            <div
              className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden"
              style={{
                boxShadow: `
                  0 ${20 + videoProgress * 40}px ${
                  60 + videoProgress * 80
                }px -${12 - videoProgress * 8}px rgba(0, 0, 0, ${
                  0.3 + videoProgress * 0.4
                }),
                  0 ${10 + videoProgress * 20}px ${
                  40 + videoProgress * 60
                }px -${8 - videoProgress * 6}px rgba(0, 0, 0, ${
                  0.2 + videoProgress * 0.3
                }),
                  0 0 0 1px rgba(255, 255, 255, ${0.05 * videoProgress})
                `,
                transition: "box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <video
                ref={videoElementRef}
                className="w-full h-auto block"
                loop
                muted
                playsInline
                poster="/videos/clockinvideo.mp4"
              >
                <source src="/videos/clockinvideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Elegant title with enhanced contrast for cinema mode */}
            <div
              className="absolute top-4 sm:top-6 md:top-10 left-1/2 -translate-x-1/2"
              style={{
                opacity: videoProgress,
                transform: `translateX(-50%) translateY(${
                  (1 - videoProgress) * -20
                }px)`,
                transition:
                  "opacity 0.4s ease-out, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div className="relative">
                <h3 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center px-4 sm:px-6 tracking-tight drop-shadow-2xl">
                  See Ikration in Action
                </h3>
                <div
                  className="absolute inset-0 blur-3xl -z-10"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.8) 0%, transparent 70%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="bg-slate-50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard value="10K+" label="Companies Trust Us" index={0} />
            <StatCard value="500K+" label="Employees Tracked Daily" index={1} />
            <StatCard value="99.9%" label="Uptime Guaranteed" index={2} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* How It Works */}
      <Howitwork />

      {/* CTA Section */}
      <section
        id="pricing"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20"
      >
        <div
          className={`bg-orange-600 rounded-2xl px-6 sm:px-8 py-12 sm:py-16 text-center text-white shadow-2xl transition-all duration-1000`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Ready to Transform Your Workforce Management?
          </h2>
          <p className="text-lg sm:text-xl text-orange-100 mb-6 sm:mb-8">
            Join thousands of companies already using ICRA
          </p>
          <button className="bg-white text-orange-600 hover:bg-slate-100 text-lg h-12 px-8 font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
            Start Your Free Trial Today
          </button>
          <p className="text-orange-100 text-sm mt-4">
            30-day money-back guarantee • No credit card required
          </p>
        </div>
      </section>
    </div>
  );
}
