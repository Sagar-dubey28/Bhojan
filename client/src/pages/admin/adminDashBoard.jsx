import React, { useState } from "react";
import  AdminSidebar  from "../../components/adminProfileContent/AdminSidebar";
import ManageCustomer from "../../components/adminProfileContent/ManageCustomer";
import ManageRider from "../../components/adminProfileContent/ManageRider";
import ManageRestaurent from "../../components/adminProfileContent/ManageRestaurent";
import ManageFeedBack from "../../components/adminProfileContent/ManageFeedBack";



const AdminDashBoard = () => {
  const [active, setActive] = useState("Account");

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex">
        {/* sidebar */}
        <div>
          <AdminSidebar active={active} setActive={setActive} />
        </div>

        {/* right side content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-8">
            {active === "Customer" && <ManageCustomer />}
            {active === "Rider" && <ManageRider />}
            {active === "Restaurent" && <ManageRestaurent />}
            {active === "Feedback" && <ManageFeedBack />}
            
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
