import React from "react";
import Link from "next/link";

function DashboardHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Dashboard Overview
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-indigo-100 text-sm mb-2 font-medium">
            Total Products
          </h3>
          <p className="text-4xl font-bold">--</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-purple-100 text-sm mb-2 font-medium">
            Categories
          </h3>
          <p className="text-4xl font-bold">--</p>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-pink-100 text-sm mb-2 font-medium">
            Total Value
          </h3>
          <p className="text-4xl font-bold">$--</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Quick Actions
        </h2>
        <div className="space-y-3">
          <Link
            href="/dashboard/add-product"
            className="block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all text-center font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02]"
          >
            Add New Product
          </Link>
          <Link
            href="/products"
            className="block bg-gradient-to-r from-slate-600 to-slate-700 text-white px-4 py-3 rounded-lg hover:from-slate-700 hover:to-slate-800 transition-all text-center font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02]"
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
