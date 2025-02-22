import React from "react";

const About = () => {
  return (
    <section className="bg-gray-900 py-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 text-center md:text-left flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img
            src="https://i.ibb.co.com/nkfVFKW/john-fornander-TAZo-Um-Dqz-Xk-unsplash.jpg"
            alt="About Us"
            className="w-full h-auto rounded-xl shadow-xl object-cover md:h-96" // Reduced image height
          />
        </div>
        <div className="md:w-1/2 md:pl-12">
          <h2 className="text-4xl font-semibold text-gray-100 mb-6 leading-tight">
            About Us
          </h2>
          <p className="text-base text-gray-300 mb-6">
            We are a team of passionate professionals committed to helping you
            achieve your fitness goals. With years of experience in personalized
            training, expert coaching, and holistic fitness strategies, we are
            here to guide and motivate you at every step of your journey.
          </p>
          <p className="text-base text-gray-300 mb-6">
            Our mission is to create a community of individuals who not only
            seek fitness but a healthier and more balanced lifestyle. We offer
            personalized plans that are designed to suit your unique needs.
          </p>
          <p className="text-base text-gray-300 mb-6">
            Join us today and start your journey towards becoming the best
            version of yourself.
          </p>
          <div className="mt-8">
            <a
              href="#join"
              className="bg-red-600 text-white px-6 py-3 rounded-full text-xl font-semibold hover:bg-blue-600 transition-all duration-300"
            >
              Join Our Community
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
