"use client";

import { useEffect, useState } from "react";

export default function Receipts(){

  const [products,setProducts] = useState<any[]>([]);
  const [productId,setProductId] = useState("");
  const [supplier,setSupplier] = useState("");
  const [quantity,setQuantity] = useState(0);

  useEffect(()=>{
    fetch("/api/products")
      .then(res=>res.json())
      .then(data=>setProducts(data));
  },[]);

  const createReceipt = async ()=>{

    if(!productId || quantity <= 0){
      alert("Select product and enter valid quantity");
      return;
    }

    await fetch("/api/receipts",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        productId,
        supplier,
        quantity
      })
    });

    alert("Receipt added successfully");

    setSupplier("");
    setQuantity(0);
  };


  return(

    <div>

      <h1>Incoming Receipts</h1>

      <div style={{
        marginTop:20,
        display:"flex",
        gap:20,
        alignItems:"end"
      }}>

        <div>
          <label>Product</label><br/>

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
        </div>


        <div>
          <label>Supplier</label><br/>

          <input
          placeholder="Supplier Name"
          value={supplier}
          onChange={(e)=>setSupplier(e.target.value)}
          />
        </div>


        <div>
          <label>Quantity</label><br/>

          <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e)=>setQuantity(Number(e.target.value))}
          />
        </div>


        <button onClick={createReceipt}>
          Add Receipt
        </button>

      </div>

    </div>

  );

}