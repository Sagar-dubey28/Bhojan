import React from "react";
import { useLocation } from "react-router-dom";

const RestaurantDetails = () => {
  const location = useLocation();
  const { selectedResturant } = location.state || {};
  


  React.useEffect(() => {
    document.title = "Bhojan | " + selectedResturant?.resturantName;
  }, [selectedResturant]);

  // Sample restaurant data (can be replaced with selectedResturant or API data)
  const restaurantData = {
    resturantName: "Sanjeet Foot Corner",
    address: "Gokul Dham Society, New Abdul Soda Shop",
    lat: "23.306554",
    lon: "77.374306",
    cuisine: "Chinese, Fast-Food, Italian",
    foodType: "non-veg",
    managerName: "Sanjeet Uddey",
    managerPhone: "7697974649",
    receptionPhone: "7697974649",
    email: "Sanjeetuddey@gmail.com",
    status: "active",
    openingTime: "15:00",
    closingTime: "00:00",
    averageCostForTwo: 100,
    openingStatus: "open",
    resturantType: "all",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800"
    ]
  };

  // Dummy menu items
  const menuItems = [
    {
      id: 1,
      category: "Chinese",
      items: [
        { name: "Chicken Hakka Noodles", price: 120, description: "Stir-fried noodles with chicken and vegetables", image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=300", isVeg: false },
        { name: "Veg Fried Rice", price: 80, description: "Wok-tossed rice with mixed vegetables", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300", isVeg: true },
        { name: "Chicken Manchurian", price: 140, description: "Deep-fried chicken in tangy sauce", image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=300", isVeg: false },
        { name: "Spring Rolls", price: 60, description: "Crispy rolls with vegetable filling", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300", isVeg: true }
      ]
    },
    {
      id: 2,
      category: "Fast-Food",
      items: [
        { name: "Chicken Burger", price: 90, description: "Grilled chicken patty with lettuce and mayo", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300", isVeg: false },
        { name: "French Fries", price: 50, description: "Crispy golden fries with ketchup", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300", isVeg: true },
        { name: "Chicken Wings", price: 110, description: "Spicy buffalo wings with dip", image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=300", isVeg: false },
        { name: "Veggie Wrap", price: 70, description: "Fresh vegetables wrapped in tortilla", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300", isVeg: true }
      ]
    },
    {
      id: 3,
      category: "Italian",
      items: [
        { name: "Margherita Pizza", price: 150, description: "Classic pizza with tomato sauce and mozzarella", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300", isVeg: true },
        { name: "Chicken Alfredo Pasta", price: 180, description: "Creamy pasta with grilled chicken", image: "https://images.unsplash.com/photo-1621996346565-e3dbc6d2c5f7?w=300", isVeg: false },
        { name: "Garlic Bread", price: 40, description: "Toasted bread with garlic butter", image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=300", isVeg: true },
        { name: "Pepperoni Pizza", price: 200, description: "Pizza topped with pepperoni and cheese", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300", isVeg: false }
      ]
    }
  ];

  const currentRestaurant = selectedResturant || restaurantData;

  // Function to get badge color for food types
  const getFoodTypeBadgeColor = (foodType) => {
    switch (foodType?.toLowerCase()) {
      case 'veg':
        return 'badge-success'; // Green for vegetarian
      case 'non-veg':
        return 'badge-error'; // Red for non-vegetarian
      case 'eggetarian':
        return 'badge-warning'; // Yellow/orange for eggetarian
      case 'jain':
        return 'badge-info'; // Blue for Jain food
      case 'vegan':
        return 'badge-accent'; // Purple/teal for vegan
      case 'any':
        return 'badge-neutral'; // Gray for any/mixed
      default:
        return 'badge-ghost'; // Default ghost badge
    }
  };

  return (
    <>
      <div className="min-h-screen bg-base-100">
        {/* Hero Section */}
        <div className="relative">
          {/* Background Image */}
          <div className="h-96 bg-cover bg-center relative" style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('./bgImage.jpg')`
          }}>
            {/* Hero Content */}
            <div className="absolute inset-0 flex items-end">
              <div className="container mx-auto px-4 pb-8">
                <div className="flex flex-col lg:flex-row items-start lg:items-end gap-6">
                  {/* Restaurant Info */}
                  <div className="flex-1 text-white">
                    <div className="flex items-center gap-3 mb-6">
                      <h1 className="text-4xl lg:text-6xl font-bold">{currentRestaurant.resturantName}</h1>
                      <span className={`badge ${getFoodTypeBadgeColor(currentRestaurant.foodType)} font-semibold`}>
                        {currentRestaurant.foodType?.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {currentRestaurant.cuisine?.split(",").map((cuisine, index) => (
                        <span key={index} className="badge badge-outline badge-lg text-white border-white">
                          {cuisine.trim()}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <p className="text-lg">{currentRestaurant.address}</p>
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span>{currentRestaurant.openingTime} - {currentRestaurant.closingTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.51-1.31c-.562-.649-1.413-1.076-2.353-1.253V5z" clipRule="evenodd" />
                        </svg>
                        <span>₹{currentRestaurant.averageCostForTwo} for two</span>
                      </div>
                      <span className={`badge ${currentRestaurant.openingStatus === 'open' ? 'badge-success' : 'badge-error'}`}>
                        {currentRestaurant.openingStatus === 'open' ? 'Open Now' : 'Closed'}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className="btn btn-primary btn-lg">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                      Order Online
                    </button>
                    <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-black">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
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
              {(currentRestaurant.images || restaurantData.images).slice(1, 4).map((image, index) => (
                <div key={index} className="aspect-video bg-base-200 rounded-lg overflow-hidden shadow-lg">
                  <img src={image.imageLink} alt={`${currentRestaurant.resturantName} ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-base-content mb-2">Our Menu</h2>
            <p className="text-base-content/70 text-lg">Delicious food made with love</p>
          </div>

          {/* Menu Categories */}
          <div className="space-y-12">
            {menuItems.map((category) => (
              <div key={category.id}>
                <h3 className="text-2xl font-bold text-base-content mb-6 border-b-2 border-primary pb-2">
                  {category.category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {category.items.map((item, index) => (
                    <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300">
                      <figure className="h-48 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      </figure>
                      <div className="card-body p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="card-title text-lg">{item.name}</h4>
                          <span className={`badge ${item.isVeg ? 'badge-success' : 'badge-error'} badge-sm`}>
                            {item.isVeg ? '🌱' : '🍖'}
                          </span>
                        </div>
                        <p className="text-base-content/70 text-sm mb-3 line-clamp-2">{item.description}</p>
                        <div className="card-actions justify-between items-center">
                          <span className="text-xl font-bold text-primary">₹{item.price}</span>
                          <button className="btn btn-primary btn-sm">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Info Section */}
        <div className="bg-base-200 py-8 mt-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">📍</div>
                <h4 className="font-bold text-lg mb-2">Address</h4>
                <p className="text-base-content/70">{currentRestaurant.address}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📞</div>
                <h4 className="font-bold text-lg mb-2">Contact</h4>
                <p className="text-base-content/70">Phone: {currentRestaurant.receptionPhone}</p>
                <p className="text-base-content/70">Email: {currentRestaurant.email.toLowerCase()}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">⏰</div>
                <h4 className="font-bold text-lg mb-2">Timings</h4>
                <p className="text-base-content/70">
                  {currentRestaurant.openingTime} - {currentRestaurant.closingTime}
                </p>
                <p className="text-base-content/70">All Days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantDetails;