<template>
  <div class="div">
    <Head />
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
  import Head from '@/components/Head.vue'

  export default {
    name: 'Home',
    components: {
      Head,
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