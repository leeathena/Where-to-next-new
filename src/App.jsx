import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header/Header';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_URL, WEATHER_API_KEY, CURRENCY_API_URL, CURRENCY_API_KEY } from './API/api';
import SearchResultCard from './components/search-result-card/SearchResultCard';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currencyRate, setCurrencyRate] = useState(null);
  const [searchResults, setSearchResults] = useState([]);


  const handleCloseCard = (index) => {
    setSearchResults(currentResults => {
      const updatedResults = [...currentResults];
      updatedResults.splice(index, 1);
      return updatedResults;
    });
  };

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ").map(Number);

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
        setCurrencyRate(rate); // Set the currency rate with the fetched data

        const resultData = {
          city: searchData.label, // city name
          lat,
          lon,
          weatherData,
          forecastData,
          currencyRate: rate
        };

        setSearchResults(currentResults => [...currentResults, resultData]);
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
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
          {searchResults.map((result, index) => (
            <SearchResultCard
              key={index}
              data={{ ...result, currentWeather, currencyRate }}
              onClose={() => handleCloseCard(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
