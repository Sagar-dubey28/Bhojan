import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/api";
import toast from "react-hot-toast";

const SignupPage = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e)=>{
     e.preventDefault();
     if(signupData.password !== signupData.confirmPassword){
      toast.error("Password does not match");
     }

     try {
       const res = await api.post("/auth/register", signupData);
       toast.success(res.data.message);
       navigate("/login");
     } catch (error) {
       toast.error(error.message);
     }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-base-200 px-4">
      <div className="bg-base-100 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-base-content mb-2">
          Join FeastFleet
        </h2>
        <p className="text-center text-sm text-base-content/70 mb-6">
          Sign up to order food
        </p>
        <form className="space-y-4" onSubmit={handleSignup}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="input input-bordered w-full"
            value={signupData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={signupData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={signupData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="input input-bordered w-full"
            value={signupData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="btn btn-primary w-full"
          >SignUp
            
          </button>
        </form>

        <p className="text-center text-sm text-base-content/70 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
