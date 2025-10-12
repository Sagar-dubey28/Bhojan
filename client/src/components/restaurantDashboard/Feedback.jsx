import React from 'react';

const Feedback = () => {
  const feedbacks = [
    { id: 1, user: 'Aman', rating: 4, comment: 'Great food!' },
    { id: 2, user: 'Priya', rating: 5, comment: 'Amazing service.' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Feedback</h2>
      <div className="space-y-3">
        {feedbacks.map(f => (
          <div key={f.id} className="p-3 border rounded">
            <div className="flex justify-between items-center">
              <div className="font-semibold">{f.user}</div>
              <div className="text-sm">{f.rating} ⭐</div>
            </div>
            <p className="text-base-content/70 mt-2">{f.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;