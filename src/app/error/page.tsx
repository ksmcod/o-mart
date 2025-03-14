"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const configError = searchParams.get("error");

  const message =
    configError === "Configuration"
      ? "A server configuration error occured."
      : "It seems a server error occcured.";
  return (
    <div className="h-[80vh] flex flex-col justify-center items-center text-center gap-3">
      <h1 className="text-6xl font-bold">Error</h1>

      <p className="flex gap-1">
        {message}
        <span>Return to</span>
        <Link href={"/"} className="hover:underline hover:text-red-500">
          Home
        </Link>
      </p>
    </div>
  );
}
