import React from "react";
import { FaMapMarkerAlt, FaMoneyBillWave, FaBriefcase } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import jobList from "../data/jobList";

const Jobs = () => {
  const navigate = useNavigate();

  const handleApply = (job) => {
    const existing = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    const isAlreadyApplied = existing.some((j) => j.id === job.id);
    if (isAlreadyApplied) {
      alert("You've already applied for this job.");
      return;
    }
    localStorage.setItem("appliedJobs", JSON.stringify([...existing, job]));
    alert("Application submitted!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">Available Jobs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobList.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-200"
            >
              <h3 className="text-2xl font-semibold text-blue-700">{job.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{job.company}</p>

              <div className="flex flex-wrap gap-2 text-sm mb-3">
                <span className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  <FaBriefcase /> {job.type}
                </span>
                <span className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  <FaMapMarkerAlt /> {job.location}
                </span>
                <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                  <FaMoneyBillWave /> {job.salary}
                </span>
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleApply(job)}
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Apply
                </button>
                <button
                  onClick={() => navigate(`/job/${job.id}`)}
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
