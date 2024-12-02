"use client"; // Error components must be Client Components

import H1 from "@/Components/Shared/H1";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="text-center py-24">
      <H1>{error.message}</H1>
      <button onClick={reset}>Try again</button>
    </main>
  );
}
