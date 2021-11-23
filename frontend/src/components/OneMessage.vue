<template>
  <div class="card" >
    <h4 class="card-title"><strong>{{ message.User.username }}</strong> a publié : <strong>{{ message.title }}</strong></h4>
    <h6 class="card-subtitle mb-2 text-muted text-left">{{ message.updatedAt }}</h6>
    <div class="card-body">
      <img  class="card-img" :src="message.attachment" alt="gif">
      <p class="card-text">{{ message.content }}</p>
    </div>
    <div class="card-footer text-muted" v-for="commentaire in commentaires" :key="commentaire.id">
      <p>{{ commentaire.User.username }} a commenté : {{ commentaire.Commentaire }} </p>
    </div>
    <div class="row">
      <input type="text" class="input1 IWB" v-model="commentaire" placeholder="Commentez">
      <input type="button" class="input2 IWB" @click="newCommentaire" value="Envoyez">
    </div>
    <button @click="deleteMessage" class="btn btn-danger" :class="{'disabled' : !isOwner}">Supprimer ce message</button>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/router/index';
import qs from 'qs';
export default { 
  name: 'OneMessage',
  data: function() {
    return {
      message : JSON.parse(localStorage.getItem('OneMessage')),
      commentaires: [],
    }
  },
  computed: {
    isOwner: function() {
        const userId = localStorage.getItem('userId');
        const message = JSON.parse(localStorage.getItem('OneMessage'));
        console.log(message.User.id);
        const messageUserId = message.User.id;
        if(userId == messageUserId) {
          return true;
        }
        else {
          return false;
        }
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
    deleteMessage: function() {
      console.log(localStorage.getItem('messageId'));
      var config = {
        method: 'delete',
        url: 'http://localhost:3000/api/messages/me',
        headers: { 
          'Authorization': 'Bearer ' + localStorage.getItem('token'), 
          'Content-Type': 'application/x-www-form-urlencoded',
          'messageid': localStorage.getItem('messageId')      

        }
      };
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        router.push('/feed');
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    newCommentaire : function() {
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
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
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
        alert(error);
      });
    }
  }
}
</script>

<style scoped>
.card{
  width: 60%;
  margin: auto;
  border-radius: 20px;
  padding: 20px;
  color: #2c3e50;
}
a{
  text-decoration: none;
}
.input1{
  width: 55%;
}
.input2{
  width: 35%;
  border-radius: 20px;
}
.input2:hover{
  filter: brightness(50%);
}
.disabled{
  display: none;
}
input{
  padding: 10px !important;
  height: 50%;
  margin: 20px 0 20px 0;
}
input:focus{
  outline: none;
}
.row{
  display: flex;
  flex-direction: row;
}
.IWB{
  border: none;
  padding: 20px;
}
input::placeholder {  
	text-align: center; 
  font-size: auto;
  }
</style>