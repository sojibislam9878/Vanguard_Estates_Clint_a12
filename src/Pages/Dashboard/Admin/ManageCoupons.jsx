import { Dialog, DialogPanel } from '@headlessui/react'
import axios from 'axios';
import { IoMdClose } from "react-icons/io";
import { useState } from 'react'
import { useForm } from 'react-hook-form';

const ManageCoupons = () => {
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
        const finalData = {title:datas?.title, percentage, description:datas?.description}
        console.log(finalData);

        const {data}= await axios.post(`http://localhost:3000/coupons`, finalData)
        console.log(data);
        if (data.insertedId) {
            reset()
            setIsOpen(false)
        }
        
      };
    let [isOpen, setIsOpen] = useState(false)
    return (
        <div className="p-4">
            <h1 className="text-center">Manage Coupons</h1>
            <button onClick={()=>setIsOpen(!isOpen)} className="btn">Add a new Coupon</button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <div className='relative'>
            <h1 className="font-bold">Deactivate account</h1> <span onClick={()=>setIsOpen(false)} className='btn absolute -top-3 right-0'><IoMdClose className='text-red-700 text-3xl font-bold' /></span>
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
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr className="bg-base-200">
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
      {/* row 2 */}
      <tr>
        <th>2</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr>
      {/* row 3 */}
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr>
    </tbody>
  </table>
</div>
        </div>
    );
};
export default ManageCoupons;