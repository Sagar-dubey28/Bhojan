import React from "react";
import toast from "react-hot-toast";
import api from "../config/api";
import ResturantDeatils from "./RestaurantDetails";
import { useNavigate } from "react-router-dom";

const Restaurants = () => {
  const navigate = useNavigate();
    const [allResturants, setAllResturants] = React.useState([]);

  const fetchAllResturants = async () => {
    try {
      const res = await api.get("/public/getallresturants");
      setAllResturants(res.data.data);
      console.log("Fetched all resturants");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.status + " | " + error?.response?.data?.message ||
          "Unknown Error From Server"
      );
    }
  };


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

  React.useEffect(() => {
    document.title = "Bhojan | Resturants";
    fetchAllResturants();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-base-100">
        {/* Header */}
        <div className="hero bg-gradient-to-r from-primary to-secondary text-primary-content py-4">
          <div className="hero-content text-center">
            <div className="max-w-lg m-auto">
              <p className="py-6 text-2xl">
                Order food from your favourite restaurants
              </p>
            </div>
          </div>
        </div>

        {/* Restaurant Cards */}
        <div className="container mx-auto px-4 py-8">
          {allResturants.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🍽️</div>
              <p className="text-2xl font-semibold text-base-content mb-2">
                No Restaurants Found
              </p>
              <p className="text-base-content/70">
                Check back later for more options
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allResturants.map((resturant) => (
                <div
                  key={resturant._id}
                  className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-base-300"
                >
                  {/* Image Section */}
                  <figure className="relative h-48 overflow-hidden">
                    <img
                      src={
                        resturant.images[2]?.imageLink ||
                        resturant.images[0]?.imageLink
                      }
                      alt={resturant.resturantName}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {/* Food Type Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`badge ${getFoodTypeBadgeColor(resturant.foodType)} font-semibold`}>
                        {resturant.foodType?.toUpperCase()}
                      </span>
                    </div>
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`badge ${
                          resturant.status === "active"
                            ? "badge-success"
                            : "badge-error"
                        } text-xs`}
                      >
                        {resturant.status === "active" ? "Open" : "Closed"}
                      </span>
                    </div>
                  </figure>

                  {/* Card Body */}
                  <div className="card-body p-4">
                    {/* Restaurant Name */}
                    <h2 className="card-title text-xl font-bold text-base-content mb-2">
                      {resturant.resturantName}
                    </h2>

                    {/* Cuisines */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {resturant.cuisine
                        .split(",")
                        .map((cuisineItem, index) => (
                          <span
                            key={index}
                            className="badge badge-outline badge-sm"
                          >
                            {cuisineItem.trim()}
                          </span>
                        ))}
                      {resturant.cuisine.split(",").length > 3 && (
                        <span className="badge badge-outline badge-sm">
                          +{resturant.cuisine.split(",").length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-2 mb-2">
                      <svg
                        className="w-4 h-4 mt-0.5 text-base-content/60 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm text-base-content/70 line-clamp-2">
                        {resturant.address}
                      </p>
                    </div>

                    {/* Cost and Hours */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-base-content/70">
                          Cost for two:
                        </span>
                        <span className="font-semibold text-primary">
                          ₹{resturant.averageCostForTwo}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-base-content/70">
                          Hours:
                        </span>
                        <span className="text-sm font-medium">
                          {resturant.openingTime} - {resturant.closingTime}
                        </span>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="divider my-2"></div>
                    <div className="flex items-center justify-between text-xs text-base-content/60">
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        <span>{resturant.receptionPhone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        <span className="truncate">{resturant.email.toLowerCase()}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="card-actions justify-end mt-4">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          navigate("/resturantDetails", {
                            state: { selectedResturant: resturant },
                          });
                        }}
                      >
                        View Menu
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Restaurants;