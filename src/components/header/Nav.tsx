import { Plus } from "lucide-react";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex items-center gap-2">
      <button className="px-2 py-1 border border-red-500 text-red-500 flex items-center rounded-sm gap-1">
        <Plus />
        <span>Post an ad</span>
      </button>

      <div className="border-r h-full"></div>

      <Link
        href={"/login"}
        className="px-3 py-2 bg-red-500 text-white font-bold hover:bg-red-600 transition-colors rounded-sm"
      >
        Sign in
      </Link>
    </nav>
  );
}
