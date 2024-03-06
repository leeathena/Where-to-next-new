// WordHistory.jsx
import React from 'react';

function WordHistory({ history }) {
  // Adjusted part of WordHistory.jsx to include the class name
return (
    <div className="word-history-section">
      <div className="container bg-light text-left word-container">
        <h3 className="section-heading">Previously Searched Cities</h3>
        <section className="text-center">
          {history.map((city, index) => (
            <button key={index} className="btn hist-btn word-history">
              {city}
            </button>
          ))}
        </section>
      </div>
    </div>
  );
  
}

export default WordHistory;
