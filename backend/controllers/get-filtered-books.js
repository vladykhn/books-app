const db = require('../db');
const { logger, validateFilter, formatDate } = require('../utils');

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
  try {
    const { error, value } = validateFilter(ctx.request.query);
    if (error) {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        data: 'Your params is invalid',
        error,
      };
      return;
    }
    const { query, filterArgs } = buildFilterQuery(value);
    const { rows } = await db.query(query, filterArgs);

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

module.exports = { getFilteredBooks };
