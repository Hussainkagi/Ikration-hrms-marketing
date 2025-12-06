"use client";

import { useState } from "react";
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const countries = [
  { code: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "+1", name: "USA", flag: "🇺🇸" },
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+44", name: "UK", flag: "🇬🇧" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "+65", name: "Singapore", flag: "🇸🇬" },
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+974", name: "Qatar", flag: "🇶🇦" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    countryCode: "+971",
    mobile: "",
    email: "",
    companyName: "",
    requirements: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<any>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Prepare data for Google Sheets
      const formattedData = {
        timestamp: new Date().toISOString(),
        phone: `${formData.countryCode} ${formData.mobile}`,
        email: formData.email,
        companyName: formData.companyName,
        requirements: formData.requirements,
      };

      // Send to Google Sheets via Apps Script Web App
      const response = await fetch(
        process.env.NEXT_PUBLIC_SHEET_APP_SCRIPT_URL || "",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

      // Since we're using no-cors, we'll assume success
      setSubmitStatus("success");
      setFormData({
        countryCode: "+971",
        mobile: "",
        email: "",
        companyName: "",
        requirements: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">Ikration</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="/#features"
              className="text-slate-600 hover:text-slate-900 transition"
            >
              Features
            </a>
            <a
              href="/#pricing"
              className="text-slate-600 hover:text-slate-900 transition"
            >
              Pricing
            </a>
            <a href="/contact" className="text-orange-600 font-semibold">
              Contact
            </a>
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Get in <span className="text-orange-600">Touch</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Phone Number with Country Code */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Phone Number *
                </label>
                <div className="flex gap-3">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="w-32 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    required
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@company.com"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Your company name"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Requirements *
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="Tell us about your requirements..."
                  rows={5}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white h-12 text-lg font-semibold flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </Button>

              {/* Success/Error Messages */}
              {submitStatus === "success" && (
                <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">
                    Message sent successfully! We'll get back to you soon.
                  </span>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                  <span className="font-medium">
                    Failed to send message. Please try again or contact us
                    directly.
                  </span>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Info Cards */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Phone</h4>
                    <p className="text-slate-600">+971 4 123 4567</p>
                    <p className="text-slate-600">+971 50 123 4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Email</h4>
                    <p className="text-slate-600">info@ikration.com</p>
                    <p className="text-slate-600">support@ikration.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">
                      Office
                    </h4>
                    <p className="text-slate-600">
                      IT Park, Indore
                      <br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Business Hours</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-semibold">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-semibold">Closed</span>
                </div>
              </div>
              <p className="mt-6 text-orange-100 text-sm">
                Response time: Within 24 hours on business days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
