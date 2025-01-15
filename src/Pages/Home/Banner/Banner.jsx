import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <div className="relative">
      <Carousel showThumbs={false} autoPlay infiniteLoop>
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
            <button className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition-all mt-6">
              BOOK A CONSULTATION
            </button>
          </div>
        </div>
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
            <button className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition-all mt-6">
              BOOK A CONSULTATION
            </button>
          </div>
        </div>
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
            <button className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition-all mt-6">
              BOOK A CONSULTATION
            </button>
          </div>
        </div>
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
            <button className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition-all mt-6">
              BOOK A CONSULTATION
            </button>
          </div>
        </div>
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
            <button className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition-all mt-6">
              BOOK A CONSULTATION
            </button>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
