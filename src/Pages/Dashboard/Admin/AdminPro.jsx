import ApartmentPercentage from "../../../Components/ApartmentsPercentage";
import UserPercentage from "../../../Components/UserPercentage";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useRole from "../../../Hooks/useRole";
import bgimage from "../../../assets/Images/placeholder.jpg"
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
const AdminPro = () => {
    const {user}=useAuth()
    const [role]=useRole()
    const axiosSecure =useAxiosSecure()
    const [userCount, setUserCount]=useState(0)
    const [memberCount, setMemberCount]=useState(0)
    const [apartmentCounts, setApartmentCounts]=useState(0)
    const [occupiedApartmentCount, setOccupiedApartmentCount]=useState(0)
    const vacantApartmentCount = apartmentCounts-occupiedApartmentCount
    const {data: allUsers =[] }=useQuery({
        queryKey:["allUsers"],
        queryFn: async()=>{
            const {data} = await axiosSecure("/allusers")
            return data
        }
    })
    const {data: allmembers =[] }=useQuery({
        queryKey:["allmembers"],
        queryFn: async()=>{
            const {data} = await axiosSecure("/members")
            return data
        }
    })
    const {data: vacantApartment =[] }=useQuery({
        queryKey:["allmembers"],
        queryFn: async()=>{
            const {data} = await axiosSecure("/vacantapartemnt")
            return data
        }
    })
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_API_URL}/apartmentCounts`)
        .then(res=>res.json())
        .then(data=>{
            setApartmentCounts(data.length)
        })
    
      },[])
      console.log(apartmentCounts,vacantApartmentCount);
    
    useEffect(()=>{
        setUserCount(allUsers.length)
        setMemberCount(allmembers.length)
        setOccupiedApartmentCount(vacantApartment.length)
    },[allUsers, allmembers, vacantApartment])
    console.log(vacantApartmentCount , );
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 p-4">
            {/* single card  */}
            <div className='h-full'>
      <div className='bg-white shadow-lg h-full rounded-xl'>
        <img
          alt='profile'
          src={bgimage}
          className='w-full mb-4 h-36 object-fill  rounded-t-xl'
        />
        <div className='flex flex-col items-center justify-center p-4 -mt-20'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={user?.photoURL}
              className='mx-auto object-cover rounded-full h-32 w-32  border-2 border-white '
            />
          </a>

          <p className='p-2 px-4 mt-4 text-xs capitalize text-white bg-pink-500 rounded-full'>
            {role}
          </p>
          <p className='mt-2 text-xl font-medium text-gray-800 '>
            User Id: {user?.uid}
          </p>
          <div className='w-full p-2 mt-4 rounded-lg'>
          <div className='text-xl  text-gray-600 '>
              <p className='flex flex-col'>
                Name
                <span className='font-bold text-black '>
                  {user?.displayName}
                </span>
              </p>
              <p className='flex flex-col mt-2'>
                Email
                <span className='font-bold text-black '>{user?.email}</span>
              </p>

              <div className="hidden">
                <button className='bg-[#F43F5E] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1'>
                  Update Profile
                </button>
                <button className='bg-[#F43F5E] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]'>
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
            {/* single card  */}
            <div className='p-10 rounded-xl shadow-2xl'>
                <UserPercentage memberCount={memberCount} userCount={userCount}></UserPercentage>

    </div>
            {/* single card  */}
            <div className='p-10 rounded-xl shadow-2xl'>
                <ApartmentPercentage apartmentCounts={apartmentCounts} vacantApartmentCount={vacantApartmentCount} occupiedApartmentCount={occupiedApartmentCount}></ApartmentPercentage>

    </div>
        </div>
    );
};

export default AdminPro;