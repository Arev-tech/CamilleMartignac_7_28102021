<template>
  <div class="card" >
    <p class="text-danger">{{ error }}</p>
    <h4 class="card-title text-left"><strong>{{ message.User.username }}</strong> </h4>
    <h4 class="text-left">{{ message.title }}</h4>
    <h6 class="card-subtitle mb-2 text-muted text-left">{{ message.updatedAt }}</h6>
    <div class="card-body">
      <img  class="card-img" :src="message.attachment" alt="gif">
      <p class="card-text">{{ message.content }}</p>
    </div>
    <p class="danger"><strong>{{ noComment }}</strong></p>
    <div class="card-footer" v-for="commentaire in commentaires" :key="commentaire.id" :id="commentaire.id">
      <p class="titreCommentaire text-muted text-left"><strong>{{ commentaire.User.username }} le {{ commentaire.createdAt.split('T')[0].split('-').reverse()[0] }}/{{ commentaire.createdAt.split('T')[0].split('-').reverse()[1] }}/{{ commentaire.createdAt.split('T')[0].split('-').reverse()[2] }}</strong></p>
      <p class="text-left">{{ commentaire.Commentaire }} </p>
      <button @click="deleteCom(commentaire)" class="btn btn-danger com" v-bind:class="{'disabled': !isYourCom(commentaire)}">Supprimer ce commentaire</button>
    </div>
    <div class="row">
      <input type="text" class="input1 IWB" v-model="commentaire" placeholder="Commentez">
      <input type="button" class="input2 IWB" @click="newCommentaire" value="Envoyez">
    </div>
    <div>
      <button @click="deleteMessage" class="btn btn-danger" :class="{'disabled' : !isOwner}">Supprimer ce message</button>
      <button @click="maskMessage" class="btn btn-danger" :class="{'disabled' : !isAdmin}">Masquer ce message</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/router/index';
export default { 
  name: 'OneMessage',
  data: function() {
    return {
      message : JSON.parse(localStorage.getItem('OneMessage')),
      commentaires: JSON.parse(localStorage.getItem('Commentaires')),
      error: '',
      noComment: '',
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
      } else {
        return false;
      }
    },
    isAdmin: function() {
      if(localStorage.getItem('isAdmin') == 'true') {
        console.log('ok');
        return true;
      } else {
        console.log('error');
        return false;
      }
    }
  },
  mounted: function() {
    this.getAllCommentaires();
  },
  methods: {
    isYourCom: function(commentaire){
      if(localStorage.getItem('userId') == commentaire.UserId){
        return true;
      }
      else{
        return false;
      }
    },
    maskMessage: function() {
      var config = {
        method: 'post',
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
        alert('message masqué');
        router.push('/feed');
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    deleteCom: function(btn) {
      if(localStorage.getItem('userId') == btn.UserId){
        localStorage.setItem('ComId', btn.id);
        this.deleteCommentaire();
        localStorage.removeItem('ComId');
        localStorage.removeItem('Commentaires');
        window.location.reload();
      } else {
        alert("vous n'êtes pas authoriser à supprimer ce commmentaire");
      }
    },
    deleteCommentaire: function() {
      var config = {
        method: 'delete',
        url: 'http://localhost:3000/api/messages/me/commentaires',
        headers: { 
          'Authorization': 'Bearer ' + localStorage.getItem('token'), 
          'Content-Type': 'application/x-www-form-urlencoded',
          'id': localStorage.getItem('ComId')
        }
      };
      console.log(config);
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
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
      var config = {
        method: 'post',
        url: 'http://localhost:3000/api/messages/me/commentaires',
        headers: { 
          'Authorization': 'Bearer ' + localStorage.getItem('token'), 
          'Content-Type': 'application/x-www-form-urlencoded',
          'messageId': localStorage.getItem('messageId'),
          'commentaire': this.commentaire,
        }
      };
      console.log(config.headers);
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        alert("impossible d'enregistrer un nouveau commentaire");
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
        if(data.data.length == 0) {
          this.noComment = "il n'y a pas encore de commentaires";
        } else {
          this.commentaires = data.data;
        }
        this.noComment = '';
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
  width: 60%;
  margin:20px auto;
  border-radius: 20px;
  padding: 20px;
  color: #2c3e50;
}
.card-footer{
  border: solid 2px ;
}
a{
  text-decoration: none;
}
button{
  margin: 10px;
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