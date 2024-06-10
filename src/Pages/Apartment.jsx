import { useEffect, useState } from "react";
import ApartmentsCard from "../Components/ApartmentsCard";
import useRole from "../Hooks/useRole";
import Spinner from "../Components/Spinner";
import useAuth from "../Hooks/useAuth";
import { Helmet } from "react-helmet";

const Apartment = () => {
  const [apartments, setApartments] = useState([]);
  const cardPerPage = 6;
  // const dataCount = 13
  const [dataCount, setDataCount] = useState(1);
  const totalPage = Math.ceil(dataCount / cardPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = [...Array(totalPage).keys()].map((i) => i + 1);
  const [loding, setLoading]=useState(true)

  const [role, isLoading]=useRole()
  console.log(role);
  const {loading}=useAuth()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/apartments?page=${currentPage}&size=${cardPerPage}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        setApartments(data)
    })

  }, [currentPage]);
  useEffect(()=>{
    fetch(`${import.meta.env.VITE_API_URL}/apartmentCounts`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        setDataCount(data.length)
        setLoading(false)
    })

  },[])
  console.log(dataCount);
  const handleNextBtn = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevioustBtn = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCurrentPage = (val) => {
    setCurrentPage(val);
  };

  if (loding || isLoading || loading) {
    return <Spinner></Spinner>
  }
  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>Dashboard | Apartments</title>
      </Helmet>
      <div className="text-center">
        <h1 className="text-4xl font-extrabold border-b-2  border-dashed font-play pb-4 mt-4">All apartments</h1>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-8">
        {
            apartments.map(apartment=><ApartmentsCard key={apartment._id} role={role} apartment={apartment}></ApartmentsCard>)
        }
        
      </div>
     <div className="flex justify-center mt-20 mb-24">
     <button
              onClick={handlePrevioustBtn}
              className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white"
            >
              <div className="flex items-center -mx-1">
                <span className="mx-1">previous</span>
              </div>
            </button>


      {pages.map((btnNum) => (
              <button
                onClick={() => handleCurrentPage(btnNum)}
                key={btnNum}
                className={`hidden ${
                  currentPage === btnNum ? "bg-blue-500 text-white" : undefined
                } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
              >
                {btnNum}
              </button>
            ))}

<button
              onClick={handleNextBtn}
              className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
            >
              <div className="flex items-center -mx-1">
                <span className="mx-1">Next</span>
              </div>
            </button>
     </div>
    </div>
  );
};

export default Apartment;
