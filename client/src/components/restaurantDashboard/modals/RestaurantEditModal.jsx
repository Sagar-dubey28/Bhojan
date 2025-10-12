import React, { useState } from "react";
import { useAuth } from "../../../Context/AuthProvider";
import { IoIosCloseCircle } from "react-icons/io";

const RestaurantEditModal = ({ isOpen, onClose, editArea }) => {
  const { user } = useAuth();
  const [updatedData, setUpdatedData] = useState(user || {});
  const [isLoading, setIsLoading] = useState(false);
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-lg flex justify-center items-center">
        <div className="bg-white rounded-lg w-3xl p-4 max-h-[80vh] overflow-y-auto">
          <div className="border-b-2 p-2 flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-4">Edit {editArea}</h2>
            <button className=" text-error text-2xl" onClick={onClose}>
              <IoIosCloseCircle />
            </button>
          </div>

          <div>
            {(editArea === "Profile" || editArea === "Basic") && (
              <fieldset className="space-y-4 mt-4 border rounded-md p-4">
                <legend className="px-1 font-semibold">
                  Edit Basic Information
                </legend>
              </fieldset>
            )}

            {(editArea === "Profile" || editArea === "Manager") && (
              <fieldset className="space-y-4 mt-4 border rounded-md p-4">
                <legend className="px-1 font-semibold">
                  Edit Manager Information
                </legend>
              </fieldset>
            )}

            {(editArea === "Profile" || editArea === "Location") && (
              <fieldset className="space-y-4 mt-4 border rounded-md p-4">
                <legend className="px-1 font-semibold">
                  Edit Location Information
                </legend>
              </fieldset>
            )}

            {(editArea === "Profile" || editArea === "OperatingHours") && (
              <fieldset className="space-y-4 mt-4 border rounded-md p-4">
                <legend className="px-1 font-semibold">
                  Edit Operating Hours
                </legend>
              </fieldset>
            )}

            {(editArea === "Profile" || editArea === "LegalBanking") && (
              <fieldset className="space-y-4 mt-4 border rounded-md p-4">
                <legend className="px-1 font-semibold">
                  Edit Legal & Banking Information
                </legend>
              </fieldset>
            )}
            {(editArea === "Profile" || editArea === "Images") && (
              <fieldset className="space-y-4 mt-4 border rounded-md p-4">
                <legend className="px-1 font-semibold">
                  Edit Restaurant Images
                </legend>
              </fieldset>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              className="bg-secondary text-secondary-content px-4 py-2 rounded-md"
              disabled={isLoading}
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="bg-primary text-primary-content px-4 py-2 rounded-md">
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantEditModal;