import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Path to products.json file
const DATA_FILE = path.join(process.cwd(), "products.json");

// Helper functions
const readProducts = () => {
  const data = fs.readFileSync(DATA_FILE, "utf8");
  return JSON.parse(data);
};

const writeProducts = (products) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
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
