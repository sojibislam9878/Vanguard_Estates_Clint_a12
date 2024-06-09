import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const ManageMembers = () => {
  const axiosSecure=useAxiosSecure()
    const { data: members, refetch } = useQuery({
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
            alert("removed")
            refetch()
        }
      }
    return (
        <div className="p-4">
            <h1 className="text-center">All Members</h1>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
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