import { useEffect, useState } from 'react';
import { fetchRates } from './services/exchangeRateService';
import CurrencySelector from './components/CurrencySelector';
import AmountInput from './components/AmountInput';
import ConversionResult from './components/ConversionResult';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [rates, setRates] = useState({});
  // start with USD so the selector has at least one item
  const [currencies, setCurrencies] = useState(['USD']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch rates whenever base currency changes
  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchRates(fromCurrency);
        setRates(data);
        const keys = Object.keys(data);
        setCurrencies(keys);
        // if current toCurrency not available, pick first
        if (!data[toCurrency]) {
          setToCurrency(keys[0] || '');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [fromCurrency, toCurrency]);

  const handleAmountChange = (val) => {
    setAmount(val);
  };

  const handleFromChange = (cur) => {
    setFromCurrency(cur);
  };

  const handleToChange = (cur) => {
    setToCurrency(cur);
  };

  const swap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const rate = rates[toCurrency] || null;
  const parsed = parseFloat(amount);
  const converted = !isNaN(parsed) && rate != null ? parsed * rate : null;

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Currency Exchange</h2>
        <p className="text-gray-600 mb-6">Convert between different currencies instantly</p>
        {error && <ErrorMessage message={error} />}
        {loading && <div className="text-center text-gray-500">Loading rates...</div>}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:space-x-2">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700">From</label>
              <div className="mt-1 flex space-x-2">
                <AmountInput
                  value={amount}
                  onChange={handleAmountChange}
                  disabled={loading}
                />
                <CurrencySelector
                  currencies={currencies}
                  value={fromCurrency}
                  onChange={handleFromChange}
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-2 mb-2">
            <button
              onClick={swap}
              className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 disabled:opacity-50"
              disabled={loading}
              aria-label="Swap currencies"
            >
              ↕️
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-2">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700">To</label>
              <div className="mt-1 flex space-x-2">
                <AmountInput
                  value={converted !== null ? converted.toFixed(2) : ''}
                  onChange={() => { }}
                  disabled
                />
                <CurrencySelector
                  currencies={currencies}
                  value={toCurrency}
                  onChange={handleToChange}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
          <ConversionResult
            result={converted}
            rate={rate}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
          />
        </div>
      </div>
    </div>
  );
}

export default App
