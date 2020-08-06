import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./addProperty.css";
import Nav from "./../../components/nav/nav";

export default function AddProperty() {
  const [properties, setProperties] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPropertyImage, setNewPropertyImage] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [newPostalCode, setNewPostalCode] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [files, setFiles] = useState([]);
  const history = useHistory();

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
    console.log(files);
    fetch("http://localhost:9090/api/properties/", {
      method: "POST",
      credentials: "include",
      body: requestData,
    })
      .then((res) => res.json())
      .then((data) => {
        let newProperties = [...properties];
        console.log(data);
        newProperties.unshift(data);
        setProperties(newProperties);
      });
    history.push("/profile");
  };

  return (
    <div>
      <Nav />
      <h1> Add property</h1>
      <div className="add-property-container">
        <form onSubmit={submitForm} method="POST">
          <div className="add-property-form">
            <div className="first-6-inputs">
              <div className="inputs-3">
                <div>
                  <p className="p-text">Title</p>
                  <input
                    type="text"
                    placeholder="Add a title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
                <div>
                  <p className="p-text">Description</p>
                  <input
                    type="text"
                    placeholder="Add a description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                </div>

                <div>
                  <p className="p-text">Address</p>
                  <input
                    type="text"
                    placeholder="Add an address"
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
                    placeholder="Add a postal code"
                    value={newPostalCode}
                    onChange={(e) => setNewPostalCode(e.target.value)}
                  />
                </div>
                <div>
                  <p className="p-text">City</p>
                  <input
                    type="text"
                    placeholder="Add a city"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                  />
                </div>
                <div>
                  <p className="p-text">Country</p>
                  <input
                    type="text"
                    placeholder="Add a country"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="file-input-btn">
              <input
                type="file"
                name="propertyImage"
                id="propertyImage"
                value={newPropertyImage}
                onChange={(e) => setNewPropertyImage(e.target.value)}
              />
              <button type="submit" className="add-property-btn">
                Add property
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
