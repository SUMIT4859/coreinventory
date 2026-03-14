"use client";

import { useEffect, useState } from "react";

export default function Deliveries(){

  const [products,setProducts] = useState<any[]>([]);
  const [productId,setProductId] = useState("");
  const [customer,setCustomer] = useState("");
  const [quantity,setQuantity] = useState(0);

  useEffect(()=>{
    fetch("/api/products")
      .then(res=>res.json())
      .then(data=>setProducts(data));
  },[]);

  const createDelivery = async ()=>{

    await fetch("/api/deliveries",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        productId,
        customer,
        quantity
      })
    });

    alert("Delivery validated. Stock reduced.");

    setCustomer("");
    setQuantity(0);
  };

  return(

    <div>

      <h1>Delivery Orders</h1>

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
        placeholder="Customer"
        value={customer}
        onChange={(e)=>setCustomer(e.target.value)}
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
        onClick={createDelivery}
        style={{marginLeft:10}}
        >
          Validate Delivery
        </button>

      </div>

    </div>

  );

}