import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import api from "../config/api";

const Restaurants = () => {
  const [resturants, setResturants] = useState([]);
  const fetchResturants = async () => {
    try {
      const res = await api.get("/public/getAllRestaurents");
      setResturants(res.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchResturants();
  }, []);
  return (
    <>
      <div className="mt-5">
        <h1 className="text-4xl text-center font-bold">Resturants</h1>

        <div className="p-5 grid grid-col-3">
          {resturants.map((resturant, idx) => (
            <div
              className="card group hover:shadow-sm sm:max-w-sm border h-130"
              key={idx}
            >
              <figure>
                <img
                  src={resturant.managerImage?.imageLink || ""}
                  alt={resturant.resturantName}
                  className="transition-transform duration-500 group-hover:scale-110"
                />
              </figure>
              <div className="card-body">
                <h5 className="card-title ">{resturant.resturantName}</h5>
                <p>
                  {resturant.cuisine.split(",").map((element, index) => (
                    <span key={index} className="badge badge-accent mx-1">
                      {element.trim()}
                    </span>
                  ))}
                </p>
                <p>Address: {resturant.address}</p>
                <p>₹{resturant.averageCostForTwo} for two</p>
                <div className="card-actions">
                  <button className="btn btn-primary">View Menu</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
