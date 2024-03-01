import "./current-weather.css"


const CurrentWeather = ({data}) => {

    return (
        <div className="current-weather">
                <div>
                <p className="city">{data.city}</p>
                <p className="weather-description">{data.weather[0].description}</p>
                <img alt="weather" className="weather-icon" src={`icons/${data.weather[0].icon}.png`} />
                <p className="temperature">{Math.round(data.main.temp)}°C</p>
                </div>
           
        </div>



    );

}

export default CurrentWeather;
