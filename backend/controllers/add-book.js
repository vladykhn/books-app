const db = require('../db');
const {
  logger,
  validateBody,
  formatDate,
} = require('../utils');

async function addBook(ctx) {
  try {
    const { error, value } = validateBody(ctx.request.body);
    if (error) {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        data: 'Your book data is invalid',
        error,
      };
      return;
    }
    const {
      title, author, description, date,
    } = value;

    const formatedDate = formatDate(date);

    const store = 'local';

    let image = '';
    const isNewFile = !!ctx.request.files.image;
    if (isNewFile) {
      const { path } = ctx.request.files.image;
      [, image] = path.split('images/');
    }

    const insertBookValues = [title, formatedDate, author, description, image, store];

    const { rows } = await db.query(
      `INSERT INTO books (title, date, author, description, image, store)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`, insertBookValues,
    );

    if (!rows || !rows[0]) {
      ctx.status = 204;
      ctx.body = {
        status: 'success',
        data: 'Sorry, we can not add that book for you',
      };
      return;
    }
    const newBookId = rows[0].id;
    ctx.status = 200;
    ctx.body = {
      status: 'success',
      data: newBookId,
    };
  } catch (error) {
    logger.error(error);
    ctx.status = 500;
    ctx.body = {
      status: 'error',
      data: 'We can not add that book for you. DB problem',
    };
  }
}

module.exports = { addBook };
