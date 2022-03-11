const express = require("express");
const cors = require("cors");
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})
const userRoutes = require("./routes/user");
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

const db = require("./models");

// db.sequelize.sync();

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;
require("./routes/tutorial.routes.js")(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


app.use("/api/auth", userRoutes);