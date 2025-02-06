import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex items-center gap-2">
      <button className="px-2 py-1 border border-red-500 text-red-500">
        Post an ad
      </button>

      <Link
        href={"/login"}
        className="px-3 py-2 bg-red-500 text-white font-bold hover:bg-red-600 transition-colors rounded-sm"
      >
        Sign in
      </Link>
    </nav>
  );
}
