<template>
  <div class="container">
    <p class="text-danger"><strong>{{ error }}</strong></p>
    <a href="/message" :id="message.id" v-on:click="show(message)" class="card" v-for="message in messages" :key='message.id'>
      <div class="card-body">
        <h2 class="card-title text-left">{{ message.title }}</h2>
        <h6 class="card-subtitle mb-2 text-muted text-left">{{ message.User.username }} </h6>
        <h6 class="card-subtitle mb-2 text-muted text-left">Publié le {{ message.createdAt.split('T')[0].split('-').reverse()[0] }}/{{ message.createdAt.split('T')[0].split('-').reverse()[1] }}/{{ message.createdAt.split('T')[0].split('-').reverse()[2] }}</h6>
      </div>
      <img :src="message.attachment" :alt="message.content">
      <p class="card-text">{{ message.content }}</p>
      <div class="card-footer text-muted text-right">Voir les commentaires</div>
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
      let container = document.querySelector(".container");
      container.innerHTML = "Nous n'avons pas réussi à afficher le fil des messages. Vérifier que vous êtes connectés et que le serveur fonctionne correctement et rechargez la page"
    });
  },
  methods: {
    show: function(btn) {
      localStorage.setItem('messageId', btn.id);
      this.getOneMessage();
      this.getAllCommentaires();    
    },
    getOneMessage : function() {
      const connect = localStorage.getItem('token');
      if(connect != ''){
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
          alert("impossible d'afficher ce message");
        });
      } else {
        this.error = "Veuillez vous connecter pour avoir accès à cette page";
      }
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
        alert("impossible de récupérer les commentaires");
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
img{
  max-width: content-box;
  max-height: content-box;
}

</style>