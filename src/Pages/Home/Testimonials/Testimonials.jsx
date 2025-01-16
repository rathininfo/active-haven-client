import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const Testimonials = () => {
  // Client review data
  const reviews = [
    {
      name: "John Doe",
      review:
        "This platform has been life-changing! The trainers are fantastic and the progress I've made is remarkable.",
      image:
        "https://i.ibb.co/KDJsfXj/anastase-maragos-i-Uzge-POo-Gko-unsplash.jpg",
      rating: 5,
    },

    {
      name: "Jane Smith",
      review:
        "A great experience! The community is supportive, and the workouts are challenging yet rewarding.",
      image: "https://i.ibb.co/K65TPTP/rohit-reddy-FGP9if-RTQa-I-unsplash.jpg",
      rating: 4,
    },
    {
      name: "Emily Johnson",
      review:
        "I love how personalized the fitness plans are. The trainers really care about my goals.",
      image:
        "https://i.ibb.co/Nrq03Sd/spencer-davis-0-Sh-Ts8i-PY28-unsplash.jpg",
      rating: 3,
    },
    {
      name: "Mark Wilson",
      review:
        "I've never felt stronger! The variety of workouts keeps me engaged and motivated.",
      image:
        "https://i.ibb.co/Y7JFc8Z/marvin-cors-O1i-H3-Em-Wvb-M-unsplash.jpg",
      rating: 5,
    },
    {
      name: "Sarah Lee",
      review:
        "Fantastic results! The trainers have helped me reach my fitness goals faster than I imagined.",
      image:
        "https://i.ibb.co/X8zsjjX/sushil-ghimire-5-Ub-Iq-V58-CW8-unsplash.jpg",
      rating: 4.5,
    },
    {
      name: "David Kim",
      review:
        "The programs are easy to follow, and the results speak for themselves. Highly recommend!",
      image: "https://i.ibb.co/tBSz01q/corey-young-6qr9wg5tz-PY-unsplash.jpg",
      rating: 5,
    },
    {
      name: "Rachel Adams",
      review:
        "I feel more energized and confident than ever. The fitness community is incredibly supportive.",
      image:
        "https://i.ibb.co/8xT7Mcg/alora-griffiths-JNe-YWQncbj8-unsplash-1.jpg",
      rating: 5,
    },
    {
      name: "Alex Johnson",
      review:
        "I’ve tried many fitness apps, but this one is by far the best. It’s user-friendly and highly effective.",
      image:
        "https://i.ibb.co/GMQfCLc/logan-weaver-lgnwvr-MXnk-Wolg3-Ug-unsplash.jpg",
      rating: 5,
    },
    {
      name: "Chris Brown",
      review:
        "Amazing platform! The workout videos are excellent, and the trainers really know their stuff.",
      image:
        "https://i.ibb.co/dJbthgb/ahmed-zalabany-7-Gd6up6-SHA-unsplash.jpg",
      rating: 5,
    },
  ];

  return (
    <>
      <div className="flex justify-center mb-12 ">
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
                  {review.review}
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
