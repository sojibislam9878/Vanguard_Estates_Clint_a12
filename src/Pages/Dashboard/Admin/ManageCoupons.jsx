import { Dialog, DialogPanel } from '@headlessui/react'
import axios from 'axios';
import { IoMdClose } from "react-icons/io";
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

const ManageCoupons = () => {
    const { data: coupons ,refetch} = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
          const { data } = await axios(`http://localhost:3000/allcoupons`)
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
             return alert("Discount Percentage can not be 0 or smaller")
        }
        if (datas.percentage >100) {
             return alert("Discount Percentage can not biger then 100")
        }
        const percentage = parseInt(datas.percentage)
        const finalData = {title:datas?.title, percentage, description:datas?.description, code:datas.code}
        console.log(finalData);

        const {data}= await axios.post(`http://localhost:3000/coupons`, finalData)
        console.log(data);
        if (data.insertedId) {
            reset()
            setIsOpen(false)
            refetch()
        }
        
      };
    let [isOpen, setIsOpen] = useState(false)

    const handleDelete= async (id)=>{
        const {data}= await axios.delete(`http://localhost:3000/deletecoupons/${id}`)
        console.log(data);
        if (data.deletedCount >= 1) {
            alert("delete done")
            refetch()
        }
    }
    return (
        <div className="p-4">
            <h1 className="text-center text-4xl font-bold mt-6">Manage Coupons</h1>
            <button onClick={()=>setIsOpen(!isOpen)} className="btn mt-6">Add a new Coupon</button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
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
                value="Add"
                className="btn w-full bg-[#EA6A12] text-white text-lg mt-10 hover:bg-[#C75A0F]"
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
      <tr>
        <th></th>
        <th>Title</th>
        <th>Description</th>
        <th>Parcentage</th>
        <th>Remove</th>
      </tr>
    </thead>
    <tbody>
        {
            coupons?.map((coupon, i)=>(<tr key={coupon._id}>
            <th>{i+1}</th>
            <td>{coupon.title}</td>
            <td>{coupon.code}</td>
            <td>{coupon.percentage}</td>
            <td><button onClick={()=>handleDelete(coupon._id)} className='btn'>remove</button></td>
          </tr>))
        }
    </tbody>
  </table>
</div>
        </div>
    );
};
export default ManageCoupons;