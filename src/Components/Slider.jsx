import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// import banner1 from "../assets/images/banner1.jpg";
// import banner2 from "../assets/images/banner2.jpg";
// import banner3 from "../assets/images/banner3.jpg";
const banner1 = true
const banner2 = true
const banner3 = true
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
              backgroundImage: `linear-gradient(180deg,rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(${banner1})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className="h-[550px] lg:min-h-[calc(100vh-92px)]"
          >
            <div className="container mx-auto md:p-4 text-white mt-3">
              <h1
                data-aos="fade-down"
                data-aos-duration="1000"
                className="lg:text-4xl text-xl font-extrabold lg:mt-7 pt-4 md:pt-12 font-play lg:pt-40 md:leading-10 lg:leading-[60px]"
              >
                Feast Your Senses!
              </h1>
              <p
                data-aos="fade-down"
                data-aos-delay="700"
                data-aos-duration="1400"
                className="opacity-80 md:leading-7 lg:mt-12 mt-6 lg:leading-8 lg:w-4/6"
              >
                Flavor Junction where food is not just a necessity, but a
                passion. Dive into a world of tantalizing flavors, inspired
                recipes, and culinary delights. Join our community of food
                lovers and lets embark on a delicious journey together!
              </p>
              <Link to="/allfoods">
                <button
                  data-aos="zoom-in"
                  data-aos-delay="1000"
                  data-aos-duration="2000"
                  className="btn border-none text-white bg-[#EA6A12]  mt-14 lg:mb-80 mb-10 hover:bg-[#C75A0F]"
                >
                  All Foods
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              backgroundImage: `linear-gradient(180deg,rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(${banner2})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className="h-[550px] lg:lg:min-h-[calc(100vh-92px)]"
          >
            <div className="container mx-auto md:p-4 text-white mt-3">
              <h1 className="lg:text-4xl text-xl font-extrabold lg:mt-7 pt-4 md:pt-12 font-play lg:pt-40 md:leading-10 lg:leading-[60px]">
                Flavor Junction Where Flavor Takes Center Stage
              </h1>
              <p className="opacity-80 md:leading-7 lg:mt-12 mt-6 lg:leading-8 lg:w-4/6">
                Savor the flavors of culinary excellence. Dive into a delicious
                universe where recipes, tips, and culinary adventures await.
                Whether you are a seasoned chef or a novice cook, our platform
                is your go-to destination for all things food.
              </p>
              <Link to="/allfoods">
                <button
                  data-aos="zoom-in"
                  data-aos-delay="1000"
                  data-aos-duration="2000"
                  className="btn border-none text-white bg-[#EA6A12]  mt-14 lg:mb-80 mb-10 hover:bg-[#C75A0F]"
                >
                  All Foods
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              backgroundImage: `linear-gradient(180deg,rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(${banner3})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className="h-[550px] lg:min-h-[calc(100vh-92px)]"
          >
            <div className="container mx-auto md:p-4 text-white mt-3">
              <h1 className="lg:text-4xl text-xl font-extrabold lg:mt-7 pt-4 md:pt-12 font-play lg:pt-40 md:leading-10 lg:leading-[60px]">
                Taste the Difference!
              </h1>
              <p className="opacity-80 md:leading-7 lg:mt-12 mt-6 lg:leading-8 lg:w-4/6">
                Step into a culinary wonderland at us. Explore mouthwatering
                recipes, expert cooking tips, and a community dedicated to the
                art of gastronomy. Join us and lets elevate your dining
                experience to new heights!
              </p>
              <Link to="/allfoods">
                <button
                  data-aos="zoom-in"
                  data-aos-delay="1000"
                  data-aos-duration="2000"
                  className="btn border-none text-white bg-[#EA6A12]  mt-14 lg:mb-80 mb-10 hover:bg-[#C75A0F]"
                >
                  All Foods
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
