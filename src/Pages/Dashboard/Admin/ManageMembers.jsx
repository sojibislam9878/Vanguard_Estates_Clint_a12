import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Spinner from "../../../Components/Spinner";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";


const ManageMembers = () => {
  const axiosSecure=useAxiosSecure()
    const { data: members, refetch, isLoading } = useQuery({
        queryKey: ['members'],
        // enabled: !loading && !!user?.email,
        queryFn: async () => {
          const { data } = await axiosSecure(`/members`)
          return data
        },
      })
      console.log(members);


      const handleRemove=async (member)=>{
        console.log(member.email);
        const {data}= await axiosSecure.patch(`/user/update/${member?.email}`, member)
        console.log(data);
        if (data.modifiedCount >= 1) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Success",
            showConfirmButton: false,
            timer: 1500
          });
            refetch()
        }
      }
      if (isLoading) {
        return <Spinner></Spinner>
      }
    return (
        <div className="p-4">
          <Helmet>
        <title>Dashboard | Manage Members</title>
      </Helmet>
            <h1 className="text-center font-play text-4xl font-bold mt-6 border-b-2 border-dashed pb-6">Manage Members</h1>
            <div className="overflow-x-auto">
  <table className="table mt-4">
    {/* head */}
    <thead>
      <tr className='text-lg'>
        <th>SL</th>
        <th>Name</th>
        <th>Email</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        members?.map((member, index)=>(<tr key={member._id}>
            <th>{index + 1}</th>
            <td>{member.name}</td>
            <td>{member.email}</td>
            <td><button onClick={()=>handleRemove(member)} className="btn bg-red-400 text-white">Remove</button></td>
          </tr>))
      }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default ManageMembers;