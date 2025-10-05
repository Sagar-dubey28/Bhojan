import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";

const AddRestaurentModal = ({ isOpen, onClose }) => {  
  // Single object state for the form
  const [resturantData, setResturantData] = useState({
    resturantName: "",
    address: "",
    lat: "",
    lon: "",
    cuisine: "",
    foodType: "veg",
    managerName: "",
    managerPhone: "",
    managerImage: "",
    receptionPhone: "",
    email: "",
    images: [],
    status: "active",
    openingTime: "",
    closingTime: "",
    averageCostForTwo: 0,
    openingStatus: "open",
    resturantType: "all",
    GSTNo: "",
    FSSAINo: "",
    upiId: "",
    bankAccNumber: "",
    ifscCode: "",
  });

  // Single change handler for all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResturantData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-white w-5xl max-w-5xl h-[80vh] mt-8 rounded shadow-md overflow-auto">
          <div className="flex justify-between items-center border-b-2 p-3 bg-primary text-primary-content rounded-t">
            <h2 className="text-2xl">Add New Restaurant</h2>
            <button className="text-red-700 rounded" onClick={onClose}>
              <RxCrossCircled className="text-2xl" />
            </button>
          </div>

          <div className="p-6">
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    Restaurant Name
                  </label>
                  <input
                    name="resturantName"
                    className="input input-bordered w-full"
                    value={resturantData.resturantName}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Address</label>
                  <input
                    name="address"
                    className="input input-bordered w-full"
                    value={resturantData.address}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Latitude</label>
                  <input
                    name="lat"
                    className="input input-bordered w-full"
                    value={resturantData.lat}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Longitude</label>
                  <input
                    name="lon"
                    className="input input-bordered w-full"
                    value={resturantData.lon}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Cuisine</label>
                  <input
                    name="cuisine"
                    className="input input-bordered w-full"
                    value={resturantData.cuisine}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Food Type</label>
                  <select
                    name="foodType"
                    className="select select-bordered w-full"
                    value={resturantData.foodType}
                    onChange={handleChange}
                  >
                    <option value="veg">Veg</option>
                    <option value="non-veg">Non-Veg</option>
                    <option value="eggetarian">Eggetarian</option>
                    <option value="jain">Jain</option>
                    <option value="vegan">Vegan</option>
                    <option value="any">Any</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Manager Name
                  </label>
                  <input
                    name="managerName"
                    className="input input-bordered w-full"
                    value={resturantData.managerName}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Manager Phone
                  </label>
                  <input
                    name="managerPhone"
                    className="input input-bordered w-full"
                    value={resturantData.managerPhone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Reception Phone
                  </label>
                  <input
                    name="receptionPhone"
                    className="input input-bordered w-full"
                    value={resturantData.receptionPhone}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="input input-bordered w-full"
                    value={resturantData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Status</label>
                  <select
                    name="status"
                    className="select select-bordered w-full"
                    value={resturantData.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Opening Time
                  </label>
                  <input
                    name="openingTime"
                    className="input input-bordered w-full"
                    value={resturantData.openingTime}
                    onChange={handleChange}
                    placeholder="09:00 AM"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Closing Time
                  </label>
                  <input
                    name="closingTime"
                    className="input input-bordered w-full"
                    value={resturantData.closingTime}
                    onChange={handleChange}
                    placeholder="09:00 PM"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Average Cost For Two
                  </label>
                  <input
                    name="averageCostForTwo"
                    type="number"
                    className="input input-bordered w-full"
                    value={resturantData.averageCostForTwo}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Opening Status
                  </label>
                  <select
                    name="openingStatus"
                    className="select select-bordered w-full"
                    value={resturantData.openingStatus}
                    onChange={handleChange}
                  >
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Restaurant Type
                  </label>
                  <select
                    name="resturantType"
                    className="select select-bordered w-full"
                    value={resturantData.resturantType}
                    onChange={handleChange}
                  >
                    <option value="dine-in">Dine-in</option>
                    <option value="takeaway">Takeaway</option>
                    <option value="delivery">Delivery</option>
                    <option value="all">All</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">GST No</label>
                  <input
                    name="GSTNo"
                    className="input input-bordered w-full"
                    value={resturantData.GSTNo}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">FSSAI No</label>
                  <input
                    name="FSSAINo"
                    className="input input-bordered w-full"
                    value={resturantData.FSSAINo}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">UPI ID</label>
                  <input
                    name="upiId"
                    className="input input-bordered w-full"
                    value={resturantData.upiId}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Bank Account Number
                  </label>
                  <input
                    name="bankAccNumber"
                    className="input input-bordered w-full"
                    value={resturantData.bankAccNumber}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">IFSC Code</label>
                  <input
                    name="ifscCode"
                    className="input input-bordered w-full"
                    value={resturantData.ifscCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div>
                  <label className="text-sm font-medium">
                    Manager Image URL
                  </label>
                  <input
                    name="managerImage"
                    className="input input-bordered w-full"
                    value={resturantData.managerImage}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Images (comma separated URLs)
                  </label>
                  <input
                    name="images"
                    className="input input-bordered w-full"
                    value={resturantData.images.join(",")}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">
                  Save (not wired)
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRestaurentModal;