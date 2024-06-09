import { useQuery } from "@tanstack/react-query";
import AgreementCard from "../../../Components/ForDashboard/AgreementCard";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AgreementRequests = () => {
  const axiosSecure=useAxiosSecure()
    const { data: agreements , refetch} = useQuery({
        queryKey: ['members'],
        // enabled: !loading && !!user?.email,
        queryFn: async () => {
          const { data } = await axiosSecure(`/allagreements`)
          return data
        },
      })
      console.log(agreements);

    return (
        <div className="p-4">
            AgreementRequests
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {
                agreements?.map(agreement=><AgreementCard key={agreement._id} agreement={agreement} refetch={refetch}></AgreementCard>)
            }
           </div>
        </div>
    );
};

export default AgreementRequests;