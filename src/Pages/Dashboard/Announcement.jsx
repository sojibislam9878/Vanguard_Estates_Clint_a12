import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import backgroundimg from "../../assets/Images/announcment.png"
import { ImSpinner6 } from "react-icons/im";
import { Helmet } from "react-helmet";

const Announcement = () => {
    const axiosSecure=useAxiosSecure()
    const {data:announcments =[], isLoading}=useQuery({
        queryKey:["announcments"],
        queryFn: async()=>{
            const {data}= await axiosSecure("/allannouncments")
            console.log(data);
            return data
        }
    })
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><ImSpinner6 className="text-6xl animate-spin" /> </div>
    }
    return (
        <div className="bg-cover bg-center h-screen pt-16 p-4" style={{ backgroundImage:`url(${backgroundimg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",} }>
            <Helmet>
        <title>Dashboard | Announcement</title>
      </Helmet>
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