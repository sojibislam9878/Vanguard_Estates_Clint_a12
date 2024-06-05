import backgroundimg from "../../assets/Images/announcment.png"

const Announcement = () => {
    return (
        <div className="bg-cover bg-center h-screen pt-16 p-4" style={{ backgroundImage:`url(${backgroundimg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",} }>
            <div className="backdrop-blur-md p-6 md:w-2/3 mx-auto rounded-xl  border border-red-600 ">
                <h1 className=" text-4xl font-bold text-center"> importent</h1>
                <p className="mt-6 leading-7">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas eveniet, et placeat voluptates nihil veniam excepturi nam distinctio corporis saepe sed ullam. Consectetur voluptates sunt vero quis praesentium similique asperiores!</p>
            </div>
            
        </div>
    );
};

export default Announcement;