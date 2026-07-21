import Link from "next/link";
import { AlertCircle } from "lucide-react";
export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <AlertCircle className="mb-6 size-16 text-muted" />
      <h1 className="mb-4 text-4xl font-bold text-primary">404</h1>
      <p className="mb-8 text-xl text-muted">Page not found</p>
      <Link href="/en" className="rounded-full bg-primary px-6 py-3 font-medium text-white">
        Return to Home
      </Link>
    </div>
  );
}
