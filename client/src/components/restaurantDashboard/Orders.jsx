import React from 'react';

const Orders = () => {
  const sampleOrders = [
    { id: 'ORD-001', customer: 'Rahul', total: 250, status: 'delivered' },
    { id: 'ORD-002', customer: 'Neha', total: 120, status: 'preparing' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <div className="space-y-3">
        {sampleOrders.map(o => (
          <div key={o.id} className="p-3 border rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{o.id} - {o.customer}</div>
              <div className="text-sm text-base-content/60">Status: {o.status}</div>
            </div>
            <div className="font-bold">₹{o.total}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;