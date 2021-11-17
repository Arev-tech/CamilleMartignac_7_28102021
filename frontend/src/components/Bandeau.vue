<template>
  <div class="container">
    <div class=" bandeau row text-center">
        <h1>{{ msg }}</h1>
        <div id="hello"></div>
        <p>{{ msg2 }}</p>
    </div>
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
.row-btn{
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.bandeau{
  display: flex;
  flex-direction: column;
}

.btn{
  margin: 15px;
  color: #2c3e50;
  background-color: white;
}
</style>