import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./property.css";
import Property from "../../pages/properties/property";
import Nav from "../../components/nav/nav";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  // const [newProperty, setNewProperty] = useState([]);
  // const [newStartedYear, setNewStartedYear] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const user_data = useStore();
  console.log(user_data);

  const history = useHistory();
  function fetchUserProperties() {
    fetch("http://localhost:9090/api/properties/", { credentials: "include" })
      .then((res) => {
        console.log(res);
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
        console.log(data);
        setProperties(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }
  // function createProperty() {
  //   fetch("http://localhost:9090/api/properties/", {
  //     credentials: "include",
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       title: newHobby,
  //       startedYear: newStartedYear,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       let newHobbies = [...hobbies];
  //       newHobbies.unshift(data);
  //       setHobbies(newHobbies);
  //     });
  // }
  // const removeHobby = (id) => {
  //   const index = hobbies.findIndex((x) => x.id === id);
  //   const newHobbies = [...hobbies];
  //   newHobbies.splice(index, 1);
  //   setHobbies(newHobbies);

  //   fetch(`http://localhost:9090/api/hobbies/` + id, {
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //     method: "DELETE",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // };

  useEffect(() => {
    fetchUserProperties();
  }, []);

  return (
    <div className="hobbies-container">
      <div className="hobbies-base-container">
        <Nav />
        {!isLoading ? (
          <React.Fragment>
            {/* <div>
              <input
                type="text"
                placeholder="Put in a hobby"
                value={newHobby}
                onChange={(e) => setNewHobby(e.target.value)}
              />
              <input
                type="number"
                step="1"
                placeholder="Put in the year you started"
                value={newStartedYear}
                onChange={(e) => setNewStartedYear(e.target.value)}
              />
              <button onClick={createHobby}>Add</button>
            </div> */}

            <div>
              {properties.map((property) => (
                <Property
                  key={property.id}
                  property={property}
                  title={property.title}
                  description={property.description}
                />
              ))}
            </div>
          </React.Fragment>
        ) : (
          <p>Loading properties...</p>
        )}
      </div>
    </div>
  );
}
