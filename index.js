const express = require("express");
const app = express();
require("dotenv/config");
const mongoose = require("mongoose");
const { post } = require("./routes/auth");
//Import routes
const authRoutes = require("./routes/auth");
const postRoute = require("./routes/post");

//JSON PARSING
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes Middleware
app.use("/api/user", authRoutes);
app.use("/api/posts", postRoute);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, () => {
  console.log("DB CONNECTED");
});

app.listen(3000, () => console.log("Server running"));
