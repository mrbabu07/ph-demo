import React from "react";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-4">
        <h2 className="text-xl font-semibold mb-6">Dashboard</h2>

        <nav className="space-y-3">
          <a href="/dashboard" className="block hover:text-gray-300">
            Overview
          </a>
          <a href="/dashboard/products" className="block hover:text-gray-300">
            Products
          </a>
          <a href="/dashboard/orders" className="block hover:text-gray-300">
            Orders
          </a>
          <a href="/dashboard/settings" className="block hover:text-gray-300">
            Settings
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
