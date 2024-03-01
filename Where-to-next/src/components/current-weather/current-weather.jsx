import "./current-weather.css"


const CurrentWeather = ({data}) => {
    return (
        <div className="weather">
            <div className="card-title">
                <div>
                <p className="city">London</p>
                <p className="weather-description">Sunny</p>
                <img alt="weather" className="weather-icon" src="icons/01d.png" />
            </div>
            <div className="card-body">
                <p className="temperature">18C</p>
                <div className="details">
                    <div className="parameter-row">
                        <span className="parameter-label">Details</span>
                        <div className="parameter-row">
                        <span className="parameter-label">Humidity</span>
                        <span className="parameter-value">15%</span>
                        </div>
                    </div>
                </div>
            </div>

            </div>
        </div>
    );

}

export default CurrentWeather;
