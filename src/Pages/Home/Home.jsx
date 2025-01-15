import React from "react";
import Banner from "./Banner/Banner";
import Featured from "./Featured/Featured";
import About from "./About/About";
import FeaturedClasses from "./FeaturedClasses/FeaturedClasses";
import Testimonials from "./Testimonials/Testimonials";
import NewsletterForm from "./NewsletterForm/NewsletterForm";
import TeamSection from "./TeamSection/TeamSection";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Featured></Featured>
      <About></About>
      <FeaturedClasses></FeaturedClasses>
      <Testimonials></Testimonials>
      <NewsletterForm></NewsletterForm>
      <TeamSection></TeamSection>
    </div>
  );
};

export default Home;
