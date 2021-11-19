<template>
<h1>{{ message }}</h1>
</template>

<script>
export default {

  name: 'Message',
  props: {
      message: String
  }
}
</script>

<style scoped>
h1{
  margin:30px !important;
}
</style>