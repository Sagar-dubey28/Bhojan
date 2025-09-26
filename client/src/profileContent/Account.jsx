import React from "react";
import { useState } from "react";
import ResetPassword from "./userModal/resetPasswordModal";
import EditProfileModal from "./userModal/editProfileModal";
import { useAuth } from "../Context/AuthProvider";

const Account = () => {
  const { user } = useAuth();
  
  const [isResetPassModalOpen, setIsResetPassModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  return (
    <>
      <div className="card bg-base-100  border border-gray-200 ">
        <div className="card-body">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center">
            <div className="avatar">
              <div className="w-44 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.profilePic} alt="Profile" />
              </div>
            </div>
            <label className="mt-3 cursor-pointer">
              <span className="btn btn-outline btn-primary btn-sm">
                Upload New Photo
              </span>
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Name */}
            <div>
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <span className="block p-2 rounded-md border border-primary bg-base-200">
                {user.fullName}
              </span>
            </div>

            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <span className="block p-2 rounded-md border border-primary bg-base-200">
                {user.email}
              </span>
            </div>

            {/* Phone */}
            <div>
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <span className="block p-2 rounded-md border border-primary bg-base-200">
                {user.phone} 
              </span>
            </div>

            {/* Password */}
            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <span className="block p-2 rounded-md border border-primary bg-base-200">
                ********
              </span>
            </div>

            {/* DOB */}
            <div>
              <label className="label">
                <span className="label-text">Date of Birth</span>
              </label>
              <span className="block p-2 rounded-md border border-primary bg-base-200">
                {user.dob} 
              </span>
            </div>

            {/* Gender */}
            <div>
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <span className="block p-2 rounded-md border border-primary bg-base-200">
                {user.gender}
              </span>
            </div>

            {/* Food Preference */}
            <div className="md:col-span-2">
              <label className="label">
                <span className="label-text">Food Preference</span>
              </label>
              <span className="block p-2 rounded-md border border-primary bg-base-200">
                {user.foodType}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap gap-3 justify-end">
            <button className="btn btn-secondary" onClick={() => setIsResetPassModalOpen(true)}>Reset Password</button>
            <button className="btn btn-primary" onClick={() => setIsEditProfileModalOpen(true)}>Edit Profile</button>
            <button className="btn btn-error">Deactivate Account</button>
          </div>
        </div>
      </div>

      <ResetPassword
        isOpen={isResetPassModalOpen}
        onClose={() => setIsResetPassModalOpen(false)}
      />

      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
      />
    </>
  );
};

export default Account;
