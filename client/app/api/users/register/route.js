import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "@/lib/server/db";
import User from "@/lib/server/models/User";

export async function POST(request) {
  try {
    await connectDB();
    const { fullname, email, password } = await request.json();

    if (!fullname || !email || !password) {
      return NextResponse.json(
        { message: "All the fields are required!" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already registered" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const created = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { _id: created._id, fullname: created.fullname, email: created.email },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
