const Router = require('koa-router');
const {
  addBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  getFilteredBooks,
  getRandomBook,
} = require('../controllers');

const router = new Router({
  prefix: '/books',
});


router.get('/', getAllBooks);
router.get('/filter', getFilteredBooks);
router.get('/random', getRandomBook);
router.get('/:id', getSingleBook);
router.post('/', addBook);
router.put('/:id', updateBook);

module.exports = router;
