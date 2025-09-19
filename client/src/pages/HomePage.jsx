import { useEffect, useState } from "react";

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const foodImages = [
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
    <main className="flex flex-col md:flex-row items-center px-6 md:px-20 py-12 md:py-20 min-h-[calc(100vh-80px)] bg-base-100">
      {/* Left Content */}
      <div className="flex-1 pr-0 md:pr-16 text-center md:text-left mb-10 md:mb-0">
        <h1 className="text-4xl md:text-6xl font-bold text-base-content mb-6 leading-tight">
          Your Crave,<br /> Delivered Fast!
        </h1>
        <p className="text-base-content/70 text-lg leading-relaxed mb-8 max-w-lg mx-auto md:mx-0">
          Explore thousands of restaurants and dishes, right at your fingertips.
        </p>
        <button className="btn btn-primary px-8">Order Now</button>
      </div>

      {/* Right - Image Carousel */}
      <div className="flex-1 relative h-64 md:h-[24rem] w-full overflow-hidden rounded-3xl shadow-xl">
        {foodImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`food-${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out transform rounded-3xl
              ${index === currentImageIndex ? "opacity-100 scale-100 z-10" : "opacity-0 scale-110 z-0"}
            `}
          />
        ))}
      </div>
    </main>
  );
};

export default HomePage;