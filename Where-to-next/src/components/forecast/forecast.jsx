const Forecast = ({ data }) => {
  console.log (data)
  return (
    <div className="forecast">
      <label className="title">Forecast</label>
      {data.list.slice(0, 7).map((item, idx) => (
        // <div className="forecast-items" key={idx}>
        //   <img alt="weather" className="small-icon" src={`icons/${item.weather[0].icon}.png`} />
        //   <p className="temperature">{Math.round(item.main.temp)}°C</p>
        // </div>
        <div class="row mb-2">
        <div class="col-md-6">
          <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col p-4 d-flex flex-column position-static">
              <strong class="d-inline-block mb-2 text-primary-emphasis">Weather</strong>
              <h3 class="mb-0">Temperature: {Math.round(item.main.temp)}°C</h3>
              <div class="mb-1 text-body-secondary">{item.dt_txt}</div> 
            </div>
            <div class="col-auto d-none d-lg-block">
            <img alt="weather" className="small-icon" src={`icons/${item.weather[0].icon}.png`} />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col p-4 d-flex flex-column position-static">
              <strong class="d-inline-block mb-2 text-success-emphasis">Design</strong>
              <h3 class="mb-0">Post title</h3>
              <div class="mb-1 text-body-secondary">Nov 11</div>
              <p class="mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
              <a href="#" class="icon-link gap-1 icon-link-hover stretched-link">
                Continue reading
                <svg class="bi"><use xlink:href="#chevron-right"/></svg>
              </a>
            </div>
            <div class="col-auto d-none d-lg-block">
              <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
            </div>
          </div>
        </div>
      </div>
  ))
}
      </div >
      
    );
  };


export default Forecast;