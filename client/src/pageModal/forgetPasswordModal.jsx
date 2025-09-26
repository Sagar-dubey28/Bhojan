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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      {/* Modal Box */}
      <div className="bg-base-100 max-w-md w-full p-6 rounded-xl shadow-xl relative z-10">
        <h2 className="text-2xl font-bold text-center mb-4 text-primary">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-neutral">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={forgetFormData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* OTP */}
          {isOTPsent && (
            <div>
              <label className="block text-sm font-medium mb-1 text-neutral">
                OTP
              </label>
              <input
                type="text"
                placeholder="Enter OTP"
                name="otp"
                value={forgetFormData.otp}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
          )}

          {/* Password */}
          {isOTPVerified && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1 text-neutral">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  name="newPassword"
                  value={forgetFormData.newPassword}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-neutral">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  name="confirmPassword"
                  value={forgetFormData.confirmPassword}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </>
          )}

          {/* Submit */}
          <div className="flex justify-center">
            <button type="submit" className="btn btn-primary w-full mt-2">
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
            className="btn btn-error w-full mt-3"
            onClick={handleCloseClick}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordModal;
