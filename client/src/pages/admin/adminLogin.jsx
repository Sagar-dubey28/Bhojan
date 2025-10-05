import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../config/api";
import { useAuth } from "../../Context/AuthProvider";
import toast from "react-hot-toast";


const AdminLogin = () => {
  const { setUser, setIsLogin, setIsAdmin } = useAuth();

 

  const navigate = useNavigate();

  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setloginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/admin/login", loginData);
      toast.success(res.data.message);
      setUser(res.data.admin);
      setIsLogin(true);
      setIsAdmin(true);
      sessionStorage.setItem("BhojanUser", JSON.stringify(res.data.admin));
      navigate("/adminDashboard");
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
        <div className="bg-base-100 p-8 rounded-2xl shadow-lg w-full max-w-md">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-base-content mb-2">
            Admin Login
          </h2>
      
          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
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
                onChange={handlechange}
                required
              />
            </div>

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
                onChange={handlechange}
                required
              />
            </div>

            {/* Login Button */}
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
