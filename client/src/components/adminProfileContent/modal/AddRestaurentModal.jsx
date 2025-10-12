import React, { useState} from "react";
import { RxCrossCircled } from "react-icons/rx";
import api from "../../../config/api";
import toast from "react-hot-toast"; 

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
    receptionPhone: "",
    email: "",
    password: "",
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

  const [managerImagePreview, setManagerImagePreview] = useState(null);
  const [restaurantImagesPreview, setRestaurantImagesPreview] = useState([]);
  const [managerImageFiles, setManagerImageFiles] = useState("");
  const [restaurantImageFiles, setRestaurantImageFiles] = useState([]);

  // Single change handler for all inputs
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name === "images") {
      setResturantData((prev) => ({
        ...prev,
        images: value
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      }));
      return;
    }

    if (type === "number") {
      setResturantData((prev) => ({ ...prev, [name]: Number(value) }));
      return;
    }

    setResturantData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRestaurantImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const FileUrl = URL.createObjectURL(file);
      setRestaurantImagesPreview((prev) => [...prev, FileUrl]);
    });
    setRestaurantImageFiles(files);
  };

  const handleManagerImageChange = (e) => {
    const files = e.target.files;
    setManagerImagePreview(URL.createObjectURL(files[0]));
    setManagerImageFiles(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("letsAdd a restaurant");
    try {
      const registerFromData = new FormData();
      registerFromData.append("resturantName", resturantData.resturantName);
      registerFromData.append("address", resturantData.address);
      registerFromData.append("lat", resturantData.lat);
      registerFromData.append("lon", resturantData.lon);
      registerFromData.append("cuisine", resturantData.cuisine);
      registerFromData.append("foodType", resturantData.foodType);
      registerFromData.append("managerName", resturantData.managerName);
      registerFromData.append("managerPhone", resturantData.managerPhone);
      registerFromData.append("receptionPhone", resturantData.receptionPhone);
      registerFromData.append("email", resturantData.email);
      registerFromData.append("password", resturantData.password); 
      registerFromData.append("status", resturantData.status);
      registerFromData.append("openingTime", resturantData.openingTime);
      registerFromData.append("closingTime", resturantData.closingTime);
      registerFromData.append(
        "averageCostForTwo",
        resturantData.averageCostForTwo
      );
      registerFromData.append("openingStatus", resturantData.openingStatus);
      registerFromData.append("resturantType", resturantData.resturantType);
      registerFromData.append("GSTNo", resturantData.GSTNo);
      registerFromData.append("FSSAINo", resturantData.FSSAINo);
      registerFromData.append("upiId", resturantData.upiId);
      registerFromData.append("bankAccNumber", resturantData.bankAccNumber);
      registerFromData.append("ifscCode", resturantData.ifscCode);
      // Append manager image file
      registerFromData.append("managerImage", managerImageFiles);
      // Append restaurant image files

      restaurantImageFiles.forEach((file) => {
        registerFromData.append("restaurantImages", file);
      });

      const res = await api.post("/admin/addRestaurent", registerFromData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message);
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.status + " | " + error?.response?.data?.message ||
          "Unknown Error From Server"
      );
    }
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
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Basic info */}
              <fieldset className="p-4 rounded border bg-base-100">
                <legend className="text-lg font-semibold px-2">
                  Basic Information
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">
                      Restaurant Name
                    </label>
                    <input
                      name="resturantName"
                      className="input  w-full"
                      value={resturantData.resturantName}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Cuisine</label>
                    <input
                      name="cuisine"
                      className="input  w-full"
                      value={resturantData.cuisine}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Food Type
                    </label>
                    <select
                      name="foodType"
                      className="select w-full"
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
                      Average Cost For Two
                    </label>
                    <input
                      name="averageCostForTwo"
                      type="number"
                      className="input  w-full"
                      value={resturantData.averageCostForTwo}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </fieldset>

              {/* Contact & Manager */}
              <fieldset className="p-4 rounded border bg-base-100">
                <legend className="text-lg font-semibold px-2">
                  Contact & Manager
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">
                      Manager Name
                    </label>
                    <input
                      name="managerName"
                      className="input  w-full"
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
                      className="input  w-full"
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
                      className="input  w-full"
                      value={resturantData.receptionPhone}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                      name="email"
                      type="email"
                      className="input  w-full"
                      value={resturantData.email}
                      onChange={handleChange}
                    />
                  </div>
                   <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input
                      name="password"
                      type="password"
                      className="input  w-full"
                      value={resturantData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </fieldset>

              {/* Timings & Status */}
              <fieldset className="p-4 rounded border bg-base-100">
                <legend className="text-lg font-semibold px-2">
                  Timings & Status
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">
                      Opening Time
                    </label>
                    <input
                      type="time"
                      name="openingTime"
                      className="input  w-full"
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
                      type="time"
                      name="closingTime"
                      className="input  w-full"
                      value={resturantData.closingTime}
                      onChange={handleChange}
                      placeholder="09:00 PM"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Opening Status
                    </label>
                    <select
                      name="openingStatus"
                      className="select w-full"
                      value={resturantData.openingStatus}
                      onChange={handleChange}
                    >
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Status</label>
                    <select
                      name="status"
                      className="select w-full"
                      value={resturantData.status}
                      onChange={handleChange}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </fieldset>
              {/* Address & Location */}
              <fieldset className="p-4 rounded border bg-base-100">
                <legend className="text-lg font-semibold px-2">
                  Address & Location
                </legend>
                <div>
                  <label className="block text-sm font-medium">Address</label>
                  <textarea
                    name="address"
                    className="textarea w-full"
                    value={resturantData.address}
                    onChange={handleChange}
                  >
                    {" "}
                  </textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">
                      Latitude
                    </label>
                    <input
                      name="lat"
                      className="input  w-full"
                      value={resturantData.lat}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Longitude
                    </label>
                    <input
                      name="lon"
                      className="input  w-full"
                      value={resturantData.lon}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </fieldset>

              {/* Compliance & Banking */}
              <fieldset className="p-4 rounded border bg-base-100">
                <legend className="text-lg font-semibold px-2">
                  Compliance & Banking
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">GST No</label>
                    <input
                      name="GSTNo"
                      className="input  w-full"
                      value={resturantData.GSTNo}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      FSSAI No
                    </label>
                    <input
                      name="FSSAINo"
                      className="input  w-full"
                      value={resturantData.FSSAINo}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">UPI ID</label>
                    <input
                      name="upiId"
                      className="input  w-full"
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
                      className="input w-full"
                      value={resturantData.bankAccNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      IFSC Code
                    </label>
                    <input
                      name="ifscCode"
                      className="input w-full"
                      value={resturantData.ifscCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </fieldset>

              {/* Images */}
              <fieldset className="p-4 rounded border bg-base-100 grid gap-4">
                <legend className="text-lg font-semibold px-2">Images</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">
                      Manager Image
                    </label>
                    <input
                      type="file"
                      name="images"
                      className="input file- w-full"
                      multiple
                      onChange={handleManagerImageChange}
                    />
                  </div>
                  <div>
                    {managerImagePreview ? (
                      <img
                        src={managerImagePreview}
                        alt="Manager Preview"
                        className="mt-2 w-32 h-32 object-cover"
                      />
                    ) : (
                      <p className="mt-2 text-sm text-gray-500">
                        Manager image Not available
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Resturant Images
                  </label>
                  <input
                    type="file"
                    name="images"
                    className="input file- w-full"
                    multiple
                    onChange={handleRestaurantImageChange}
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {restaurantImagesPreview.length > 0 ? (
                    restaurantImagesPreview.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`Restaurant Preview ${index}`}
                        className="mt-2 w-32 h-32 object-cover"
                      />
                    ))
                  ) : (
                    <p className="mt-2 text-sm text-gray-500">
                      No restaurant images selected
                    </p>
                  )}
                </div>
              </fieldset>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
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