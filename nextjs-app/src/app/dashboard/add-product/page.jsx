"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
        }),
      });

      if (!res.ok) throw new Error("Failed to add product");

      showToast("Product added successfully!", "success");

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image: "",
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/products");
      }, 2000);
    } catch (error) {
      showToast("Failed to add product. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in ${
            toast.type === "success"
              ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
              : "bg-gradient-to-r from-red-500 to-red-600 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Add New Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
        >
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              placeholder="Enter product name"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              placeholder="Enter product description"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Stock *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                placeholder="0"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              placeholder="e.g., Electronics, Clothing"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all disabled:from-gray-400 disabled:to-gray-400 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/products")}
              className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
