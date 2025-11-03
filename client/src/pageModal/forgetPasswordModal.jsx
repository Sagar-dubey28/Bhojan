import { useState } from "react";
import api from "../config/api";
import toast from "react-hot-toast";

const ForgetPasswordModal = ({ isOpen, onClose }) => {
  console.log(isOpen);

  const [isLoading, setIsLoading] = useState(false);
  const [isOTPsent, setIsOTPsent] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [error, setError] = useState("");
  const [forgetFormData, setForgetFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForgetFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, otp, newPassword, confirmPassword, role } = forgetFormData;

    try {
      setError("");
        setIsLoading(true);

  if (!isOTPsent) {
        if (!role) {
          throw new Error("Please select a role to continue");
        }
        if (!email) {
          throw new Error("Please enter your email");
        }
        
        try {
          const res = await api.post("/auth/sendOtp", { email, role });
          toast.success(res.data.message || "OTP sent!");
          setIsOTPsent(true);
        } catch (error) {
          // show error and stop loading
          toast.error(error.response?.data?.message || "Failed to send OTP");
          setIsLoading(false);
          return;
        }
        // stop loading after successful send
        setIsLoading(false);
      } else if (!isOTPVerified) {
        try {
          const res = await api.post("/auth/verifyOtp", { email, otp });
          toast.success(res.data.message || "OTP verified!");
          setIsOTPVerified(true);
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
        } finally {
          setIsLoading(false);
        }
      } else {
        try {
          const res = await api.post("/auth/forgetPassword", {
            role,
            newPassword,
            confirmPassword,
          });
          toast.success(res.data.message || "Password reset successful!");
          handleCloseClick();
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
        } finally {
          setIsLoading(false);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setIsLoading(false);
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
      role: "",
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
                onChange={() => setForgetFormData({ ...forgetFormData, role: "user" })}
                checked={forgetFormData.role === "user"}
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
                onChange={() => setForgetFormData({ ...forgetFormData, role: "restaurant" })}
                checked={forgetFormData.role === "restaurant"}
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
                onChange={() => setForgetFormData({ ...forgetFormData, role: "rider" })}
                checked={forgetFormData.role === "rider"}
              />
              <label htmlFor="rider" className="ml-2 text-base-content">
                Rider
              </label>
            </div>
          </div>

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
            <button type="submit" className="btn btn-primary w-full mt-2" disabled={isLoading}>
               {isLoading
                    ? "Processing..."
                    : isOTPsent === true
                    ? isOTPVerified === true
                      ? "Change Password"
                      : "Verify Otp"
                    : "Verify Email"}
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
