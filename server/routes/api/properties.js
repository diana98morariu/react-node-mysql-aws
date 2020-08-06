const express = require("express");
const router = express.Router();
const path = require("path");
const formidable = require("formidable");
const detect = require("detect-file-type");
// const User = require("../../models/User")
const Property = require("../../models/Property");
const { isAuthenticated } = require(__dirname + "/../../helpers/auth.js");
const { uploadFile, removeImages } = require(__dirname +
  "/../../helpers/handleImages.js");
const { v1: uuid } = require("uuid");

const upload = uploadFile.array("propertyImage", 1);

//get all properties
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const properties = await Property.query().select("*");
    // .where({ userId: req.session.user.id });
    if (!properties) {
      res.json({
        status: 0,
        message: "Error getting the properties from the db",
      });
    }
    return res.send(JSON.stringify(properties));
  } catch (error) {
    return res.json({ status: 0, message: "Error returning the properties" });
  }
});

// get properties of a specific user
router.get("/:userId", isAuthenticated, async (req, res, next) => {
  try {
    if (req.params.userId == req.session.user.id) {
      const properties = await Property.query()
        .select("*")
        .where({ userId: req.params.userId });
      if (!properties) {
        res.json({
          status: 0,
          message: "Error getting the properties from the db",
        });
      }
      return res.send(JSON.stringify(properties));
    }
    return res.send({
      status: 0,
      message: "Error returning the properties of the user",
    });
  } catch (error) {
    return res.json({ status: 0, message: "Error returning the properties" });
  }
});

//get one specific property
router.get(
  "/property/:propertyId/",
  isAuthenticated,
  async (req, res, next) => {
    const properties = await Property.query()
      .findById(req.params.propertyId)
      .withGraphFetched("user");
    res.json(properties);
  }
);

// create a new property
router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      if (err)
        return res.status(422).json({
          errors: [{ title: "Image Upload Error", detail: err.message }],
        });

      const errorRemoveImgs = [];
      if (req.files.length > 0)
        req.files.forEach((img) =>
          errorRemoveImgs.push(img.location.slice(-41))
        );

      if (typeof req.body.data !== "string") {
        if (errorRemoveImgs.length > 0) removeImages(errorRemoveImgs);
        return res.json({ status: 0, message: "Invalid request!", code: 404 });
      }

      const userId = req.session.user.id;
      if (!userId)
        return res.json({ status: 0, message: "Missing id!", code: 404 });

      let newProperty = {};
      const data = JSON.parse(req.body.data);

      if (req.files.length < 1)
        return res.json({ status: 0, message: "Missing images!", code: 404 });
      const photos = [];
      req.files.map((img) => photos.push(img.location.slice(-41)));
      newProperty.propertyImage = photos[0];

      newProperty.title = data.title;
      newProperty.description = data.description;
      newProperty.address = data.address;
      newProperty.postalCode = data.postalCode;
      newProperty.city = data.city;
      newProperty.country = data.country;
      newProperty.userId = userId;

      const createdProperty = await Property.query().insertGraph(newProperty);
      if (!createdProperty)
        return res.json({
          status: 0,
          message: "Error while inserting property!",
          code: 404,
        });
      return res.json({ status: 1, property: createdProperty });
    });
  } catch (err) {
    return res.json({ status: 0, message: "Error creating new property!" });
  }
});

//delete property
router.delete("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return res.json({ status: 0, message: "Missing id!", code: 404 });

    const property = await Property.query()
      .select("propertyImage", "userId")
      .findById(id);
    if (!property)
      return res.json({
        status: 0,
        message: "Property does not exists!",
        code: 404,
      });

    if (property.userId !== req.session.user.id)
      return res.json({ status: 0, message: "Unauthorized!", code: 404 });

    const photo = [];
    photo.push(property.propertyImage);
    const awsRes = await removeImages(photo);

    if (awsRes.status === 0)
      return res.json({ status: 0, message: "problem with aws", code: 404 });

    const dbRes = await Property.query().deleteById(id);
    if (!dbRes)
      return res.json({ status: 0, message: "Property does not exist!" });
    return res.json({ status: 1, message: "Property deleted successfully!" });
  } catch (err) {
    return res.json({ status: 0, message: "Error deleting property!" });
  }
});

//edit property
router.patch("/:id", isAuthenticated, async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err)
        return res.status(422).json({
          errors: [{ title: "Image Upload Error", detail: err.message }],
        });

      const errorRemoveImgs = [];
      if (req.files.length > 0)
        req.files.forEach((img) =>
          errorRemoveImgs.push(img.location.slice(-41))
        );

      const { id } = req.params;
      if (!id) {
        if (errorRemoveImgs.length > 0) removeImages(errorRemoveImgs);
        return res.json({ status: 0, message: "Missing id!", code: 404 });
      }

      if (typeof req.body.data !== "string") {
        if (errorRemoveImgs.length > 0) removeImages(errorRemoveImgs);
        return res.json({ status: 0, message: "Invalid request!", code: 404 });
      }

      const property = await Property.query()
        .select("id", "propertyImage", "userId")
        .findById(id);
      if (!property) {
        if (errorRemoveImgs.length > 0) removeImages(errorRemoveImgs);
        return res.json({
          status: 0,
          message: "Property does not exists!",
          code: 404,
        });
      }

      if (property.userId !== req.session.user.id) {
        if (errorRemoveImgs.length > 0) removeImages(errorRemoveImgs);
        return res.json({ status: 0, message: "Unauthorized!", code: 404 });
      }

      const data = JSON.parse(req.body.data);
      const editedProperty = {};
      if (req.files.length < 1)
        return res.json({ status: 0, message: "Missing images!", code: 404 });
      const photos = [];
      req.files.map((img) => photos.push(img.location.slice(-41)));
      editedProperty.propertyImage = photos[0];

      editedProperty.title = data.title;
      editedProperty.description = data.description;
      editedProperty.address = data.address;
      editedProperty.postalCode = data.postalCode;
      editedProperty.city = data.city;
      editedProperty.country = data.country;

      const oldProperty = await Property.query().findById(id).throwIfNotFound();
      if (!oldProperty)
        return res.json({ status: 0, message: "No property found." });
      await oldProperty.$query().patch(editedProperty);

      return res.json({
        status: 1,
        message: "Property edited successfully!",
        data: editedProperty,
      });
    });
  } catch (err) {
    return res.json({ status: 0, message: "Error editing property!" });
  }
});
//export to api.js
module.exports = router;
