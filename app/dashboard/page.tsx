"use client";

import { useEffect,useState } from "react";
import Chart from "./chart";

export default function Dashboard(){

  const [products,setProducts] = useState<any[]>([]);

  useEffect(()=>{
    fetch("/api/products")
      .then(res=>res.json())
      .then(data=>setProducts(data));
  },[]);

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum,p)=>sum + p.stock,
    0
  );

  const lowStockProducts = products.filter(
    p=>p.stock <5
  );

  const lowStock = lowStockProducts.length;

  return(

    <div>

      <h1>Inventory Dashboard</h1>

      {/* DASHBOARD CARDS */}

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(3,1fr)",
        gap:20,
        marginTop:20
      }}>

        <div style={{
          background:"#4CAF50",
          color:"white",
          padding:25,
          borderRadius:8
        }}>
          <h3>Total Products</h3>
          <h2>{totalProducts}</h2>
        </div>

        <div style={{
          background:"#2196F3",
          color:"white",
          padding:25,
          borderRadius:8
        }}>
          <h3>Total Stock</h3>
          <h2>{totalStock}</h2>
        </div>

        <div style={{
          background:"#f44336",
          color:"white",
          padding:25,
          borderRadius:8
        }}>
          <h3>Low Stock</h3>
          <h2>{lowStock}</h2>
        </div>

      </div>


      {/* LOW STOCK ALERT */}

      {lowStock > 0 && (

        <div style={{
          marginTop:30,
          background:"#ffe5e5",
          padding:15,
          borderRadius:6,
          color:"#c62828"
        }}>

          ⚠ Low stock products:

          <ul>

            {lowStockProducts.map((p:any)=>(
              <li key={p.id}>
                {p.name} (stock: {p.stock})
              </li>
            ))}

          </ul>

        </div>

      )}


      {/* CHART */}

      <div style={{marginTop:40}}>
        <Chart products={products}/>
      </div>


      {/* RECENT ACTIVITY */}

      <div style={{marginTop:40}}>

        <h2>Recent Activity</h2>

        <div style={{
          background:"white",
          padding:20,
          borderRadius:6,
          width:500
        }}>

          <ul>

            {products.slice(0,5).map((p:any)=>(
              <li key={p.id} style={{marginBottom:10}}>
                {p.name} stock is {p.stock}
              </li>
            ))}

          </ul>

        </div>

      </div>

    </div>

  );

}