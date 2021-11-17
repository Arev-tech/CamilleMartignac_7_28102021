<template>
  <div>
    <Bandeau msg="Bienvenue sur Groupomania" msg2="Nous sommes ravis de vous retouver"/>
    <Footer />
  </div>
  
</template>

<script>
// @ is an alias to /src
  import Footer from '@/components/Footer.vue'
  import Bandeau from '@/components/Bandeau.vue'

  export default {
    name: 'Home',
    components: {
      Footer,
      Bandeau,
    },
    mounted : function() {
      localStorage.clear();
    }
  }
</script>

<style scoped>
div{
  margin: 60px auto;
}
</style>