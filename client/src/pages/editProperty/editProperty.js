import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./editProperty.css";
import Nav from "./../../components/nav/nav";

export default function EditProperty(props) {
  const [property, setProperty] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPropertyImage, setNewPropertyImage] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [newPostalCode, setNewPostalCode] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const history = useHistory();
  const propertyId = props.match.params.id;

  function fetchProperty() {
    fetch(`http://localhost:9090/api/properties//property/${propertyId}`, {
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

  const submitForm = async () => {
    const fileInput = document.querySelector("#propertyImage");
    const requestData = new FormData();
    const addPropertyData = {
      title: newTitle,
      description: newDescription,
      address: newAddress,
      postalCode: newPostalCode,
      city: newCity,
      country: newCountry,
    };
    requestData.append("data", JSON.stringify(addPropertyData));
    requestData.append("propertyImage", fileInput.files[0]);

    fetch(`http://localhost:9090/api/properties/${propertyId}`, {
      method: "PATCH",
      credentials: "include",
      body: requestData,
    })
      .then((res) => res.json())
      .then((data) => {
        data;
      })
      .catch((error) => {
        setIsLoading(false);
      });
    history.push("/profile");
  };
  useEffect(() => {
    fetchProperty();
  }, []);
  return (
    <div>
      <Nav />
      <h1> Edit property</h1>
      <div className="edit-property-container">
        <form onSubmit={submitForm} method="POST">
          <div className="edit-property-form">
            <div className="first-6-inputs">
              <div className="inputs-3">
                <div>
                  <p className="p-text">Title</p>
                  <input
                    type="text"
                    placeholder={property.title}
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
                <div>
                  <p className="p-text">Description</p>
                  <input
                    type="text"
                    placeholder={property.description}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                </div>
                <div>
                  <p className="p-text">Address</p>
                  <input
                    type="text"
                    placeholder={property.address}
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="inputs-3">
                <div>
                  <p className="p-text">Postal code</p>
                  <input
                    type="text"
                    placeholder={property.postalCode}
                    value={newPostalCode}
                    onChange={(e) => setNewPostalCode(e.target.value)}
                  />
                </div>
                <div>
                  <p className="p-text">City</p>
                  <input
                    type="text"
                    placeholder={property.city}
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                  />
                </div>
                <div>
                  <p className="p-text">Country</p>
                  <input
                    type="text"
                    placeholder={property.country}
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="file-input-btn">
              <input type="file" name="propertyImage" id="propertyImage" />
              <button type="submit" className="save-btn">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
