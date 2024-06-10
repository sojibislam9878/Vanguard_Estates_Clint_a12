import buildingPhoto from "../assets/Images/building.png"
const AboutBuilding = () => {
  return (
    <div className="container mx-auto lg:flex justify-between gap-6">
      <div
      style={{
        backgroundImage: `url(${buildingPhoto})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
       className=" lg:w-1/2 bg-gray-700 text-white md:h-[50rem] h-[30rem]"></div>
      <div className="lg:w-1/2 text-left p-4 flex justify-center items-center">
        
        <div>
          <h1 className="text-2xl font-play font-bold">More about building :</h1>
        <p className=" font-medium left-8 text-lg leading-8 opacity-80">
        The buildings at Vanguard Estates are designed to offer a perfect blend of luxury and functionality. Featuring contemporary architecture, each building is constructed using premium materials and cutting-edge techniques to ensure durability and energy efficiency. Spacious balconies and large windows provide ample natural light and stunning views of the surrounding landscape. Inside, residents will find a harmonious blend of open spaces and private retreats, with high ceilings, custom cabinetry, and modern fixtures that enhance both comfort and style. Whether youu are enjoying a quiet evening at home or hosting a gathering, our buildings provide the perfect setting for every occasion.
        </p>
        </div>
      </div>
    </div>
  );
};

export default AboutBuilding;
