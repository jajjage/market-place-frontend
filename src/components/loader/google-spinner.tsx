import { useState, useEffect } from "react";

export default function GoogleLoadingSpinner() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        {/* Google-style colored spinner */}
        <div className="relative h-12 w-12">
          <div className="absolute left-0 top-0 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-l-transparent border-t-transparent"></div>
          <div
            className="absolute left-0 top-0 h-12 w-12 animate-spin rounded-full border-4 border-red-500 border-l-transparent border-r-transparent border-t-transparent"
            style={{ animationDuration: "1.2s" }}
          ></div>
          <div
            className="absolute left-0 top-0 h-12 w-12 animate-spin rounded-full border-4 border-yellow-500 border-b-transparent border-l-transparent border-t-transparent"
            style={{ animationDuration: "1.5s" }}
          ></div>
          <div
            className="absolute left-0 top-0 h-12 w-12 animate-spin rounded-full border-4 border-green-500 border-b-transparent border-l-transparent border-r-transparent"
            style={{ animationDuration: "1.8s" }}
          ></div>
        </div>

        {/* Status text */}
        <div className="mt-6 text-center">
          <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
            Signing in to Google
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Please wait{dots}</p>
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            This may take a few moments
          </p>
        </div>
      </div>
    </div>
  );
}
