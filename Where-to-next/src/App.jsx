import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/Forecast/forecast';
import { WEATHER_API_URL, WEATHER_API_KEY, CURRENCY_API_URL, CURRENCY_API_KEY } from './API/api';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [currencyRate, setCurrencyRate] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastWeatherFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    
    // Placeholder for determining the currency code based on the selected city's country
    // Implement this functionality based on your application's needs
    const currencyCode = "EUR"; // Example placeholder, replace with actual logic to determine currency code

    // Replace the URL with your actual currency API URL, dynamically including the currencyCode
    const currencyRateFetch = fetch(`${CURRENCY_API_URL}&symbols=${currencyCode}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': CURRENCY_API_KEY,
        'X-RapidAPI-Host': 'example-currency-api-host.com'
      }
    });

    Promise.all([currentWeatherFetch, forecastWeatherFetch, currencyRateFetch])
      .then(async ([weatherResp, forecastResp, currencyResp]) => {
        const weatherData = await weatherResp.json();
        const forecastData = await forecastResp.json();
        const currencyData = await currencyResp.json(); // Process the currency API response

        const rate = currencyData.data[currencyCode]?.value; // Extracting the rate for the specific currency code

        setCurrentWeather({ city: searchData.label, ...weatherData });
        setForecast({ city: searchData.label, ...forecastData });
        setCurrencyRate(rate); // Set the currency rate with the fetched data
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        // Handle errors, for example, by setting an error state and displaying an error message to the user
      });
  };

  return (
    <>
      <div className="container">
        <Header />
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} currencyRate={currencyRate} />}
        {currencyRate && <p>Currency Rate to GBP: {currencyRate}</p>}
      </div>
    </>
  );
}

export default App;
