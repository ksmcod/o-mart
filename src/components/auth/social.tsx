"use client";

interface SocialProps {
  disableButtons: boolean;
  setDisableButtons: React.Dispatch<React.SetStateAction<boolean>>;
}

import Image from "next/image";
// import { signIn } from "next-auth/react";
import { OAuthSignin } from "@/actions/oauth-signin";
import { Button } from "@/components/ui/button";
import GithubIcon from "@/logos/github/github-mark-white.png";
import GoogleIcon from "@/logos/google/google.png";
import Loader from "@/components/Loader";
import { useState } from "react";

export default function Social({
  disableButtons,
  setDisableButtons,
}: SocialProps) {
  const [githubAuth, setGithubAuth] = useState<boolean>(false);
  const [googleAuth, setGoogleAuth] = useState<boolean>(false);

  function socialSignIn({ provider }: { provider: "github" | "google" }) {
    if (provider === "google") {
      setGoogleAuth(true);
    } else {
      setGithubAuth(true);
    }

    const newValue = disableButtons || githubAuth || googleAuth;
    setDisableButtons(true);

    OAuthSignin({ provider: provider });
  }
  console.log("IT IS: ", disableButtons || githubAuth || googleAuth);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2">
      {/* Github Sign in button */}
      <Button
        // onClick={() => signIn("github")}
        onClick={() => socialSignIn({ provider: "github" })}
        className="w-full h-auto py-2 flex items-center gap-2"
        disabled={googleAuth || githubAuth || disableButtons}
      >
        {githubAuth ? (
          <>
            <Loader classname="border-white size-6" />
          </>
        ) : (
          <>
            <Image
              src={GithubIcon}
              alt="Github logo"
              className="size-7 text-white"
            />
            <span className="font-bold text-base">Continue with GitHub</span>
          </>
        )}
      </Button>

      {/* Google Sign in button */}
      <Button
        // onClick={() => signIn("google")}
        onClick={() => socialSignIn({ provider: "google" })}
        className="w-full h-auto py-2 flex items-center gap-2"
        disabled={googleAuth || githubAuth || disableButtons}
      >
        {googleAuth ? (
          <>
            <Loader classname="border-white size-6" />
          </>
        ) : (
          <>
            <Image
              src={GoogleIcon}
              alt="Google logo"
              className="size-7 text-white"
            />
            <span className="font-bold text-base">Continue with Google</span>
          </>
        )}
      </Button>
    </div>
  );
}
