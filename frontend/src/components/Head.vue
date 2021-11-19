<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <router-link to='/'><img class="logo" alt="Vue logo" src="../assets/logo.png"></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Head'
  
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
img{
  margin: 0;
  width: 30%;
  height: 10%;
}
</style>
