<template>
  <div>
    <Message :message="message" />
    <Signin />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
  import Footer from '@/components/Footer.vue'
  import Signin from '@/components/Signin.vue'
  import Message from '@/components/Message.vue'

  export default {
    name: 'Home',
    components: {
      Footer,
      Message,
      Signin
    },
    data() {
      return {
        message: 'Inscrivez-vous:'
      }
    }
  }
</script>

<style scoped>
  div{
    margin: 60px auto;
  }
</style>