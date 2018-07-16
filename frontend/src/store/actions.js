import api from '../api'

export default {
  async getMoreBooks ({ commit }, offset) {
    commit('setStatus', 'LOADING')
    const books = await api.getBooks(offset)
    if (books) {
      commit('setBooks', books)
      commit('setOffset', offset + 20)
      commit('setStatus', 'LOADED')
    }
  },
  async getInitialBooks ({ commit }) {
    commit('setStatus', 'LOADING')
    const books = await api.getBooks(0)
    if (books) {
      commit('setBooks', books)
      commit('setOffset', 20)
      commit('setStatus', 'LOADED')
    }
  },
  async addBook ({ commit, dispatch }, formData) {
    commit('setStatus', 'SENDING')
    const id = await api.addBook(formData)
    if (id) {
      dispatch('getSingleBook', id)
      commit('setFormData', new FormData())
    }
  },
  async getSingleBook ({ commit }, id) {
    commit('setStatus', 'LOADING')
    const book = await api.getSingleBook(id)
    if (book) {
      commit('setBooks', book)
      commit('setStatus', 'LOADED')
    }
  }
}
