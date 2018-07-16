<template>
  <div class="booklist">
    <Book v-for="(book, index) in availableBooks"
     v-bind:key="index"
     v-bind:imageLink="book.image"
     v-bind:title="book.title"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Book from './Book.vue'
export default {
  name: 'BooksList',
  components: {
    Book
  },
  computed: {
    ...mapGetters([
      'availableBooks',
      'currentOffset'
    ])
  },
  methods: {
    ...mapActions([
      'getMoreBooks',
      'getInitialBooks'
    ]),
    scroll () {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight
        if (bottomOfWindow) {
          this.getMoreBooks(this.currentOffset)
        }
      }
    }
  },
  mounted () {
    this.scroll()
  },
  beforeMount () {
    this.getInitialBooks()
  }
}
</script>

<style>
.booklist {
  grid-area: main;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  align-items: center;
  justify-items: center;
  margin: 20px;
}
</style>
