import { useQuery } from "@tanstack/react-query";
import AboutBuilding from "../Components/AboutBuilding";
import SectionTitle from "../Components/SectionTitle";
import Slider from "../Components/Slider";
import CouponCard from "../Components/CouponCard";
import { ToastContainer } from "react-toastify";
import locationPhoto from '../assets/Images/location.png'
import useAxiosCommon from "../Hooks/useAxiosCommon";
import { Helmet } from "react-helmet";
const Home = () => {
  const axiosCommon = useAxiosCommon()
  const {data:coupons =[]}=useQuery({
    queryKey:["coupons"],
    queryFn:async ()=>{
      const {data}= await axiosCommon("/allcoupons")
      console.log(data);
      return data
    }
  })
  return (
    <div className="">
      <Helmet>
        <title>Vanguard Estates</title>
      </Helmet>
      <Slider></Slider>
      <div className="container mx-auto mt-10">
        <SectionTitle title={"About Our Buildings"} para={"Our buildings at Vanguard Estates are a testament to superior craftsmanship and innovative design. Each structure is built with the highest standards of quality and sustainability."}></SectionTitle>
        <AboutBuilding></AboutBuilding>
      </div>

      {/* coupons */}
      <div className="container mx-auto p-4 text-center">
        <SectionTitle
          title={"Coupons"}
          para={
            "Enthusiastically synthesize scalable niches via clicks-and-mortar deliverables. Monotonectally exploit emerging expertise via empowered deliverables. Monotonectally."
          }
        ></SectionTitle>
        <div className=" grid lg:grid-cols-2 gap-6">
          {/* coupons cards */}
          {
            coupons?.map((coupon, i)=><CouponCard key={coupon._id} coupon={coupon} i={i+1}></CouponCard>)
          }
        </div>
      </div>
      {/* location  */}
      <div className="container mx-auto mb-32 p-4">
        <SectionTitle title={"Our Location"}
          para={
            "Discover the perfect balance of tranquility and accessibility at Vanguard Estates. Nestled in a serene and picturesque environment, our community offers easy access to essential amenities, vibrant city life, and natural beauty. Enjoy the best of both worlds with a peaceful retreat that is still close to everything you need."
          }></SectionTitle>
          <div className="flex flex-col-reverse lg:flex-row justify-between gap-6">
            <div className="lg:w-2/3 w-full mt-10 md:mt-0 ">
              <h1 className="text-4xl font-bold lg:mt-12 xl:mt-20 font-play">Find Us</h1>
              <p className="mt-6 opacity-80 leading-8">Vanguard Estates is ideally located to offer you the utmost convenience and lifestyle benefits. Situated in a prime area, our community is just minutes away from top-rated schools, shopping centers, fine dining, and entertainment options. Residents can enjoy quick access to major highways and public transportation, making commutes to the city seamless. Nearby parks and recreational facilities provide plenty of opportunities for outdoor activities and family fun. Whether you are looking for a quiet place to relax or an active urban lifestyle, Vanguard Estates offers the perfect location to meet your needs.</p>
            <button className="btn lg:mt-12 bg-[#003366] mt-4 text-white">Details</button>
            </div>
            <div className="lg:w-1/3 border-2 border-blue-500">
              <img src={locationPhoto} alt=""  className="h-full w-full object-center"/>
            </div>
          </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
