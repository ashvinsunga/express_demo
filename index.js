// import routes
const courses = require("./routes/courses");
const home = require("./routes/home");

//import custom middleware
const logger = require("./middleware/logger");

//import third pary middleware
const express = require("express");
const Joi = require("joi");
const morgan = require("morgan");
// used with relation to NODE_ENV, config are stored at config folder
const config = require("config");
// On cmd set 'set DEBUG = app:startupDebugger or app:dbDebugger or both, or all using app:*
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

// Configuration
console.log("Application Name:" + config.get("name"));
console.log("Mail Server:" + config.get("mail.host"));
// set on custom-environment-variable.json , then set on cmd using "set app_password=1234"
console.log("Mail Password:" + config.get("mail.password"));

// use middleware
const app = express();
// .views
app.set("view engine", "pug");
app.set("views", "./views");

// use middlewares
app.use(express.json());
app.use(logger);
app.use("/api/courses", courses);
app.use("/", home);

// conditionally use middleware depending on environment (development or production)
// this will remove unnecessary middleware on pipeline that reduces app performance
console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // will return undefined
console.log(`App: ${app.get("env")}`); // will return "development" if not defined, use set NODE_ENV=production on CMD

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled...");
}

// DB work
dbDebugger("Connected to the database");

// SET using 'set PORT=4000'
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
