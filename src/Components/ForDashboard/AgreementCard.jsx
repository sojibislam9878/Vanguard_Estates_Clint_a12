import PropTypes from 'prop-types';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AgreementCard = ({agreement, refetch}) => {
    const {userName, apartment_number, block_name,floor_number,rent,userEmail,requstDate , image_url , id:apartmentId}= agreement || {}
const axiosSecure = useAxiosSecure()
    const handaleAccept=async (id)=>{
        console.log(id);
        const action = {action:"accept"}
        const {data} = await axiosSecure.put(`/agreement/update/${id}`, action)
        console.log(data);
        if (data.modifiedCount >= 1 ) {
            const {data}= await axiosSecure.patch(`/user/${userEmail}`)
            console.log(data);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "agreement accepted",
              showConfirmButton: false,
              timer: 1500
            });
            refetch()
          }
          const {data:apdata}= await axiosSecure.put(
            `/updateapartmentstatus/${apartmentId}`)
            console.log(apdata);
    }
    console.log(apartmentId );
    const handaleReject= async (id)=>{
        console.log(id);
        const action = {action:"reject"}
        const {data} = await axiosSecure.put(`/agreement/update/${id}`, action)
        console.log(data);
        if (data.modifiedCount >=1 ) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "requst rejected",
              showConfirmButton: false,
              timer: 1500
            });
            refetch()
        }
    }
    return (
        <div className='mt-14'>
            <div className="card card-compact bg-base-100 shadow-xl">
  <figure><img src={image_url} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className='text-xl font-bold'>User Name: {userName}</h2>
    <h2 className='text-xl font-bold'>User email: {userEmail}</h2>
    <div className='flex justify-between mt-2'>
    <p className='text-lg font-bold opacity-80'>Floor No: {floor_number}</p>
    <p className='text-lg font-bold opacity-80'>Block No: {block_name}</p>
    </div>
    <div className='flex justify-between mt-2'>
    <p className='text-lg font-bold opacity-80'>Room No: {apartment_number}</p>
    <p className='text-lg font-bold opacity-80'>Rent: {rent}</p>
    </div>
    <p className='text-lg font-bold opacity-80 mt-2'>Request Date: {requstDate}</p>
    <div className="card-actions justify-around gap-12 mt-2">
      <button onClick={()=>handaleAccept(agreement._id)} className="btn bg-green-400 hover:bg-green-600 text-white">Accept</button>
      <button onClick={()=>handaleReject(agreement._id)} className="btn bg-red-400 hover:bg-red-600 text-white">Reject</button>
    </div>
  </div>
</div>
        </div>
    );
};
AgreementCard.propTypes = {
    agreement: PropTypes.object,
    refetch: PropTypes.func
  };
export default AgreementCard;