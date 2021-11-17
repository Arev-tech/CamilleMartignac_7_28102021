<template>
  <div>
    <Header/>
    <OneMessage />
    <Footer />
  </div>
  
</template>

<script>
// @ is an alias to /src
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  import OneMessage from '@/components/OneMessage.vue'

  export default {
    name: 'Message',
    components: {
      Footer,
      OneMessage,
      Header,
    }
  }
</script>