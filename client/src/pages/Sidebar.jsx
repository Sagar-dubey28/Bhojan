import React from "react";
import { User, LogOut } from "lucide-react";
import { useAsyncValue, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import toast from "react-hot-toast";
import api from "../config/api";

const Sidebar = ({ active, setActive }) => {
  const { setIsLogin,user,setUser } = useAuth();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    try {
      const res = await api.post("/auth/logout")
      setUser("");
      sessionStorage.removeItem("BhojanUser");
      setIsLogin(false);
      toast.success("Successfully Logout");

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* sidebar */}
      <aside className="w-72 bg-base-100 shadow-xl  flex flex-col">
        <div className="card shadow-sm border-b bg-base-100">
          <div className="card-body items-center text-center">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-base-200 ring-offset-2 bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-md">
                <img
                  src={user.profilePic}
                  alt="userPicture"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            </div>
            <h3 className="card-title text-lg font-bold text-gray-900">
              {user.fullName}
            </h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="w-64 bg-base-100  rounded-xl ">
          <ul className="menu p-4 space-y-2">
            <li>
              <a
                className="flex items-center px-4 py-2 rounded-lg hover:bg-primary hover:text-primary-content transition-all"
                onClick={() => setActive("Account")}
              >
                Account Details
              </a>
            </li>
            <li>
              <a
                className="flex items-center px-4 py-2 rounded-lg hover:bg-primary hover:text-primary-content transition-all"
                onClick={() => {
                  setActive("Address");
                }}
              >
                Address
              </a>
            </li>
            <li>
              <a
                className="flex items-center px-4 py-2 rounded-lg hover:bg-primary hover:text-primary-content transition-all"
                onClick={() => {
                  setActive("Order");
                }}
              >
                Orders
              </a>
            </li>
            <li>
              <a
                className="flex items-center px-4 py-2 rounded-lg hover:bg-primary hover:text-primary-content transition-all"
                onClick={() => {
                  setActive("Review");
                }}
              >
                Review
              </a>
            </li>
            <li>
              <a
                className="flex items-center px-4 py-2 rounded-lg hover:bg-secondary hover:text-secondary-content transition-all"
                onClick={() => {
                  setActive("ContactUs");
                }}
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <ul className="menu p-4 flex-1">
          <li className="mt-1 border-t pt-4">
            <button
              className="flex items-center gap-3 text-error hover:bg-error/10 hover:text-error rounded-lg px-4  transition-all"
              onClick={handleClick}
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Log Out</span>
            </button>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
