import React from 'react';

export default function ConversionResult({ result, rate, fromCurrency, toCurrency }) {
  if (result === null || rate === null) {
    return null;
  }

  return (
    <div className="mt-4 text-center border-t pt-3">
      <div className="text-2xl font-semibold">
        {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
      </div>
      <div className="mt-2 text-sm text-gray-600">
        1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
      </div>
    </div>
  );
}
