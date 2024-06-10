import PropTypes from 'prop-types';
import useAuth from '../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useAxiosCommon from '../Hooks/useAxiosCommon';
import Swal from 'sweetalert2';
const ApartmentsCard = ({apartment, role}) => {
    const {user}=useAuth()
    const navigate = useNavigate()
    const axiosCommon= useAxiosCommon()
    
    const userName = user?.displayName || undefined
    const userEmail = user?.email || undefined
    const {_id,floor_number,block_name,apartment_number, rent, image_url } = apartment
    const requstDate = new Date().toISOString().split('T')[0]
    const handleAgreement = async()=>{
      if (role ==="admin") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Admin can not request for agreement",
        });
        return
      }
      if (!role) {
        return navigate("/login")
      }
        const fullData = {userName, userEmail, floor_number, block_name, apartment_number,rent , status:"pending", requstDate , id:_id , image_url}
        console.log(fullData);
        console.log(floor_number);

        const {data}=await axiosCommon.post(`/agreement?email=${userEmail}`, fullData)
        console.log(data);
        if (data.acknowledged === true) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Rqquest sent!!! wait for admin confirmation",
              showConfirmButton: false,
              timer: 1500
            });
        }
        if (data.error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "You all ready sent a agreement request",
            });
        }
    }
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
  <figure><img src={image_url} alt="Shoes" /></figure>
  <div className="card-body">
    <p className='text-xl font-bold'>Floor No: {floor_number}</p>
    <p className='text-lg font-bold opacity-80'>Block Name: {block_name}</p>
    <p className='text-lg font-bold opacity-80'>Apartment No: {apartment_number}</p>
    <p className='text-lg font-bold opacity-80'>Rent: {rent} $ /month</p>
    <div className="card-actions">
      <button onClick={handleAgreement} className="btn bg-[#003366] text-white font-bold hover:bg-[#3b5e81]">Agreement</button>
    </div>
  </div>
</div>
    );
};
ApartmentsCard.propTypes = {
    apartment: PropTypes.object,
    role: PropTypes.object
  };
export default ApartmentsCard;