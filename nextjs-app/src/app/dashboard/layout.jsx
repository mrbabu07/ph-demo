import React from "react";
import LogoutButton from "@/(components)/LogoutButton";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-indigo-600 to-purple-700 text-white p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-8 pb-4 border-b border-indigo-400">
          Dashboard
        </h2>

        <nav className="space-y-2">
          <a
            href="/dashboard"
            className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-all hover:pl-6"
          >
            📊 Overview
          </a>
          <a
            href="/dashboard/add-product"
            className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-all hover:pl-6"
          >
            ➕ Add Product
          </a>
          <a
            href="/products"
            className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-all hover:pl-6"
          >
            📦 View Products
          </a>
        </nav>

        <div className="mt-8">
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
