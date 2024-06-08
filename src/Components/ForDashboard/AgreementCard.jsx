import axios from 'axios';
import PropTypes from 'prop-types';

const AgreementCard = ({agreement, refetch}) => {
    const {userName, apartment_number, block_name,floor_number,rent,userEmail,requstDate , image_url , id:apartmentId}= agreement || {}

    const handaleAccept=async (id)=>{
        console.log(id);
        const action = {action:"accept"}
        const {data} = await axios.put(`http://localhost:3000/agreement/update/${id}`, action)
        console.log(data);
        if (data.modifiedCount >= 1 ) {
            const {data}= await axios.patch(`http://localhost:3000/user/${userEmail}`)
            console.log(data);
            alert("agreement accepted")
            refetch()
          }
          const {data:apdata}= await axios.put(
            `http://localhost:3000/updateapartmentstatus/${apartmentId}`)
            console.log(apdata);
    }
    console.log(apartmentId );
    const handaleReject= async (id)=>{
        console.log(id);
        const action = {action:"reject"}
        const {data} = await axios.put(`http://localhost:3000/agreement/update/${id}`, action)
        console.log(data);
        if (data.modifiedCount >=1 ) {
            alert("requst rejected")
            refetch()
        }
    }
    return (
        <div>
            <div className="card card-compact bg-base-100 shadow-xl">
  <figure><img src={image_url} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="">User Name: {userName}</h2>
    <h2 className="">User email: {userEmail}</h2>
    <p>Floor No: {floor_number}</p>
    <p>Block No: {block_name}</p>
    <p>Room No: {apartment_number}</p>
    <p>Rent: {rent}</p>
    <p>Agreement Date: {requstDate}</p>
    <div className="card-actions justify-evenly gap-12">
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