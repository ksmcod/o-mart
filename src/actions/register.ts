"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail, getUserByUsername } from "@/data/user";

export default async function registerAction(
  data: z.infer<typeof RegisterSchema>
) {
  const validatedValues = RegisterSchema.safeParse(data);

  if (!validatedValues.success) {
    return { error: "Invalid fields" };
  }

  const { firstName, lastName, username, email, password } =
    validatedValues.data;

  const emailInUse = await getUserByEmail(email);

  if (emailInUse) {
    return { error: "Email already exists!" };
  }

  const usernameInUse = await getUserByUsername(username);

  if (usernameInUse) {
    return { error: "Username already in use" };
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  await db.user.create({
    data: {
      name: `${firstName} ${lastName}`,
      username,
      email,
      password: hashedPassword,
    },
  });

  return { success: "Registration successful" };
}
