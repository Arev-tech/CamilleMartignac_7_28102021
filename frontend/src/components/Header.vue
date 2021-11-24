<template>
  <div class="container-fluid">
    <div class="row">
      <img class="logo" alt="Vue logo" src="../assets/logo.png">
      <div class="nav" id="nav">
        <router-link to="/feed" class="router nav-item">Accueil</router-link>
        <router-link to="/profile" class="router nav-item"><i class="fas fa-user-circle"></i> Profil</router-link>
        <router-link to="/" class="router nav-item"> Déconnexion</router-link>
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
.container-fluid{
  background-color: white;
  border-radius: 0 0 20px 20px;
}

.nav-item{
  margin: 0 10px;
  padding: 10px;
}
.nav-item:hover{
  text-decoration: none;
  border-bottom: solid 3px #2c3e50;
}
img{
  margin: 0;
  width: 30%;
  height: 10%;
}

.router{
  margin: 0 10px;
}
</style>
