import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import backgroundimg from "../../assets/Images/announcment.png"

const Announcement = () => {
    const axiosSecure=useAxiosSecure()
    const {data:announcments =[]}=useQuery({
        queryKey:["announcments"],
        queryFn: async()=>{
            const {data}= await axiosSecure("/allannouncments")
            console.log(data);
            return data
        }
    })
    return (
        <div className="bg-cover bg-center h-screen pt-16 p-4" style={{ backgroundImage:`url(${backgroundimg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",} }>
            {
                announcments?.map(announc=><div key={announc._id} className="mt-6 backdrop-blur-md p-6 md:w-2/3 mx-auto rounded-xl  border border-red-600 ">
                <h1 className=" text-4xl font-bold text-center">{announc.title}</h1>
                <p className="mt-6 leading-7 font-bold">{announc.description}</p>
            </div>)
            }
            
        </div>
    );
};

export default Announcement;