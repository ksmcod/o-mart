import { BadgeCheck } from "lucide-react";

interface FormSuccessProps {
  message?: string;
}

export default function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <BadgeCheck className="size-7" />
      <p className="text-base">{message}</p>
    </div>
  );
}
