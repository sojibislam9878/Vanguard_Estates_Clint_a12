import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import errorPhoto from '../assets/Images/errorpage.png'

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Helmet>
        <title>404 || page not found</title>
      </Helmet>
      <div className="text-center">
        <div className=" mx-auto">
          <div className="flex-1">
            <img src={errorPhoto} alt="" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mt-7">Oppos! You Are Lost!</h1>
        <p className="text-lg font-medium text-red-600 mt-4">404 Not Found</p>
        <Link to="/">
          <button className="btn mt-4 bg-[#003366] hover:bg-[#052344] text-white text-xl">
            Back To Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
