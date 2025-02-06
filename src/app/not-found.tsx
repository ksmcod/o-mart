import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | Not found",
  description: "The requested resource could not be found!",
};
export default function NotFound() {
  return (
    <div className="h-[80vh] flex flex-col justify-center items-center text-center gap-3">
      <h1 className="text-6xl font-bold">404</h1>

      <p className="">
        Uh oh! It seems the page you requested could not be found!
      </p>
    </div>
  );
}
