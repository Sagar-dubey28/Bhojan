import React, { useState } from "react";
import Account from "../profileContent/Account";
import Sidebar from "./Sidebar";
import Address from "../profileContent/Address";
import Order from "../profileContent/order";
import Review from "../profileContent/review";
import ContactUs from "../profileContent/ContactUs";

const ProfilePage = () => {
    const[active,setActive]=useState("Account");
  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* sidebar */}
       <div>
           <Sidebar active={active} setActive={setActive}/>
       </div>
      
      {/* right side content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          {active==="Account"&&<Account/>}
          {active==="Address"&&<Address/>}
          {active==="Order"&&<Order/>}
          {active==="Review"&& <Review/>}
          {active==="ContactUs"&&<ContactUs/>}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
