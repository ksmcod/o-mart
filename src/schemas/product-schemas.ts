import { z } from "zod";

export const ProductSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "This field is required" })
    .min(5, { message: "This field must contain at least 5 characters" }),
  category: z.string().nonempty({ message: "This field is required" }),
  sub_category: z.string().nonempty({ message: "This field is required" }),
  description: z
    .string()
    .nonempty({ message: "This field is required" })
    .min(10, { message: "This field must contain at least 12 characters" }),
  price: z
    .number({ message: "Please type in a valid price" })
    .gt(0, { message: "The price must be greatter than 0" }),
  imageFiles: z
    .array(z.instanceof(File))
    .nonempty({ message: "Please upload at least one image of your product" }),
});
