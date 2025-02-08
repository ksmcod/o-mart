"use server";

import { z } from "zod";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default async function loginAction(
  credentials: z.infer<typeof LoginSchema>
) {
  const validatedValues = LoginSchema.safeParse(credentials);

  if (!validatedValues.success) {
    return { error: "Invalid credentials" };
  }

  const { email, password } = validatedValues.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.password) {
    return { error: "Invalid credentials" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    console.log("Error in credentials sign in: ", error);

    if (error instanceof AuthError) {
      console.log("Error in signIn: ", error.cause, " : ", error.message);

      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went worng" };
      }
    }

    throw error;
  }

  return { success: "Signin in..." };
}
