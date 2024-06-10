import { Dialog, DialogPanel } from '@headlessui/react'
import { IoMdClose } from "react-icons/io";
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Spinner from '../../../Components/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const ManageCoupons = () => {
  const axiosSecure=useAxiosSecure()
    const { data: coupons ,refetch , isLoading} = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
          const { data } = await axiosSecure(`/allcoupons`)
          return data
        },
      })
      console.log(coupons);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
    
      const onSubmit =async (datas) => {
        if (datas.percentage <=0) {
             return toast.warn("Discount Percentage can not be 0 or smaller", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
        }
        if (datas.percentage >100) {
             return toast.warn("Discount Percentage can not biger then 100", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
        }
        const percentage = parseInt(datas.percentage)
        const finalData = {title:datas?.title, percentage, description:datas?.description, code:datas.code}
        console.log(finalData);

        const {data}= await axiosSecure.post(`/coupons`, finalData)
        console.log(data);
        if (data.insertedId) {
            reset()
            setIsOpen(false)
            refetch()
        }
        
      };
    let [isOpen, setIsOpen] = useState(false)

    const handleDelete= async (id)=>{
        const {data}= await axiosSecure.delete(`/deletecoupons/${id}`)
        console.log(data);
        if (data.deletedCount >= 1) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "delete done",
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
        <title>Dashboard | Manage Coupons</title>
      </Helmet>
            <h1 className="font-play text-center text-4xl font-bold mt-6 border-b-2 border-dashed pb-6">Manage Coupons</h1>
            <button onClick={()=>setIsOpen(!isOpen)} className="btn mt-6 bg-[#003366] text-white">Add a new Coupon</button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 ">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border shadow-xl rounded-xl bg-white p-12">
            <div className='relative'>
            <h1 className="font-bold">Add a coupon</h1> <span onClick={()=>setIsOpen(false)} className='btn absolute -top-3 right-0'><IoMdClose className='text-red-700 text-3xl font-bold' /></span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className=" bg-base-100">
               <div className='flex gap-6'>
               <input
                placeholder="Title"
                {...register("title", { required: true })}
                className="w-full border-b-2 py-4  outline-none mt-6 bg-transparent border-gray-400"
              />
               <input
                placeholder="Discount Percentage"
                type='number'
                {...register("percentage", { required: true })}
                className="w-full border-b-2 py-4  outline-none mt-6 bg-transparent border-gray-400"
                />
               </div>
                <div className='flex justify-start gap-6'>
                {errors.title && (
                  <span className="text-red-600 flex-1">Give A Title</span>
                )}
              {errors.percentage && (
                <span className="text-red-600 flex-1">Give a number</span>
              )}
                </div>
              <input
                placeholder="Coupons Code"
                {...register("code", { required: true })}
                className="w-full border-b-2 py-4  outline-none mt-6 bg-transparent border-gray-400"
              />
              {errors.code && (
                <span className="text-red-600">Give a code</span>
              )}
              <input
                placeholder="Write a short description"
                {...register("description", { required: true })}
                className="w-full border-b-2 py-4  outline-none mt-6 bg-transparent border-gray-400"
              />
              {errors.description && (
                <span className="text-red-600">Write a Description</span>
              )}

              <div>
                <input
                type="submit"
                value="Submit"
                className="btn w-full bg-[#003366] text-white text-lg mt-10 hover:bg-[#092d52]"
              />
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
      <div className="overflow-x-auto">
  <table className="table mt-6">
    {/* head */}
    <thead>
      <tr  className='text-lg'>
        <th></th>
        <th>Title</th>
        <th>Code</th>
        <th>Discount</th>
        <th>Remove</th>
      </tr>
    </thead>
    <tbody>
        {
            coupons?.map((coupon, i)=>(<tr key={coupon._id}>
            <th>{i+1}</th>
            <td>{coupon.title}</td>
            <td>{coupon.code}</td>
            <td>{coupon.percentage}%</td>
            <td><button onClick={()=>handleDelete(coupon._id)} className='btn'>remove</button></td>
          </tr>))
        }
    </tbody>
  </table>
</div>
<ToastContainer />
        </div>
    );
};
export default ManageCoupons;