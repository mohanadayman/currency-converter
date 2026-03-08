import React from 'react';

export default function AmountInput({ value, onChange, disabled = false }) {
  return (
    <input
      type="number"
      step="any"
      className={`w-full h-10 bg-gray-100 border border-gray-300 px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 flex-1 rounded-l-lg bg-gray-200`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      placeholder="0.00"
    />
  );
}
