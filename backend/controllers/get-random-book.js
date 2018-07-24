async function getRandomBook(ctx) {
  const httpError = new Error();
  const { rows: [book] } = await ctx.db.query('SELECT * FROM books ORDER BY random() LIMIT 1');
  if (!book) {
    httpError.message = 'Sorry, we can not add that book for you';
    httpError.status = 204;
    throw httpError;
  }
  ctx.status = 200;
  ctx.body = {
    status: 'success',
    data: book,
  };
}

module.exports = { getRandomBook };
