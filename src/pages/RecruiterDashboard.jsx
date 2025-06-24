// src/pages/RecruiterDashboard.jsx
import React, { useState } from "react";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";


const RecruiterDashboard = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handlePostJob = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Please log in first.");
        navigate("/login");
        return;
      }

      await addDoc(collection(db, "jobs"), {
        title: jobTitle,
        description: jobDesc,
        location: location,
        postedBy: user.uid,
        postedAt: new Date()
      });

      alert("Job posted successfully!");
      setJobTitle("");
      setJobDesc("");
      setLocation("");
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Something went wrong.");
    }
  };

// Inside a useEffect
useEffect(() => {
  const fetchJobs = async () => {
    const user = auth.currentUser;
    if (user) {
      const q = query(collection(db, "jobs"), where("postedBy", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const jobsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setJobs(jobsData);
    }
  };
  fetchJobs();
}, []);


  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Post a New Job</h2>
      <form onSubmit={handlePostJob} className="space-y-4">
        <input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Job Description"
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post Job
        </button>
      </form>
    </div>
    
  );
};

export default RecruiterDashboard;
