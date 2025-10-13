import React, { useState, useEffect, use } from "react";
import {
  FiEdit2,
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiDollarSign,
  FiUser,
} from "react-icons/fi";

import { useAuth } from "../../Context/AuthProvider";
import RestaurantEditModal from "../restaurantDashboard/modals/RestaurantEditModal";

const Profile = () => {
  const { user } = useAuth();

  
  const [restaurantData, setRestaurantData] = useState(null);

  const [restaurantEditModalOpen, setRestaurantEditModalOpen] = useState(false);
  const [editArea, setEditArea] = useState("Profile");
 
  
  
  useEffect(() => {
    setRestaurantData(user);
  }, [user]);
  
  const getFoodTypeBadge = (type) => {
    const badges = {
      veg: "badge-success",
      "non-veg": "badge-error",
      eggetarian: "badge-warning",
      jain: "badge-info",
      vegan: "badge-accent",
      any: "badge-neutral",
    };
    return badges[type] || "badge-ghost";
  };

  return (
    <>
      {restaurantData ? (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-base-content">
              Restaurant Profile
            </h2>
            <button
              className="btn btn-primary gap-2"
              onClick={() => {
                setRestaurantEditModalOpen(true);
                setEditArea("Profile");
              }}
            >
              <FiEdit2 />
              Update Profile
            </button>
          </div>

          {/* Restaurant Header Card */}
          <div className="card bg-base-100 shadow-xl border">
            <div className="card-body">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Restaurant Image */}
                <div className="avatar">
                  <div className="w-32 h-32 rounded-lg">
                    <img
                      src={restaurantData.managerImage.imageLink}
                      alt={restaurantData.resturantName}
                    />
                  </div>
                </div>

                {/* Restaurant Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold">
                      {restaurantData.resturantName}
                    </h3>
                    <span
                      className={`badge ${getFoodTypeBadge(
                        restaurantData.foodType
                      )} font-semibold`}
                    >
                      {restaurantData.foodType.toUpperCase()}
                    </span>
                    <span
                      className={`badge ${
                        restaurantData.status === "active"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {restaurantData.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {restaurantData.cuisine.split(",").map((c, i) => (
                      <span key={i} className="badge badge-outline">
                        {c.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <FiMapPin className="text-primary" />
                      <span>{restaurantData.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiPhone className="text-primary" />
                      <span>{restaurantData.receptionPhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiMail className="text-primary" />
                      <span>{restaurantData.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiClock className="text-primary" />
                      <span>
                        {restaurantData.openingTime} -{" "}
                        {restaurantData.closingTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="card bg-base-100 shadow-lg border">
              <div className="card-body">
                <h3 className="card-title text-xl mb-4 flex justify-between">
                  <span>Basic Information</span>
                  <button
                    className="text-primary"
                    onClick={() => {
                      setRestaurantEditModalOpen(true), setEditArea("Basic");
                    }}
                  >
                    <FiEdit2 />
                  </button>
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-base-content/70">
                      Restaurant Name:
                    </span>
                    <span className="font-semibold">
                      {restaurantData.resturantName}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-base-content/70">Food Type:</span>
                    <span
                      className={`badge ${getFoodTypeBadge(
                        restaurantData.foodType
                      )}`}
                    >
                      {restaurantData.foodType}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-base-content/70">Cuisine:</span>
                    <span className="font-semibold">
                      {restaurantData.cuisine}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-base-content/70">
                      Restaurant Type:
                    </span>
                    <span className="font-semibold capitalize">
                      {restaurantData.resturantType}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-base-content/70">
                      Average Cost for Two:
                    </span>
                    <span className="font-semibold flex items-center gap-1">
                      <FiDollarSign />₹{restaurantData.averageCostForTwo}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-base-content/70">Status:</span>
                    <span
                      className={`badge ${
                        restaurantData.openingStatus === "open"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {restaurantData.openingStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Manager Information */}
            <div className="card bg-base-100 shadow-lg border">
              <div className="card-body">
                <h3 className="card-title text-xl mb-4 flex justify-between">
                  <span>Manager Information</span>
                  <button
                    className="text-primary"
                    onClick={() => {
                      setRestaurantEditModalOpen(true), setEditArea("Manager");
                    }}
                  >
                    <FiEdit2 />
                  </button>
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="avatar">
                    <div className="w-20 h-20 rounded-full">
                      <img
                        src={restaurantData.managerImage.imageLink}
                        alt={restaurantData.managerName}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold flex items-center gap-2">
                      <FiUser />
                      {restaurantData.managerName}
                    </h4>
                    <p className="text-base-content/70">Restaurant Manager</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-base-content/70">Manager Phone:</span>
                    <span className="font-semibold">
                      {restaurantData.managerPhone}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-base-content/70">
                      Reception Phone:
                    </span>
                    <span className="font-semibold">
                      {restaurantData.receptionPhone}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-base-content/70">Email:</span>
                    <span className="font-semibold">
                      {restaurantData.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="card bg-base-100 shadow-lg border">
              <div className="card-body">
                <h3 className="card-title text-xl mb-4 flex justify-between">
                  <span>Operating Hours</span>
                  <button
                    className="text-primary"
                    onClick={() => {
                      setRestaurantEditModalOpen(true),
                        setEditArea("OperatingHours");
                    }}
                  >
                    <FiEdit2 />
                  </button>
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-base-content/70">Opening Time:</span>
                    <span className="font-semibold">
                      {restaurantData.openingTime}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-base-content/70">Closing Time:</span>
                    <span className="font-semibold">
                      {restaurantData.closingTime}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-base-content/70">
                      Current Status:
                    </span>
                    <span
                      className={`badge ${
                        restaurantData.openingStatus === "open"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {restaurantData.openingStatus === "open"
                        ? "Open Now"
                        : "Closed"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal & Banking Information */}
            <div className="card bg-base-100 shadow-lg border">
              <div className="card-body">
                <h3 className="card-title text-xl mb-4 flex justify-between">
                  <span>Legal & Banking Details</span>
                  <button
                    className="text-primary"
                    onClick={() => {
                      setRestaurantEditModalOpen(true),
                        setEditArea("LegalBanking");
                    }}
                  >
                    <FiEdit2 />
                  </button>
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-base-content/70">GST Number:</span>
                    <span className="font-semibold">
                      {restaurantData.GSTNo}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-base-content/70">FSSAI Number:</span>
                    <span className="font-semibold">
                      {restaurantData.FSSAINo}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-base-content/70">UPI ID:</span>
                    <span className="font-semibold">
                      {restaurantData.upiId}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-base-content/70">Bank Account:</span>
                    <span className="font-semibold">
                      {restaurantData.bankAccNumber}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-base-content/70">IFSC Code:</span>
                    <span className="font-semibold">
                      {restaurantData.ifscCode}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="card bg-base-100 shadow-lg border">
            <div className="card-body">
              <h3 className="card-title text-xl mb-4 flex justify-between">
                <span>Location Information</span>
                <button
                  className="text-primary"
                  onClick={() => {
                    setRestaurantEditModalOpen(true), setEditArea("Location");
                  }}
                >
                  <FiEdit2 />
                </button>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-base-200 rounded">
                  <div className="text-base-content/70 text-sm mb-1">
                    Address
                  </div>
                  <div className="font-semibold">{restaurantData.address}</div>
                </div>
                <div className="p-4 bg-base-200 rounded">
                  <div className="text-base-content/70 text-sm mb-1">
                    Latitude
                  </div>
                  <div className="font-semibold">{restaurantData.lat}</div>
                </div>
                <div className="p-4 bg-base-200 rounded">
                  <div className="text-base-content/70 text-sm mb-1">
                    Longitude
                  </div>
                  <div className="font-semibold">{restaurantData.lon}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Restaurant Images Gallery */}
          <div className="card bg-base-100 shadow-lg border">
            <div className="card-body">
              <h3 className="card-title text-xl mb-4 flex justify-between">
                <span>Restaurant Images</span>
                <button
                  className="text-primary"
                  onClick={() => {
                    setRestaurantEditModalOpen(true), setEditArea("Images");
                  }}
                >
                  <FiEdit2 />
                </button>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {restaurantData.images.map((img, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden border hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={img.imageLink}
                      alt={`Restaurant ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <h2 className="text-2xl font-bold mb-4">
            No Restaurant Data Available
          </h2>
        </div>
      )}

      <RestaurantEditModal
        isOpen={restaurantEditModalOpen}
        onClose={() => setRestaurantEditModalOpen(false)}
        editArea={editArea}
      />
    </>
  );
};

export default Profile;
