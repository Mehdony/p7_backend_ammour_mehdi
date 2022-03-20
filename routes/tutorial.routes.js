module.exports = (app) => {
  const auth = require("../middleware/auth");
  const multer = require("../middleware/multer");
  const tutorials = require("../controllers/tutorial.controller.js")
  let router = require("express").Router()
  // Create a new Tutorial
  router.post("/", multer, tutorials.create)
  // Retrieve all Tutorials
  router.get("/",   tutorials.findAll)
  // Retrieve all published Tutorials
  router.get("/published", auth, tutorials.findAllPublished)
  // Retrieve a single Tutorial with id
  router.get("/:id", auth, tutorials.findOne)
  // Update a Tutorial with id
  router.put("/:id", auth, multer, tutorials.update)
  // Delete a Tutorial with id
  router.delete("/:id", auth, tutorials.delete)
  // Delete all Tutorials
  router.delete("/", auth, tutorials.deleteAll)

  app.use("/api/tutorials", router);
};
