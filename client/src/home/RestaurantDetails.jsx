import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../config/api";
import toast from "react-hot-toast";
import { useCart } from "../Context/cartContext";
import { useAuth } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";

const RestaurantDetails = () => {
  // normalize incoming state (support typo and different keys)
  const { addToCart, cartItems } = useCart();
  const { isLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const selectedResturant = state.selectedResturant || null;
  const restaurantIdFromState = state.restaurantId || null;
  
  // Calculate total cart quantity
  const cartQuantity = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch simple flat menu items array
  const fetchMenuItems = async (restaurantId) => {
    if (!restaurantId) {
      toast.error("Restaurant ID is missing");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await api.get(`/restaurant/menu/${restaurantId}`);
      // Accept either response.data.menu (preferred) or response.data directly (flat array)
      const menuData = response?.data?.menu;
      if (Array.isArray(menuData)) {
        setMenuItems(menuData);
      } else {
        // If backend returns unexpected shape, fallback to empty
        setMenuItems([]);
        toast.error("Unexpected menu format from server");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch menu items"
      );
      setMenuItems([]);
    } finally {
      setLoading(false);
    }
  };

  // simple flat dummy data
  const dummyMenu = [
    {
      _id: "d1",
      name: "Veg Pizza",
      description: "Cheesy veg pizza",
      price: 150,
      isVeg: true,
      dishImage: {
        imageLink: "https://via.placeholder.com/400x300?text=Veg+Pizza",
      },
    },
    {
      _id: "d2",
      name: "Chicken Burger",
      description: "Grilled chicken patty with lettuce",
      price: 120,
      isVeg: false,
      dishImage: {
        imageLink: "https://via.placeholder.com/400x300?text=Chicken+Burger",
      },
    },
  ];

  useEffect(() => {
    document.title =
      "Bhojan | " + (selectedResturant?.resturantName || "Restaurant");

    if (restaurantIdFromState) {
      fetchMenuItems(restaurantIdFromState);
    } else {
      setMenuItems(dummyMenu);
      setLoading(false);
    }
  }, [restaurantIdFromState, selectedResturant]);

  const currentRestaurant = selectedResturant;
  console.log(currentRestaurant);
  

  const getFoodTypeBadgeColor = (foodType) => {
    switch ((foodType || "").toLowerCase()) {
      case "veg":
        return "badge-success";
      case "non-veg":
        return "badge-error";
      default:
        return "badge-ghost";
    }
  };

  const handleImgError = (e) => {
    e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative">
        {/* Background Image */}
        <div
          className="h-96 bg-cover bg-center relative"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('./bgImage.jpg')`,
          }}
        >
          {/* Hero Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-end gap-6">
                {/* Restaurant Info */}
                <div className="flex-1 text-white">
                  <div className="flex items-center gap-3 mb-6">
                    <h1 className="text-4xl lg:text-6xl font-bold">
                      {currentRestaurant.resturantName}
                    </h1>
                    <span
                      className={`badge ${getFoodTypeBadgeColor(
                        currentRestaurant.foodType
                      )} font-semibold`}
                    >
                      {currentRestaurant.foodType?.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {currentRestaurant.cuisine
                      ?.split(",")
                      .map((cuisine, index) => (
                        <span
                          key={index}
                          className="badge badge-outline badge-lg text-white border-white"
                        >
                          {cuisine.trim()}
                        </span>
                      ))}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-lg">{currentRestaurant.address}</p>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        {currentRestaurant.openingTime} -{" "}
                        {currentRestaurant.closingTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.51-1.31c-.562-.649-1.413-1.076-2.353-1.253V5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        ₹{currentRestaurant.averageCostForTwo} for two
                      </span>
                    </div>
                    <span
                      className={`badge ${
                        currentRestaurant.openingStatus === "open"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {currentRestaurant.openingStatus === "open"
                        ? "Open Now"
                        : "Closed"}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="btn btn-primary btn-lg">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                    Order Online
                  </button>
                  <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-black">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Call Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurant Images Gallery */}
        <div className="container mx-auto px-4 mt-10 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          
            {(currentRestaurant.images || restaurantData.images)
              .slice(1, 4)
              .map((image, index) => (
                <div
                  key={index}
                  className="aspect-video bg-base-200 rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={image.imageLink}
                    alt={`${currentRestaurant.resturantName} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <h2 className="text-4xl font-bold mb-4 text-center">
        {currentRestaurant?.resturantName || "Restaurant Name"} Menu
      </h2>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : menuItems && menuItems.length > 0 ? (
        <>
       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          
          {menuItems.map((item, idx) => (
            <div
              key={item._id || item.id || idx}
              className="card bg-base-100 shadow-lg border border-base-300"
            >
              <figure className="h-48">
                <img
                  src={
                    item.dishImage?.imageLink ||
                    item.image ||
                    "https://via.placeholder.com/400x300?text=No+Image"
                  }
                  alt={item.name}
                  onError={handleImgError}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-semibold">{item.name}</h4>
                  <span
                    className={`badge ${
                      item.foodType
                        ? getFoodTypeBadgeColor(item.foodType)
                        : item.isVeg
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {item.foodType ? item.foodType : item.isVeg ? "🌱" : "🍖"}
                  </span>
                </div>
                <p className="text-sm text-base-content/70 mb-3">
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold text-lg">
                    ₹{item.price}
                  </span>
                  <button className="btn btn-sm btn-primary gap-2" onClick={() => {
                    if (!isLogin) {
                      toast.error('Please login to add items to cart');
                      navigate('/login');
                      return;
                    }
                    addToCart(item);
                    toast.success(`${item.name} added to cart`);
                  }}>
                    <span>Add to Cart</span>
                    {(cartItems.find((ci) => ci._id === item._id)?.quantity || 0) > 0 && (
                      <span className="badge badge-sm">{cartItems.find((ci) => ci._id === item._id)?.quantity || 0}</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        </>
      ) : (
        <p className="text-center text-base-content/70">
          No menu items available.
        </p>
      )}
    </div>
  );
};

export default RestaurantDetails;
