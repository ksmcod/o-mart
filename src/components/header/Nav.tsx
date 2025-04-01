"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { LogOut, Plus, User, UserRound } from "lucide-react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useState } from "react";

export default function Nav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const currentUser = useCurrentUser();

  if (globalThis.window !== undefined) {
    const wel = () => {
      if (isDropdownOpen) {
        // console.log("Window event called!!");
        setIsDropdownOpen(!isDropdownOpen);
      }

      globalThis.window.removeEventListener("click", wel);
    };

    globalThis.window.addEventListener("click", wel);
  }

  function toggleDropdown(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    // console.log("Toggle dropdown function!!");
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  }

  return (
    <nav className="flex items-center gap-2">
      <Link
        href={"/new"}
        className="px-2 py-1 border border-main text-main hidden sm:flex items-center rounded font-bold gap-1"
      >
        <Plus />
        <span>Post product</span>
      </Link>

      <div className="border-r h-full"></div>

      {currentUser && (
        // <Button
        //   onClick={() => signOut()}
        //   className="px-3 py-4 bg-white border border-main text-main font-bold hover:bg-red-100"
        // >
        //   Sign out
        // </Button>
        <div className="">
          <Avatar
            className={`bg-white text-main size-10 hover:cursor-pointer  hover:outline outline-2 -outline-offset-1 outline-main border-2 ${
              currentUser.image ? "" : "border-main border-2"
            }`}
            onClick={(e) => toggleDropdown(e)}
          >
            {currentUser.image ? (
              <AvatarImage src={currentUser.image} alt="Profile Image" />
            ) : (
              <UserRound
                strokeWidth={1.5}
                className="w-full h-full bg-main text-white p-[2px]"
              />
            )}
          </Avatar>

          {/* Dropdown Zone */}
          {isDropdownOpen && (
            <div className="p-2 absolute z-10 right-0 w-screen sm:w-60 ">
              <div className="bg-white p-1 shadow-md border rounded-sm w-full sm:top-full flex flex-col space-y-1">
                <Link
                  href={"/account"}
                  className={
                    "w-full px-2 py-2 flex items-center gap-2 rounded-sm hover:bg-gray-100 hover:underline hover:underline-offset-2"
                  }
                >
                  <User strokeWidth={1.5} />
                  <span>My account</span>
                </Link>

                <Link
                  href={"/new"}
                  className={
                    "w-full px-2 py-2 flex items-center gap-2 rounded-sm hover:bg-gray-100 hover:underline hover:underline-offset-2"
                  }
                >
                  <Plus strokeWidth={1.5} />
                  <span>Sell a product</span>
                </Link>

                <hr />

                <div
                  className={
                    "w-full px-2 py-2 flex items-center gap-2 rounded-sm hover:bg-gray-100 hover:underline hover:underline-offset-2 hover:cursor-pointer"
                  }
                  onClick={() => {
                    signOut();
                  }}
                >
                  <LogOut strokeWidth={1.5} />
                  <span>Sign out</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {!currentUser && (
        <Link
          href={"/login"}
          className="px-3 py-2 bg-main text-white font-bold hover:bg-main_hover transition-colors rounded-sm"
        >
          Sign in
        </Link>
      )}
    </nav>
  );
}
