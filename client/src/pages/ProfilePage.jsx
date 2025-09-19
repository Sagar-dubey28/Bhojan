import React, { useState } from "react";
import {
  User,
  MapPin,
  CreditCard,
  Clock,
  Star,
  LogOut,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+1 (555) 123-4567",
    password: "••••••••",
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      address: "123 Main Street, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      address: "456 Business Ave, Floor 10",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      isDefault: false,
    },
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "Credit Card",
      cardNumber: "**** **** **** 1234",
      cardType: "Visa",
      expiryDate: "12/25",
      isDefault: true,
    },
    {
      id: 2,
      type: "Credit Card",
      cardNumber: "**** **** **** 5678",
      cardType: "Mastercard",
      expiryDate: "08/26",
      isDefault: false,
    },
  ]);

  const [activeSection, setActiveSection] = useState("account");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = () => {
    alert("Changes saved successfully!");
  };

  const menuItems = [
    { id: "account", icon: User, label: "Account Details" },
    { id: "addresses", icon: MapPin, label: "Saved Addresses" },
    { id: "payment", icon: CreditCard, label: "Payment Methods" },
    { id: "orders", icon: Clock, label: "Order History" },
    { id: "reviews", icon: Star, label: "My Reviews" },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "account":
        return (
          <div className="card bg-base-100 shadow-xl border border-gray-200">
            <div className="card-body">
              <h2 className="card-title text-gray-900">Account Details</h2>
              <p className="text-gray-500">Manage your personal information.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input input-bordered input-primary w-full"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input input-bordered input-primary w-full"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Phone</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input input-bordered input-primary w-full"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="input input-bordered input-primary w-full"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button onClick={handleSaveChanges} className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );

      case "addresses":
        return (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <h2 className="card-title">Saved Addresses</h2>
                <button className="btn btn-primary btn-sm flex gap-2">
                  <Plus className="w-4 h-4" />
                  Add Address
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className="card card-bordered shadow-sm p-4 relative"
                  >
                    {address.isDefault && (
                      <span className="badge badge-primary absolute top-3 right-3">
                        Default
                      </span>
                    )}
                    <h3 className="font-semibold">{address.type}</h3>
                    <p className="text-sm">{address.address}</p>
                    <p className="text-sm text-gray-500">
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                    <div className="card-actions justify-end mt-3">
                      <button className="btn btn-xs btn-outline btn-primary">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="btn btn-xs btn-outline btn-error">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "payment":
        return (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <h2 className="card-title">Payment Methods</h2>
                <button className="btn btn-primary btn-sm flex gap-2">
                  <Plus className="w-4 h-4" />
                  Add Card
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="card card-bordered shadow-sm p-4 relative"
                  >
                    {method.isDefault && (
                      <span className="badge badge-primary absolute top-3 right-3">
                        Default
                      </span>
                    )}
                    <h3 className="font-semibold">{method.cardType}</h3>
                    <p className="text-sm">{method.cardNumber}</p>
                    <p className="text-sm text-gray-500">
                      Expires {method.expiryDate}
                    </p>
                    <div className="card-actions justify-end mt-3">
                      <button className="btn btn-xs btn-outline btn-primary">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="btn btn-xs btn-outline btn-error">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "orders":
        return (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Order History</h2>
              <div className="space-y-3 mt-4">
                {[
                  {
                    id: 1,
                    name: "Pizza Margherita",
                    restaurant: "Mario's Pizza",
                    date: "2 days ago",
                    status: "Delivered",
                    price: "$18.99",
                  },
                  {
                    id: 2,
                    name: "Chicken Burger",
                    restaurant: "Burger King",
                    date: "1 week ago",
                    status: "Delivered",
                    price: "$12.50",
                  },
                ].map((order) => (
                  <div
                    key={order.id}
                    className="card card-bordered shadow-sm p-4 flex justify-between"
                  >
                    <div>
                      <h3 className="font-semibold">{order.name}</h3>
                      <p className="text-sm text-gray-500">
                        {order.restaurant}
                      </p>
                      <p className="text-xs text-gray-400">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{order.price}</p>
                      <span className="badge badge-success">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "reviews":
        return (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">My Reviews</h2>
              <div className="space-y-4 mt-4">
                {[
                  {
                    id: 1,
                    restaurant: "Mario's Pizza",
                    dish: "Pizza Margherita",
                    rating: 5,
                    review:
                      "Amazing pizza! Fresh ingredients and perfect crust.",
                  },
                  {
                    id: 2,
                    restaurant: "Sushi Master",
                    dish: "Salmon Roll",
                    rating: 4,
                    review: "Good quality sushi, fast delivery.",
                  },
                ].map((review) => (
                  <div key={review.id} className="card card-bordered p-4">
                    <h3 className="font-semibold">{review.restaurant}</h3>
                    <p className="text-sm text-gray-500">{review.dish}</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm mt-2">{review.review}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-base-100 shadow-xl border-r flex flex-col">
        {/* Profile Card */}
        <div className="card shadow-sm border-b bg-base-100">
          <div className="card-body items-center text-center">
            <div className="avatar mb-4">
              <div className="w-24 rounded-full ring ring-orange-400 ring-offset-2 bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
            </div>
            <h3 className="card-title text-lg font-bold text-gray-900">
              {formData.name}
            </h3>
            <p className="text-sm text-gray-500">{formData.email}</p>
          </div>
        </div>

        {/* Menu */}
        <ul className="menu menu-lg p-4 flex-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200
            ${
              activeSection === item.id
                ? "bg-orange-500 text-white shadow-md scale-105"
                : "hover:bg-orange-50 hover:text-orange-600 text-gray-700"
            }`}
              >
                <item.icon
                  className={`w-5 h-5 ${
                    activeSection === item.id ? "text-white" : "text-gray-500"
                  }`}
                />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}

          {/* Logout */}
          <li className="mt-6 border-t pt-4">
            <button className="flex items-center gap-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg px-4 py-3 transition-all">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Log Out</span>
            </button>
          </li>
        </ul>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  );
};

export default ProfilePage;
