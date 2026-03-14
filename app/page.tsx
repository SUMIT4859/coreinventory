"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login(){

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

const login = async ()=>{

  const res = await fetch("/api/login",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      email,
      password
    })
  });

if(res.ok){

  document.cookie = "loggedIn=true; path=/; max-age=86400";

  router.push("/dashboard");

}else{
  alert("Invalid login");
}

};

  return(

    <div style={{
      height:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      background:"#f5f7fb"
    }}>

      <div style={{
        background:"white",
        padding:40,
        borderRadius:8,
        width:300
      }}>

        <h2>CoreInventory Login</h2>

        <input
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        style={{width:"100%",marginTop:10}}
        />

        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        style={{width:"100%",marginTop:10}}
        />

        <button
        onClick={login}
        style={{
          marginTop:20,
          width:"100%"
        }}
        >
          Login
        </button>

      </div>

    </div>

  );

}