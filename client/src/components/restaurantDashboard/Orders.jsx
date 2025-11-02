import React, { useEffect, useState } from 'react';
import api from '../../config/api';
import { useAuth } from '../../Context/AuthProvider';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const { data } = await api.get(`/payment/orders?restaurantId=${user._id}`);
        setOrders(data.data || []);
      } catch (err) {
        console.error('Fetch orders error', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-3">
          {orders.length === 0 && <div className="text-base-content/60">No orders yet</div>}
          {orders.map(o => (
            <div key={o._id} className="p-3 border rounded">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">Order: {o._id}</div>
                  <div className="text-sm text-base-content/60">Customer: {o.userEmail || 'Guest'}</div>
                  <div className="text-sm mt-2">Status: <span className="font-medium">{o.status}</span></div>
                </div>
                <div className="text-right">
                  <div className="font-bold">₹{o.totalAmount || 0}</div>
                  <div className="text-sm text-base-content/60">{new Date(o.createdAt).toLocaleString()}</div>
                </div>
              </div>

              {o.address && (
                <div className="mt-3 text-sm">
                  <div className="font-semibold">Delivery Address</div>
                  <div>{o.address.name} • {o.address.phone}</div>
                  <div>{o.address.line1}, {o.address.city} - {o.address.pincode}</div>
                </div>
              )}

              {o.items && o.items.length > 0 && (
                <div className="mt-3">
                  <div className="font-semibold">Items</div>
                  <ul className="list-disc list-inside text-sm mt-1">
                    {o.items.map((it, idx) => (
                      <li key={idx}>{it.name || it.title || 'Item'} x {it.quantity || 1} • ₹{(it.price || it.amount || 0) * (it.quantity || 1)}</li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;