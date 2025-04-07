"use server";

import { ProductSchema } from "@/schemas/product-schemas";
import { z } from "zod";

export default async function newProductAction(
  data: z.infer<typeof ProductSchema>
) {
  try {
    const validatedValues = ProductSchema.safeParse(data);

    if (!validatedValues.success) {
      return { error: "Please fill all fields" };
    }

    if (validatedValues.data.imageFiles.length < 3) {
      return { error: "Please select at least 3 images" };
    }

    if (validatedValues.data.imageFiles.length > 6) {
      return { error: "You may upload up to 6 images" };
    }

    console.log("Values are: ", validatedValues.data);

    return { success: "Everything in order!" };
  } catch (error) {
    console.log("Error: ", error);
    return { error: "A server error occured" };
  }
}
