<template>
  <div class="container-fluid">
    <div class="row">
      <img alt="Vue logo" src="../assets/logo.png">
      <div class="nav" id="nav">
        <router-link to="/profile" class="router"><i class="fas fa-user-circle"></i> Profile</router-link>|
        <router-link to="/feed" class="router">Accueil</router-link>|
        <router-link to="/" class="router"> Déconnexion</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row{
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.nav-item{
  margin: 0 20px;
}
.nav-item:hover{
  text-decoration: none;
  zoom: 105%;
  color: #42b983 !important;
}

img{
  margin: 0;
  width: 20%;
  height: 10%;
}

.router{
  margin: 0 10px;
}
</style>
