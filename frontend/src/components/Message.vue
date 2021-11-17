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