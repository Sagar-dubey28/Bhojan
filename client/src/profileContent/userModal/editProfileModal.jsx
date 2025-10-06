import React, { useState } from "react";
import toast from "react-hot-toast";
import { RxCrossCircled } from "react-icons/rx";
import { FaCamera } from "react-icons/fa";
import { useAuth } from "../../Context/AuthProvider";
import api from "../../config/api";

const EditProfileModal = ({ isOpen, onClose }) => {
  const { user , setUser} = useAuth();
  const [editUser, setEditUser] = useState({
    fullName: user.fullName || "",
    email: user.email || "",
    gender: user.gender || "",
    phone: user.phone || "",
    dob: user.dob || "",
    foodType: user.foodType || "",
  });

  const [profilePic, setProfilePic] = useState("");
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChnage = (e) => {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setPreview(fileUrl);
    setProfilePic(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullName", editUser.fullName);
    formData.append("email", editUser.email);
    formData.append("gender", editUser.gender);
    formData.append("phone", editUser.phone);
    formData.append("dob", editUser.dob);
    formData.append("foodType", editUser.foodType);
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    try {
      console.log("form Data", formData);
      
      const res = await api.put("/user/updateUser", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data.message);
      setEditUser({
         fullName: user.fullName || "",
        email: user.email || "",
        gender: user.gender || "",
        phone: user.phone || "",
        dob: user.dob || "",
        foodType: user.foodType || "",
      })
      setProfilePic("");
      setPreview("");
      setUser(res.data.data);
      onClose();
    } catch (error) {
        toast.error(error.message);
    }
  };

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 flex justify-center bg-base-300/50">
        <div className="w-1/2 max-h-[80vh] m-auto bg-base-200 mt-25 rounded-xl">
          <div className="flex justify-between p-4 border-b-2 sticky top-0">
            <h1>Edit Profile</h1>
            <button className="text-red-500 text-2xl" onClick={onClose}>
              <RxCrossCircled />
            </button>
          </div>
          <div className="p-3">
            <div className="bg-base-200  p-8 flex justify-between gap-5 items-center">
              {/* Profile Picture Section */}
              <div>
                <div className="flex flex-col items-center mb-8">
                  <div className="avatar">
                    <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={preview || user.profilePic}
                        alt={user.fullName}
                      />
                    </div>
                    <label
                      htmlFor="updatePicture"
                      className="absolute border rounded-full p-2 text-primary bg-base-100 hover:bg-primary hover:text-primary-content bottom-0 right-0"
                    >
                      <FaCamera />
                    </label>
                    <input
                      type="file"
                      id={"updatePicture"}
                      className="hidden"
                      onChange={handlePhotoChnage}
                    />
                  </div>
                </div>

                {/* Profile Info */}
                <div className="space-y-6">
                  <div className="text-center">
                    <label className="block font-medium text-base-content mb-1">
                      Full Name:
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      className="input"
                      value={editUser.fullName}
                      onChange={handleChange}
                    />
                    <br />
                    <br />
                    <p className="text-base-content/70 cursor-not-allowed">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-base-100 rounded-lg w-full p-4">
                <div className="grid grid-cols-[30%_70%] gap-4 p-4">
                  <label className="block font-medium text-base-content mb-1">
                    Gender:
                  </label>
                  <select
                    name="gender"
                    id=""
                    className="select select-bordered w-full"
                    value={editUser.gender}
                    onChange={handleChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <label className="block font-medium text-base-content mb-1">
                    Date of Birth:
                  </label>
                  <input
                    type="date"
                    name="dob"
                    className="input"
                    value={editUser.dob}
                    onChange={handleChange}
                  />
                  <label className="block font-medium text-base-content mb-1">
                    Food Type:
                  </label>
                  <select
                    name="foodType"
                    id=""
                    className="select select-bordered w-full"
                    value={editUser.foodType}
                    onChange={handleChange}
                  >
                    <option value="veg">Vegetarian</option>
                    <option value="non-veg">Non-Vegetarian</option>
                    <option value="eggetarian">Eggetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="jain">Jain</option>
                    <option value="any">Any</option>
                  </select>

                  <label className="block font-medium text-base-content mb-1">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    name="phone"
                    className="input"
                    value={editUser.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-end">
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfileModal;
