
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import bgimage from "../../assets/Images/placeholder.jpg"
import axios from "axios";
import AdminPro from "./Admin/AdminPro";

const MyProfile = () => {
    const { user,loading } = useAuth()
    const [role]=useRole()
    const {data:agreement = {}}= useQuery({
      queryKey:["agreement"],
      enabled: !loading && !!user?.email,
      queryFn:async ()=>{
          const {data} = await axios(`http://localhost:3000/agreement/${user?.email}`,{
            headers:{
              Authorization:`Beareer ${localStorage.getItem("access-token")}`
            }
          })
          console.log(data);
          return data
      }
  })
  console.log(agreement);

    console.log(user)
    if (role==="admin") {
      return <AdminPro></AdminPro>
    }
    return (
        <div className="lg:flex gap-6 p-6 lg:mt-44">
            <div className='flex-1'>
      <div className='bg-white shadow-lg  rounded-xl'>
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
            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
              <p className='flex flex-col'>
                Name
                <span className='font-bold text-black '>
                  {user?.displayName}
                </span>
              </p>
              <p className='flex flex-col'>
                Email
                <span className='font-bold text-black '>{user?.email}</span>
              </p>

              <div>
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
    {/* info  */}
    <div className="bg-slate-100 p-4 flex-1 rounded-xl mt-6 lg:mt-0 ">
        <h1 className="text-3xl font-bold">{user?.displayName}’s info :</h1>
        <div className="flex justify-center items-center h-full">
        <table className="w-full">
      <tbody>
        <tr className="border">
          <td className="w-1/2 py-2 pl-2 font-bold">Agreement accept date :</td>
          <td className="w-1/2 py-2 pl-2 font-medium opacity-80">{agreement?.status ==="pending" ? "none" : agreement?.accepteDate || "none"}</td>
        </tr>
        <tr className="border">
          <td className="w-1/2 py-2 pl-2 font-bold">Floor No :</td>
          <td className="w-1/2 py-2 pl-2 font-medium opacity-80">{agreement?.status ==="pending" ? "none" : agreement?.floor_number || "none"}</td>
        </tr>
        <tr className="border">
          <td className="w-1/2 py-2 pl-2 font-bold">Block Name :</td>
          <td className="w-1/2 py-2 pl-2 font-medium opacity-80">{agreement?.status ==="pending" ? "none" : agreement?.block_name || "none"}</td>
        </tr>
        <tr className="border">
          <td className="w-1/2 py-2 pl-2 font-bold">Apartment No :</td>
          <td className="w-1/2 py-2 pl-2 font-medium opacity-80">{agreement?.status ==="pending" ? "none" : agreement?.apartment_number || "none"}</td>
        </tr>
        <tr className="border">
          <td className="w-1/2 py-2 pl-2 font-bold">Rent :</td>
          <td className="w-1/2 py-2 pl-2 font-medium opacity-80">{agreement?.status ==="pending" ? "none" : agreement?.rent || "none"} /month</td>
        </tr>
      </tbody>
    </table>
        </div>

    </div>
        </div>
    );
};

export default MyProfile;