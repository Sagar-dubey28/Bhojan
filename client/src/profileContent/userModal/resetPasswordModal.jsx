import React, { useState } from "react";
import toast from "react-hot-toast";
import { RxCrossCircled } from "react-icons/rx";
import api from "../../config/api";


const ResetPasswordModal = ({ isOpen, onClose }) => {
  const [resetPassForm, setResetPassForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (resetPassForm.newPassword !== resetPassForm.confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }
    try {
        const res = await api.post("/auth/resetPassword", resetPassForm);
        toast.success(res.data.message);
        setResetPassForm({
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        });
        onClose();
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.status + " | " + error?.response?.data?.message ||
          "Unknown Error From Server"
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResetPassForm((prev) => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 flex justify-center bg-base-300/50">
        <div className="w-1/2 max-h-[80vh] m-auto bg-base-200 mt-25 rounded-xl">
          <div className="flex justify-between p-4 border-b-2 sticky top-0">
            <h1>Reset Password</h1>
            <button className="text-red-500 text-2xl" onClick={onClose}>
              <RxCrossCircled />
            </button>
          </div>
          <div className="p-3">
            <form
              className="flex flex-col gap-4"
              onSubmit={handleResetPassword}
            >
              <label className="flex flex-col">
                <span className="mb-1">Current Password</span>
                <input
                  type="password"
                  name="currentPassword"
                  value={resetPassForm.currentPassword}
                  className="input input-bordered"
                  placeholder="Enter current password"
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-1">New Password</span>
                <input
                  type="password"
                  name="newPassword"
                  value={resetPassForm.newPassword}
                  className="input input-bordered"
                  placeholder="Enter new password"
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-1">Confirm New Password</span>
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={resetPassForm.confirmNewPassword}
                  className="input input-bordered"
                  placeholder="Confirm new password"
                  onChange={handleChange}
                  required
                />
              </label>
              <button type="submit" className="btn btn-primary mt-2">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordModal;