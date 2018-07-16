const db = require('../db');
const { logger, validateParams } = require('../utils');

async function getAllBooks(ctx) {
  try {
    const { error, value } = validateParams(ctx.request.query);
    if (error) {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        data: 'Your params is invalid',
        error,
      };
      return;
    }
    const { offset, limit, sort } = value;
    const { rows } = await db.query(`SELECT * FROM books ORDER BY ${sort} DESC OFFSET $1 LIMIT $2`, [offset, limit]);

    if (!rows || !rows[0]) {
      ctx.status = 204;
      ctx.body = {
        status: 'success',
        data: 'Sorry, we have nothing',
      };
      return;
    }

    const books = rows;
    ctx.status = 200;
    ctx.body = {
      status: 'success',
      data: books,
    };
  } catch (error) {
    logger.error(error);
    ctx.status = 500;
    ctx.body = {
      status: 'error',
      data: 'We can not get any books for you. DB problem',
    };
  }
}

module.exports = { getAllBooks };
