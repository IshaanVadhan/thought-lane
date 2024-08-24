"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axios";

export default function Home() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const { login, user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignup) {
        const response = await axiosInstance.post("/register", formData);
        const { token } = response.data;

        localStorage.setItem("token", token);
        login({ email: formData.email, password: formData.password });
      } else {
        await login(formData);
      }

      router.push("/posts");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return !user ? (
    <div className="flex justify-center items-center">
      <div className="bg-dark-200 p-8 rounded-md shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-medium text-center">
          {isSignup ? "Sign Up" : "Log In"}
        </h1>
        <hr className="border-gray-600 my-4" />
        {error && (
          <p className="bg-red-500 text-white mb-4 rounded-md p-2 text-sm">
            Error: {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-dark-300 rounded-md shadow-sm p-1.5"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-dark-300 rounded-md shadow-sm p-1.5"
                  rows="1"
                  required
                />
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full bg-dark-300 rounded-md shadow-sm p-1.5"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full bg-dark-300 rounded-md shadow-sm p-1.5"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="mt-2 bg-purple-500 text-white px-4 py-3 rounded-md w-full text-md font-medium"
            >
              {isSignup ? "Sign Up" : "Log In"}
            </button>
          </div>
        </form>
        <div className="mt-3 text-center">
          {isSignup ? "Already have an account? " : "Need an account? "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-purple-500 hover:underline"
          >
            {isSignup ? "Log In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
