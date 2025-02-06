export default function NotFound() {
  return (
    <div className="h-[80vh] flex flex-col justify-center items-center text-center gap-3">
      <h1 className="text-5xl font-bold text-red-600">404</h1>

      <p className="text-red-900">
        Uh oh! It seems the page you requested could not be found!
      </p>
    </div>
  );
}
