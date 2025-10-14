import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import AddMenuModal from "./modals/AddMenuModal";
import api from "../../config/api";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/AuthProvider";
import { FaTrashAlt } from "react-icons/fa";


const Menu = ({ restaurantId }) => {
  const { user } = useAuth();
  const [menuItems, setMenuItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [menuToDelete, setMenuToDelete] = useState(null);
  // Use the passed restaurantId or fall back to logged-in restaurant's ID
  const activeRestaurantId = restaurantId || user?._id;

  useEffect(() => {
    if (activeRestaurantId) fetchMenuItems();
  }, [activeRestaurantId]);

  // ✅ Fetch menu items for specific restaurant
  const fetchMenuItems = async () => {
    try {
      const response = await api.get(`/restaurant/menu/${activeRestaurantId}`);
      setMenuItems(response.data.menu || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch menu items");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = () => setIsModalOpen(true);

   const handleDeleteMenu = async () => {
    try {
      await api.delete(`/restaurant/menu/delete/${menuToDelete._id}`);
      toast.success('Menu item deleted successfully');
      fetchMenuItems();
      setIsDeleteModalOpen(false);
      setMenuToDelete(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting menu item');
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Menu Items</h2>
        <button onClick={handleAddItem} className="btn btn-primary gap-2">
          <FiPlus />
          Add Item
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : menuItems.length === 0 ? (
        <p className="text-center text-gray-500">No menu items added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div key={item._id} className="card bg-base-100 shadow-md">
              {item.dishImage?.imageLink && (
                <figure className="h-48">
                  <img
                    src={item.dishImage.imageLink}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </figure>
              )}
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="card-title">{item.name}</h3>
                    <p className="text-sm text-base-content/60">
                      {item.category}
                    </p>
                  </div>
                  <div
                    className={`badge ${
                      item.isVeg ? "badge-success" : "badge-error"
                    }`}
                  >
                    {item.isVeg ? "Veg" : "Non-Veg"}
                  </div>
                </div>
                <p className="text-sm">{item.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-lg font-bold">₹{item.price}</div>
                  <div
                    className={`badge ${
                      item.isAvailable ? "badge-ghost" : "badge-warning"
                    }`}
                  >
                    {item.isAvailable ? "Available" : "Unavailable"}
                  </div>
                </div>
                <div>
                  {" "}
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => {
                      setMenuToDelete(item);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddMenuModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchMenuItems(); // ✅ Refresh menu after adding
        }}
        restaurantId={activeRestaurantId} // ✅ Pass active restaurant ID to modal
      />

        {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete the menu item "{menuToDelete?.name}"?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setMenuToDelete(null);
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-error"
                onClick={handleDeleteMenu}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
