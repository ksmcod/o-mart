interface ContainerProps {
  variant?: "normal" | "large";
  children?: React.ReactNode;
}

export default function Container({ children, variant }: ContainerProps) {
  return (
    <div
      className={`${variant === "normal" && "max-w-6xl"} ${
        variant === "large" && "max-w-7xl"
      } ${!variant && "max-w-6xl"} mx-auto px-2`}
    >
      {children}
    </div>
  );
}
