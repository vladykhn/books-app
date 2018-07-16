const Koa = require('koa');
const bodyParser = require('koa-body');
const koaLogger = require('koa-logger');
const cors = require('@koa/cors');

const router = require('./routes');
const { logger } = require('./utils');

const config = {
  port: process.env.PORT || '3005',
};

const app = new Koa();
const uploadDir = './images';

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


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(config.port, error => logger.info(error || `Backend App is listening on ${config.port}`));
