import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const SearchResultCard = ({ data, onClose }) => {
  
  const { city, lat, lon, weatherData, currencyRate } = data;

  return (
    <Card style={{ width: '18rem', margin: '1rem' }}>
      <Card.Body>
        <Card.Title>{city}</Card.Title>
        <p>Temperature: {weatherData?.main?.temp} °C</p>
        <p>Currency Rate to GBP: {currencyRate}</p>
        <div style={{ height: '200px', marginTop: '10px' }}>
          <MapContainer center={[lat, lon]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <Marker position={[lat, lon]}></Marker>
          </MapContainer>
        </div>
        <Button variant="secondary" onClick={onClose} style={{ marginTop: '10px' }}>
          Close
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SearchResultCard;