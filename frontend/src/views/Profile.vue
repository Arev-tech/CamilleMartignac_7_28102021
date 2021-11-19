<template>
  <div>
    <Header/>
    <Message :message="message" />
    <Profile />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  import Profile from '@/components/Profile.vue'
  import Message from '@/components/Message.vue'

  export default {
    name: 'Home',
    components: {
      Footer,
      Header,
      Message,
      Profile
    },
    data() {
      return {
        message: 'Vos informations : '
      }
    }
  }
</script>