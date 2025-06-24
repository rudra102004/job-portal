import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "./job-search.json";

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Discover Your <span className="text-blue-600">Dream Job</span> Today
          </h1>
          <p className="text-lg text-gray-600">
            Find jobs that match your skills, connect with recruiters, and build your career in tech.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">Remote Jobs</span>
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">Internships</span>
            <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">Full-Time</span>
          </div>
          <div className="mt-6 flex gap-4">
            <Link
              to="/jobs"
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
            >
              Browse Jobs
            </Link>
            <Link
              to="/signup"
              className="bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-100 transition"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Right animation */}
        <div className="hidden md:block">
          <Lottie animationData={animationData} loop={true} className="w-full max-w-md" />
        </div>
      </div>

      {/* Features section */}
      <div className="mt-20 max-w-6xl mx-auto grid md:grid-cols-3 gap-6 text-center">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Verified Listings</h3>
          <p className="text-gray-600 text-sm">Every job is manually verified to ensure quality and trust.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-green-600 mb-2">Easy Apply</h3>
          <p className="text-gray-600 text-sm">Apply with one click and get responses faster from recruiters.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-purple-600 mb-2">Track Applications</h3>
          <p className="text-gray-600 text-sm">Stay updated with your application status in real time.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
