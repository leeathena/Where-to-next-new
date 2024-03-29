import React, { useState, useEffect } from 'react';

import { WEATHER_API_URL, WEATHER_API_KEY, CURRENCY_API_URL, CURRENCY_API_KEY, GEOAPIFY_API_KEY } from './API/api';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from './config/constants';

import Header from './components/header/Header';
import Search from './components/search/search'; // Ensure correct import path
import CurrentWeather from './components/current-weather/current-weather'; // Ensure correct import path, if used
import SearchResultCard from './components/search-result-card/SearchResultCard';
import SimpleAlert from './components/SimpleAlert/SimpleAlert'; // Ensure correct import path
import WordHistory from './components/WordHistory/WordHistory'; // Ensure correct import path and the component is created

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCurrentLocation, DEFAULT_LOCATION } from './utils/geolocation';
import { calculateDistance } from './utils/distanceCalculator';
import ReactLoading from 'react-loading';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currencyRate, setCurrencyRate] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState(null); // random select

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

  // Random Select
  const handleRandomSelect = () => {
    console.log("Random select clicked");
    if (searchResults.length === 0) {
      console.log("searchResults is empty");

      return;
    }

    const randomIndex = Math.floor(Math.random() * searchResults.length);
    console.log(`searchResults length:  ${searchResults.length}`);
    console.log(`searchResults Index: ${randomIndex}`);
    setSelectedResultIndex(randomIndex);
  };

  const handleOnSearchChange = (searchData) => {
    setLoading(true);
    const [lat, lon] = searchData.value.split(" ").map(Number);
    const weatherFetchUrl = `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
    const forecastFetchUrl = `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
    const currencyFetchUrl = `${CURRENCY_API_URL}&symbols=EUR`; // Adjust accordingly

    Promise.all([
      fetch(weatherFetchUrl),
      fetch(forecastFetchUrl),
      fetch(currencyFetchUrl, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': CURRENCY_API_KEY,
          'X-RapidAPI-Host': 'example-currency-api-host.com'
        }
      })
    ])
      .then(async ([weatherResp, forecastResp, currencyResp]) => {
        const weatherData = await weatherResp.json();
        const forecastData = await forecastResp.json();
        const currencyData = await currencyResp.json();

        const rate = currencyData?.rates?.EUR; // Adjust according to your currency data structure

        setCurrentWeather({ city: searchData.label, ...weatherData });
        setCurrencyRate(rate);

        // Add city to the search history if it's not already included
        if (!searchHistory.includes(searchData.label)) {
          setSearchHistory(prevHistory => [...prevHistory, searchData.label]);
        }

        getCurrentLocation().then((position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;

          calculateDistance(userLat, userLon, lat, lon, GEOAPIFY_API_KEY).then((distanceValue) => {

            console.log(`distanceValue: ${distanceValue}`);

            const newResult = {
              city: searchData.label,
              lat,
              lon,
              weatherData,
              forecastData,
              currencyRate: rate,
              distance: distanceValue,
            };

            setSearchResults(currentResults => [...currentResults, newResult]);
            setLoading(false);
            setShowAlert(true); // Show the alert upon successful data fetch
          });
        }).catch((error) => {
          console.error("geolocation error: ", error);
        });

      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  };

  const clearSearchHistory = () => {
    setSearchHistory([]); // Clears the search history state
    localStorage.setItem("searchHistory", JSON.stringify([])); // Optionally clear the history in local storage too
  };


  return (
    <>
      <div className="container">
        {loading && (
          <div className="loading-container">
            <ReactLoading type={"bars"} color={"#0000FF"} height={'25%'} width={'25%'} />
          </div>
        )}

        {showAlert && (
          <div className="alert-container">
            <SimpleAlert />
          </div>
        )}
        <Header />
        <Search onSearchChange={handleOnSearchChange} />

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
          {searchResults.map((result, index) => (
            <SearchResultCard
              key={`${result.city}-${index}`}
              index={index}
              selectedResultIndex={selectedResultIndex}
              data={{ ...result, currentWeather, currencyRate }}
              onClose={() => handleCloseCard(index)}
            />
          ))}
        </div>
        <WordHistory history={searchHistory} clearHistory={clearSearchHistory} />
      </div>
      <button className="random-choice-btn" onClick={handleRandomSelect}>Random Select</button>
    </>
  );

}


export default App;
