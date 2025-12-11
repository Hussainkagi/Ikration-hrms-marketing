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
        className={`border border-slate-200 rounded-xl p-8 hover:border-orange-300 transition-all duration-700 hover:shadow-lg ${
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
  return (
    <section
      id="features"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20"
    >
      <div className={`text-center mb-12 sm:mb-16 transition-all duration-700`}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
          Powerful Features
        </h2>
        <p className="text-lg sm:text-xl text-slate-600 mt-4">
          Everything you need to manage your workforce efficiently
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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

      <div className="mt-12 sm:mt-16 transition-all duration-1000">
        <div
          className={`bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6 sm:p-8 border border-orange-200 shadow-md transition-all duration-700`}
        >
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              🚀 New Features Coming Soon
            </h3>
            <p className="text-slate-600 mb-4 text-sm sm:text-base">
              We're working on exciting new features to enhance your experience
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center text-sm">
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
