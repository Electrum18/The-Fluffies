var timeEnd = Date.now(), ping = 0;

const PATH = require("path"),

      EXPRESS = require("express"),
      ROUTER_PING = require("express-router-ping"),

      BODY_PARSER = require("body-parser"),
      COMPRESSION = require("compression"),
      HELMET = require("helmet"),
      APP = EXPRESS();

var date = () => {
  var GetDate = new Date(),
      Days = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
      Day = Days[GetDate.getDay()];
  return `${Day} ${GetDate.getHours()}:${GetDate.getMinutes()}:${GetDate.getSeconds()}`;

};

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
//APP.use("/editor/pony-female", ROUTER_PING);

APP.get("/editor/pony-female", (req, res) => {
  res.render("editor");
  console.log(`${req.ip} | ${decodeURIComponent(req.originalUrl.replace(/\+/g," "))} | ${date()}`);
});

APP.use("/home", EXPRESS.static(__dirname));
APP.get("/home", (req, res) => {
  res.render("intro");
  console.log(`${req.ip} | ${decodeURIComponent(req.originalUrl.replace(/\+/g," "))} | ${date()}`);
});

APP.use("/about", EXPRESS.static(__dirname));
APP.get("/about", (req, res) => {
  res.render("about");
  console.log(`${req.ip} | ${decodeURIComponent(req.originalUrl.replace(/\+/g," "))} | ${date()}`);
});

APP.use("/help", EXPRESS.static(__dirname));
APP.get("/help", (req, res) => {
  res.render("help");
  console.log(`${req.ip} | ${decodeURIComponent(req.originalUrl.replace(/\+/g," "))} | ${date()}`);
});

APP.get("/", (req, res) => { res.redirect("/home"); });
//APP.get("/editor/pony-female/pingInfo", (req, res) => { res.send({ ping: ping }); });

APP.listen(process.env.PORT || 3000, (err) => {
  if(err){ return console.log("Happened something bad!", err); }
  console.log(`Server ready, port: ${process.env.PORT || 3000} | ${Date.now() - timeEnd} msec`);
});