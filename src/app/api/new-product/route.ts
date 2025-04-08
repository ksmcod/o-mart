import { ProductSchema } from "@/schemas/product-schemas";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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

    const imageBuffers = await Promise.all(
      images.map(async (image) => {
        if (!(image instanceof File)) {
          throw new Error("Invalid file types");
        }

        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return {
          name: image.name,
          type: image.type,
          size: image.size,
          buffer,
        };
      })
    );

    console.log("Image buffers: ", imageBuffers);

    return NextResponse.json({ message: "All good!" }, { status: 200 });
  } catch (error) {
    console.log("ERROR OCCURED::", error);
    return NextResponse.json({ message: "An error occured!" }, { status: 500 });
  }
}
