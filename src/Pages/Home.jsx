import AboutBuilding from "../Components/AboutBuilding";
import SectionTitle from "../Components/SectionTitle";
import Slider from "../Components/Slider";

const Home = () => {
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
          <div className=" bg-gradient-to-tl from-violet-500 to-fuchsia-500 p-8 rounded-xl  relative overflow-hidden">
            <h1 className="text-white">Coupon!!!</h1>
            <p className="text-white">
              Enthusiastically synthesize scalable niches via clicks-and-mortar
              deliverables. Monotonectally exploit emerging expertise via
              empowered deliverables. Monotonectally.
            </p>
            <div className="join">
              <input
              type="text"
              readOnly
              defaultValue={"nsjoiwe"}
                className="input input-bordered join-item focus:outline-none focus:border-none border-none"
                placeholder=""
              />
              <button className="btn join-item ">
                Copy
              </button>
            </div>
              <div className=" border p-8 rounded-full w-20 h-20 bg-white absolute top-14 -right-12"></div>
              <div className=" border p-8 rounded-full w-20 h-20 bg-white absolute top-14 -left-12"></div>
          </div>
          <div className=" bg-gradient-to-br from-sky-500 to-indigo-500 p-8 rounded-xl  relative overflow-hidden">
            <h1 className="text-white">Coupon!!!</h1>
            <p className="text-white">
              Enthusiastically synthesize scalable niches via clicks-and-mortar
              deliverables. Monotonectally exploit emerging expertise via
              empowered deliverables. Monotonectally.
            </p>
            <div className="join">
              <input
              type="text"
              readOnly
              defaultValue={"nsjoiwe"}
                className="input input-bordered join-item"
                placeholder=""
              />
              <button className="btn join-item ">
                Copy
              </button>
            </div>
              <div className=" border p-8 rounded-full w-20 h-20 bg-white absolute top-14 -right-12"></div>
              <div className=" border p-8 rounded-full w-20 h-20 bg-white absolute top-14 -left-12"></div>
          </div>
          <div className="border bg-red-500">duck</div>
          <div className="border bg-red-500">duck</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
