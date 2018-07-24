const { validateParams } = require('../utils');

async function getAllBooks(ctx) {
  const httpError = new Error();
  const { error, value } = validateParams(ctx.request.query);
  if (error) {
    httpError.status = 400;
    httpError.message = 'Your params is invalid';
    httpError.data = error;
    throw httpError;
  }
  const { offset, limit, sort } = value;
  const { rows } = await ctx.db.query(`SELECT * FROM books ORDER BY ${sort} ASC OFFSET $1 LIMIT $2`, [offset, limit]);

  if (!Array.isArray(rows)) {
    httpError.status = 204;
    httpError.message = 'Sorry, we have nothing';
    throw httpError;
  }
  ctx.status = 200;
  ctx.body = {
    status: 'success',
    data: rows,
  };
}

module.exports = { getAllBooks };
