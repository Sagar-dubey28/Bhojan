import React from 'react';

const Transactions = () => {
  const tx = [
    { id: 'TX-1001', amount: 4800, date: '2025-10-09' },
    { id: 'TX-1002', amount: 3200, date: '2025-10-08' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      <div className="space-y-2">
        {tx.map(t => (
          <div key={t.id} className="p-3 border rounded flex justify-between">
            <div>{t.id} • {t.date}</div>
            <div className="font-bold">₹{t.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;