<template>
  <div class="form">
    <form enctype="multipart/form-data" @submit.prevent novalidate v-if="isInitial || isSending" class="form-wrapper">
      <input v-model="title" type="text" placeholder="Название книги">
      <input v-model="author" type="text" placeholder="Автор книги">
      <datepicker v-model="date" :format="dateFormat" placeholder="Дата"></datepicker>
      <textarea v-model="description" placeholder="Описание книги"></textarea>
      <input type="file" :name="fieldName" :disabled="isSending" @change.prevent="fileChange($event.target.name, $event.target.files)" accept="image/*">
      <p v-if="isInitial">
        <button @click="submitForm()">Добавить книгу</button>
      </p>
      <p v-if="isSending">
        Обложка загружается
      </p>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import api from '../api'
import { mapGetters } from 'vuex'

const STATUS_INITIAL = 0
const STATUS_SENDING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

export default {
  name: 'Form',
  components: {
    Datepicker
  },
  data () {
    return {
      title: '',
      author: '',
      description: '',
      date: '',
      dateFormat: 'MM/dd/yyyy',
      uploadError: null,
      currentStatus: null,
      fieldName: 'image',
      offset: 0
    }
  },
  computed: {
    ...mapGetters([
      'formData'
    ]),
    isInitial () {
      return this.currentStatus === STATUS_INITIAL
    },
    isSending () {
      return this.currentStatus === STATUS_SENDING
    },
    isSuccess () {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed () {
      return this.currentStatus === STATUS_FAILED
    }
  },
  methods: {
    reset () {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.uploadError = null
    },
    submitForm () {
      this.formData.set('title', this.title)
      this.formData.set('description', this.description)
      this.formData.set('date', this.date)
      this.formData.set('author', this.author)
      api.addBook(this.formData)
    },
    fileChange (fieldName, file) {
      if (!file) {
        return
      }
      this.formData.set(fieldName, file[0], file[0].name)
    }
  },
  mounted () {
    this.reset()
  }
}
</script>

<style>
.form {
  grid-area: form;
  justify-self: center;
  margin: 20px;
}
.form-wrapper {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
  max-width: 250px;
}
.form-wrapper button {
  border: 1px solid;
  background-color: lightgray;
  border-radius: 10px;
  font-size: 16px;
  padding: 5px 25px;
}
</style>
