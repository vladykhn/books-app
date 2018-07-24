const {
  validateBody,
  formatDate,
} = require('../utils');

async function addBook(ctx) {
  const httpError = new Error('');

  const { error, value } = validateBody(ctx.request.body);
  if (error) {
    httpError.status = 400;
    httpError.message = 'Your book data is invalid';
    httpError.data = error;
    throw httpError;
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

  const { rows: [{ id }] } = await ctx.db.query(
    `INSERT INTO books (title, date, author, description, image, store)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id`, insertBookValues,
  );
  if (!id) {
    httpError.message = 'Sorry, we can not add that book for you';
    httpError.status = 204;
    throw error;
  }
  ctx.status = 200;
  ctx.body = {
    status: 'success',
    data: id,
  };
}

module.exports = { addBook };
