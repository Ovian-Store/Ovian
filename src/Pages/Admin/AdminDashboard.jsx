import { useState } from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import StockManager from "./StockManager";
import OrdersList from "./OrdersList";
import UsersList from "./UsersList";

export default function AdminDashboard() {
  const [view, setView] = useState("products"); // products | add | stock | orders | users

  return (
    <div className="pt-20 min-h-screen text-white px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <nav className="space-x-2">
            <button onClick={() => setView("products")} className="btn-white px-3 py-1 rounded">Products</button>
            <button onClick={() => setView("add")} className="btn-white px-3 py-1 rounded">Add Product</button>
            <button onClick={() => setView("stock")} className="btn-white px-3 py-1 rounded">Stock</button>
            <button onClick={() => setView("orders")} className="btn-white px-3 py-1 rounded">Orders</button>
            <button onClick={() => setView("users")} className="btn-white px-3 py-1 rounded">Users</button>
          </nav>
        </header>

        <section className="bg-black/60 p-6 rounded-lg">
          {view === "products" && <ProductList />}
          {view === "add" && <ProductForm />}
          {view === "stock" && <StockManager />}
          {view === "orders" && <OrdersList />}
          {view === "users" && <UsersList />}
        </section>
      </div>
    </div>
  );
}
