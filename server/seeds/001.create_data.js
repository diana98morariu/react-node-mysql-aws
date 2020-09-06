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
        {
          username: "jobu",
          firstName: "Jonathan",
          lastName: "Bulow",
          email: "jobu@gmail.com",
          password:
            "$2b$10$rmiFymi5sFuvhKHGrWXJNuYv/udozDLiz6AV08Ubh/7eYg7A4dp2a",
        },
        {
          username: "andres",
          firstName: "Andreea",
          lastName: "Steriu",
          email: "andreea.steriu@gmail.com",
          password:
            "$2b$10$rmiFymi5sFuvhKHGrWXJNuYv/udozDLiz6AV08Ubh/7eYg7A4dp2a",
        },
        {
          username: "dianam",
          firstName: "Diana",
          lastName: "Morariu",
          email: "diamorariu@gmail.com",
          password:
            "$2b$10$rmiFymi5sFuvhKHGrWXJNuYv/udozDLiz6AV08Ubh/7eYg7A4dp2a",
        },
      ]);
    })
    .then((users) => {
      return knex("properties").insert([
        {
          userId: 1,
          title: "Beautiful 1 room studio",
          description:
            "The apartment is compact, but well-appointed and bright one-bedroom apartments with private bath, kitchen niche and French balcony. There are three different types (A, B and C) and this ad relates to type B. Type C is 33 m2 and has storage space in the apartment.",
          propertyImage: "property1.jpeg",
          address: "Holmesvej 33",
          postalCode: "2300",
          city: "Copenhagen",
          country: "Denmark",
        },
        {
          userId: 1,
          title: "Beautiful 1 room apartment",
          description:
            "Amagerbanen 37 is located close to Amager Strandpark. It is one of the last properties in the area to be listed. Here you can live in green surroundings close to the beach and water and yet easily reach the city by metro. You will be able to rent a parking space in the basement, where there is also room for bicycles.",
          propertyImage: "property2.jpeg",
          address: "Amagerbanen 37",
          postalCode: "23020",
          city: "Malmo",
          country: "Sweden",
        },
        {
          userId: 2,
          title: "Beautiful 3 rooms apartment",
          description:
            "Bastion is an exciting building with a strong architectural identity, designed by award-winning Danielsen Architecture. The landscape of the community is drawn in as vertical gardens adorning the façade as well as in the large courtyard which offers everything from hiding places, cozy nooks, tall trees, small hills and meadows.",
          propertyImage: "property3.jpeg",
          address: "Aurel Popa 12",
          postalCode: "230530",
          city: "Sibiu",
          country: "Romania",
        },
        {
          userId: 2,
          title: "Minimalistic 2 room apartment",
          description:
            "The apartment has a simple and good floor plan. All apartments have a large kitchen-dining room, spacious bathroom with dryer-washing machine, separate shower and rooms that are withdrawn from the kitchen-dining room. The apartment is ideal for couples, families with children, singles or friends who want to live together. ",
          propertyImage: "property4.jpeg",
          address: "Aurel Popa 12",
          postalCode: "230550",
          city: "Bucharest",
          country: "Romania",
        },
        {
          userId: 3,
          title: "Cozy 3 room apartment",
          description:
            "The large kitchen area gives room for both unfolding in the kitchen, cozy in front of the TV and dinner parties in good company. The kitchen area is spacious, bright and with a natural division. In connection with the entrance you have the second bathroom of the residence. The home appears with everything in household appliances. ",
          propertyImage: "property5.jpeg",
          address: "Gronjordsvej 8",
          postalCode: "2300",
          city: "Copenhagen",
          country: "Denamrk",
        },
        {
          userId: 3,
          title: "Cozy and spacious studio",
          description:
            "The apartment has its own balcony or closed garden. In the basement there is parking for both cars and bicycles, and there is a storage room for each apartment. In the immediate area there are schools, institutions, public transport, supermarkets and shops.",
          propertyImage: "property6.jpeg",
          address: "Dalle Valle 77",
          postalCode: "2390",
          city: "Valencia",
          country: "Spain",
        },
      ]);
    });
};
