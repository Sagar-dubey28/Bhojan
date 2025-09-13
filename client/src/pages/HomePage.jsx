import { useEffect, useState } from "react";

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const foodImages = [
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=80",
    "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % foodImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [foodImages.length]);

  return (
    <main className="flex items-center px-10 py-20 min-h-[calc(100vh-80px)]">
      <div className="flex-1 pr-15">
        <h1 className="text-5xl font-bold text-gray-800 mb-8 leading-tight">
          Your Crave,<br /> Delivered Fast!
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-lg">
          Explore thousands of restaurants and dishes, right at your fingertips.
        </p>
      </div>

      <div className="flex-1 relative h-96 overflow-hidden">
        {foodImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`food-${index}`}
            className={`absolute inset-0 w-full h-full object-cover rounded-2xl transition-all duration-1000 ease-in-out transform ${
              index === currentImageIndex ? "opacity-100 scale-100" : "opacity-0 scale-110"
            }`}
          />
        ))}
      </div>
    </main>
  );
};

export default HomePage;
