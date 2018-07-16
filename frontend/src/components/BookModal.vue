<template>
  <div class="bookmodal">
    <p>Title: {{ choosenBook.title }} (Author: {{ choosenBook.author }})</p> 
    <img v-if="choosenBook.store === 'local'" :src="'https://localhost:3000/static/' + imageLink" />
    <img v-else :src="imageLink" />
    <p>Date: {{choosenBook.date}}</p>
    <p>Desc: {{choosenBook.description}}</p>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'BookModal',
  props: {
    bookId: String,
  },
  computed: {
    ...mapGetters([
      'choosenBook'
    ])
  }
}
</script>

<style scoped>
</style>
