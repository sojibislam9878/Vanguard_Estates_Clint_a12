
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MakeAnnouncement = () => {
  const axiosSecure=useAxiosSecure()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
    
      const onSubmit =async (datas) => {
        console.log(datas);
        const {data}= await axiosSecure.post("/announcment",datas)
        console.log(data);
        if (data.insertedId) {
            alert("announcment added")
            reset()
        }
      };
    return (
        <div className="p-4">
             <div className="lg:w-2/3 mx-auto border-2 rounded-xl">
             <form onSubmit={handleSubmit(onSubmit)} className="p-4 shadow-2xl rounded-xl bg-base-100">
              <h1 className=" text-4xl text-center font-bold lg:mt-12 pt-4 lg:p-0 lg:border-none">
                Make An Announcment
              </h1>
              <input
                placeholder="Title"
                {...register("title", { required: true })}
                className="w-full border-b-2 py-4  outline-none mt-6 bg-transparent border-gray-400"
              />
              {errors.title && (
                <span className="text-red-600">Give A Title</span>
              )}
              <input
                placeholder="Description"
                {...register("description", { required: true })}
                className="w-full border-b-2 py-4  outline-none mt-6 bg-transparent border-gray-400"
              />
              {errors.description && (
                <span className="text-red-600">Write a Description</span>
              )}

              <input
                type="submit"
                value="announced"
                className="btn w-full bg-[#EA6A12] text-white text-lg mt-10 hover:bg-[#C75A0F]"
              />
            </form>
             </div>
        </div>
    );
};

export default MakeAnnouncement;