"use client";

import { useEffect, useState } from "react";

export default function History(){

  const [logs,setLogs] = useState<any[]>([]);

  useEffect(()=>{
    fetch("/api/history")
      .then(res=>res.json())
      .then(data=>setLogs(data));
  },[]);

  return(

    <div>

      <h1>Stock History</h1>

      <table border={1} cellPadding={10}>

        <thead>
          <tr>
            <th>Product</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>

          {logs.map((l:any)=>(
            <tr key={l.id}>
              <td>{l.product}</td>
              <td>{l.type}</td>
              <td>{l.quantity}</td>
              <td>{new Date(l.createdAt).toLocaleString()}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>

  );

}