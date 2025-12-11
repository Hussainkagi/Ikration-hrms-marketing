import React, { useEffect, useRef, useState } from "react";

function Howitwork() {
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
        <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 transition-transform duration-300 hover:scale-110 shadow-lg">
          {num}
        </div>
        <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm">{desc}</p>
      </div>
    );
  }
  return (
    <section className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 text-center mb-12 sm:mb-16">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
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
  );
}

export default Howitwork;
