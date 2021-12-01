<template>
  <div class="container">
    <p class="error text-danger"><strong>{{ error }}</strong></p>
    <div class="row justify-content-center">
      <label for="title">Titre: <em>*</em></label>
      <input required autofocus class="input" type="text" v-model="title" id="title" placeholder="Titre">
    </div>
    <div class="row justify-content-center">
      <label for="content">Publication: <em>*</em></label>
      <textarea required class="input" type="text" v-model="content" placeholder="Exprimez-vous" id="content"></textarea>
    </div>
    <div class="row justify-content-center">
      <label for="image">Choisissez votre image: <em>*</em></label>
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
        error: '',
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
        console.log(img);
        if(img != undefined ){
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
        } else {
          this.error = "Vous n'avez pas renseigné d'image";
        }
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
  margin: 20px auto;
}
.btn {
  background-color: white;
}
.disabled{
  display: none;
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
em{
  color: red;
  font-weight: 900;
}
</style>