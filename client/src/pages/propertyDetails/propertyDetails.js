import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./propertyDetails.css";
import Nav from "./../../components/nav/nav";

export default function PropertyDetails(props) {
  const [property, setProperty] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const propertyId = props.match.params.id;

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
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }
  useEffect(() => {
    fetchProperty();
  }, []);
  return (
    <div>
      <Nav />
      <h1> Property details</h1>
      <div className="property-container">
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
        </div>
      </div>
    </div>
  );
}
