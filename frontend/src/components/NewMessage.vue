<template>
  <div class=container>
    <div class="row justify-content-center">
      <input required autofocus class="input" type="text" v-model="title" id="title" placeholder="Title">
    </div>
    <div class="row justify-content-center">
      <textarea required class="input" type="text" v-model="content" placeholder="Exprimez-vous" id="content"></textarea>
    </div>
    <div class="row justify-content-center">
      <input required @change="uploadImage" accept="image/*" class="file" type="file" name="image" id="image">
    </div>
    <div class="row justify-content-center">
      <button @click="CreateMessage" class="btn">Publier</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import router from '@/router/index';
export default { 
  name: 'NewMessage',
  data() {
    return {
        content: '',
        title: '',
    }
  },
  methods: {
    uploadImage (e) {
      let img = e.target.files[0]
      let fd= new FormData()
      fd.append('image', img)
      console.log(fd);
      axios.post('http://localhost:3000/upload-image', fd)
        .then(resp => {
          this.imagePath = resp.data.path
        })
        .catch(err => {
          console.log(err);
        });
    },
    CreateMessage: function() {
        var data = qs.stringify({
        'title': this.title,
        'content': this.content,
        'attachment': this.imagePath,
      });
      
        var config = {
        method: 'post',
        url: 'http://localhost:3000/api/messages/new',
        headers: { 
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        data: data
        };
        axios(config)
        .then(function () {
            alert('Message créé');
            router.push('/feed');
        })
        .catch(function (error) {
            console.log(error);
            alert(error);
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
.file{
  background-color: white;
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