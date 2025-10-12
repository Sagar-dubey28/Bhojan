import React from 'react';

const sampleMenu = [
  { id: 1, name: 'Margherita Pizza', price: 150, category: 'Italian' },
  { id: 2, name: 'Chicken Hakka Noodles', price: 120, category: 'Chinese' },
  { id: 3, name: 'French Fries', price: 50, category: 'Fast-Food' },
];

const Menu = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sampleMenu.map(item => (
          <div key={item.id} className="p-4 border rounded flex items-center justify-between">
            <div>
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm text-base-content/60">{item.category}</div>
            </div>
            <div className="text-lg font-bold">₹{item.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;