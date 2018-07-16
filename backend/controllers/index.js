const { addBook } = require('./add-book');
const { getAllBooks } = require('./get-all-books');
const { getSingleBook } = require('./get-single-book');
const { updateBook } = require('./update-book');
const { getRandomBook } = require('./get-random-book');
const { getFilteredBooks } = require('./get-filtered-books');

module.exports = {
  addBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  getRandomBook,
  getFilteredBooks,
};
