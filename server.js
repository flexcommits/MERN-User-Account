const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
//Routes Define
const users = require("./routes/api/users");
const blogs = require("./routes/api/blogs");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//Passport Middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/blogs", blogs);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
