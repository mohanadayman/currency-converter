# Currency Converter React Project

This is an ongoing project and the readme file is still in progress.

### Technologies used:
React
Tailwind
Axios

### How to Run the Project Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/mohanadayman/currency-converter.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the project root containing your API key from https://app.exchangerate-api.com/:
   ```bash
   echo "VITE_EXCHANGE_RATES_API_KEY=API_KEY_VALUE" > .env
   ```
   **Do not commit this file**; it is already listed in `.gitignore`.
4. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at http://localhost:5173/ by default or the next free port.