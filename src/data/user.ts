import { db } from "@/lib/db";

export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch (error) {
    console.log("Error in 'getUserByEmail': ", error);
    return null;
  }
}

export async function getUserByUsername(username: string) {
  try {
    const user = await db.user.findUnique({ where: { username } });

    return user;
  } catch (error) {
    console.log("Error in 'getUserByUsername': ", error);
    return null;
  }
}
