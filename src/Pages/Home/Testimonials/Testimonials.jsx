import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]); // Initialize as an empty array

  useEffect(() => {
    fetch("https://fitness-tracker-server-side-nine.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <>
      <div className="flex justify-center mb-12">
        <h1 className="font-medium text-5xl">Our Client Reviews</h1>
      </div>

      <div className="py-10">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          centeredSlides={false}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-center">
                  {review.name}
                </h3>
                <p className="text-gray-600 text-center mt-2">
                  {review.feedback}
                </p>

                <div className="flex justify-center py-4">
                  <Rating
                    style={{ maxWidth: 120 }}
                    value={review.rating}
                    readOnly
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Testimonials;
