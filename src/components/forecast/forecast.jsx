const Forecast = ({ data, currencyRate }) => {
  console.log(data); // Debugging purposes
  
  return (
    <div className="forecast">
      <div className="title">Forecast</div>
      {data.list.slice(0, 7).map((item, idx) => (
        <div className="row mb-2" key={idx}>
          <div className="col-md-6">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary-emphasis">Weather</strong>
                <h3 className="mb-0">Temperature: {Math.round(item.main.temp)}°C</h3>
                <div className="mb-1 text-body-secondary">{item.dt_txt}</div>
                <img alt="weather" className="weather-icon mt-3" src={`icons/${item.weather[0].icon}.png`} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-success-emphasis">Currency Rate to GBP</strong>
                {/* Display the currency rate here */}
                <h3 className="mb-0">{currencyRate ? `1 Local Currency = ${currencyRate}` : 'Currency rate not available'}</h3>
              </div>
            </div>
          </div>
        </div>
      ))}
      <p>Currency Rate to GBP: {currencyRate}</p>
    </div>
  );
};


export default Forecast;