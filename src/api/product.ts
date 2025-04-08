import { ProductSchema } from "@/schemas/product-schemas";
import axios from "axios";
import { z } from "zod";

interface ResponseType {
  message: string;
}

export async function createNewProduct(
  data: z.infer<typeof ProductSchema>
): Promise<ResponseType> {
  try {
    const response = await axios.post("/api/new-product", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    // console.log("Error in createNewProduct function: ", error);
    if (axios.isAxiosError(error)) {
      throw new axios.AxiosError(error.response?.data.message);
    }

    throw new Error("An eror occured");
  }
}
