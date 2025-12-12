import React, { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Users,
  Building2,
  BarChart3,
  Clock,
  Shield,
} from "lucide-react";

function Features() {
  function FeatureCard({
    icon: IconComponent,
    title,
    desc,
    index,
    size = "normal",
    category,
  }: any) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

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

    const sizeClasses: any = {
      small: "md:col-span-1 md:row-span-1",
      normal: "md:col-span-1 md:row-span-1",
      wide: "md:col-span-2 md:row-span-1",
      tall: "md:col-span-1 md:row-span-2",
      large: "md:col-span-2 md:row-span-2",
    };

    return (
      <div
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${
          sizeClasses[size]
        } ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <div
          className={`h-full bg-gradient-to-br from-slate-50 to-slate-100 p-8 flex flex-col justify-between relative transition-all duration-500 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        >
          {/* Hover overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/5 transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          ></div>

          <div className="relative z-10">
            <div className="text-xs font-semibold text-orange-600 mb-3 uppercase tracking-wide">
              {category}
            </div>
            <div
              className={`w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-md transition-all duration-500 ${
                isHovered ? "scale-110 shadow-lg" : "scale-100"
              }`}
            >
              <IconComponent
                className={`w-7 h-7 text-orange-600 transition-all duration-500 ${
                  isHovered ? "scale-110" : "scale-100"
                }`}
              />
            </div>
            <h3
              className={`text-2xl font-bold text-slate-900 mb-3 transition-all duration-500 ${
                isHovered ? "translate-x-1" : "translate-x-0"
              }`}
            >
              {title}
            </h3>
            <p
              className={`text-slate-600 leading-relaxed transition-all duration-500 ${
                isHovered ? "translate-x-1" : "translate-x-0"
              }`}
            >
              {desc}
            </p>
          </div>

          {/* Decorative element */}
          <div
            className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/5 to-transparent rounded-tl-full transition-all duration-500 ${
              isHovered ? "scale-150 opacity-100" : "scale-100 opacity-50"
            }`}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <section
      id="features"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20"
    >
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
          Powerful Features
        </h2>
        <p className="text-lg sm:text-xl text-slate-600 mt-4">
          Everything you need to manage your workforce efficiently
        </p>
      </div>

      {/* Masonry-style grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr">
        <FeatureCard
          icon={MapPin}
          title="Geofencing Attendance"
          desc="Accurate attendance tracking using GPS geofencing. Eliminate time theft and ensure precise employee location verification."
          category="CORE FEATURE"
          size="wide"
          index={0}
        />
        <FeatureCard
          icon={Users}
          title="Employee Management"
          desc="Manage employee profiles, departments, and roles in one centralized platform."
          category="MANAGEMENT"
          size="normal"
          index={1}
        />
        <FeatureCard
          icon={Clock}
          title="Real-Time Check-In/Out"
          desc="Instant check-in and check-out with mobile-first experience. Works offline with automatic sync."
          category="ATTENDANCE"
          size="normal"
          index={2}
        />
        <FeatureCard
          icon={BarChart3}
          title="Advanced Reporting"
          desc="Comprehensive attendance reports, analytics, and insights. Export data in multiple formats for deeper analysis."
          category="ANALYTICS"
          size="normal"
          index={3}
        />
        <FeatureCard
          icon={Building2}
          title="Multi-Company Support"
          desc="Manage multiple companies from a single dashboard. Perfect for enterprises and agencies with complex organizational structures."
          category="ENTERPRISE"
          size="wide"
          index={4}
        />
        <FeatureCard
          icon={Shield}
          title="Enterprise Security"
          desc="Role-based access control, encryption, and compliance with data protection regulations."
          category="SECURITY"
          size="normal"
          index={5}
        />
      </div>

      {/* Coming Soon Section */}
      <div className="mt-12 sm:mt-16">
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6 sm:p-8 border border-orange-200 shadow-md">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              🚀 New Features Coming Soon
            </h3>
            <p className="text-slate-600 mb-4 text-sm sm:text-base">
              We're working on exciting new features to enhance your experience
            </p>
            <div className="flex flex-wrap gap-3 justify-center text-sm">
              <span className="bg-white px-4 py-2 rounded-lg shadow-sm">
                Leave Management
              </span>
              <span className="bg-white px-4 py-2 rounded-lg shadow-sm">
                Shift Scheduling
              </span>
              <span className="bg-white px-4 py-2 rounded-lg shadow-sm">
                Payroll Integration
              </span>
              <span className="bg-white px-4 py-2 rounded-lg shadow-sm">
                Mobile App
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Features;
