import { NextResponse } from "next/server";
import connectDB from "@/lib/server/db";
import Product from "@/lib/server/models/Product";
import cloudinary from "@/lib/server/cloudinary";

function normalizeImages(doc) {
  const base = doc?.toObject ? doc.toObject() : doc;
  const imageList = Array.isArray(base?.images) ? base.images : [];
  return {
    ...base,
    images: imageList.length ? imageList : base?.image ? [base.image] : [],
  };
}

function mapCard(items) {
  return items.map((rawItem) => {
    const item = normalizeImages(rawItem);
    return {
    _id: item._id,
    name: item.name,
    blog: item.blog,
    images: item.images || [],
    productType: item.productType,
    price:
      item.price && item.price.length > 0 && item.price[0].length > 0
        ? item.price[0][0]
        : "$...",
    };
  });
}

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

async function parseBody(request) {
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

  return { body: await request.json(), imageFiles: [] };
}

export async function GET(request, { params }) {
  try {
    await connectDB();
    const path = params.path || [];

    if (path.length === 1) {
      const [segment] = path;
      const groupedRoutes = {
        phones: { productType: "phone" },
        laptops: { productType: "laptop" },
        tablets: { productType: "tablet" },
        latest: { latest: true },
        mostpopular: { mostpopular: true },
        popularity: { popularity: "popular" },
        mostsold: { mostsold: true },
        budget: { item_categorie: "budget" },
        midrange: { item_categorie: "midrange" },
        flagship: { item_categorie: "flagship" },
        recommended: { recommended: true },
        "gaming-devices": { targetaudience: "gaming" },
        "professional-devices": { targetaudience: "professional" },
        "students-devices": { targetaudience: "students" },
        "normalusage-devices": { targetaudience: "normalusage" },
      };

      if (groupedRoutes[segment]) {
        const items = await Product.find(groupedRoutes[segment]);
        if (["phones", "laptops", "tablets"].includes(segment)) {
          return NextResponse.json(items.map((item) => normalizeImages(item)));
        }
        return NextResponse.json(mapCard(items));
      }

      const byId = await Product.findById(segment);
      if (!byId) {
        return NextResponse.json({ message: "Product not found" }, { status: 404 });
      }
      return NextResponse.json(normalizeImages(byId));
    }

    if (path.length === 2) {
      const [segment, id] = path;
      if (["phone", "laptop", "tablet"].includes(segment)) {
        const item = await Product.findById(id);
        if (!item) {
          return NextResponse.json(
            { message: `${segment} not found` },
            { status: 404 }
          );
        }
        return NextResponse.json(normalizeImages(item));
      }
    }

    return NextResponse.json({ message: "Route not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching products", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const path = params.path || [];
    const id = path[path.length - 1];
    if (!id) {
      return NextResponse.json({ message: "Product id is required" }, { status: 400 });
    }

    const { body, imageFiles } = await parseBody(request);
    const parsedBody = {};
    Object.entries(body || {}).forEach(([key, value]) => {
      parsedBody[key] = parseMaybeJson(value);
    });
    delete parsedBody.image;

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

    const descriptions =
      Array.isArray(parsedBody.heading) && Array.isArray(parsedBody.detail)
        ? parsedBody.heading.map((_, index) => ({
            heading: parsedBody.heading[index],
            detail: parsedBody.detail[index],
            descriptionimage: Array.isArray(parsedBody.descriptionimage)
              ? parsedBody.descriptionimage[index]
              : "",
          }))
        : [];

    const payload = {
      ...parsedBody,
      latest: parsedBody.latest === "true" ? "true" : "false",
      mostsold: parsedBody.mostsold === "true" ? "true" : "false",
      mostpopular: parsedBody.mostpopular === "true" ? "true" : "false",
      recommended: parsedBody.recommended === "true" ? "true" : "false",
      processor: toStrMatrix(parsedBody.processor),
      graphic: toStrMatrix(parsedBody.graphic),
      ram: toStrMatrix(parsedBody.ram),
      storage: toStrMatrix(parsedBody.storage),
      price: toStrMatrix(parsedBody.price),
      descriptions,
      images: uploadedImages.length
        ? uploadedImages.slice(0, 6)
        : Array.isArray(parsedBody.images)
        ? parsedBody.images.slice(0, 6)
        : [],
    };

    const updated = await Product.findByIdAndUpdate(id, payload, { new: true });
    if (!updated) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating product", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const path = params.path || [];
    const id = path[path.length - 1];
    if (!id) {
      return NextResponse.json({ message: "Product id is required" }, { status: 400 });
    }

    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "Item not found." }, { status: 404 });
    }
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting item", error: error.message },
      { status: 500 }
    );
  }
}
