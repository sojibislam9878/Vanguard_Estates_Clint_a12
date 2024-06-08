import { useRef, useState } from "react";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";
const CouponCard = ({coupon ,i}) => {
    console.log(i);
    const inputRef = useRef(null);
    const [buttonText, setButtonText]=useState("Copy")
    const handleCopy=()=>{
        if (inputRef.current) {
            navigator.clipboard.writeText(inputRef.current.value).then(() => {
                setButtonText("Copied")
                toast.success('Code Copied', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                setTimeout(() => {
                    setButtonText("Copy")
                }, 2500);
            });
        }
    }

    const colors = [
        'bg-gradient-to-tl from-violet-500 to-fuchsia-500',
        'bg-gradient-to-tl from-blue-500 to-green-500',
        'bg-gradient-to-tl from-red-500 to-yellow-500',
        'bg-gradient-to-tl from-indigo-500 to-purple-500',
        'bg-gradient-to-tl from-pink-500 to-orange-500',
        'bg-gradient-to-tl from-teal-500 to-cyan-500',
        'bg-gradient-to-tl from-lime-400 to-green-500',
        'bg-gradient-to-tl from-blue-400 to-purple-600',
        'bg-gradient-to-tl from-green-400 to-blue-600',
        'bg-gradient-to-tl from-purple-400 to-pink-600'
    ];
    const bgColor = colors[i % colors.length];

    return (
        <div className={`${bgColor} p-8 rounded-xl relative overflow-hidden`}>
            <h1 className="text-white text-lg md:text-2xl font-bold">{coupon?.title} !!</h1>
            <div>
                <h1 className="md:text-9xl text-4xl font-bold text-white md:my-6 my-2">{coupon?.percentage} %off</h1>
            </div>
            <div className="join mt-3">
              <input
              type="text"
              readOnly
              name="code"
              defaultValue={coupon?.code}
                className="input input-bordered join-item focus:outline-none focus:border-none border-none w-2/3 md:w-full "
                placeholder=""
                ref={inputRef}
              />
              <button onClick={handleCopy} className="btn join-item ">
                {buttonText}
              </button>
              
            </div>
            <p className="text-white mt-4">{coupon?.description}
            </p>
              <div className=" border p-8 rounded-full md:w-20 md:h-20 w-10 h-10 bg-white absolute md:top-40 top-24 -right-12"></div>
              <div className=" border p-8 rounded-full md:w-20 md:h-20 w-10 h-10 bg-white absolute md:top-40 top-24 -left-12"></div>
      
          </div>
    );
};
CouponCard.propTypes = {
    coupon: PropTypes.object,
    i: PropTypes.number
  };
export default CouponCard;