<template>
  <div class="container">
    <div class="row justify-content-center">
      <router-link to="/createMessage"><strong>Quelque chose à poster ?</strong></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BandeauMessage'
} 
</script>

<style scoped>
a{
  color: #2c3e50;
  background-color: white;
  border: solid 1px white;
  padding: 15px;
  border-radius: 20px;
  text-decoration: none;
}
a:hover{
  background-color: #2c3e50;
  color: white;
  transition: 0.4s;
}
</style>