"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Building2, X, Sparkles } from "lucide-react";
import Image from "next/image";
import banner3 from "@/public/Images/ban5.png";
import Howitwork from "@/components/Sections/howitwork";
import Features from "@/components/Sections/features";

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
  const [imageScale, setImageScale] = useState(0.5);
  const videoRef = useRef<any>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const [cinemaEffect, setCinemaEffect] = useState(0);
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
      // Image scale animation
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const imageTop = rect.top;
        const imageBottom = rect.bottom;

        if (imageTop < windowHeight && imageBottom > 0) {
          const visibleHeight =
            Math.min(imageBottom, windowHeight) - Math.max(imageTop, 0);
          const sectionHeight = rect.height;
          const visibilityRatio = visibleHeight / sectionHeight;

          const scale = 0.5 + visibilityRatio * 0.5;
          setImageScale(Math.min(scale, 1));
        }
      }

      // Cinema effect for video
      if (videoRef.current) {
        const rect = videoRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const windowCenter = windowHeight / 2;
        const videoCenter = rect.top + rect.height / 2;

        const distanceFromCenter =
          Math.abs(videoCenter - windowCenter) / windowHeight;
        const effect = Math.max(0, 1 - distanceFromCenter * 2);
        setCinemaEffect(effect);

        if (videoElementRef.current) {
          if (effect > 0.5) {
            videoElementRef.current.play().catch(() => {});
          } else {
            videoElementRef.current.pause();
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
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

      {/* Banner Image Section with Scale Animation - REDUCED PADDING */}
      <section
        ref={imageRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative"
      >
        {" "}
        <div className="relative flex items-center justify-center">
          {" "}
          <div
            className="transition-all duration-700 ease-out"
            style={{ transform: `scale(${imageScale})`, width: "100%" }}
          >
            <Image
              src={banner3}
              alt="ikration Banner"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />{" "}
          </div>{" "}
        </div>{" "}
      </section>

      {/* Cinematic Video Section - REDUCED PADDING */}
      <section className="relative py-8 sm:py-12 lg:py-16 min-h-[60vh] sm:min-h-screen flex items-center">
        {/* Dark vignette overlay */}
        <div
          className="fixed inset-0 pointer-events-none transition-opacity duration-700 ease-out z-40"
          style={{
            opacity: cinemaEffect,
            background: `radial-gradient(ellipse at center, transparent 0%, transparent 30%, rgba(0, 0, 0, ${
              0.7 * cinemaEffect
            }) 70%, rgba(0, 0, 0, ${0.9 * cinemaEffect}) 100%)`,
          }}
        />

        <div
          ref={videoRef}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50 w-full"
        >
          <div
            className="relative transition-all duration-700 ease-out"
            style={{
              transform: `scale(${0.95 + cinemaEffect * 0.05})`,
            }}
          >
            <div
              className="relative rounded-xl sm:rounded-2xl overflow-hidden transition-shadow duration-700"
              style={{
                boxShadow:
                  cinemaEffect > 0.3
                    ? `0 0 ${40 * cinemaEffect}px rgba(234, 88, 12, ${
                        0.5 * cinemaEffect
                      }), 0 0 ${80 * cinemaEffect}px rgba(234, 88, 12, ${
                        0.3 * cinemaEffect
                      }), 0 20px 60px rgba(0, 0, 0, ${0.3 * cinemaEffect})`
                    : "0 10px 40px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <video
                ref={videoElementRef}
                className="w-full h-auto"
                loop
                muted
                playsInline
                poster="/videos/clockinvideo.mp4"
              >
                <source src="/videos/clockinvideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Cinema title overlay */}
            <div
              className="absolute top-4 sm:top-8 left-1/2 -translate-x-1/2 transition-all duration-700"
              style={{
                opacity: cinemaEffect,
                transform: `translateX(-50%) translateY(${
                  (1 - cinemaEffect) * -20
                }px)`,
              }}
            >
              <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold text-center drop-shadow-2xl px-4">
                See Ikration in Action
              </h3>
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
