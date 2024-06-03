import { useEffect, useState } from "react";
import ApartmentsCard from "../Components/ApartmentsCard";

const Apartment = () => {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/apartments")
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        setApartments(data)
    })
  }, []);
  return (
    <div className="container mx-auto p-4">
      <h1>apartment</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mb-32">
        {
            apartments.map(apartment=><ApartmentsCard key={apartment._id} apartment={apartment}></ApartmentsCard>)
        }
      </div>
    </div>
  );
};

export default Apartment;