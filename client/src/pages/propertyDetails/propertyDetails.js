import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./propertyDetails.css";
import Nav from "./../../components/nav/nav";

export default function PropertyDetails(props) {
  const [property, setProperty] = useState([]);
  const history = useHistory();
  const propertyId = props.match.params.id;
  const API_KEY = "011407961caec553c4fdd3100af19095";
  const [temperature, setTemperature] = useState("");
  const [icon, setIcon] = useState([]);
  const [humidity, setHumidity] = useState("");
  const [description, setDescription] = useState("");

  function fetchProperty() {
    fetch(`/api/properties//property/${propertyId}`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 403) {
          return history.push("/login");
        }
        if (!res.ok) {
          throw new Error(["Error loading properties"]);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setProperty(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
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
    fetchProperty();
  }, []);
  getWeather();
  return (
    <div>
      <Nav />
      <h1> Property details</h1>
      <div
        className="property-container"
        data-tut="reactour__home_property_details"
      >
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

        <div className="property-details">
          <h3>{property.title}</h3>
          <p>Description: {property.description}</p>
          <p>
            Address: {property.address}, {property.postalCode} {property.city},{" "}
            {property.country}
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
    </div>
  );
}
