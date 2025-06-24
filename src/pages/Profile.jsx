import React, { useEffect, useState } from "react";
import { FaUser, FaMapMarkerAlt, FaBriefcase, FaRegSave } from "react-icons/fa";

const Profile = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [bio, setBio] = useState({
    name: "",
    headline: "",
    location: "",
    about: "",
  });

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    setAppliedJobs(storedJobs);

    const storedBio = JSON.parse(localStorage.getItem("userBio")) || {};
    setBio(storedBio);
  }, []);

  const handleChange = (e) => {
    setBio({ ...bio, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("userBio", JSON.stringify(bio));
    alert("✅ Profile updated!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">My Profile</h2>

        {/* Profile Info */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
          <h3 className="text-2xl font-semibold text-blue-600 mb-6">👤 Profile Info</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={bio.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              name="headline"
              placeholder="Headline (e.g. Frontend Developer)"
              value={bio.headline}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={bio.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <textarea
              name="about"
              placeholder="Short Bio"
              value={bio.about}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 col-span-2"
            />
          </div>
          <button
            onClick={handleSave}
            className="mt-6 bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <FaRegSave /> Save Profile
          </button>
        </div>

        {/* Applied Jobs */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-blue-600 mb-6">📄 Applied Jobs</h3>
          {appliedJobs.length === 0 ? (
            <p className="text-gray-600">You haven't applied to any jobs yet.</p>
          ) : (
            <ul className="grid md:grid-cols-2 gap-6">
              {appliedJobs.map((job, index) => (
                <li
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow transition"
                >
                  <h4 className="text-lg font-bold text-gray-800">{job.title}</h4>
                  <p className="text-gray-600 flex items-center gap-1 mt-1">
                    <FaBriefcase className="text-blue-500" /> {job.company}
                  </p>
                  <p className="text-gray-600 flex items-center gap-1">
                    <FaMapMarkerAlt className="text-green-500" /> {job.location}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
