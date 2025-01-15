import React from "react";

const Featured = () => {
  const features = [
    {
      title: "Personalized Training",
      description:
        "Get tailored workout plans and fitness advice based on your goals.",
      icon: "https://img.icons8.com/?size=50&id=18899&format=png",
    },
    {
      title: "Expert Coaches",
      description: "Learn from certified trainers with years of experience.",
      icon: "https://img.icons8.com/ios-filled/50/coach.png",
    },
    {
      title: "Nutrition Guidance",
      description:
        "Access meal plans and nutrition tips to complement your fitness journey.",
      icon: "https://img.icons8.com/ios-filled/50/healthy-food.png",
    },
    {
      title: "Progress Tracking",
      description: "Monitor your progress with advanced tools and analytics.",
      icon: "https://img.icons8.com/ios-filled/50/graph.png",
    },
    {
      title: "Community Support",
      description:
        "Join a vibrant community to share your progress and stay motivated.",
      icon: "https://img.icons8.com/ios-filled/50/conference-call.png",
    },
    {
      title: "Flexible Scheduling",
      description:
        "Schedule your workouts at your convenience, anytime, anywhere.",
      icon: "https://img.icons8.com/ios-filled/50/calendar.png",
    },
  ];

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 shadow-md rounded-lg p-6 flex flex-col items-center"
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-16 h-16 mb-4 bg-red-600 p-4 rounded-full"
              />
              <h3 className="text-xl font-semibold text-gray-200 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-100">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
