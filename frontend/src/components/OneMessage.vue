<template>
  <div class="card" >
    <img class="card-img-top">
    <div class="card-body">
      <h2 class="card-title">{{ message.User.username }} a publié : {{ message.title }}</h2>
      <p class="card-text">{{ message.content }}</p>
      <div class="card-footer text-muted" v-for="commentaire in commentaires" :key="commentaire.id">
        <p>{{ commentaire.User.username }} a commenté : {{ commentaire.Commentaire }} </p>
      </div>
    </div>
    <input type="text" class="input IWB" v-model="commentaire" placeholder="Exprimez-vous">
    <input type="button" @click="newCommentaire" value="Envoyez votre commentaire">
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
export default { 
  name: 'OneMessage',
  data: function() {
    return {
      message : JSON.parse(localStorage.getItem('OneMessage')),
      commentaires: [],
    }
  },
  mounted: function() {
    this.getOneMessage();
    this.getAllCommentaires();
  },
  methods: {
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
    newCommentaire : function() {
      console.log(this.commentaire);
      var data = qs.stringify({
        'messageId': localStorage.getItem('messageId'),
        'commentaire': this.commentaire,
      });
      var config = {
        method: 'post',
        url: 'http://localhost:3000/api/messages/me/commentaires',
        headers: { 
          'Authorization': 'Bearer ' + localStorage.getItem('token'), 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };
      console.log(config);
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        //router.push('/feed');
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
        this.commentaires = data.data;
        console.log(data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>
.card{
  width: 50%;
  margin: auto;
}
a{
  text-decoration: none;
}
input{
  margin: auto;
  padding: 10px;
}
.IWB{
  border: none;
  padding: 20px;
}
input::placeholder {  
	text-align: center; 
}
</style>