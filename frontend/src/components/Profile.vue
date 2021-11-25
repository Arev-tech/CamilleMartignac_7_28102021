<template>
  <div class="container">
    <div class="row justify-content-center">
      <p>Votre email : <strong>{{ user.email }}</strong> </p>
    </div>
    <div class="row justify-content-center">
      <p>Votre pseudo : <strong>{{ user.username }}</strong> </p>
    </div>
    <div class="row justify-content-center">
      <p>Votre bio : <strong>{{ user.bio }}</strong> </p>
    </div>
    <div class="row justify-content-center">
      <button @click="deleteAccount()" class ="btn btn-danger">Supprimer le compte</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/router/index';

export default {
    name: 'Profile',
    data: function() {
        return{
            user: []
        }
    },
    mounted: function() {
      axios.get('http://localhost:3000/api/users/me', {
      headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
      }
      })
      .then(data => {
        if(data.data.bio == '') {
          data.data.bio = "Vous n'avez pas de bio pour le moment";
        }
        this.user = data.data;
      })
      .catch(function(err) {
        console.log(err);
        alert("impossible de récupérer vos informations");
      });
    },
    methods: {
      deleteAccount: function() {
        axios.delete('http://localhost:3000/api/users/me', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
        })
        .then(data => {
          console.log(data);
          router.push('/');
        })
        .catch(function(err) {
          console.log(err);
          alert('impossible de supprimer le compte');
        });
      }
    }
}
</script>


<style scoped>
.container{
  background-color: #2c3e50;
  width: fit-content;
  border-radius: 20px;
  padding: 20px 0;
  border: solid white 1px;
  margin: 20px auto;
}
.row{
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
}
</style>>