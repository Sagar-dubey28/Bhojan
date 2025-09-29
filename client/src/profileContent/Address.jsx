import React from "react";
import { Plus } from "lucide-react";

const Address = () => {
  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <h2 className="card-title">Saved Addresses</h2>
            <button className="btn btn-primary btn-sm flex gap-2">
              <Plus className="w-4 h-4" />
              Add Address
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Address;
