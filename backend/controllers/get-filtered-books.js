const { validateFilter, formatDate } = require('../utils');

function buildFilterQuery(params) {
  const filterQuery = [];
  const filterArgs = [];
  let argCounter = 1;
  let query = 'SELECT * FROM books';

  const {
    title, date, author, description, store,
  } = params;

  if (title || date || author || description || store) {
    query += ' WHERE ';

    if (title) {
      filterQuery.push(`title = $${argCounter}`);
      filterArgs.push(title);
      argCounter += 1;
    }
    if (date) {
      const formatedDate = formatDate(date);
      filterQuery.push(`date = $${argCounter}`);
      filterArgs.push(formatedDate);
      argCounter += 1;
    }
    if (author) {
      filterQuery.push(`author = $${argCounter}`);
      filterArgs.push(author);
      argCounter += 1;
    }
    if (description) {
      filterQuery.push(`description = $${argCounter}`);
      filterArgs.push(description);
      argCounter += 1;
    }
    if (store) {
      filterQuery.push(`store = $${argCounter}`);
      filterArgs.push(store);
    }
    if (filterArgs.length > 1) {
      query += filterQuery.join(' AND ');
    } else if (filterArgs.length === 1) {
      query += filterQuery[0];
    }
    return { query, filterArgs };
  }
  return { query };
}

async function getFilteredBooks(ctx) {
  const httpError = new Error();
  const { error, value } = validateFilter(ctx.request.query);
  if (error) {
    httpError.status = 400;
    httpError.message = 'Your params is invalid';
    httpError.data = error;
    throw httpError;
  }
  const { query, filterArgs } = buildFilterQuery(value);
  const { rows } = await ctx.db.query(query, filterArgs);

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

module.exports = { getFilteredBooks };
