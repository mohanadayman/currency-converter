import React from 'react';

export default function CurrencySelector({
  currencies = [],
  value,
  onChange,
  label,
  disabled = false,
}) {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>}
      <select
        className={`w-full h-10 bg-gray-100 rounded border border-gray-300 px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-24 rounded-r-lg bg-white`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        {currencies.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>
    </div>
  );
}
