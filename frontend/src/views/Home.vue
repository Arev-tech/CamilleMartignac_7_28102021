<template>
  <div>
    <Bandeau msg="Bienvenue sur Groupomania" msg2="Avec Groupomania, le réseau social d'entreprise, restez en contact !!"/>
  </div>
  
</template>

<script>
// @ is an alias to /src
  import Bandeau from '@/components/Bandeau.vue'

  export default {
    name: 'Home',
    components: {
      Bandeau,
    },
    mounted : function() {
      localStorage.clear();
    }
  }
</script>

<style scoped>
img{
  width: 40%;
}
div{
  background-color: #2c3e50;
}
</style>