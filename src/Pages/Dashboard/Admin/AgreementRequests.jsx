import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AgreementCard from "../../../Components/ForDashboard/AgreementCard";

const AgreementRequests = () => {
    const { data: agreements , refetch} = useQuery({
        queryKey: ['members'],
        // enabled: !loading && !!user?.email,
        queryFn: async () => {
          const { data } = await axios(`http://localhost:3000/allagreements`)
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