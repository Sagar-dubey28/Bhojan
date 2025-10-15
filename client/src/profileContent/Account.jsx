import React from "react";
import { useState } from "react";
import ResetPassword from "./userModal/ResetPassword";
import EditProfileModal from "./userModal/EditProfileModal";
import { useAuth } from "../Context/AuthProvider";

const Account = () => {
  const { user } = useAuth();
  
  const [isResetPassModalOpen, setIsResetPassModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  
  return (
    <>
      <div className="min-h-screen flex">
        <div className="card bg-base-100 border border-gray-200 w-full h-fit">
          <div className="card-body p-6">
            {/* Profile Picture Section - Reduced size */}
            <div className="flex flex-col items-center mb-4">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user.profilePic} alt="Profile" />
                </div>
              </div>
            </div>

            {/* Form Fields - Compact layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Name */}
              <div>
                <label className="label py-1">
                  <span className="label-text text-sm">Full Name</span>
                </label>
                <span className="block p-2 text-sm rounded-md border border-primary bg-base-200">
                  {user.fullName}
                </span>
              </div>

              {/* Email */}
              <div>
                <label className="label py-1">
                  <span className="label-text text-sm">Email</span>
                </label>
                <span className="block p-2 text-sm rounded-md border border-primary bg-base-200">
                  {user.email}
                </span>
              </div>

              {/* Phone */}
              <div>
                <label className="label py-1">
                  <span className="label-text text-sm">Phone</span>
                </label>
                <span className="block p-2 text-sm rounded-md border border-primary bg-base-200">
                  {user.phone} 
                </span>
              </div>

              {/* Password */}
              <div>
                <label className="label py-1">
                  <span className="label-text text-sm">Password</span>
                </label>
                <span className="block p-2 text-sm rounded-md border border-primary bg-base-200">
                  ********
                </span>
              </div>

              {/* DOB */}
              <div>
                <label className="label py-1">
                  <span className="label-text text-sm">Date of Birth</span>
                </label>
                <span className="block p-2 text-sm rounded-md border border-primary bg-base-200">
                  {user.dob} 
                </span>
              </div>

              {/* Gender */}
              <div>
                <label className="label py-1">
                  <span className="label-text text-sm">Gender</span>
                </label>
                <span className="block p-2 text-sm rounded-md border border-primary bg-base-200">
                  {user.gender}
                </span>
              </div>

              {/* Food Preference - Full width */}
              <div className="md:col-span-3">
                <label className="label py-1">
                  <span className="label-text text-sm">Food Preference</span>
                </label>
                <span className="block p-2 text-sm rounded-md border border-primary bg-base-200">
                  {user.foodType}
                </span>
              </div>
            </div>

            {/* Action Buttons - Compact spacing */}
            <div className="mt-4 flex flex-wrap gap-3 justify-end">
              <button 
                className="btn btn-secondary btn-sm" 
                onClick={() => setIsResetPassModalOpen(true)}
              >
                Reset Password
              </button>
              <button 
                className="btn btn-primary btn-sm" 
                onClick={() => setIsEditProfileModalOpen(true)}
              >
                Edit Profile
              </button>
              <button className="btn btn-error btn-sm">
                Deactivate Account
              </button>
            </div>
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