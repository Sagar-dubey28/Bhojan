import React from 'react';

const Overview = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded shadow">Orders Today<br/><span className="text-2xl font-bold">24</span></div>
        <div className="p-4 border rounded shadow">Revenue Today<br/><span className="text-2xl font-bold">₹4,800</span></div>
        <div className="p-4 border rounded shadow">Active Menu Items<br/><span className="text-2xl font-bold">56</span></div>
      </div>
    </div>
  );
};

export default Overview;