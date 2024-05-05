const express = require("express");
const cors = require("cors");
require("dotenv").config();
// const FileUpload = require("express-fileupload");

const bodyParser = require("body-parser");
const path = require('path');
const { METHODS } = require("http");

const app = express();

var corsOptions = {
  origin: process.env.ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"]
};

app.use(cors(corsOptions));

// app.use(FileUpload());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/images',express.static('images'));

// database
// const db = require("./app/models");
// const Role = db.role;

// db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to gungde120 application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/counter.routes')(app);
require('./app/routes/all.routes')(app);
require('./app/routes/das.routes')(app);
require('./app/routes/kps.routes')(app);
require('./app/routes/kecamatan.routes')(app);
require('./app/routes/sungai.routes')(app);
require('./app/routes/potensi.routes')(app);
require('./app/routes/potensi.das.routes')(app);

// set port, listen for requests

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

const PORT = process.env.PORT || 8081;
// const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// // for deploy
// app.listen();

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "admin"
  });

  Role.create({
    id: 3,
    name: "moderator"
  });
}