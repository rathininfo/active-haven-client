import React, { useEffect, useState } from "react";

const FeaturedClasses = () => {
  const [classes, setClasses] = useState([]); // Initialize with an empty array
  useEffect(() => {
    fetch("http://localhost:5000/featuredClasses")
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, []);

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl font-semibold text-gray-800 mb-12 tracking-tight">
          Featured Classes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Slice the array to only include the first 6 classes */}
          {classes.slice(0, 6).map((classItem) => (
            <div
              key={classItem._id}
              className="bg-gray-800 p-6 py-20 px-10 rounded-3xl shadow-md transition-all hover:scale-105 hover:shadow-xl duration-300 ease-in-out"
            >
              <h3 className="text-2xl font-semibold text-gray-100 mb-4">
                {classItem.title}
              </h3>
              <p className="text-gray-200 mb-4">{classItem.description}</p>
              <div className="flex items-center justify-center">
                <span className="text-lg font-semibold text-red-600 text-center">
                  Bookings: {classItem.bookings}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedClasses;
