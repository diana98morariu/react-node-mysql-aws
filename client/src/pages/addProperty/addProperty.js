import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./addProperty.css";
import Nav from "./../../components/nav/nav";
import citiesAndCountries from "./../../citiesAndCountries.json";
import toastr from "toastr";
import "./../../toastr.css";

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

  const countries = Object.keys(citiesAndCountries);
  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  const submitForm = async (e) => {
    e.preventDefault();
    const fileInput = document.querySelector("#propertyImage");

    if (newTitle.length < 1 || newTitle.length > 255) {
      return toastr.warning("Title must be between 1-255 characters");
    }
    if (newDescription.length < 20 || newDescription.length > 500) {
      return toastr.warning("Description must be between 20-500 characters");
    }
    if (newAddress.length < 10 || newAddress.length > 255) {
      return toastr.warning("Address must be between 10-255 characters");
    }
    if (newPostalCode.length < 1 || newPostalCode.length > 10) {
      return toastr.warning("Postal code must be between 1-10 characters");
    }
    if (
      newCountry.length < 2 ||
      newCountry.length > 15 ||
      !countries.includes(capitalize(newCountry))
    ) {
      return toastr.warning("Invalid country");
    }
    const inputCities = Object.values(
      citiesAndCountries[capitalize(newCountry)]
    );
    if (
      newCity.length < 2 ||
      newCity.length > 50 ||
      !inputCities.includes(capitalize(newCity))
    ) {
      return toastr.warning("Invalid city");
    }
    if (fileInput.files.length < 1)
      return toastr.warning("You need to upload an image!");

    const requestData = new FormData();
    const addPropertyData = {
      title: capitalize(newTitle),
      description: capitalize(newDescription),
      address: capitalize(newAddress),
      postalCode: capitalize(newPostalCode),
      city: capitalize(newCity),
      country: capitalize(newCountry),
    };
    requestData.append("data", JSON.stringify(addPropertyData));

    requestData.append("propertyImage", fileInput.files[0]);
    console.log(files);
    fetch("/api/properties/", {
      method: "POST",
      credentials: "include",
      body: requestData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        res.json();
      })
      .then((data) => {
        let newProperties = [...properties];
        console.log(data);
        newProperties.unshift(data);
        setProperties(newProperties);

        history.push("/profile");
        toastr.success("Property created successfully!");
      })
      .catch((error) => {
        console.log(error);
        return toastr.warning("Error creating property");
      });
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
                  <p className="p-text">Country</p>
                  <input
                    type="text"
                    placeholder="Add a country"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
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
