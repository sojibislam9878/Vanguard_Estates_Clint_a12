import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import useAuth from "../Hooks/useAuth";
// import loginphoto from "../assets/images/login.png";

const loginphoto =true

const Login = () => {
  const locations = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login, googleSignUP, githubSignUP } = useAuth();
  const onSubmit = (data) => {
    login(data.email, data.password)
      .then((res) => {
        console.log(res.user);

        navigate(locations?.state ? locations.state : "/");
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your password or email wrong",
        });
      });
  };

  const handleGoogleSignUP = () => {
    googleSignUP();
  };

  const [isHide, setIsHide] = useState(false);
  const handleHide = () => {
    setIsHide(!isHide);
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(180deg,rgba(0,0,0,0.1),rgba(0,0,0,0.1)),url(${loginphoto})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className=" text-white"
    >
      <Helmet>
        <title>Flavor Junction | Login</title>
      </Helmet>
      <div className="flex justify-center items-center p-4 pt-10 pb-12 ">
        <div className=" rounded-lg p-6  md:w-2/3 xl:w-1/3 mx-auto shadow-2xl backdrop-blur-md ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-4xl font-bold mt-12">Log In</h1>
            <p className="font-medium mt-6 opacity-70">
              Log in to stay connected
            </p>
            <div className=" flex justify-center items-center gap-2 border-b-2">
              <span className="material-symbols-outlined mt-10 text-2xl">
                alternate_email
              </span>
              <input
                placeholder="email"
                {...register("email", { required: true })}
                className="w-full py-4  outline-none mt-10 bg-transparent placeholder:text-white"
              />
            </div>
            {errors.email && <span className="text-red-600">Enter Email</span>}
            <div className="relative">
              <div className=" flex justify-center items-center gap-2 border-b-2">
                <span className="material-symbols-outlined mt-6 text-2xl">
                  lock
                </span>
                <input
                  type={isHide ? "text" : "password"}
                  placeholder="password"
                  {...register("password", { required: true })}
                  className="w-full py-4 outline-none mt-6 bg-transparent placeholder:text-white"
                />
              </div>
              <p
                className="absolute right-5 top-11 hover:cursor-pointer"
                onClick={handleHide}
              >
                {isHide ? (
                  <span className="material-symbols-outlined">
                    visibility_off
                  </span>
                ) : (
                  <span className="material-symbols-outlined">visibility</span>
                )}
              </p>
            </div>
            {errors.password && (
              <span className="text-red-600">Enter Password</span>
            )}
            <p className="flex justify-end text-[#EA6A12] font-bold my-8">
              Forgot your Password ?
            </p>
            <input
              type="submit"
              value="Log In"
              className="btn w-full bg-[#EA6A12] hover:bg-[#C75A0F] text-white text-lg border-none"
            />
          </form>
          <p className="text-center mt-6 mb-8 font-medium opacity-80 text-lg">
            <span className="text-black">Do not have an account?</span>{" "}
            <Link to="/register">
              <span className="text-[#EA6A12] font-bold">Register Here</span>
            </Link>
          </p>
          <div className="divider">OR</div>
          {/* social login */}
          <div className="flex justify-center flex-wrap gap-x-8 gap-y-3 mt-8 mb-16">
            <button
              onClick={handleGoogleSignUP}
              className="btn flex items-center"
            >
              <img className="w-12 " src="google.png" alt="" />
              <p>Sign Up With Google</p>
            </button>
            <button
              onClick={githubSignUP}
              className="btn flex justify-between items-center"
            >
              <img className="w-7" src="github.png" alt="" />
              <p>Sign Up With Github</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
