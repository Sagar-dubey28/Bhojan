import { use, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../config/api";
import { useAuth } from "../Context/AuthProvider";
import toast from "react-hot-toast";
import ForgetPasswordModal from "../pageModal/forgetPasswordModal";

const LoginPage = () => {
  const { setUser, setIsLogin } = useAuth();

  const [isForgetpasswordModalOpen, setIsForgetpasswordModalOpen] =
    useState(false);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(`/auth/${loginData.role}/login`, loginData);
      toast.success(res.data.message);
      setUser(res.data.data);
      console.log(res.data.data);
      
      setIsLogin(true);
      sessionStorage.setItem("BhojanUser", JSON.stringify(res.data.data));
      
      // Navigate based on role
      switch (loginData.role) {
        case "restaurant":
          navigate("/restaurantDashboard");
          break;
        case "rider":
          navigate("/riderDashboard");
          break;
        default:
          navigate("/profilePage");
          break;
      };
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
        <div className="bg-base-100 p-8 rounded-2xl shadow-lg w-full max-w-md">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-base-content mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-sm text-base-content/70 mb-6">
            Login to your account
          </p>

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <label className="text-base-content font-medium">
              Select the Role
            </label>
            <div className="flex gap-4 justify-between items-center mb-2 mt-2">
              <div>
                <input
                  type="radio"
                  id="user"
                  name="role"
                  value="user"
                  onChange={handleChange}
                  checked={loginData.role === "user"}
                />
                <label htmlFor="user" className="ml-2 text-base-content">
                  User
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="restaurant"
                  name="role"
                  value="restaurant"
                  onChange={handleChange}
                  checked={loginData.role === "restaurant"}
                />
                <label htmlFor="restaurant" className="ml-2 text-base-content">
                  Restaurant
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="rider"
                  name="role"
                  value="rider"
                  onChange={handleChange}
                  checked={loginData.role === "rider"}
                />
                <label htmlFor="rider" className="ml-2 text-base-content">
                  Rider
                </label>
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="label text-sm font-medium text-base-content">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="label text-sm font-medium text-base-content">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberme"
                  id="rememberme"
                  className="accent-primary"
                />
                <label
                  htmlFor="rememberme"
                  className="ml-2 text-sm text-base-content"
                >
                  Remember me
                </label>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsForgetpasswordModalOpen(true);
                }}
                className="text-sm text-secondary hover:underline hover:text-primary"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-center text-sm text-base-content/70 mt-6">
            Don't have an account?{" "}
            <NavLink
              to="/signup"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </NavLink>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgetPasswordModal
        isOpen={isForgetpasswordModalOpen}
        onClose={() => setIsForgetpasswordModalOpen(false)}
      />
    </>
  );
};

export default LoginPage;
