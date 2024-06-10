import { useEffect, useState } from "react";

const Test = () => {
    const [datas, setData]=useState([])
    useEffect(()=>{
        fetch("https://assignment12-server-two-gamma.vercel.app/allcoupons")
        .then(res=>res.json())
        .then(data=>{
            setData(data)
            console.log(data);
        })
    },[])
    console.log(datas);
    return (
        <div>
            <h1>test</h1>
        </div>
    );
};

export default Test;