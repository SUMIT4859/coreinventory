"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

/* Register Chart.js components */
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart({ products }: { products: any[] }) {

  const data = {
    labels: products.map((p) => p.name),
    datasets: [
      {
        label: "Stock",
        data: products.map((p) => p.stock),
        backgroundColor: "rgba(54, 162, 235, 0.7)"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const
      },
      title: {
        display: true,
        text: "Stock Distribution by Product"
      }
    }
  };

  return (
    <div style={{ width: 600 }}>
      <Bar data={data} options={options} />
    </div>
  );
}