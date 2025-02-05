import Link from "next/link";
import { Pacifico } from "next/font/google";

const font = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Logo() {
  return (
    <Link href={"/"} className={`text-blue-500 ${font.className}`}>
      O'Mart
    </Link>
  );
}
