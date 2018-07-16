<template>
  <div class="book">
    <img v-if="choosenBook.store === 'local'" :src="'https://localhost:3000/static/' + imageLink" />
    <img v-else :src="imageLink" />    <p>{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: 'Book',
  props: {
    imageLink: String,
    title: String
  }
}
</script>

<style scoped>
.book {
  max-height: 300px;
  max-width: 300px;
}
p {
  text-align: left;
}
</style>
