module.exports = (app) => {
  const auth = require("../middleware/auth");
  const multer = require("../middleware/multer");
  const tutorials = require("../controllers/tutorial.controller.js")
  let router = require("express").Router()
  // Create a new Tutorial
  router.post("/", auth, multer, tutorials.create)
  // Create Comment 
  router.post("/:tutorialId/comment", auth, tutorials.createComment);
  // Retrieve all Tutorials
  router.get("/", multer,  tutorials.findAll)
  // Retrieve all published Tutorials
  router.get("/published", auth, multer, tutorials.findAllPublished)
  // Retrieve a single Tutorial with id
  router.get("/:id", auth, multer,  tutorials.findOne)
  // Update a Tutorial with id
  router.put("/:id", auth, multer, tutorials.update)
  // Delete a Tutorial with id
  router.delete("/:id", auth, tutorials.delete)
  // Delete all Tutorials
  router.delete("/", auth, tutorials.deleteAll)

  app.use("/api/tutorials", router);
};
