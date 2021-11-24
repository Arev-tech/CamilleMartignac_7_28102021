<template>
  <div class="container" window.onload="getAllMessages">
    <a href="/message" :id="message.id" v-on:click="show(message)" class="card" v-for="message in messages" :key='message.id'>
      <h2 class="card-title">{{ message.title }}</h2>
      <h6 class="card-subtitle mb-2 text-muted">{{ message.User.username }}</h6>
      <p class="card-text">{{ message.content }}</p>
      <img :src="message.attachment" alt="gif">
      <div class="card-footer text-muted">Voir les commentaires</div>
    </a>
    <div class="row">{{ error }}</div>
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
        error: '',
      }
  },
  mounted: function() {
    axios.get('http://localhost:3000/api/messages', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(data => {
      if(data.data.messages.length == 0) {
        this.error = "il n'y a encore aucun message sur le mur, postez quelque chose maintenant !"
      }
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
      this.getOneMessage();
      this.getAllCommentaires();    
    },
    getOneMessage : function() {
      var config = {
        method: 'get',
        url: 'http://localhost:3000/api/messages/me',
        headers: { 
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          id : localStorage.getItem('messageId')
        }
      }
      axios(config)
      .then(function (response) {
        const message = response.data;
        localStorage.setItem('OneMessage', JSON.stringify(message));
        
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getAllCommentaires: function() {
      var config = {
        method: 'get',
        url: 'http://localhost:3000/api/messages/me/commentaires',
        headers: { 
          'Authorization': 'Bearer ' + localStorage.getItem('token'), 
          'Content-Type': 'application/x-www-form-urlencoded',
          'id': localStorage.getItem('messageId') 
        },
      };
      axios(config)
      .then(data => {
        console.log('commentaires récupérés');
        const commentaires = data.data;
        localStorage.setItem('Commentaires', JSON.stringify(commentaires));
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
      });
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