import axios from 'axios';

const BASE_URL = 'https://v6.exchangerate-api.com/v6';
const API_KEY = import.meta.env.VITE_EXCHANGE_RATES_API_KEY;

if (!API_KEY) {
  console.warn('ExchangeRate API key is not defined in environment variables');
}

export async function fetchRates(base = 'USD') {
  try {
    const url = `${BASE_URL}/${API_KEY}/latest/${base}`;
    const resp = await axios.get(url);
    if (resp.data && resp.data.conversion_rates) {
      return resp.data.conversion_rates;
    }
    throw new Error('Unexpected response format from exchange rate API');
  } catch (err) {
    if (err.response) {
      throw new Error(
        `API error ${err.response.status}: ${err.response.data?.error_message || err.response.statusText}`
      );
    }
    throw new Error(err.message || 'Network error while fetching exchange rates');
  }
}
