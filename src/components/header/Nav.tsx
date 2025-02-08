"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import logoutAction from "@/actions/logout";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Button } from "../ui/button";

export default function Nav() {
  const currentUser = useCurrentUser();

  // console.log("Current user in Nav: ", currentUser);

  return (
    <nav className="flex items-center gap-2">
      <button className="px-2 py-1 border border-red-500 text-red-500 flex items-center rounded-sm gap-1">
        <Plus />
        <span>Post an ad</span>
      </button>

      <div className="border-r h-full"></div>

      {currentUser ? (
        <Button
          onClick={() => logoutAction()}
          className="px-3 py-4 bg-white border border-red-500 text-red-500 font-bold hover:bg-red-100"
        >
          Sign out
        </Button>
      ) : (
        <Link
          href={"/login"}
          className="px-3 py-2 bg-red-500 text-white font-bold hover:bg-red-600 transition-colors rounded-sm"
        >
          Sign in
        </Link>
      )}
    </nav>
  );
}
