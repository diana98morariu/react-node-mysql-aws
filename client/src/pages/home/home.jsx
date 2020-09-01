import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Nav from "../../components/nav/nav";
import Property from "../properties/property";
import "./home.css";

export default function Profile() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  function fetchProperties() {
    fetch("http://localhost:9090/api/properties/", { credentials: "include" })
      .then((res) => {
        // console.log(res);
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
        // console.log(data);
        setProperties(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }
  console.log(properties);
  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div>
      <Nav />
      <div className="main-container">
        <div className="properties-container">
          {properties.map((property) => (
            <div
              onClick={() => {
                history.push(`/propertydetails/${property.id}`);
              }}
            >
              <Property
                key={property.id}
                property={property}
                title={property.title}
                description={property.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
