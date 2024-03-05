import "./current-weather.css"


const CurrentWeather = ({ data }) => {
    console.log (data)
    // can add a card and present the required info like the forecast component
    return (
        // <div className="current-weather">
        //         <div>
        //         <p className="city">{data.city}</p>
        //         <p className="weather-description">{data.weather[0].description}</p>
        //         <img alt="weather" className="weather-icon" src={`icons/${data.weather[0].icon}.png`} />
        //         <p className="temperature">{Math.round(data.main.temp)}°C</p>
        //         </div>
        // </div>
        
        <div className="current-weather">
        <div className="p-5 text-center bg-body-tertiary rounded-3">
          <h1 className="city-name">{data.city}</h1>
          <h2 className="text-body-emphasis">Current Weather</h2>
          <h3 class="mb-0">Temperature: {Math.round(data.main.temp)}°C</h3>
          <div class="col-auto d-none d-lg-block">
          <img alt="weather" className="weather-icon" src={`icons/${data.weather[0].icon}.png`} />
            </div>
        </div>
      </div>

    );

}

export default CurrentWeather;
