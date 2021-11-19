<template>
  <div class="container" window.onload="getAllMessages">
    <a href="/message" :id="message.id" v-on:click="show(message)" class="card" v-for="message in messages" :key='message.id'>
      <h2 class="card-title">{{ message.title }}</h2>
      <h6 class="card-subtitle mb-2 text-muted">{{ message.User.username }}</h6>
      <p class="card-text">{{ message.content }}</p>
      <img :src="message.attachment" alt="gif">
      <div class="card-footer text-muted">Voir les commentaires</div>
    </a>
  </div>
</template>

<script>
import axios from 'axios';
export default { 
  name: 'Publication',
  data: function() {
      return {
        messages: [],
        title : '',
        content: '',
        username: '',
        attachment: '',
        id: '',
      }
  },
  mounted: function() {
    axios.get('http://localhost:3000/api/messages', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(data => {
      this.messages = data.data.messages;
    })
    .catch(function(err) {
      console.log(err);
      alert(err);
    });
  },
  methods: {
    show: function(btn) {
      localStorage.setItem('messageId', btn.id);
    }
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
  color: black;
  margin: 40px auto;
  border-radius: 20px;
  cursor: pointer;
  width: 65%;
}
</style>