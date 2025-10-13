import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { FiUpload } from "react-icons/fi";
import api from "../../../config/api";
import toast from "react-hot-toast";

const AddMenuModal = ({ isOpen, onClose }) => {
  const [menuData, setMenuData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    cuisine: "",
    isVeg: true,
    isAvailable: true,
    preparationTime: "",
    servingSize: "",
  });

  const [dishImagePreview, setDishImagePreview] = useState(null);
  const [dishImageFile, setDishImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === "number") {
      setMenuData((prev) => ({ ...prev, [name]: Number(value) }));
      return;
    }

    if (type === "checkbox") {
      setMenuData((prev) => ({ ...prev, [name]: e.target.checked }));
      return;
    }

    setMenuData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDishImagePreview(URL.createObjectURL(file));
      setDishImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      
      // Append all menu data
      Object.keys(menuData).forEach(key => {
        formData.append(key, menuData[key]);
      });

      // Append dish image if exists
      if (dishImageFile) {
        formData.append('dishImage', dishImageFile);
      }

      const response = await api.post('/restaurant/add-menu-item', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success("Menu item added successfully");
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add menu item");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-lg flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add Menu Item</h2>
          <button
            className="text-error text-2xl"
            onClick={onClose}
          >
            <IoIosCloseCircle />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Section */}
          <div className="flex flex-col items-center space-y-4 p-4 border rounded-lg">
            {dishImagePreview && (
              <div className="w-40 h-40 rounded-lg overflow-hidden">
                <img
                  src={dishImagePreview}
                  alt="Dish preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <label className="btn btn-outline gap-2">
              <FiUpload />
              Upload Dish Image
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Dish Name</span>
              </label>
              <input
                type="text"
                name="name"
                className="input input-bordered"
                value={menuData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <input
                type="text"
                name="category"
                className="input input-bordered"
                value={menuData.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Price (₹)</span>
              </label>
              <input
                type="number"
                name="price"
                className="input input-bordered"
                value={menuData.price}
                onChange={handleChange}
                required
                min="0"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Preparation Time (minutes)</span>
              </label>
              <input
                type="number"
                name="preparationTime"
                className="input input-bordered"
                value={menuData.preparationTime}
                onChange={handleChange}
                required
                min="0"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Serving Size</span>
              </label>
              <input
                type="text"
                name="servingSize"
                className="input input-bordered"
                value={menuData.servingSize}
                onChange={handleChange}
                placeholder="e.g., 1 plate, 250g"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Cuisine</span>
              </label>
              <input
                type="text"
                name="cuisine"
                className="input input-bordered"
                value={menuData.cuisine}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered h-24"
              value={menuData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Toggles */}
          <div className="flex gap-6">
            <label className="label cursor-pointer gap-2">
              <span className="label-text">Vegetarian</span>
              <input
                type="checkbox"
                name="isVeg"
                className="toggle toggle-success"
                checked={menuData.isVeg}
                onChange={handleChange}
              />
            </label>

            <label className="label cursor-pointer gap-2">
              <span className="label-text">Available</span>
              <input
                type="checkbox"
                name="isAvailable"
                className="toggle toggle-success"
                checked={menuData.isAvailable}
                onChange={handleChange}
              />
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Menu Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenuModal;
