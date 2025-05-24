import React from "react";
import { useRouter } from "next/navigation";

interface SetUpStoreCTAProps {
  isVerified: boolean;
}

export default function SetUpStoreCTA({ isVerified }: SetUpStoreCTAProps) {
  const router = useRouter();

  const handleClick = () => {
    if (isVerified) {
      router.push("/dashboard/seller/store-setup");
    }
  };

  return (
    <div className="my-8 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-8 shadow-sm dark:bg-gray-800">
      <h2 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-100">
        Set up your store
      </h2>
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        You need to set up your store to start selling on SafeTrade.
      </p>
      <button
        className={`rounded bg-blue-600 px-6 py-2 font-medium text-white transition-opacity ${isVerified ? "hover:opacity-90" : "cursor-not-allowed opacity-50"}`}
        onClick={handleClick}
        disabled={!isVerified}
      >
        {isVerified ? "Set Up Store" : "Verify your account to set up store"}
      </button>
    </div>
  );
}
