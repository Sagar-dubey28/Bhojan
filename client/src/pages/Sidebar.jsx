import React from "react";
import { LogOut } from "lucide-react";
import {  useNavigate } from "react-router-dom";
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
      {/* mobile top nav (visible on small screens) */}
      <div className="md:hidden bg-base-100 border-b">
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full ring ring-base-200 ring-offset-2 bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-sm overflow-hidden">
                <img src={user.profilePic} alt="userPicture" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="text-sm">
              <div className="font-medium">{user.fullName}</div>
              <div className="text-xs text-gray-500 truncate" style={{maxWidth:200}}>{user.email}</div>
            </div>
          </div>
        </div>
        <div className="px-3 pb-3 overflow-x-auto">
          <div className="flex gap-2">
            <button onClick={() => setActive("Account")} className={`px-3 py-1 rounded-lg text-sm ${active==="Account"?"bg-primary text-primary-content":"bg-base-200"}`}>Account</button>
            <button onClick={() => setActive("Address")} className={`px-3 py-1 rounded-lg text-sm ${active==="Address"?"bg-primary text-primary-content":"bg-base-200"}`}>Address</button>
            <button onClick={() => setActive("Order")} className={`px-3 py-1 rounded-lg text-sm ${active==="Order"?"bg-primary text-primary-content":"bg-base-200"}`}>Orders</button>
            <button onClick={() => setActive("Review")} className={`px-3 py-1 rounded-lg text-sm ${active==="Review"?"bg-primary text-primary-content":"bg-base-200"}`}>Review</button>
            <button onClick={() => setActive("ContactUs")} className={`px-3 py-1 rounded-lg text-sm ${active==="ContactUs"?"bg-secondary text-secondary-content":"bg-base-200"}`}>Contact</button>
          </div>
        </div>
      </div>

      {/* sidebar for md+ */}
      <aside className="hidden md:flex w-72 bg-base-100 shadow-xl  flex-col">
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
