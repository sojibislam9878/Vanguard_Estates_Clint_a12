import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { CgProfile } from "react-icons/cg";
import { GrAnnounce } from "react-icons/gr";
import { AiOutlineBars } from 'react-icons/ai'
import { MdOutlinePayments } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { VscRequestChanges } from "react-icons/vsc";
import { RiCoupon3Line } from "react-icons/ri";
import { GrHistory } from "react-icons/gr";
import { Link } from 'react-router-dom'
import useRole from '../../Hooks/useRole';
import Navbars from './Navbars';
import logo from "../../assets/Images/logo.png"
import useAuth from '../../Hooks/useAuth';
// import useRole from '../../Hooks/useRole';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

const Sidebar = () => {
  const { logout } = useAuth()


  // const { user}=useAuth()
  // console.log(user?.email, loading);

  const [isActive, setActive] = useState(false)
  const [role, isLoading]=useRole()
  
  
  // const [role, setRole]=useState()
  // useEffect(()=>{
  //   if (loading && user?.email) {
  //     return
  //   }
  //   .then(res=>res.json())
  //   .then(data=>setRole(data.role))
  // },[user,loading])
  
  // console.log( user?.email,role, isLoading);

if (isLoading) {
  return <p>loading...</p>
}


  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }
  return (
    <div className=''>
      {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
              <img
                // className='hidden md:block'
                src={logo}
                alt='logo'
                width='100'
                height='100'
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 h-screen md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className='w-full h-full px-4 py-2 justify-center items-center bg-white mx-auto'>
              <Link to='/'>
                <img
                  // className='hidden md:block'
                  src={logo}
                  className='w-full'
                  alt='logo'
                  width='100'
                  height='100'
                />
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
              {/* Profile */}
              {(role==="member" || role==="user") && <Navbars label={"Profile"} address={'/dashboard'} icon={CgProfile}></Navbars>}

              {/* make payments */}
              {role==="member" && <Navbars label={"Make Payments"} address={'makepayment'} icon={MdOutlinePayments}></Navbars>}

              {/*payments payment history */}
              {role==="member" && <Navbars label={"Payments History"} address={'paymentshistory'} icon={GrHistory}></Navbars>}

              {/* Announcments */}
              {(role==="member" || role==="user")&&<Navbars label={"Announcments"} address={'announcments'} icon={GrAnnounce}></Navbars>}

              {/* admin profile */}
              {role==="admin" &&<Navbars label={"Admin Profile"} address={'/dashboard'} icon={CgProfile}></Navbars>}

              {/* Manage Members */}
              {role==="admin" &&<Navbars label={"Manage Members"} address={'managemembers'} icon={MdManageAccounts}></Navbars>}

              {/* Make Announcement */}
              {role==="admin" &&<Navbars label={"Make Announcement"} address={'makeannouncement'} icon={GrAnnounce}></Navbars>}

              {/*Agreement Requests */}
              {role==="admin" &&<Navbars label={"Agreement Requests"} address={'agreementrequests'} icon={VscRequestChanges}></Navbars>}

              {/* Manage Coupons */}
              {role==="admin" &&<Navbars label={"Manage Coupons"} address={'managecoupons'} icon={RiCoupon3Line}></Navbars>}


            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <button
            onClick={logout}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
};

export default Sidebar;