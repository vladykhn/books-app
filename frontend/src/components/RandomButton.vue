<template>
  <div class="random-button">
    <button>Покажи мне случайную книгу</button>
  </div>
</template>

<script>
export default {
  name: 'RandomButton'
}
</script>

<style>
.random-button {
  grid-area: button;
  margin: 20px;
  justify-self: center;
}
.random-button button {
  border: 1px solid;
  background-color: lightgray;
  border-radius: 10px;
  font-size: 16px;
  padding: 16px 32px;
}

</style>
