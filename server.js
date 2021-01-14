const express = require("express");
const app = express();

const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");

const PORT = process.env.PORT || 3020;

//assets
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

// config templete engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views/"));
app.set("view engine", "ejs");

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
