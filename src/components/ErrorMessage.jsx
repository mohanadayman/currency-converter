import React from 'react';

export default function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <div className="mt-4 p-2 bg-red-100 text-red-800 border border-red-200 rounded">
      {message}
    </div>
  );
}
