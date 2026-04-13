import { NextResponse } from "next/server";
import connectDB from "@/lib/server/db";
import Product from "@/lib/server/models/Product";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const term = params.searchTerm;

    const results = await Product.find({
      name: { $regex: term, $options: "i" },
    });

    if (!results.length) {
      return NextResponse.json({ message: "No products found" }, { status: 404 });
    }

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
