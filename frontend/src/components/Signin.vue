<template>
  <div class="container">
    <div class="row justify-content-center">
        <label class="label" for="email">Saisissez votre adresse email:</label>
        <input autofocus class="input" type="email" id="email" placeholder="Email" v-model="email">
    </div>
    <div class="row justify-content-center">
        <label class="label" for="mdp">Saisissez votre mot de passe :</label>
        <input class="input" type="password" id="mdp" placeholder="Mot de passe" v-model="password">
    </div>
    <div class="row justify-content-center">
        <label class="label" for="username">Choisissez un pseudo :</label>
        <input class="input" id="username" placeholder="Pseudo" v-model="username">
    </div>
    <div class="row justify-content-center">
        <label class="label" for="bio">Dites-en plus sur vous !</label>
        <textarea placeholder="Description" v-model="bio"></textarea>
    </div>
    <div class="row justify-content-center">
      <button @click="createAccount" class="btn" :class="{'disabled' : !validatedFields}">S'inscrire</button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import router from '@/router/index';
  
  export default {
    name: 'Signin',
    data: function() {
      return {
        email: '',
        username: '',
        password: '',
        bio: '',
      }
    },
    computed: {
      validatedFields : function() {
        if(this.email != '' && this.password != '' && this.username != '' ) {
          return true;
        } else {
          return false;
        }
      }
    },
    methods: {
      createAccount: function() {
        axios.post('http://localhost:3000/api/users/register', {
          email: this.email,
          password: this.password,
          username: this.username,
          bio: this.bio
        })
        .then(function(res) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId', res.data.userId);
          router.push('/feed');
        })
        .catch(function(err) {
          console.log(err);
          alert(err);
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
  padding: 0 0 20px 0;
  border: solid 1px white;
}

.row{
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
label {
  color: white;
  margin: 0 20px;
  padding: 10px;
}

.input, textarea {
  margin: 0 20px;
  padding: 10px;
  border: solid 0.1px #2c3e50;
  border-radius: 10px;
  color: #2c3e50;
}
.btn {
  background-color: white;
}

</style>