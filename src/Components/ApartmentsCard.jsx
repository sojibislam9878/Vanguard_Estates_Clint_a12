import PropTypes from 'prop-types';
import useAuth from '../Hooks/useAuth';
const ApartmentsCard = ({apartment}) => {
    const {user}=useAuth()
    const userName = user?.displayName || undefined
    const userEmail = user?.email || undefined
    const {floor_number,block_name,apartment_number, rent} = apartment
    const handleAgreement =()=>{
        const fullData = {userName, userEmail, floor_number, block_name, apartment_number,rent , status:"pending"}
        console.log(fullData);
        console.log(floor_number);
        fetch(`http://localhost:3000/agreement?email=${userEmail}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(fullData),
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        if (data.acknowledged === true) {
            alert("kaj hoye geche bro")
        }
        if (data.error) {
            alert("alredy kine felecho")
        }
    })
    }
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
  <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
  <div className="card-body">
    <p>Floor Number: {floor_number}</p>
    <p>Block Name: {block_name}</p>
    <p>Apartment No: {apartment_number}</p>
    <p>Apartment No: {rent}</p>
    <div className="card-actions">
      <button onClick={handleAgreement} className="btn btn-primary">Agreement</button>
    </div>
  </div>
</div>
    );
};
ApartmentsCard.propTypes = {
    apartment: PropTypes.object
  };
export default ApartmentsCard;