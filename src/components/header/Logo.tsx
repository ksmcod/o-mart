import Link from "next/link";
import { Pacifico } from "next/font/google";

const font = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Logo() {
  return (
    <Link href={"/"} className={`text-main text-2xl ${font.className}`}>
      O&apos;Mart
    </Link>
  );
}
