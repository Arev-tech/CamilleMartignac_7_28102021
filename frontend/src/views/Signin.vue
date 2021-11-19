<template>
  <div>
    <Head />
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
  import Head from '@/components/Head.vue'

  export default {
    name: 'Home',
    components: {
      Head,
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