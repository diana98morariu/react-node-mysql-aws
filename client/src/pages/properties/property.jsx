import React, { useState, useEffect } from "react";
import "./property.css";

const Property = ({ property }) => {
  const API_KEY = "011407961caec553c4fdd3100af19095";
  const [temperature, setTemperature] = useState("");
  const [icon, setIcon] = useState([]);
  const [humidity, setHumidity] = useState("");
  const [description, setDescription] = useState("");

  async function getWeather() {
    const apiCall = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${property.city},${property.country}&appid=${API_KEY}&units=metric`
    );
    const info = await apiCall.json();
    if (property.city && property.country) {
      setTemperature(info.main.temp);
      setHumidity(info.main.humidity);
      setDescription(info.weather[0].description);
      setIcon(info.weather[0].icon);
    } else {
      setTemperature("");
      setHumidity("");
      setDescription("");
      setIcon("");
    }
  }
  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div key={property.id} className="propertyCard">
      <div className="propertyImageContainer">
        <img
          src={
            "https://react-node-mysql.s3.eu-north-1.amazonaws.com/" +
            property.propertyImage
          }
          alt="property"
          className="propertyImage"
        />
      </div>
      <div className="propertyDetails">
        <h2>{property.title}</h2>
        <p>
          {property.city}, {property.country}
        </p>
        <div className="weather-container">
          <p style={{ fontWeight: "600", marginBottom: "0.5em" }}>
            The weather there at this moment:
          </p>
          <div className="weather-info">
            <div>
              <p>Temperature: {temperature}°C</p>
              <p>Description: {description}</p>
              <p>Humidity: {humidity}%</p>
            </div>
            <img
              src={`http://openweathermap.org/img/w/${icon}.png`}
              alt="weather img"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Property;
