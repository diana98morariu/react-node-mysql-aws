const { Model } = require("objection");

const User = require("./User");

class Property extends Model {
  static get tableName() {
    return "properties";
  }

  //creating the realtion between the tables
  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "properties.userId",
          to: "users.id",
        },
      },
    };
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "title",
        "description",
        "address",
        "postalCode",
        "city",
        "country",
        "propertyImage",
        "userId",
      ],
      properties: {
        id: { type: "integer" },
        title: {
          type: "string",
          minLength: 1,
          maxLength: 255,
        },
        description: {
          type: "string",
          minLength: 20,
        },
        address: {
          type: "string",
          minLength: 10,
          maxLength: 255,
        },
        postalCode: {
          type: "string",
          minLength: 1,
          maxLength: 10,
        },
        city: {
          type: "string",
          minLength: 2,
          maxLength: 50,
        },
        country: {
          type: "string",
          minLength: 2,
          maxLength: 15,
        },
        propertyImage: {
          type: "string",
          minLength: 5,
          maxLength: 255,
        },
      },
    };
  }
}

module.exports = Property;
