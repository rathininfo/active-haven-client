import React from "react";

const TeamSection = () => {
  // Trainer data
  const trainers = [
    {
      name: "John Doe",
      bio: "John is a certified fitness trainer with over 10 years of experience in strength training, cardio, and weight loss.",
      expertise: ["Strength Training", "Cardio", "Weight Loss"],
      image: "https://i.ibb.co.com/jh89tN4/image-sub-copyright-30-570x696.jpg", // Replace with real image URL
    },
    {
      name: "Jane Smith",
      bio: "Jane specializes in yoga and mindfulness. She believes in a holistic approach to fitness, focusing on both body and mind.",
      expertise: ["Yoga", "Mindfulness", "Flexibility"],
      image: "https://i.ibb.co.com/9G0HKK4/image-sub-copyright-28-570x696.jpg", // Replace with real image URL
    },
    {
      name: "Alex Johnson",
      bio: "Alex is an expert in HIIT and circuit training, helping individuals achieve fast results through high-intensity workouts.",
      expertise: ["HIIT", "Circuit Training", "Fat Loss"],
      image: "https://i.ibb.co.com/kgZd67s/image-sub-copyright-31-570x696.jpg", // Replace with real image URL
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-semibold">Meet Our Trainers</h2>
        <p className="text-lg text-gray-700 mt-2">
          Our team of expert trainers is here to help you achieve your fitness
          goals.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {trainers.map((trainer, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-lg p-6 bg-white text-center"
          >
            <img
              src={trainer.image}
              alt={trainer.name}
              className="w-48 h-48 object-cover rounded-full mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold">{trainer.name}</h3>
            <p className="text-gray-600 mb-4">{trainer.bio}</p>
            <h4 className="text-xl font-medium">Areas of Expertise:</h4>
            <ul className="list-disc list-inside text-gray-700">
              {trainer.expertise.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
