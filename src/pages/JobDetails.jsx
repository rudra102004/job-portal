import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import jobList from "../data/jobList";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobList.find((j) => j.id === id);

  if (!job) {
    return <div className="p-6 text-red-600">Job not found.</div>;
  }

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md p-8 rounded-xl">
        <button
          className="mb-6 text-blue-600 hover:underline"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-blue-700">{job.title}</h1>
        <p className="text-gray-600">{job.company} • {job.location}</p>
        <span className="inline-block mt-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{job.type}</span>

        <div className="mt-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Job Description</h2>
            <p className="text-gray-700">{job.description}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Requirements</h2>
            <p className="text-gray-700">{job.requirements}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Salary</h2>
            <p className="text-gray-700">{job.salary}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
