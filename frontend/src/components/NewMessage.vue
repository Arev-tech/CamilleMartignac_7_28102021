<template>
  <div class="container">
    <div class="row justify-content-center">
      <label for="title">Titre:</label>
      <input required autofocus class="input" type="text" v-model="title" id="title" placeholder="Titre">
    </div>
    <div class="row justify-content-center">
      <label for="content">Publication: </label>
      <textarea required class="input" type="text" v-model="content" placeholder="Exprimez-vous" id="content"></textarea>
    </div>
    <div class="row justify-content-center">
      <label for="image">Choisissez votre image: </label>
      <input required @change="checkSize()" accept="image/*" class="file" type="file" name="image" id="image">
    </div>
    <div class="row justify-content-center">
      <button @click="CreateMessage" class="btn" :class="{'disabled' : !validate}">Publier</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/router/index';
export default { 
  name: 'NewMessage',
  data() {
    return {
        content: '',
        title: '',
    }
  },
  computed: {
    validate : function() {
        if(this.title != '' && this.content != '') {
          return true;
        } else {
          return false;
        }
    },
  },
  methods: {
    checkSize: function() {
      const size = document.getElementById("image").files[0].size;
      if(size > 3000000){
        alert('fichier trop volumineux, taille max: 3 Mo');
        document.getElementById("image").value= null;
      }
    },
    CreateMessage: function() {
        const img = document.getElementById("image").files[0];
        let fd = new FormData()
        fd.append('image', img, img.name);
        fd.append('title', this.title);
        fd.append('content', this.content);
        var config = {
        method: 'post',
        url: 'http://localhost:3000/api/messages/new',
        headers: { 
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        data: fd,
        };
        console.log(config);
        axios(config)
        .then(function () {
            alert('Message créé');
            router.push('/feed');
        })
        .catch(function (error) {
            console.log(error);
            alert("impossible de créer le message");
        });
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
    }
  }
}
</script>
<style scoped>
.container{
  background-color: #2c3e50;
  width: fit-content;
  border-radius: 20px;
  padding: 20px 0;
  border: solid 1px white;
}
.btn {
  background-color: white;
}
.row{
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
label {
  color: white;
  margin: 0 20px;
  padding: 10px;
}
.input{
    margin: 0 20px;
    padding: 10px;
    border: solid 0.1px #2c3e50;
    border-radius: 10px;
    color: #2c3e50;
}
</style>