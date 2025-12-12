import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Building2,
  Users,
  MapPin,
  BarChart3,
} from "lucide-react";

function Howitwork() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const steps = [
    {
      num: 1,
      title: "Create Company",
      desc: "Set up your company profile in minutes with our intuitive onboarding process",
      icon: Building2,
    },
    {
      num: 2,
      title: "Add Employees",
      desc: "Invite and manage your team members with bulk import or individual invites",
      icon: Users,
    },
    {
      num: 3,
      title: "Enable Geofencing",
      desc: "Set office locations with GPS boundaries for accurate attendance tracking",
      icon: MapPin,
    },
    {
      num: 4,
      title: "Track & Analyze",
      desc: "Monitor attendance in real-time and get actionable insights with detailed reports",
      icon: BarChart3,
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setDirection("forward");
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const goToStep = (index: number) => {
    setDirection(index > currentStep ? "forward" : "backward");
    setCurrentStep(index);
    setIsPlaying(false);
  };

  const nextStep = () => {
    setDirection("forward");
    setCurrentStep((prev) => (prev + 1) % steps.length);
    setIsPlaying(false);
  };

  const prevStep = () => {
    setDirection("backward");
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
    setIsPlaying(false);
  };

  return (
    <section className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 text-center mb-12 sm:mb-16">
          How It Works
        </h2>

        {/* Main Card Display */}
        <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl p-8 sm:p-12 mb-8 min-h-[400px] flex items-center justify-center">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.num}
                className={`absolute inset-0 p-8 sm:p-12 flex flex-col items-center justify-center text-center transition-all duration-700 ease-in-out ${
                  index === currentStep
                    ? "opacity-100 translate-x-0"
                    : direction === "forward"
                    ? index < currentStep
                      ? "opacity-0 -translate-x-full"
                      : "opacity-0 translate-x-full"
                    : index > currentStep
                    ? "opacity-0 translate-x-full"
                    : "opacity-0 -translate-x-full"
                }`}
              >
                <div
                  className={`w-24 h-24 bg-orange-600 text-white rounded-full flex items-center justify-center mb-6 shadow-lg transition-transform duration-500 ${
                    index === currentStep ? "scale-100" : "scale-75"
                  }`}
                >
                  <IconComponent className="w-12 h-12" />
                </div>

                <div className="bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  Step {step.num} of {steps.length}
                </div>

                <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                  {step.title}
                </h3>

                <p className="text-slate-600 text-lg max-w-xl">{step.desc}</p>
              </div>
            );
          })}

          {/* Navigation Arrows */}
          <button
            onClick={prevStep}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white hover:bg-orange-50 border-2 border-orange-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
            aria-label="Previous step"
          >
            <ChevronLeft className="w-6 h-6 text-orange-600" />
          </button>

          <button
            onClick={nextStep}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white hover:bg-orange-50 border-2 border-orange-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
            aria-label="Next step"
          >
            <ChevronRight className="w-6 h-6 text-orange-600" />
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 bg-orange-600 hover:bg-orange-700 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </button>

          <div className="flex gap-3">
            {steps.map((step, index) => (
              <button
                key={step.num}
                onClick={() => goToStep(index)}
                className="group relative"
                aria-label={`Go to step ${step.num}`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    index === currentStep
                      ? "bg-orange-600 text-white shadow-lg scale-110"
                      : "bg-slate-200 text-slate-600 hover:bg-orange-100 hover:text-orange-600"
                  }`}
                >
                  {step.num}
                </div>

                {/* Progress bar */}
                {index === currentStep && isPlaying && (
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-600 animate-progress" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        
        .animate-progress {
          animation: progress 3.5s linear;
        }
      `}</style>
    </section>
  );
}

export default Howitwork;
