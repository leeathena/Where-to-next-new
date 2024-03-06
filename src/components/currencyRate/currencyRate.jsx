import React, { useState, useEffect } from 'react';

const CurrencyRate = ({ city }) => {
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(`https://api.currencyapi.com/v3/latest?apikey=cur_live_anGzRistT9B8GwFbkQTe6zvN2U4W7ZL6tM6YZCFY&currencies=USD%2CEUR%2CJPY%2CAUD%2CCAD%2CCHF%2CCNY%2CSEK%2CNZD&base_currency=GBP`);
        const data = await response.json();
        setExchangeRate(data.rate);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };

    fetchExchangeRate();
  }, [city]);

  return (
    <div>
      {exchangeRate ? (
        <p>Exchange rate of {city} currency compared to GBP: {exchangeRate}</p>
      ) : (
        <p>Loading exchange rate...</p>
      )}
    </div>
  );
};

export default CurrencyRate;
