import React, { useEffect, useState } from 'react';
import api from '../../config/api';
import { useAuth } from '../../Context/AuthProvider';

const Transactions = () => {
  const { user } = useAuth();
  const [tx, setTx] = useState([]);

  useEffect(() => {
    const fetchTx = async () => {
      if (!user) return;
      try {
        const { data } = await api.get(`/payment/transactions?restaurantId=${user._id}`);
        setTx(data.data || []);
      } catch (err) {
        console.error('Fetch transactions error', err);
      }
    };
    fetchTx();
  }, [user]);

  const mapStatus = (p) => {
    if (p.paymentMethod === 'cod') return 'Cash on Delivery';
    if (p.status === 'paid') return 'Confirmed';
    if (p.status === 'pending') return 'Pending';
    return p.status;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      <div className="space-y-2">
        {tx.length === 0 && <div className="text-base-content/60">No transactions yet</div>}
        {tx.map(t => (
          <div key={t.id} className="p-3 border rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{t.id}</div>
              <div className="text-sm text-base-content/60">{new Date(t.createdAt).toLocaleDateString()}</div>
            </div>
            <div className="text-right">
              <div className="font-bold">₹{t.amount || 0}</div>
              <div className="text-sm">{mapStatus(t)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;