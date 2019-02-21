var timeEnd = Date.now(), ping = 0;

const REQUEST = require("request"),
      PATH = require("path"),

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

/*setInterval(()=>{REQUEST({
    "uri": "https://the-fluffies.glitch.me/editor/mlp/pony-female/",
    "method": "GET"
}, ping++)}, 30);
setInterval(()=>{ping=0}, 30e3),*/
};

APP.enable("trust proxy");

APP.set("view engine", "pug");
APP.set("views", PATH.join(__dirname, "web"));

APP.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something broke!");
});

APP.use(BODY_PARSER.json());
APP.use(BODY_PARSER.urlencoded({ extended: true }));

APP.use("/editor/mlp/pony-female", EXPRESS.static(__dirname));
APP.use("/editor/mlp/pony-female", ROUTER_PING);

APP.use(COMPRESSION());
APP.use(HELMET({ dnsPrefetchControl: { allow: true } }));

APP.get("/editor/mlp/pony-female", (req, res) => {
  res.render("editor/editor");
  console.log(`${req.ip} | ${decodeURIComponent(req.originalUrl.replace(/\+/g," "))} | ${date()}`);
});

APP.get("/", (req, res) => { res.redirect("/editor/mlp/pony-female"); });
APP.get("/editor/mlp/pony-female/pingInfo", (req, res) => { res.send({ ping: ping }); });

APP.listen(process.env.PORT || 3000, (err) => {
  if(err){ return console.log("Случилось что-то плохое!", err); }
  console.log(`Сервер создан, порт сервера: ${process.env.PORT || 3000} | ${Date.now() - timeEnd} мсек`);
});