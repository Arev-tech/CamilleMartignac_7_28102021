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
  </div>
</template>

<script>
import axios from 'axios';
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
        this.user = data.data;
        })
        .catch(function(err) {
        console.log(err);
        });
    }
}
</script>


<style scoped>
    .container{
  background-color: #2c3e50;
  width: fit-content;
  border-radius: 20px;
  padding: 20px 0;
}
.row{
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
}
</style>>