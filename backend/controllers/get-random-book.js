const db = require('../db');
const { logger } = require('../utils');

async function getRandomBook(ctx) {
  try {
    const { rows } = await db.query('SELECT * FROM books ORDER BY random() LIMIT 1');
    if (!rows || !rows[0]) {
      ctx.status = 204;
      ctx.body = {
        status: 'success',
        data: 'Sorry, we have not any random book',
      };
      return;
    }
    const book = rows[0];
    ctx.status = 200;
    ctx.body = {
      status: 'success',
      data: book,
    };
  } catch (error) {
    logger.error(error);
    ctx.status = 500;
    ctx.body = {
      status: 'error',
      data: 'We can not get this book for you. DB problem',
    };
  }
}

module.exports = { getRandomBook };
