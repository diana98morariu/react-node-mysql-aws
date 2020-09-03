import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./profile.css";
import Nav from "../../components/nav/nav";
import Property from "../properties/property";

export default function Profile(props) {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [newProperties, setNewProperties] = useState([]);
  const history = useHistory();

  function fetchUser() {
    fetch("/api/users/", { credentials: "include" })
      .then((res) => {
        if (res.status === 403) {
          return history.push("/login");
        }
        if (!res.ok) {
          throw new Error(["Error loading user profile"]);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setUser(data);
        fetchUserProperties(data.id);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }
  function fetchUserProperties(id) {
    fetch(`/api/properties/${id}`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 403) {
          return history.push("/login");
        }
        if (!res.ok) {
          throw new Error(["Error loading hobbies"]);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setProperties(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }

  const removeProperty = (id) => {
    const index = properties.findIndex((x) => x.id === id);
    const newProperties = [...properties];
    newProperties.splice(index, 1);
    setProperties(newProperties);

    fetch(`/api/properties/` + id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    fetchUser();
  }, [properties]);

  return (
    <div className="profile-container">
      <Nav />
      {user ? (
        <React.Fragment>
          <div className="profile-page">
            <div className="profile-base-container">
              <div className="profile-picture">
                <img
                  src="https://react-node-mysql.s3.eu-north-1.amazonaws.com/icons8-user-male-192.png"
                  alt="property"
                />
              </div>
              <h3>
                {user.firstName} {user.lastName}
              </h3>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
            </div>

            <div className="user-properties">
              {properties.map((property) => (
                <div className="user-property">
                  <div
                    onClick={() => {
                      history.push(`/propertydetails/${property.id}`);
                    }}
                    style={{ width: "80%" }}
                  >
                    <Property
                      key={property.id}
                      property={property}
                      title={property.title}
                      description={property.description}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "20%",
                    }}
                  >
                    <button
                      className="edit-button"
                      onClick={() => {
                        history.push(`/editproperty/${property.id}`);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="edit-button"
                      onClick={() => {
                        removeProperty(property.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </React.Fragment>
      ) : undefined}
    </div>
  );
}
