// MobileWarning.jsx
import React from "react";

export default function MobileWarning({ onContinue }: {
  onContinue: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-xl mb-4 text-center italic">
        For the best experience, please open this site on desktop
      </h1>
      <button
        className="bg-blue-600 px-6 py-3 rounded-lg font-semibold mt-4 hover:bg-blue-700 transition"
        onClick={onContinue}
      >
        Continue Anyway
      </button>
    </div>
  );
}
