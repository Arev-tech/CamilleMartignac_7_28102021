<template>
  <div>
    <Header/>
    <Message :message="message" />
    <NewMessage />
    <Footer />
  </div>
  
</template>

<script>
// @ is an alias to /src
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  import Message from '@/components/Message.vue'
  import NewMessage from '@/components/NewMessage.vue'

  export default {
    name: 'createMessage',
    components: {
      Footer,
      Header,
      Message,
      NewMessage
    },
    data() {
        return {
            message : 'Exprimez-vous :'
        }
    }
  }
</script>