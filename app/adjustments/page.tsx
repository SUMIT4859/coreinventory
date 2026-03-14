"use client";

import { useEffect, useState } from "react";

export default function Adjustments(){

  const [products,setProducts] = useState<any[]>([]);
  const [productId,setProductId] = useState("");
  const [quantity,setQuantity] = useState(0);
  const [reason,setReason] = useState("");

  useEffect(()=>{
    fetch("/api/products")
      .then(res=>res.json())
      .then(data=>setProducts(data));
  },[]);

  const adjustStock = async ()=>{

    await fetch("/api/adjustments",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        productId,
        quantity,
        reason
      })
    });

    alert("Stock adjusted");

    setQuantity(0);
    setReason("");
  };

  return(

    <div>

      <h1>Inventory Adjustment</h1>

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
        type="number"
        placeholder="Adjustment (+/-)"
        value={quantity}
        onChange={(e)=>setQuantity(Number(e.target.value))}
        style={{marginLeft:10}}
        />

        <input
        placeholder="Reason"
        value={reason}
        onChange={(e)=>setReason(e.target.value)}
        style={{marginLeft:10}}
        />

        <button
        onClick={adjustStock}
        style={{marginLeft:10}}
        >
          Apply Adjustment
        </button>

      </div>

    </div>

  );

}