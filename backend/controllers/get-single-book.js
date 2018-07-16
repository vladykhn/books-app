const db = require('../db');
const { logger } = require('../utils');

async function getSingleBook(ctx) {
  try {
    const bookId = ctx.params.id;
    const { rows } = await db.query('SELECT * FROM books WHERE id = $1', [bookId]);
    if (!rows || !rows[0]) {
      ctx.status = 204;
      ctx.body = {
        status: 'success',
        data: 'Sorry, we have not that book',
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

module.exports = { getSingleBook };
