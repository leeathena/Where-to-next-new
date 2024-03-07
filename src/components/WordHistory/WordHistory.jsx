// WordHistory.jsx
import React from 'react';

function WordHistory({ history, clearHistory }) {
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
            {history.length > 0 && (
              <button onClick={clearHistory} className="btn btn-danger mt-3" style={{ backgroundColor: "#e75a7cff" }}>
                Clear
              </button>
            )}
          </section>
        </div>
      </div>
    );
  }
  

export default WordHistory;
