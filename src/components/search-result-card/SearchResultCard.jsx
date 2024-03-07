import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const SearchResultCard = ({ data, onClose, selectedResultIndex, index }) => {
  const { city, lat, lon, weatherData, currencyRate, distance } = data;

  console.log("distance" , distance);

  // if it is possible convert to km
  const distanceInKm = distance ? (distance / 1000).toFixed(2) + " km" : "Distance unknown";
  const cardStyle = selectedResultIndex === index ? { backgroundColor: 'green' } : {};

  return (
    <Card style={{ width: '18rem', margin: '1rem' }}>
      <Card.Body>
        <Card.Title>{city}</Card.Title>
        <p>Temperature: {weatherData?.main?.temp} °C</p>
        <p>Distance: {distanceInKm}</p>
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