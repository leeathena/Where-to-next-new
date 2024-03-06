import React from 'react';

function WordHistory({ history, onSearchCity }) {
  const handleClick = (city) => {
    console.log("Clicked on city:", city);
    const cityName = city.split(',')[0].trim(); // Extract city name from the full string
    onSearchCity(cityName); // Pass city name to the onSearchCity function
  };

  return (
    <div className="word-history-section">
      <div className="container bg-light text-left word-container">
        <h3 className="section-heading">Previously Searched Cities</h3>
        <section className="text-center">
          {history.map((city, index) => (
            <button key={index} onClick={() => handleClick(city)} className="btn hist-btn word-history">
              {city}
            </button>
          ))}
        </section>
      </div>
    </div>
  );
}

export default WordHistory;
