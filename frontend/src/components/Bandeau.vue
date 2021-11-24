<template>
  <div class="container">
    <div class="bandeau row text-center">
        <h1>{{ msg }}</h1>
        <div id="hello"></div>
        <p>{{ msg2 }}</p>
    </div>
    <img src="../assets/lien.jpeg">
    <div class="row row-btn">
      <router-link class="btn btn-secondary" to="/login">Se connecter</router-link>
      <router-link class="btn btn-secondary" to="/signin">S'inscrire</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bandeau',
  props: {
    msg: String,
    msg2: String
  }
}
</script>

<style scoped>

.container{
  padding: 40px 0;
}
.row{
  margin: 20px;
}
.row-btn{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
img{
  border-radius: 20px;
  border: solid white 2px;
  width:100%;
}
.bandeau{
  display: flex;
  flex-direction: column;
}

.btn{
  margin: 15px;
  color: #2c3e50;
  background-color: white;
  zoom: 140%;
  border-radius:20px;
}
.btn:hover{
  background-color:#2c3e50;
  color: white;
}
</style>