var timeEnd = Date.now();

const PATH = require("path"),

      EXPRESS = require("express"),

      BODY_PARSER = require("body-parser"),
      COMPRESSION = require("compression"),
      HELMET = require("helmet"),
      APP = EXPRESS();

APP.enable("trust proxy");

APP.set("view engine", "pug");
APP.set("views", PATH.join(__dirname, "web"));

APP.use(HELMET({ dnsPrefetchControl: { allow: true } }));
APP.use(COMPRESSION());

APP.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something broke!");
});

APP.use(BODY_PARSER.json());
APP.use(BODY_PARSER.urlencoded({ extended: true }));

APP.use("/editor/pony-female", EXPRESS.static(__dirname));
APP.get("/editor/pony-female", (req, res) => {
  res.render("editor");
  console.log(`${req.ip} | ${decodeURIComponent(req.originalUrl.replace(/\+/g," "))} | ${Date()}`);
});

APP.use("/home", EXPRESS.static(__dirname));
APP.get("/home", (req, res) => {
  res.render("intro");
  console.log(`${req.ip} | ${decodeURIComponent(req.originalUrl.replace(/\+/g," "))} | ${Date()}`);
});

APP.use("/about", EXPRESS.static(__dirname));
APP.get("/about", (req, res) => {
  res.render("about");
  console.log(`${req.ip} | ${decodeURIComponent(req.originalUrl.replace(/\+/g," "))} | ${Date()}`);
});

APP.use("/support", EXPRESS.static(__dirname));
APP.get("/support", (req, res) => {
  res.render("support");
  console.log(`${req.ip} | ${decodeURIComponent(req.originalUrl.replace(/\+/g," "))} | ${Date()}`);
});

APP.get("/", (req, res) => { res.redirect("/home"); });

APP.listen(process.env.PORT || 5000, (err) => {
  if(err){ return console.log("Happened something bad!", err); }
  console.log(`Server ready, port: ${process.env.PORT || 5000} | ${Date.now() - timeEnd} msec`);
});