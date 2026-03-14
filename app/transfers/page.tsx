"use client";

import { useEffect, useState } from "react";

export default function Transfers(){

  const [products,setProducts] = useState<any[]>([]);
  const [productId,setProductId] = useState("");
  const [fromLocation,setFromLocation] = useState("");
  const [toLocation,setToLocation] = useState("");
  const [quantity,setQuantity] = useState(0);

  useEffect(()=>{
    fetch("/api/products")
      .then(res=>res.json())
      .then(data=>setProducts(data));
  },[]);

  const transferStock = async ()=>{

    await fetch("/api/transfers",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        productId,
        fromLocation,
        toLocation,
        quantity
      })
    });

    alert("Stock transferred");

    setQuantity(0);
    setFromLocation("");
    setToLocation("");
  };

  return(

    <div>

      <h1>Internal Transfers</h1>

      <div style={{marginTop:20}}>

        <select
        value={productId}
        onChange={(e)=>setProductId(e.target.value)}
        >

          <option value="">Select Product</option>

          {products.map((p:any)=>(
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}

        </select>

        <input
        placeholder="From Location"
        value={fromLocation}
        onChange={(e)=>setFromLocation(e.target.value)}
        style={{marginLeft:10}}
        />

        <input
        placeholder="To Location"
        value={toLocation}
        onChange={(e)=>setToLocation(e.target.value)}
        style={{marginLeft:10}}
        />

        <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e)=>setQuantity(Number(e.target.value))}
        style={{marginLeft:10}}
        />

        <button
        onClick={transferStock}
        style={{marginLeft:10}}
        >
          Transfer
        </button>

      </div>

    </div>

  );

}