"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import GithubIcon from "@/logos/github/github-mark-white.png";
import GoogleIcon from "@/logos/google/google.png";

export default function Social() {
  return (
    <div className="space-y-3">
      {/* Github Sign in button */}
      <Button
        onClick={() => signIn("github")}
        className="w-full h-auto py-2 flex items-center gap-2"
      >
        <Image
          src={GithubIcon}
          alt="Github logo"
          className="size-7 text-white"
        />
        <span className="font-bold text-base">Continue with GitHub</span>
      </Button>

      {/* Google Sign in button */}
      <Button
        onClick={() => signIn("google")}
        className="w-full h-auto py-2 flex items-center gap-2"
      >
        <Image
          src={GoogleIcon}
          alt="Google logo"
          className="size-7 text-white"
        />
        <span className="font-bold text-base">Continue with Google</span>
      </Button>
    </div>
  );
}
