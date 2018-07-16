const db = require('../db');
const {
  logger,
  validate,
  formatDate,
} = require('../utils');

async function updateBook(ctx) {
  try {
    const bookId = ctx.params.id;

    const { error, value } = validate(ctx.request.body);
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
    let { image = '' } = value;

    const formatedDate = formatDate(date);

    let store = 'remote';

    const isNewFile = !!ctx.params.files.image;
    if (isNewFile) {
      const { path } = ctx.request.files.image;
      [, image] = path.split('images/');
      store = 'local';
    }
    const insertedValues = [bookId, title, formatedDate, author, description, image, store];
    const { rows } = await db.query(
      `UPDATE books
       SET title = $2, date = $3, author = $4, description = $5, image = $6, store = $7
       WHERE id = $1`, insertedValues,
    );

    if (!rows || !rows[0]) {
      ctx.status = 204;
      ctx.body = {
        status: 'success',
        data: 'Sorry, thas book does not exist',
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
      data: 'We can not update this book for you. DB problem',
    };
  }
}

module.exports = { updateBook };
