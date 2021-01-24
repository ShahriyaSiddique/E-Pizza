const express = require("express");
const app = express();

const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");

const mongoose = require("mongoose");

const session = require("express-session");

require("dotenv").config();

const flash = require("express-flash");

const MongoDbStore = require("connect-mongo")(session);

const PORT = process.env.PORT || 3020;

// Database connection
mongoose.connect(
  `mongodb+srv://onik:onik@nodetutorial.7rhjr.mongodb.net/E-Pizza?authSource=admin&replicaSet=atlas-sy2uou-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  }
);
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Connection failed...");
  });

//session store

let mongoStore = new MongoDbStore({
  mongooseConnection: connection,
  collection: "sessions",
});

//session config

app.use(
  session({
    secret: process.env.COOKIES_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //expire in 24 hours
    // cookie: { maxAge: 1000 * 15 }, //expire in 24 hours
  })
);

app.use(flash());

//assets
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// config templete engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views/"));
app.set("view engine", "ejs");

require("./routes/web")(app);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
