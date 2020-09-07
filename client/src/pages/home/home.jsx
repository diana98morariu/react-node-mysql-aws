import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Nav from "../../components/nav/nav";
import Property from "../properties/property";
import "./home.css";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const history = useHistory();

  function fetchProperties() {
    fetch("/api/properties/", { credentials: "include" })
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
        setProperties(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div data-tut="reactour__home" style={{ width: "100vw" }}>
      <Nav />
      <div className="main-container">
        <div
          className="properties-container"
          data-tut="reactour__home_properties"
        >
          {properties.map((property) => (
            <div
              onClick={() => {
                history.push(`/propertydetails/${property.id}`);
              }}
              datatut={
                property.id === properties[0].id
                  ? "reactour__home_property"
                  : ""
              }
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
