import Link from "next/link";
import Image from "next/image";

async function getProducts() {
  try {
    const res = await fetch("/api/products", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="text-2xl font-bold hover:scale-105 transition-transform"
            >
              NextShop
            </Link>
            <div className="flex gap-6">
              <Link
                href="/products"
                className="hover:text-indigo-200 transition-colors"
              >
                Products
              </Link>
              <Link
                href="/login"
                className="hover:text-indigo-200 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/dashboard/add-product"
                className="hover:text-indigo-200 transition-colors"
              >
                Add Product
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Our Products
        </h1>

        {products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-600 mb-4 text-lg">
              No products available yet.
            </p>
            <p className="text-sm text-gray-500">
              Add your first product from the dashboard!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all overflow-hidden group border border-gray-100 hover:scale-[1.02]"
              >
                <div className="relative h-48 bg-gradient-to-br from-indigo-100 to-purple-100">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      ${product.price}
                    </span>
                    <span className="text-sm px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">
                      Stock: {product.stock || 0}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
