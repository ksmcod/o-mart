interface LoaderProps {
  classname?: string;
}

export default function Loader({ classname }: LoaderProps) {
  return (
    <div
      className={`loader aspect-square rounded-full border-4 border-r-transparent size-10 ${classname}`}
    ></div>
  );
}
