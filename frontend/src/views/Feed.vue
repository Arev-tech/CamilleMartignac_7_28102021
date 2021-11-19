<template>
  <div class="page">
    <Header/>
    <Message :message="message" />
    <BandeauMessage />
    <Publication/>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  import Publication from '@/components/Publication.vue'
  import BandeauMessage from '@/components/BandeauMessage.vue'
  import Message from '@/components/Message.vue'

  export default {
    name: 'Feed',
    components: {
      Footer,
      Header,
      Publication,
      BandeauMessage,
      Message
    },
    data() {
      return {
        message: 'Hello'
      }
    }
  }
</script>