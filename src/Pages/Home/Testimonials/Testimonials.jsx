import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const Testimonials = () => {
  return (
    <div>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src="https://i.ibb.co.com/KDJsfXj/anastase-maragos-i-Uzge-POo-Gko-unsplash.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.ibb.co.com/K65TPTP/rohit-reddy-FGP9if-RTQa-I-unsplash.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.ibb.co.com/Nrq03Sd/spencer-davis-0-Sh-Ts8i-PY28-unsplash.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.ibb.co.com/Y7JFc8Z/marvin-cors-O1i-H3-Em-Wvb-M-unsplash.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.ibb.co.com/X8zsjjX/sushil-ghimire-5-Ub-Iq-V58-CW8-unsplash.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.ibb.co.com/tBSz01q/corey-young-6qr9wg5tz-PY-unsplash.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.ibb.co.com/8xT7Mcg/alora-griffiths-JNe-YWQncbj8-unsplash-1.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.ibb.co.com/GMQfCLc/logan-weaver-lgnwvr-MXnk-Wolg3-Ug-unsplash.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.ibb.co.com/dJbthgb/ahmed-zalabany-7-Gd6up6-SHA-unsplash.jpg"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Testimonials;
