export default {
  setBooks (state, newBooks) {
    state.books = state.books.concat(newBooks)
  },
  setStatus (state, newStatus) {
    state.status = newStatus
  },
  setOffset (state, newOffset) {
    state.offset = newOffset
  },
  setFormData (state, newFormData) {
    state.formData = newFormData
  }
}
