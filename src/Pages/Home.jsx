import { useQuery } from "@tanstack/react-query";
import AboutBuilding from "../Components/AboutBuilding";
import SectionTitle from "../Components/SectionTitle";
import Slider from "../Components/Slider";
import axios from "axios";
import CouponCard from "../Components/CouponCard";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const {data:coupons}=useQuery({
    queryKey:["coupons"],
    queryFn:async ()=>{
      const {data}= await axios("http://localhost:3000/allcoupons")
      console.log(data);
      return data
    }
  })
  return (
    <div className="text-center">
      <Slider></Slider>
      <div className="mt-10">
        <SectionTitle title={"hello"} para={"hello bangladesh"}></SectionTitle>
        <AboutBuilding></AboutBuilding>
      </div>

      {/* coupons */}
      <div className="container mx-auto mb-32">
        <SectionTitle
          title={"coupons"}
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
      <ToastContainer />
    </div>
  );
};

export default Home;
