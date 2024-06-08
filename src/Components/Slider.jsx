import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import banner1 from "../assets/Images/banner1.png";
import banner2 from "../assets/Images/banner2.png";
import banner3 from "../assets/Images/banner3.jpg";
import { Link } from "react-router-dom";

const Slider = () => {
  return (
    <div className="-mt-3 text-center lg:text-left">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <div
            style={{
              backgroundImage: `linear-gradient(180deg,rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url(${banner3})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className="h-[550px] lg:min-h-[calc(100vh-92px)]"
          >
            <div className="container mx-auto md:p-4 text-white mt-3 text-center">
              <h1
                data-aos="fade-down"
                data-aos-duration="1000"
                className="lg:text-4xl text-xl font-extrabold lg:mt-7 pt-4 md:pt-12 font-play lg:pt-40 md:leading-10 lg:leading-[60px]"
              >
                WELCOME TO VANGURAD ESTATES
              </h1>
              <p
                data-aos="fade-down"
                data-aos-delay="700"
                data-aos-duration="1400"
                className=" md:leading-7 text-xl lg:mt-12 mt-6 lg:leading-8 lg:w-4/6 mx-auto"
              >
                Welcome to Vanguard Estates, where luxury meets timeless elegance. Our exquisite homes are designed with modern amenities and stunning architectural details, providing a perfect blend of comfort and sophistication.
              </p>
              <Link to="/apartment">
                <button
                  data-aos="zoom-in"
                  data-aos-delay="1000"
                  data-aos-duration="2000"
                  className="btn btn-outline text-white  hover:bg-transparent hover:border-[#9dbeeb] hover:border-2 hover:text-[#9dbeeb] mt-14 lg:mb-80 mb-10 "
                >
                  All Apartments
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              backgroundImage: `linear-gradient(180deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),url(${banner1})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className="h-[550px] lg:lg:min-h-[calc(100vh-92px)]"
          >
            <div className="container mx-auto md:p-4 text-white mt-3 text-center">
              <h1 className="lg:text-4xl text-xl font-extrabold lg:mt-7 pt-4 md:pt-12 font-play lg:pt-40 md:leading-10 lg:leading-[60px]">
              Exceptional Community Living
              </h1>
              <p className=" md:leading-7 text-xl lg:mt-12 mt-6 lg:leading-8 lg:w-4/6 mx-auto">
              Enjoy top-tier facilities such as a state-of-the-art fitness center, lush landscaped gardens, and a sparkling swimming pool. Our vibrant community fosters social connections and offers a tranquil environment for a perfect lifestyle.
              </p>
              <Link to="/apartment">
              <button
                  data-aos="zoom-in"
                  data-aos-delay="1000"
                  data-aos-duration="2000"
                  className="btn btn-outline text-white  hover:bg-transparent hover:border-[#9dbeeb] hover:border-2 hover:text-[#9dbeeb] mt-14 lg:mb-80 mb-10 "
                >
                  All Apartments
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              backgroundImage: `linear-gradient(180deg,rgba(0,0,0,0.3),rgba(0,0,0,0.3)),url(${banner2})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className="h-[550px] lg:min-h-[calc(100vh-92px)]"
          >
            <div className="container mx-auto md:p-4 text-white mt-3 text-center">
              <h1 className="lg:text-4xl text-xl font-extrabold lg:mt-7 pt-4 md:pt-12 font-play lg:pt-40 md:leading-10 lg:leading-[60px]">
              Discover Your Dream Home
              </h1>
              <p className=" md:leading-7 text-xl lg:mt-12 mt-6 lg:leading-8 lg:w-4/6 mx-auto">
              At Vanguard Estates, we provide exceptional service and refined living. Find your sanctuary in a place crafted for comfort and style, and experience the pinnacle of upscale living with us.
              </p>
              <Link to="/apartment">
              <button
                  data-aos="zoom-in"
                  data-aos-delay="1000"
                  data-aos-duration="2000"
                  className="btn btn-outline text-white  hover:bg-transparent hover:border-[#9dbeeb] hover:border-2 hover:text-[#9dbeeb] mt-14 lg:mb-80 mb-10 "
                >
                  All Apartments
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
