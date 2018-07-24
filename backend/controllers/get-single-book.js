async function getSingleBook(ctx) {
  const httpError = new Error();
  const { params: { id } } = ctx;
  const { rows: [book] } = await ctx.db.query('SELECT * FROM books WHERE id = $1', [id]);
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

module.exports = { getSingleBook };
