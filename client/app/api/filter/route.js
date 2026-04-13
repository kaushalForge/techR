import { NextResponse } from "next/server";
import connectDB from "@/lib/server/db";
import Product from "@/lib/server/models/Product";

export async function POST(request) {
  try {
    await connectDB();
    const { deviceType, battery } = await request.json();

    if (!deviceType && !battery) {
      return NextResponse.json("At least one piece of information is needed to filter!");
    }

    const query = {};
    if (battery) {
      query.battery = battery;
    }

    const devices = await Product.find({
      productType: deviceType,
      ...query,
    });

    if (devices.length > 0) {
      return NextResponse.json({
        name: devices[0].name.toLowerCase().split(" ").join(""),
        productType: devices[0].productType,
      });
    }

    return NextResponse.json({ message: "No such device found" });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
