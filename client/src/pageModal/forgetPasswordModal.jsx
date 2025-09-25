import { useState } from "react";
import api from "../config/api";
import toast from "react-hot-toast";

const ForgetPasswordModal = ({ isOpen, onClose }) => {

    console.log(isOpen);
    
  const [isOTPsent, setIsOTPsent] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [forgetFormData, setForgetFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForgetFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, otp, newPassword, confirmPassword } = forgetFormData;

    try {
      if (!isOTPsent) {
        const res = await api.post("/auth/sendOtp", { email });
        toast.success(res.data.message || "OTP sent!");
        setIsOTPsent(true);
      } else if (!isOTPVerified) {
        const res = await api.post("/auth/verifyOtp", { email, otp });
        toast.success(res.data.message || "OTP verified!");
        setIsOTPVerified(true);
      } else {
        const res = await api.post("/auth/forgetPassword", {
          newPassword,
          confirmPassword,
        });
        toast.success(res.data.message || "Password reset successful!");
        handleCloseClick();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleCloseClick = () => {
    setIsOTPsent(false);
    setIsOTPVerified(false);
    setForgetFormData({
      email: "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
   <div className="fixed inset-0 flex items-center justify-center z-50">
  {/* Modal Box */}
  <div className="bg-white max-w-md w-full p-6 rounded-lg shadow-lg relative z-10">
    <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          value={forgetFormData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* OTP */}
      {isOTPsent && (
        <div>
          <label className="block text-sm font-medium mb-1">OTP</label>
          <input
            type="text"
            placeholder="Enter OTP"
            name="otp"
            value={forgetFormData.otp}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      )}

      {/* Password */}
      {isOTPVerified && (
        <>
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              name="newPassword"
              value={forgetFormData.newPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              name="confirmPassword"
              value={forgetFormData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </>
      )}

      {/* Submit */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors mt-2"
        >
          {!isOTPsent
            ? "Verify Email"
            : !isOTPVerified
            ? "Verify OTP"
            : "Change Password"}
        </button>
      </div>

      {/* Close */}
      <button
        type="button"
        className="bg-red-500 text-white w-full px-4 py-2 rounded-md hover:bg-red-600 transition-colors mt-3"
        onClick={handleCloseClick}
      >
        Close
      </button>
    </form>
  </div>

  {/* Backdrop */}
  <div
    className="fixed inset-0 bg-black bg-opacity-50"
    onClick={handleCloseClick}
  ></div>
</div>

  );
};

export default ForgetPasswordModal;
