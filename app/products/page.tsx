"use client";

import { useEffect, useState } from "react";

export default function Products(){

  const [products,setProducts] = useState<any[]>([]);
  const [search,setSearch] = useState("");

  const [form,setForm] = useState({
    name:"",
    sku:"",
    category:"",
    unit:"",
    stock:0,
    location:""
  });

  const loadProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(()=>{
    loadProducts();
  },[]);


  // ADD PRODUCT
  const addProduct = async ()=>{

    await fetch("/api/products",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(form)
    });

    setForm({
      name:"",
      sku:"",
      category:"",
      unit:"",
      stock:0,
      location:""
    });

    loadProducts();
  };


  // DELETE PRODUCT
  const deleteProduct = async (id:number)=>{

    const confirmDelete = confirm("Delete this product?");

    if(!confirmDelete) return;

    await fetch("/api/products",{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({id})
    });

    loadProducts();
  };


  // EDIT STOCK
  const editStock = async (id:number,current:number)=>{

    const newStock = prompt("Enter new stock",current.toString());

    if(newStock === null) return;

    await fetch("/api/products",{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        id,
        stock:Number(newStock)
      })
    });

    loadProducts();
  };


  // EXPORT CSV
  const exportCSV = () => {

    const headers = ["ID","Name","SKU","Category","Stock","Location"];

    const rows = products.map(p => [
      p.id,
      p.name,
      p.sku,
      p.category,
      p.stock,
      p.location
    ]);

    const csvContent =
      [headers,...rows]
      .map(e => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent],{type:"text/csv"});

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "inventory.csv";

    a.click();
  };


  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );


  return(

    <div>

      <h1>Products</h1>


      {/* ADD PRODUCT */}

      <div style={{marginBottom:30}}>

        <h3>Add Product</h3>

        <input
        placeholder="Name"
        style={{marginRight:10}}
        value={form.name}
        onChange={(e)=>setForm({...form,name:e.target.value})}
        />

        <input
        placeholder="SKU"
        style={{marginRight:10}}
        value={form.sku}
        onChange={(e)=>setForm({...form,sku:e.target.value})}
        />

        <input
        placeholder="Category"
        style={{marginRight:10}}
        value={form.category}
        onChange={(e)=>setForm({...form,category:e.target.value})}
        />

        <input
        placeholder="Unit"
        style={{marginRight:10}}
        value={form.unit}
        onChange={(e)=>setForm({...form,unit:e.target.value})}
        />

        <input
        type="number"
        placeholder="Stock"
        style={{marginRight:10}}
        value={form.stock}
        onChange={(e)=>setForm({...form,stock:Number(e.target.value)})}
        />

        <input
        placeholder="Location"
        style={{marginRight:10}}
        value={form.location}
        onChange={(e)=>setForm({...form,location:e.target.value})}
        />

        <button onClick={addProduct}>
          Add
        </button>

      </div>



      {/* SEARCH + EXPORT */}

      <div style={{marginBottom:20}}>

        <input
        placeholder="Search product"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        />

        <button
        onClick={exportCSV}
        style={{marginLeft:10}}
        >
          Export CSV
        </button>

      </div>



      {/* PRODUCT TABLE */}

      <div className="bg-white p-6 rounded shadow">

        <table border={1} cellPadding={10}>

          <thead>

            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>SKU</th>
              <th>Stock</th>
              <th>Location</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {filtered.map(p=>(

              <tr key={p.id}>

                <td>{p.id}</td>

                <td>{p.name}</td>

                <td>{p.sku}</td>

                <td style={{color:p.stock < 5 ? "red":"black"}}>
                  {p.stock} {p.stock <5 && "(LOW STOCK)"}
                </td>

                <td>{p.location}</td>

                <td>

                  <button onClick={()=>editStock(p.id,p.stock)}>
                    Edit
                  </button>

                  <button
                  onClick={()=>deleteProduct(p.id)}
                  style={{marginLeft:10}}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}