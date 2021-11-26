<template>
  <div class="container">
    <p class="text-danger">{{ error }}</p>
    <div class="row justify-content-center">
      <label class="label" for="email">Saisissez votre adresse email :</label><br>
      <input required autofocus class="input" type="email" v-model="email" id="email" placeholder="Email">
    </div>
    <div class="row justify-content-center">
      <label class="label" for="mdp">Saisissez votre mot de passe :</label><br>
      <input required class="input" type="password" v-model="password" placeholder="Mot de passe" id="mdp">
    </div>
    <div class="row justify-content-center">
      <button @click="loginAccount" class="btn" :class="{'disabled' : !validate}">Se connecter</button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import router from '@/router/index';

  export default {
    name: 'Login',
    data: function() {
      return {
        email: '',
        password: '',
        error: '',
      }
    },
    computed: {
      validate : function() {
        if(this.email != '' && this.password != '' && this.username != '' ) {
          return true;
        } else {
          return false;
        }
      }
    },
    methods: {
      loginAccount: function() {
        //eslint-disable-next-line
        const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //eslint-disable-next-line
        const validPassword = /^(?=.*\d).{4,12}$/;
        if(this.email.match(validEmail) && this.password.match(validPassword)) {
        axios.post('http://localhost:3000/api/users/login', {
          email: this.email,
          password: this.password,
        })
        .then(function(res) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId', res.data.userId);
          router.push('/feed');
        })
        .catch(function(err) {
          console.log(err);
          alert("impossible de vous connecter");
        });
        } else {
          this.error = "email ou mot de passe invalide";
        }
      }
    },
  }
</script>
<style scoped>
.container{
  background-color: #2c3e50;
  width: fit-content;
  border-radius: 20px;
  padding: 20px 0;
  border: solid 1px white;
  margin: 20px auto;
}
.btn {
  background-color: white;
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
.input{
    margin: 0 20px;
    padding: 10px;
    border: solid 0.1px #2c3e50;
    border-radius: 10px;
    color: #2c3e50;
}

</style>