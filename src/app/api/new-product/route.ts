import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { db } from "@/lib/db";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const category = formData.get("category");
    const subCategory = formData.get("sub_category");
    const description = formData.get("description");
    const price = Number(formData.get("price"));
    const images = formData.getAll("imageFiles[]");

    if (!name || !category || !subCategory || !description || !price) {
      return NextResponse.json(
        { message: "Please fill all required fields" },
        { status: 400 }
      );
    }

    // console.log("Form data: ", formData);

    if (images.length < 1 || images.length > 6) {
      return NextResponse.json(
        {
          message:
            "Please upload at choose between one to six images for your product",
        },
        { status: 400 }
      );
    }

    const uploadPromises = images.map(async (image) => {
      if (!(image instanceof File)) {
        throw new Error("Invalid file types");
      }

      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const mime = image.type;
      const b64Buffer = buffer.toString("base64");
      const dataUri = `data:${mime};base64,${b64Buffer}`;

      const response = await cloudinary.uploader.upload(dataUri, {
        folder: "omart/products",
        use_filename: true,
      });

      return response.url;
    });

    const imageUrls = await Promise.all(uploadPromises);

    return NextResponse.json({ message: "All good!" }, { status: 200 });
  } catch (error) {
    console.log("ERROR OCCURED::", error);
    return NextResponse.json({ message: "An error occured!" }, { status: 500 });
  }
}
