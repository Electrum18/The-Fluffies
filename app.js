var 
  timeEnd = Date.now(),

  log = (ctx, reason, color) => {
    let ip = ctx.ip,
        ip_length = 15 - ip.length,
        
        url = decodeURIComponent(ctx.originalUrl.replace(/\+/g,' ')),
        url_length = 30 - url.length;
        
    ip  = ip  + new Array(ip_length + 1).join(' ');
    url = url + new Array(url_length + 1).join(' ');

    console.log(`\x1b[36m${ip}\x1b[0m | ${url} | ${Date()} ${color || ''}${reason || ''}\x1b[0m`);
  };

const
  Koa = require('koa'),

  staticCache = require('koa-static-cache'),
     compress = require('koa-compress'),
       helmet = require('koa-helmet'),
       router = require('koa-router')(),
        serve = require('koa-static'),
          Pug = require('koa-pug'),
  
  fs = require('fs'),
  
  app = new Koa(),
  pug = new Pug({
    viewPath: './public',
    basedir: './public',
    app: app
  });

app.proxy = true;
  
app.use(serve('./public'));
app.use(serve('./robots.txt'));

app.use(helmet({ dnsPrefetchControl: { allow: true } }));
app.use(staticCache('./public', { maxAge: 365 * 24 * 60 * 60 }));
app.use(compress({
  level: 9,
  flush: require('zlib').Z_SYNC_FLUSH
}));

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    err.status = err.statusCode || err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

router.get('/',        ctx => { ctx.render('pages/intro');   log(ctx); });
router.get('/about',   ctx => { ctx.render('pages/about');   log(ctx); });
router.get('/support', ctx => { ctx.render('pages/support'); log(ctx); });

router.get('/editor/pony', ctx => {
  if (ctx.query.g !== 'female' ) {  // g is gender
    ctx.redirect('/');
    log(ctx, 'UNKNOWN DATA','\x1b[41m\x1b[30m');
  } else {
    ctx.render('pages/editor/editor');
    log(ctx);
  }
});

router.get('*', ctx => {
  let url = decodeURIComponent(ctx.originalUrl.replace(/\+/g,' '))

  if (url === '/robots.txt') {
    ctx.body = fs.readFileSync('robots.txt', 'utf8');
    log(ctx, 'GET DATA', '\x1b[46m\x1b[30m');
  } else if (url === '/favicon.ico') {
    ctx.body = fs.readFileSync('public/img/fluffies.ico');
  } else {
    ctx.redirect('/');
    log(ctx, 'UNKNOWN PAGE', '\x1b[41m\x1b[30m');
  };
});

app.use(router.routes());

app.listen(process.env.PORT || 3000, err => {
  if (err) { return console.log('Happened something bad!', err); }
  console.log(`\x1b[33m Server ready, port: \x1b[35m${process.env.PORT || 3000}\x1b[0m | ${Date.now() - timeEnd} msec`);
});