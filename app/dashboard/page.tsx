"use client";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Chart from "./chart";

export default function Dashboard() {

  const [products, setProducts] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [receipts, setReceipts] = useState([]);
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {

    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));

    fetch("/api/history")
      .then(res => res.json())
      .then(data => setLogs(data));



    fetch("/api/receipts")
      .then(res => res.json())
      .then(data => setReceipts(data));

    fetch("/api/deliveries")
      .then(res => res.json())
      .then(data => setDeliveries(data));

  }, []);

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, p) => sum + p.stock,
    0
  );

  const lowStockProducts = products.filter(
    p => p.stock < 5
  );

  return (

    <div>

      <h1>Inventory Dashboard</h1>

      <div style={{
        display: "flex",
        gap: 20,
        marginTop: 20
      }}>

        <div style={{
          background: "#4CAF50",
          color: "white",
          padding: 20,
          width: 200,
          borderRadius: 8
        }}>
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>

        <div style={{
          background: "#2196F3",
          color: "white",
          padding: 20,
          width: 200,
          borderRadius: 8
        }}>
          <h3>Total Stock</h3>
          <p>{totalStock}</p>
        </div>

        <div style={{
          background: "#f44336",
          color: "white",
          padding: 20,
          width: 200,
          borderRadius: 8
        }}>
          <h3>Low Stock</h3>
          <p>{lowStockProducts.length}</p>
        </div>



        <div style={{
          background: "#ff9800",
          color: "white",
          padding: 20,
          width: 200,
          borderRadius: 8
        }}>
          <h3>Pending Receipts</h3>
          <p>{receipts.length}</p>
        </div>


        <div style={{
          background: "#9c27b0",
          color: "white",
          padding: 20,
          width: 200,
          borderRadius: 8
        }}>
          <h3>Pending Deliveries</h3>
          <p>{deliveries.length}</p>
        </div>




      </div>


      {lowStockProducts.length > 0 && (

        <div style={{
          background: "#fdecea",
          padding: 20,
          marginTop: 30,
          borderRadius: 8
        }}>

          <h3>⚠ Low stock products:</h3>

          <ul>

            {lowStockProducts.map(p => (
              <li key={p.id}>
                {p.name} (stock: {p.stock})
              </li>
            ))}

          </ul>

        </div>

      )}


      <div style={{ marginTop: 40 }}>
        <Chart products={products} />
      </div>


      <div style={{ marginTop: 40 }}>

        <h2>Recent Activity</h2>

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

            {logs.slice(0, 5).map((log: any) => (
              <tr key={log.id}>
                <td>{log.product}</td>
                <td>{log.type}</td>
                <td>{log.quantity}</td>
                <td>
                  {new Date(log.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}