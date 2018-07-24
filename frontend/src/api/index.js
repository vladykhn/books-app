import * as axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3000/books',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

async function addBook (bookData) {
  const { data } = await request.post('/', bookData)
  return data
}

async function updateBook (id, bookData) {
  const { data } = await request.put(`/${id}`, bookData)
  return data
}

async function getBooks (offset = 0) {
  const response = await request.get('/', {
    params: {
      offset
    }
  })
  const { data: { data = [] } } = response
  return data
}

async function getSingleBook (id) {
  const { data } = await request.get(`/${id}`)
  return data
}

async function getRandomBook (id) {
  const { data } = await request.get(`/random`)
  return data
}

export default {
  addBook,
  updateBook,
  getBooks,
  getSingleBook,
  getRandomBook
}
