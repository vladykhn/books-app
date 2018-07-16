import * as axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3000/books',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

async function addBook (bookData) {
  const response = await request.post('/', bookData)
  const newBook = response.data
  return newBook
}

async function updateBook (id, bookData) {
  const response = await request.put(`/${id}`, bookData)
  const updatedBook = response.data
  return updatedBook
}

async function getBooks (offset) {
  if (!offset) {
    offset = 0
  }
  const response = await request.get('/', {
    params: {
      offset
    }
  })
  const allBooks = response.data.data
  return allBooks
}

async function getSingleBook (id) {
  const response = await request.get(`/${id}`)
  const singleBook = response.data
  return singleBook
}

async function getRandomBook (id) {
  const response = await request.get(`/random`)
  const singleBook = response.data
  return singleBook
}

export default {
  addBook,
  updateBook,
  getBooks,
  getSingleBook,
  getRandomBook
}
