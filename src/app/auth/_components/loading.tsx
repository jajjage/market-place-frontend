import { useState, useEffect } from "react";

export default function LoadingSpinner() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-32 flex-col items-center justify-center">
      <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
      <p className="text-lg font-medium text-gray-700">Loading{dots}</p>
    </div>
  );
}
