const Koa = require('koa');
const bodyParser = require('koa-body');
const koaLogger = require('koa-logger');
const cors = require('@koa/cors');
const serve = require('koa-static');
const router = require('./routes');
const db = require('./db');

const { logger } = require('./utils');

const config = {
  port: process.env.PORT || '3005',
};

const app = new Koa();
const uploadDir = './images';

app.context.db = db;

app.use(cors());
app.use(koaLogger());
app.use(bodyParser({
  formidable: {
    uploadDir,
    keepExtensions: true,
    multiples: false,
  },
  multipart: true,
}));

const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = {
      message: error.message,
      error: error.data || 'Not specified',
    };
  }
};

app
  .use(errorHandler)
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve('./images', {
    gzip: true,
  }));

app.listen(config.port, error => logger.info(error || `Backend App is listening on ${config.port}`));
