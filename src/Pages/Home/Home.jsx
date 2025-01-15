import React from "react";
import Banner from "./Banner/Banner";
import Featured from "./Featured/Featured";
import About from "./About/About";
import FeaturedClasses from "./FeaturedClasses/FeaturedClasses";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Featured></Featured>
      <About></About>
      <FeaturedClasses></FeaturedClasses>
    </div>
  );
};

export default Home;
