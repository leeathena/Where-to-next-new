const Forecast = ({ data }) => {
    return (
      <div className="forecast">
        <label className="title">Forecast</label>
        {data.list.slice(0, 7).map((item, idx) => (
          <div className="forecast-items" key={idx}>
            <img alt="weather" className="small-icon" src={`icons/${item.weather[0].icon}.png`} />
            <p className="temperature">{Math.round(item.main.temp)}°C</p>
          </div>
        ))}
      </div>
    );
  };
  

export default Forecast;