import Link from "next/link";
import Image from "next/image";

async function getProduct(id) {
  try {
    const res = await fetch(`/api/products/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductDetails({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center bg-white p-12 rounded-2xl shadow-xl">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Product Not Found
          </h1>
          <Link
            href="/products"
            className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

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
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          href="/products"
          className="text-indigo-600 hover:text-indigo-700 mb-6 inline-flex items-center gap-2 font-medium hover:gap-3 transition-all"
        >
          ← Back to Products
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Image */}
            <div className="relative h-96 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl overflow-hidden shadow-inner">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image Available
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <h1 className="text-4xl font-bold mb-4 text-gray-800">
                {product.name}
              </h1>
              <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
                ${product.price}
              </p>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mb-8 bg-gradient-to-br from-slate-50 to-indigo-50 p-6 rounded-xl border border-indigo-100">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Product Details
                </h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="font-semibold text-indigo-600">
                      Category:
                    </span>{" "}
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                      {product.category || "General"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-semibold text-purple-600">
                      Stock:
                    </span>{" "}
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {product.stock || 0} units available
                    </span>
                  </li>
                  <li>
                    <span className="font-semibold text-pink-600">
                      Product ID:
                    </span>{" "}
                    <span className="text-gray-700">#{product.id}</span>
                  </li>
                </ul>
              </div>

              <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
