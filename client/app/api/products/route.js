import { NextResponse } from "next/server";
import connectDB from "@/lib/server/db";
import Product from "@/lib/server/models/Product";
import cloudinary from "@/lib/server/cloudinary";

function toStrMatrix(value) {
  if (!Array.isArray(value)) return [];
  return value.map((group) =>
    Array.isArray(group) ? group.map((item) => String(item)) : [String(group)]
  );
}

function parseMaybeJson(value) {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function normalizeBody(body) {
  const parsed = {};
  Object.entries(body || {}).forEach(([key, value]) => {
    parsed[key] = parseMaybeJson(value);
  });

  return {
    ...parsed,
    processor: toStrMatrix(parsed.processor),
    graphic: toStrMatrix(parsed.graphic),
    ram: toStrMatrix(parsed.ram),
    storage: toStrMatrix(parsed.storage),
    price: toStrMatrix(parsed.price),
  };
}

async function parseRequestBody(request) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const plainBody = {};

    for (const [key, value] of formData.entries()) {
      if (key === "images") continue;
      plainBody[key] = value;
    }

    const imageFiles = formData.getAll("images");
    return { body: plainBody, imageFiles };
  }

  const body = await request.json();
  return { body, imageFiles: [] };
}

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find();
    const normalized = products.map((item) => {
      const doc = item.toObject ? item.toObject() : item;
      const imageList = Array.isArray(doc.images) ? doc.images : [];
      return {
        ...doc,
        images: imageList.length ? imageList : doc.image ? [doc.image] : [],
      };
    });
    return NextResponse.json(normalized);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching products", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const { body, imageFiles } = await parseRequestBody(request);
    const normalized = normalizeBody(body);
    delete normalized.image;

    if (!normalized.name) {
      return NextResponse.json(
        { message: "Name is required!" },
        { status: 400 }
      );
    }

    const existing = await Product.findOne({ name: normalized.name });
    if (existing) {
      return NextResponse.json({ message: "Product already exists" }, { status: 409 });
    }

    const uploadedImages = [];
    const maxImages = Math.min(Array.isArray(imageFiles) ? imageFiles.length : 0, 6);
    for (let i = 0; i < maxImages; i += 1) {
      const file = imageFiles[i];
      if (!file || typeof file.arrayBuffer !== "function" || file.size <= 0) continue;
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = buffer.toString("base64");
      const upload = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${base64}`,
        { folder: "products" }
      );
      uploadedImages.push(upload.secure_url);
    }

    const finalImages = uploadedImages.length
      ? uploadedImages.slice(0, 6)
      : Array.isArray(normalized.images)
      ? normalized.images.slice(0, 6)
      : [];

    if (!finalImages.length) {
      return NextResponse.json(
        { message: "At least one image is required." },
        { status: 400 }
      );
    }

    const created = await Product.create({
      ...normalized,
      images: finalImages,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
