<template>
  <div class="div">
    <Message :message="message" />
    <Login />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
  import Footer from '@/components/Footer.vue'
  import Login from '@/components/Login.vue'
  import Message from '@/components/Message.vue'

  export default {
    name: 'Home',
    components: {
      Footer,
      Message,
      Login
    },
    data() {
      return {
        message: 'Connectez-vous:'
      }
    }
  }
</script>

<style scoped>
  .div{
    margin: 60px auto;
  }
</style>