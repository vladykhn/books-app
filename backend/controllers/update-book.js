const {
  validate,
  formatDate,
} = require('../utils');

async function updateBook(ctx) {
  const httpError = new Error('');

  const bookId = ctx.params.id;
  const { error, value } = validate(ctx.request.body);
  if (error) {
    httpError.status = 400;
    httpError.message = 'Your book data is invalid';
    httpError.data = error;
    throw httpError;
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
  const { rows: [book] } = await ctx.db.query(
    `UPDATE books
      SET title = $2, date = $3, author = $4, description = $5, image = $6, store = $7
      WHERE id = $1`, insertedValues,
  );

  if (!book) {
    httpError.message = 'Sorry, this book does not exists';
    httpError.status = 204;
    throw error;
  }
  ctx.status = 200;
  ctx.body = {
    status: 'success',
    data: book,
  };
}

module.exports = { updateBook };
