import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import Lottie from "lottie-react";
import signupAnimation from "../animations/signup.json";

const Signup = () => {
  const [form, setForm] = useState({ email: "", password: "", role: "jobseeker" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: form.email,
        role: form.role,
        createdAt: new Date()
      });

      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl">
        <div className="bg-white rounded-xl shadow-lg grid md:grid-cols-2 overflow-hidden">
          
          {/* Left side: Signup Form */}
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Create an Account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                onChange={handleChange}
              />
              <select
                name="role"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={form.role}
                onChange={handleChange}
              >
                <option value="jobseeker">Job Seeker</option>
                <option value="recruiter">Recruiter</option>
              </select>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Sign Up
              </button>
              <p className="text-sm text-center mt-2">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </p>
            </form>
          </div>

          {/* Right side: Animation */}
          <div className="hidden md:flex items-center justify-center bg-blue-50">
            <Lottie animationData={signupAnimation} className="w-[90%] max-w-md" loop />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;
