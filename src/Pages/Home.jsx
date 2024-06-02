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
        </div>
    );
};

export default Home;