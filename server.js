const express = require("express");
const app = express();
const path = require("path");

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, x-access-token')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

const helmet = require("helmet")
app.use(helmet.frameguard())

const rateLimit = require("express-rate-limit")
const limiter = rateLimit({
  windowMs: 0.1 * 60 * 1000,
  max: 100,
});
app.use(limiter);

const userRoutes = require("./routes/user");
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");

db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });


// set port, listen for requests
const PORT = process.env.PORT || 8080;
require("./routes/tutorial.routes.js")(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/api/auth", userRoutes);