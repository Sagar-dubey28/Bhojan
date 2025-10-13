import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import AddMenuModal from './modals/AddMenuModal';
import api from '../../config/api';
import toast from 'react-hot-toast';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await api.get('/restaurant/menu');
      setMenuItems(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch menu items');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Menu Items</h2>
        <button
          onClick={handleAddItem}
          className="btn btn-primary gap-2"
        >
          <FiPlus />
          Add Item
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map(item => (
            <div key={item._id} className="card bg-base-100 shadow-md">
              {item.dishImage && (
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
                    <p className="text-sm text-base-content/60">{item.category}</p>
                  </div>
                  <div className="badge badge-success">{item.isVeg ? 'Veg' : 'Non-Veg'}</div>
                </div>
                <p className="text-sm">{item.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-lg font-bold">₹{item.price}</div>
                  <div className="badge badge-ghost">{item.isAvailable ? 'Available' : 'Unavailable'}</div>
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
          fetchMenuItems(); // Refresh the menu items after adding
        }}
      />
    </div>
  );
};

export default Menu;