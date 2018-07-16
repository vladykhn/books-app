export default {
  availableBooks (state) {
    return state.books
  },
  currentOffset (state) {
    return state.offset
  },
  formData (state) {
    return state.formData
  },
  choosenBook (state) {
    return state.books.filter(book => book.id === state.choosenBook)
  }
}
