import {
    GithubAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
  } from "firebase/auth";
  import PropTypes from "prop-types";
  import { createContext, useEffect, useState } from "react";
  import { auth } from "../Firebase/firebaseConfig";
  import axios from "axios";
  import Swal from "sweetalert2";
  export const AuthContext = createContext(null);
  
  const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [memberPaymentInfo , setMemberPaymentInfo]=useState({})
  
    // login with email and password
    const createUserWithEmail = (email, password, toast) => {
      setLoading(true);
      if (password.length < 6) {
        return toast.warn("Password must be at least 6 characters long", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      if (!/^(?=.*[a-z]).*$/.test(password)) {
        return toast.warn("Password must contain a lowercase letter", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      if (!/^(?=.*[A-Z]).*$/.test(password)) {
        return toast.warn("Password must contain a uppercase letter", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Account created successfuly",
        showConfirmButton: false,
        timer: 1500,
      });
      return createUserWithEmailAndPassword(auth, email, password);
    };
    //   userlogin
    const login = (email, password) => {
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    // update user
    const updateUser = (name, photo) => {
      setLoading(true);
      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
    };
    //   user
    const [user, setUser] = useState(null);

    // save user to database 
    const saveUser =async user=>{
      const currentUser = {
        email: user?.email,
        name: user?.displayName,
        photo:user?.photoURL,
        role: "user",
      }

      const {data}= await axios.put("http://localhost:3000/user", currentUser)
      return data
    }
  
    //   check user
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser)
        if (currentUser) {
          const fetchData = async () => {
            const userInfo = { email: currentUser.email };
            console.log("User Info:", userInfo);
          
            try {
              const {data} = await axios.post("http://localhost:3000/jwt", userInfo);
              console.log({data});
              localStorage.setItem("access-token", data)
            } catch (error) {
              console.error("Error:", error);
            }
          };
          fetchData()
          // This function will be called after the component mounts
          
    const timeoutId = setTimeout(() => {
      saveUser(currentUser)
    }, 1000);
    // Cleanup function to clear the timeout if the component unmounts
    setLoading(false)
    return () => clearTimeout(timeoutId);
    
        }else{
          localStorage.removeItem("access-token")
        }
      })
      return () => {
        return unsubscribe()
      }
    }, [])
  
    // logout
    const logout = () => {
      setUser(null);
      signOut(auth);
    };
  
    // social login providers
  
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
  
    const googleSignUP = () => {
      signInWithPopup(auth, googleProvider);
    };
    const githubSignUP = () => {
      signInWithPopup(auth, githubProvider);
    };
  
    const values = {
      createUserWithEmail,
      login,
      updateUser,
      user,
      logout,
      loading,
      googleSignUP,
      githubSignUP,
      setMemberPaymentInfo,
      memberPaymentInfo
    };
  
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
  };
  AuthProvider.propTypes = {
    children: PropTypes.element.isRequired,
  };
  export default AuthProvider;
  