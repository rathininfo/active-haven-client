import React from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <div className="relative">
      <Carousel showThumbs={false} autoPlay infiniteLoop>
        {/* Slide 1 */}
        <div className="relative">
          <img
            src="https://i.ibb.co/Y0FCkW4/alexander-red-d3b-Ymn-Z0ank-unsplash.jpg"
            alt="Fitness Motivation"
            className="w-full h-[600px] object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center px-4">
            <h2 className="text-4xl md:text-6xl font-bold">
              Transform Your Body
            </h2>
            <p className="mt-4 text-lg md:text-xl">
              Push harder than yesterday if you want a different tomorrow.
            </p>
            <Link to="/classes">
              <button className="mt-6 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300">
                Explore Classes
              </button>
            </Link>
          </div>
        </div>
        {/* Slide 2 */}
        <div className="relative">
          <img
            src="https://i.ibb.co/9h4ysfn/anastase-maragos-7k-Ep-UPB8v-Nk-unsplash.jpg"
            alt="Strength Training"
            className="w-full h-[600px] object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center px-4">
            <h2 className="text-4xl md:text-6xl font-bold">Build Strength</h2>
            <p className="mt-4 text-lg md:text-xl">
              Your only limit is you. Break through.
            </p>
            <Link to="/classes">
              <button className="mt-6 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300">
                Explore Classes
              </button>
            </Link>
          </div>
        </div>
        {/* Slide 3 */}
        <div className="relative">
          <img
            src="https://i.ibb.co/pr2KpxJ/jonathan-borba-R0y-b-EUji-OM-unsplash.jpg"
            alt="Stay Active"
            className="w-full h-[600px] object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center px-4">
            <h2 className="text-4xl md:text-6xl font-bold">Stay Active</h2>
            <p className="mt-4 text-lg md:text-xl">
              Consistency is key to progress. Stay committed!
            </p>
            <Link to="/classes">
              <button className="mt-6 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300">
                Explore Classes
              </button>
            </Link>
          </div>
        </div>
        {/* Slide 4 */}
        <div className="relative">
          <img
            src="https://i.ibb.co/cJDgj7h/tony-woodhead-k-Ydk-Uwe-H8-QU-unsplash.jpg"
            alt="Healthy Lifestyle"
            className="w-full h-[600px] object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center px-4">
            <h2 className="text-4xl md:text-6xl font-bold">
              Healthy Lifestyle
            </h2>
            <p className="mt-4 text-lg md:text-xl">
              Eat clean, train hard, live well.
            </p>
            <Link to="/classes">
              <button className="mt-6 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300">
                Explore Classes
              </button>
            </Link>
          </div>
        </div>
        {/* Slide 5 */}
        <div className="relative">
          <img
            src="https://i.ibb.co/ydkbw9n/anastase-maragos-f-G0p4-Qh-a-WI-unsplash.jpg"
            alt="Fitness Goals"
            className="w-full h-[600px] object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center px-4">
            <h2 className="text-4xl md:text-6xl font-bold">
              Achieve Your Goals
            </h2>
            <p className="mt-4 text-lg md:text-xl">
              Dream it. Believe it. Achieve it.
            </p>
            <Link to="/classes">
              <button className="mt-6 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300">
                Explore Classes
              </button>
            </Link>
          </div>
        </div>
        {/* Slide 6 */}
        <div className="relative">
          <img
            src="https://i.ibb.co.com/X89p0Gm/sven-mieke-Euw-D039-Svug-unsplash.jpg"
            alt="Workout Motivation"
            className="w-full h-[600px] object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center px-4">
            <h2 className="text-4xl md:text-6xl font-bold">Workout Today</h2>
            <p className="mt-4 text-lg md:text-xl">
              Every workout counts toward your goal.
            </p>
            <Link to="/classes">
              <button className="mt-6 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300">
                Explore Classes
              </button>
            </Link>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
