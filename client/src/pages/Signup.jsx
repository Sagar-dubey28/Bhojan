// Signup.jsx
import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Join FeastFleet</h2>
        <p className="text-gray-600 text-center mb-6 text-sm">
          Sign up to order food
        </p>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />

        <button className="w-full bg-orange-500 text-white py-2 rounded-lg">
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
