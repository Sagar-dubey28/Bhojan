import React from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

const Order = () => {
  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <h2 className="card-title">Orders</h2>
            {/* <button className="btn btn-primary btn-sm flex gap-2">
              <Plus className="w-4 h-4" />
              Add Card
            </button> */}
          </div>
        
        </div>
      </div>
    </>
  );
};

export default Order;
