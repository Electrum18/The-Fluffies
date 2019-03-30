var timeEnd = Date.now();

const 
  PATH = require('path'),

  EXPRESS = require('express'),

  BODY_PARSER = require('body-parser'),
  COMPRESSION = require('compression'),
  HELMET = require('helmet'),
  APP = EXPRESS();

var log = (req, reason) => {
    if (!reason) { reason = ''; }

    let ip = req.ip,
        ip_length = 15 - ip.length,
        
        url = decodeURIComponent(req.originalUrl.replace(/\+/g,' ')),
        url_length = 30 - url.length;
        
    ip  = ip  + new Array(ip_length + 1).join(' ');
    url = url + new Array(url_length + 1).join(' ');

    console.log(`\x1b[36m${ip}\x1b[0m | ${url} | ${Date()} \x1b[41m\x1b[30m${reason}\x1b[0m`);
};

APP.enable('trust proxy');

APP.set('view engine', 'pug');
APP.set('views', PATH.join(__dirname, 'web'));

APP.use(HELMET({ dnsPrefetchControl: { allow: true } }));
APP.use(COMPRESSION());

APP.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Something broke!');
});

APP.use(BODY_PARSER.json());
APP.use(BODY_PARSER.urlencoded({ extended: true }));

APP.use(EXPRESS.static(__dirname + '/web'));

APP.get('/',        (req, res) => { res.render('intro');   log(req); });
APP.get('/about',   (req, res) => { res.render('about');   log(req); });
APP.get('/support', (req, res) => { res.render('support'); log(req); });

APP.get('/editor/pony', (req, res) => {
  if (req.query.g !== 'female' ) {  // g is gender
    res.redirect('/');
    log(req, 'UNKNOWN DATA');
  } else {
    res.render('editor');
    log(req);
  }
});

APP.get('*', (req, res) => {
  res.redirect('/');
  log(req, 'UNKNOWN PAGE');
});

APP.listen(process.env.PORT || 5000, (err) => {
  if (err) { return console.log('Happened something bad!', err); }
  console.log(`\x1b[33m Server ready, port: \x1b[35m${process.env.PORT || 5000}\x1b[0m | ${Date.now() - timeEnd} msec`);
});