import { useEffect, useState } from "react";
import useAuth from "./useAuth";


const useRole = () => {
    const {user , loading}=useAuth()
    const [role, setRole]=useState({})
    

    useEffect(()=>{
        if (loading) {
            return
        }
        fetch(`http://localhost:3000/user/${user?.email}`)
        .then(res=>res.json())
        .then(data=>setRole(data))
    }, [user, loading])

    return role
};

export default useRole;