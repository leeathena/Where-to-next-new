import Header from './components/header/Header';
import CitySearchbar from './components/citysearchbar/CitySearchbar';
import './App.css'
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_URL , WEATHER_API_KEY } from './API/api';


function App() {

    const [currentWeather , setCurrentWeather] = useState(null);
    const [forcast , setForecast] = useState(null);

    const handleOnSearchChange = (searchData) =>{
      const [ lat , lon] = searchData.value.split(" ");
      
      const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`);
      const forecastWeatherFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`);
      

      Promise.all([currentWeatherFetch, forecastWeatherFetch])
      .then(async (response) =>{
        const weatherResponse =await response [0].json();
        const forecastResponse =await response [1].json();

        setCurrentWeather({city: searchData.label, ...weatherResponse});
        setForecast({city: searchData.label, ...forecastResponse});

      })
      .catch ((err)=> console.log(err))
  }

  console.log(currentWeather);
  console.log(forcast);


  return (
    <>
    <h1 className="title"> Where To Next? </h1>
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrentWeather data={currentWeather}/>}
    </div>
    </>
  )
}

export default App
