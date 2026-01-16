import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Path to products.json file
const DATA_FILE = path.join(process.cwd(), "products.json");

// Initial products data
const getInitialProducts = () => [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 99.99,
    stock: 50,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Feature-rich smartwatch with fitness tracking",
    price: 199.99,
    stock: 30,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
  },
  {
    id: 3,
    name: "Laptop Backpack",
    description: "Durable backpack with laptop compartment",
    price: 49.99,
    stock: 100,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
  },
];

// In-memory storage for Vercel (since filesystem is read-only)
let productsCache = null;

// Initialize products
const initializeProducts = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf8");
      productsCache = JSON.parse(data);
    } else {
      // Local development - create file
      const initialProducts = getInitialProducts();
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialProducts, null, 2));
      productsCache = initialProducts;
    }
  } catch (error) {
    // Vercel production - use in-memory cache
    if (!productsCache) {
      productsCache = getInitialProducts();
    }
  }
};

// Helper functions
const readProducts = () => {
  if (!productsCache) {
    initializeProducts();
  }
  return productsCache || getInitialProducts();
};

const writeProducts = (products) => {
  productsCache = products;
  try {
    // Try to write to file (works in local development)
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
  } catch (error) {
    // Silently fail on Vercel (read-only filesystem)
    // Products are stored in memory cache
  }
};

// GET /api/products/[id] - Get single product
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const products = readProducts();
    const product = products.find((p) => p.id === parseInt(id));

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id] - Update product
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const products = readProducts();
    const index = products.findIndex((p) => p.id === parseInt(id));

    if (index === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    products[index] = {
      ...products[index],
      ...body,
      id: products[index].id,
      updatedAt: new Date().toISOString(),
    };

    writeProducts(products);
    return NextResponse.json(products[index]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - Delete product
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const products = readProducts();
    const filteredProducts = products.filter((p) => p.id !== parseInt(id));

    if (products.length === filteredProducts.length) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    writeProducts(filteredProducts);
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
