import { z } from "zod";

export const RegisterSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "This field is requred" })
    .min(3, { message: "Enter a name of at least 3 characters" }),
  username: z
    .string()
    .nonempty({ message: "This field is required" })
    .min(3, { message: "This field requires a minimum of 3 characters" }),
  email: z
    .string()
    .nonempty({ message: "This field is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string()
    .nonempty({ message: "This field is required" })
    .min(6, { message: "Please enter at least 6 characters" }),
});
