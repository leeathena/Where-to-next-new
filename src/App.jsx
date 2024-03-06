import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header/Header';
import Search from './components/search/search'; // Make sure this path is correct
import SearchResultCard from './components/search-result-card/SearchResultCard';
import SimpleAlert from './components/SimpleAlert/SimpleAlert';
import WordHistory from './components/WordHistory/WordHistory'; // Make sure this path is correct
import currencyapi from '@everapi/currencyapi-js';
import { WEATHER_API_URL, WEATHER_API_KEY } from './API/api';

const client = new currencyapi('cur_live_lUI2h02ur74Xd81IBFTMjfA2SRP6QOqzpVHfyuuv');

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currencyRate, setCurrencyRate] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  // Load search history from local storage
  useEffect(() => {
    const loadedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(loadedHistory);
  }, []);

  // Save search history to local storage
  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    let timer;
    if (showAlert) {
      timer = setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
    }
    return () => clearTimeout(timer); // Cleanup the timer
  }, [showAlert]); // Effect runs only when showAlert changes

  const handleCloseCard = (index) => {
    setSearchResults(currentResults => {
      const updatedResults = [...currentResults];
      updatedResults.splice(index, 1);
      return updatedResults;
    });
  };

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ").map(Number);
    const weatherFetchUrl = `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
    const forecastFetchUrl = `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;

    client.latest({
      base_currency: 'GBP', // This could be dynamic based on the search
      currencies: 'USD, KRW, EUR, JPY, AUD, CAD, CHF, CNY, SEK, NZD'
    }).then(currencyResp => {
      // Assuming you want to do something with the currency data here
      console.log(currencyResp);

      Promise.all([
        fetch(weatherFetchUrl),
        fetch(forecastFetchUrl),
      ])
        .then(async ([weatherResp, forecastResp]) => {
          const weatherData = await weatherResp.json();
          const forecastData = await forecastResp.json();

          const rate = currencyResp?.rates?.EUR; // Adjust according to your currency data structure

          setCurrentWeather({ city: searchData.label, ...weatherData });
          setCurrencyRate(rate);
          setSearchResults(currentResults => [...currentResults, {
            city: searchData.label,
            lat,
            lon,
            weatherData,
            forecastData,
            currencyRate: rate
          }]);
          setShowAlert(true); // Show the alert upon successful data fetch

          // Add city to the search history if it's not already included
          if (!searchHistory.includes(searchData.label)) {
            setSearchHistory(prevHistory => [...prevHistory, searchData.label]);
          }
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    }).catch(err => console.error("Currency API error:", err));
  };
  
  // New function to handle city selection from history
  const handleCitySelect = (cityLabel) => {
    setSelectedCity(cityLabel);
    // Additional logic to trigger search or other actions based on city selection can be added here
  };

  return (
    <>
      <div className="container">
        <Header />
        <Search onSearchChange={handleOnSearchChange} selectedCity={selectedCity} />
        {showAlert && <SimpleAlert />}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
          {searchResults.map((result, index) => (
            <SearchResultCard
              key={index}
              data={{ ...result, currentWeather, currencyRate }}
              onClose={() => handleCloseCard(index)}
            />
          ))}
        </div>
        {/* Render WordHistory with onCitySelect prop */}
        <WordHistory history={searchHistory} onCitySelect={handleCitySelect} />
      </div>
    </>
  );
}

export default App;