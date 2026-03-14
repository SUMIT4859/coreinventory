# CoreInventory – Inventory Management System

CoreInventory is a simple web-based Inventory Management System built with **Next.js, PostgreSQL, and Prisma**.
It helps manage products, stock movement, and inventory operations inside a warehouse.

This project was created as a **hackathon project** to demonstrate a modular inventory system with real-time stock updates and activity tracking.

---

## Features

* User Login
* Dashboard with inventory statistics
* Product Management (Add / Edit / Delete)
* Incoming Receipts (Stock In)
* Delivery Orders (Stock Out)
* Internal Transfers between locations
* Inventory Adjustments
* Stock History / Activity Log
* Low Stock Alerts
* Inventory Charts
* CSV Export
* Search Products

All stock operations automatically update inventory and create logs in the system.

---

## Tech Stack

Frontend

* Next.js
* React

Backend

* Next.js API Routes

Database

* PostgreSQL

ORM

* Prisma

Charts

* Chart.js

---

## Project Structure

```
coreinventory
│
├── app
│   ├── dashboard
│   ├── products
│   ├── receipts
│   ├── deliveries
│   ├── transfers
│   ├── adjustments
│   ├── history
│   └── api
│
├── prisma
│   └── schema.prisma
│
├── lib
│   └── prisma.ts
│
└── README.md
```

---

## Installation

Clone the repository

```
git clone https://github.com/SUMIT4859/coreinventory.git
```

Go to the project folder

```
cd coreinventory
```

Install dependencies

```
npm install
```

---

## Setup Database

Create a PostgreSQL database.

Example database URL in `.env` file:

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/coreinventory"
```

Run Prisma migration

```
npx prisma migrate dev
```

Generate Prisma client

```
npx prisma generate
```

---

## Run the Project

Start the development server

```
npm run dev
```

Open in browser

```
http://localhost:3000
```

---

## Demo Workflow

1. Login to the system
2. Add products
3. Create receipts to increase stock
4. Create delivery orders to decrease stock
5. Transfer stock between locations
6. Make inventory adjustments
7. View all stock movement in **Stock History**
8. Check dashboard analytics and charts

---

## Example Dashboard Metrics

* Total Products
* Total Stock
* Low Stock Alerts
* Pending Receipts
* Pending Deliveries
* Inventory Chart

---

## Author

Sumit Kumar Pandit

---

## License

This project is for educational and demonstration purposes.
