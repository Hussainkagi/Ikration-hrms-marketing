"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  MapPin,
  Users,
  Building2,
  BarChart3,
  Clock,
  Shield,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import banner from "@/public/Images/ban1.png";
import banner2 from "@/public/Images/ban4.png";
import banner3 from "@/public/Images/ban5.png";
import Image from "next/image";

declare global {
  interface Window {
    google?: any;
  }
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

function FeatureCard({ icon: IconComponent, title, desc, index }: any) {
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
      className={`border border-slate-200 rounded-xl p-8 hover:border-orange-300 transition-all duration-700 ${
        isVisible
          ? "opacity-100 translate-y-0 hover:scale-105"
          : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 75}ms` }}
    >
      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
        <IconComponent className="w-6 h-6 text-orange-600" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600">{desc}</p>
    </div>
  );
}

function StepCard({ num, title, desc, index }: any) {
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
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 transition-transform duration-300 hover:scale-110">
        {num}
      </div>
      <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm">{desc}</p>
    </div>
  );
}

function GoogleMapWithGeofences() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

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
      if (!mapRef.current) return;

      const googleMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 25.1883, lng: 55.2633 }, // Business Bay center
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

      setMap(googleMap);

      // Business Bay office locations with geofences
      const offices = [
        { lat: 25.1883, lng: 55.2633, name: "Main Office", radius: 120 },
        { lat: 25.1905, lng: 55.2655, name: "Branch Office 1", radius: 100 },
        { lat: 25.1865, lng: 55.2615, name: "Branch Office 2", radius: 110 },
        { lat: 25.1895, lng: 55.2595, name: "Warehouse", radius: 130 },
      ];

      offices.forEach((office) => {
        // Add marker
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

        // Add geofence circle
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

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const imageTop = rect.top;
        const imageBottom = rect.bottom;

        // Calculate how much of the image section is visible
        if (imageTop < windowHeight && imageBottom > 0) {
          const visibleHeight =
            Math.min(imageBottom, windowHeight) - Math.max(imageTop, 0);
          const sectionHeight = rect.height;
          const visibilityRatio = visibleHeight / sectionHeight;

          // Scale from 0.5 to 1 based on visibility
          const scale = 0.5 + visibilityRatio * 0.5;
          setImageScale(Math.min(scale, 1));
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
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
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-1000 ${
              heroVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight text-slate-900">
              Manage Your Workforce with{" "}
              <span className="text-orange-600">Precision</span>
            </h1>
            <p className="text-xl mt-6 text-pretty text-slate-600">
              Accurate employee attendance tracking with geofencing technology.
              Create companies, manage employees, and get real-time insights
              into your workforce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white text-lg h-12 px-8 flex items-center gap-2">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="text-lg h-12 px-8 bg-transparent"
              >
                Watch Demo
              </Button>
            </div>
            <p className="text-sm mt-6 text-slate-500">
              ✓ No credit card required • ✓ 14-day free trial • ✓ Setup in
              minutes
            </p>
          </div>
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              heroVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="rounded-2xl aspect-square flex items-center justify-center overflow-hidden">
              <GoogleMapWithGeofences />
            </div>

            {showTooltip && (
              <div className="absolute bottom-4 -left-4 lg:-left-12 z-10 animate-in fade-in slide-in-from-left-4 duration-700 delay-1500">
                <div className="relative">
                  {/* Tooltip Box */}
                  <div className="bg-white rounded-lg shadow-xl border-2 border-orange-200 p-4 max-w-[280px] relative">
                    {/* Close button */}
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

                  {/* Pointer connecting tooltip to map */}
                  <div className="absolute top-8 -right-12 w-12">
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
                    {/* Dot at the end pointing to map */}
                    <div className="absolute -top-1.5 right-0 w-4 h-4 bg-orange-600 rounded-full border-2 border-white shadow-sm" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Banner Image Section with Scale Animation */}
      <section
        ref={imageRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="flex items-center justify-center">
          <div
            className="transition-all duration-700 ease-out"
            style={{
              transform: `scale(${imageScale})`,
              width: "100%",
            }}
          >
            <Image
              src={banner3}
              alt="ikration Banner"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard value="10K+" label="Companies Trust Us" index={0} />
            <StatCard value="500K+" label="Employees Tracked Daily" index={1} />
            <StatCard value="99.9%" label="Uptime Guaranteed" index={2} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className={`text-center mb-16 transition-all duration-700`}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Powerful Features
          </h2>
          <p className="text-xl text-slate-600 mt-4">
            Everything you need to manage your workforce efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={MapPin}
            title="Geofencing Attendance"
            desc="Accurate attendance tracking using GPS geofencing. Eliminate time theft and ensure precise employee location verification."
            index={0}
          />
          <FeatureCard
            icon={Users}
            title="Employee Management"
            desc="Manage employee profiles, departments, and roles in one centralized platform. Easy onboarding and bulk operations."
            index={1}
          />
          <FeatureCard
            icon={Building2}
            title="Multi-Company Support"
            desc="Manage multiple companies from a single dashboard. Perfect for enterprises and agencies."
            index={2}
          />
          <FeatureCard
            icon={BarChart3}
            title="Advanced Reporting"
            desc="Comprehensive attendance reports, analytics, and insights. Export data in multiple formats."
            index={3}
          />
          <FeatureCard
            icon={Clock}
            title="Real-Time Check-In/Out"
            desc="Instant check-in and check-out with mobile-first experience. Works offline with automatic sync."
            index={4}
          />
          <FeatureCard
            icon={Shield}
            title="Enterprise Security"
            desc="Role-based access control, encryption, and compliance with data protection regulations."
            index={5}
          />
        </div>

        {/* Coming Soon */}
        <div className="mt-16 transition-all duration-1000">
          <div
            className={`bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200 transition-all duration-700`}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                🚀 New Features Coming Soon
              </h3>
              <p className="text-slate-600 mb-4">
                We're working on exciting new features to enhance your
                experience
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                <span className="bg-white px-4 py-2 rounded-lg">
                  Leave Management
                </span>
                <span className="bg-white px-4 py-2 rounded-lg">
                  Shift Scheduling
                </span>
                <span className="bg-white px-4 py-2 rounded-lg">
                  Payroll Integration
                </span>
                <span className="bg-white px-4 py-2 rounded-lg">
                  Mobile App
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 text-center mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StepCard
              num={1}
              title="Create Company"
              desc="Set up your company profile in minutes"
              index={0}
            />
            <StepCard
              num={2}
              title="Add Employees"
              desc="Invite and manage your team members"
              index={1}
            />
            <StepCard
              num={3}
              title="Enable Geofencing"
              desc="Set office locations with GPS boundaries"
              index={2}
            />
            <StepCard
              num={4}
              title="Track & Analyze"
              desc="Monitor attendance and get insights"
              index={3}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="pricing"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div
          className={`bg-orange-600 rounded-2xl px-8 py-16 text-center text-white transition-all duration-1000`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Transform Your Workforce Management?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of companies already using ICRA
          </p>
          <Button className="bg-white text-orange-600 hover:bg-slate-100 text-lg h-12 px-8 font-semibold">
            Start Your Free Trial Today
          </Button>
          <p className="text-orange-100 text-sm mt-4">
            30-day money-back guarantee • No credit card required
          </p>
        </div>
      </section>
    </div>
  );
}
