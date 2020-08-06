exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("properties")
    .del()
    .then(() => {
      return knex("users").del();
    })
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        // password
        {
          username: "admin",
          firstName: "",
          lastName: "",
          email: "admin@admin.com",
          password:
            "$2b$10$G/v/MRwgMgOAtCUCQRKJTO8GRD/rKxyu61J5wfYimsHd0/FSxuVAq",
        },
        {
          username: "poweruser",
          firstName: "",
          lastName: "",
          email: "poweruser@poweruser.com",
          password:
            "$2b$10$G/v/MRwgMgOAtCUCQRKJTO8GRD/rKxyu61J5wfYimsHd0/FSxuVAq",
        },
      ]);
    })
    .then((users) => {
      return knex("properties").insert([
        {
          userId: 1,
          title: "Beautiful home",
          description: "Very nice apartment in Copenhagen",
          propertyImage: "property1.jpeg",
          address: "Holmesvej 33",
          postalCode: "2300",
          city: "Copenhagen",
          country: "Denmark",
        },
        {
          userId: 1,
          title: "Gorgeous home",
          description: "Very nice apartment in Malmo",
          propertyImage: "property2.jpeg",
          address: "Sandravej 33",
          postalCode: "23020",
          city: "Malmo",
          country: "Sweden",
        },
        {
          userId: 2,
          title: "Beautiful house",
          description: "Very nice house in Sibiu",
          propertyImage: "property3.jpeg",
          address: "Aurel Popa 12",
          postalCode: "230530",
          city: "Sibiu",
          country: "Romania",
        },
      ]);
    });
};
