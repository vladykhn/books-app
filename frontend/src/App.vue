<template>
  <div class="app">
    <Form />
    <RandomButton />
    <BooksList />
  </div>
</template>

<script>
import Form from './components/Form.vue'
import BooksList from './components/BooksList.vue'
import RandomButton from './components/RandomButton.vue'

export default {
  name: 'app',
  components: {
    Form,
    BooksList,
    RandomButton
  }
}
</script>

<style>
.app {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 25% 75%;
  grid-template-areas:
    "form button"
    "main main";
  text-align: center;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 20px 40px 20px 40px;
  background-color: white;
  min-width: 800px;
}
body {
  background-color: lightgray;
}
</style>
