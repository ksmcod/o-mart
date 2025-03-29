"use server";

import { signIn } from "@/auth";

interface OAuthProvider {
  provider: "github" | "google";
}

export async function OAuthSignin({ provider }: OAuthProvider) {
  await signIn(provider);
}
