import { useQuery } from "@tanstack/react-query";
import AgreementCard from "../../../Components/ForDashboard/AgreementCard";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Spinner from "../../../Components/Spinner";
import { Helmet } from "react-helmet";

const AgreementRequests = () => {
  const axiosSecure=useAxiosSecure()
    const { data: agreements , refetch , isLoading} = useQuery({
        queryKey: ['members'],
        // enabled: !loading && !!user?.email,
        queryFn: async () => {
          const { data } = await axiosSecure(`/allagreements`)
          return data
        },
      })
      console.log(agreements);

      if (isLoading) {
        return <Spinner></Spinner>
      }

    return (
        <div className="p-4">
          <Helmet>
        <title>Dashboard | Agreement Request</title>
      </Helmet>
            <h1 className="text-center text-4xl font-bold mt-6 border-b-2 border-dashed pb-6">Agreements Requsests</h1>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {
                agreements?.map(agreement=><AgreementCard key={agreement._id} agreement={agreement} refetch={refetch}></AgreementCard>)
            }
           </div>
        </div>
    );
};

export default AgreementRequests;