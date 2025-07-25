import { BadgeAlert } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <BadgeAlert className="size-7" />
      <p className="text-base">{message}</p>
    </div>
  );
}
