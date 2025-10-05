import React from "react";
import { RxCrossCircled } from "react-icons/rx";

const ViewRestaurentModal = ({ isOpen, onClose, restaurantData }) => {
  if (!isOpen || !restaurantData) return null;

  const renderField = (label, value) => (
    <div className="mb-4">
      <span className="text-sm font-medium text-gray-500">{label}:</span>
      <span className="ml-2">{value}</span>
    </div>
  );

  return (
    <>
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-white w-5xl max-w-5xl h-[80vh] mt-8 rounded shadow-md overflow-auto">
          <div className="flex justify-between items-center border-b-2 p-3 bg-primary text-primary-content rounded-t">
            <h2 className="text-2xl">Restaurant Details</h2>
            <button className="text-red-700 rounded" onClick={onClose}>
              <RxCrossCircled className="text-2xl" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                {renderField("Restaurant Name", restaurantData.resturantName)}
                {renderField("Address", restaurantData.address)}
                {renderField("Cuisine", restaurantData.cuisine)}
                {renderField("Food Type", restaurantData.foodType)}
                {renderField("Restaurant Type", restaurantData.resturantType)}
                {renderField("Status", restaurantData.status)}
                {renderField("Opening Status", restaurantData.openingStatus)}
                {renderField("Opening Time", restaurantData.openingTime)}
                {renderField("Closing Time", restaurantData.closingTime)}
                {renderField("Average Cost For Two", `₹${restaurantData.averageCostForTwo}`)}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                {renderField("Manager Name", restaurantData.managerName)}
                {renderField("Manager Phone", restaurantData.managerPhone)}
                {renderField("Reception Phone", restaurantData.receptionPhone)}
                {renderField("Email", restaurantData.email)}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Location Details</h3>
                {renderField("Latitude", restaurantData.lat)}
                {renderField("Longitude", restaurantData.lon)}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Legal Information</h3>
                {renderField("GST No", restaurantData.GSTNo)}
                {renderField("FSSAI No", restaurantData.FSSAINo)}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
                {renderField("UPI ID", restaurantData.upiId)}
                {renderField("Bank Account Number", restaurantData.bankAccNumber)}
                {renderField("IFSC Code", restaurantData.ifscCode)}
              </div>

              
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                className="btn btn-primary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewRestaurentModal;
