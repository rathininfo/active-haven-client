import React from "react";

const FeaturedClasses = () => {
  const classes = [
    {
      title: "Yoga for Beginners",
      description:
        "A peaceful, beginner-friendly class to introduce you to yoga's basics and benefits.",
      bookings: 1500,
    },
    {
      title: "HIIT Workout",
      description:
        "An intense, full-body workout designed to burn fat and increase endurance.",
      bookings: 1200,
    },
    {
      title: "Pilates for Strength",
      description:
        "A low-impact class focused on building core strength and improving flexibility.",
      bookings: 1000,
    },
    {
      title: "Zumba Dance Party",
      description:
        "A fun, high-energy class combining dance and aerobics to get your heart pumping.",
      bookings: 950,
    },
    {
      title: "Strength Training",
      description:
        "Build muscle and increase strength with resistance training exercises.",
      bookings: 850,
    },
    {
      title: "Spinning",
      description:
        "An intense indoor cycling class to increase stamina and burn calories.",
      bookings: 800,
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl font-semibold text-gray-800 mb-12 tracking-tight">
          Featured Classes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((classItem, index) => (
            <div
              key={index}
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
