require("dotenv").config();
const express = require("express");
const {
  setupKinde,
  protectRoute,
  getUser,
} = require("@kinde-oss/kinde-node-express");
const app = express();
const port = 3000;

const config = {
  issuerBaseUrl: process.env.BASE_URL,
  domain: process.env.KINDE_DOMAIN,
  secret: process.env.KINDE_SECRET,
  redirectUrl: process.env.REDIRECT_URL,
  unAuthorisedUrl: process.env.UNAUTHORISED_URL,
};

app.set("view engine", "pug");
setupKinde(config, app);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Hey",
    message: "Hello there! what would you like to do?",
  });
});

app.get("/admin", protectRoute, getUser, (req, res) => {
  res.render("admin", {
    title: "Get in!",
    message: `you are logged in ${req.user.first_name}!`,
  });
});

app.get("/no_auth", (req, res) => {
  res.render("no_auth", {
    title: "Hold up!",
    message: "You cannot access this page",
  });
});

app.listen(port, function () {
  console.log(`Starter Kit listening on port ${port}!`);
});
