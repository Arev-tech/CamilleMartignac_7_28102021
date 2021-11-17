<template>
  <div class=container>
    <div class="row justify-content-center">
      <input required autofocus class="input" type="text" v-model="title" id="title" placeholder="Title">
    </div>
    <div class="row justify-content-center">
      <textarea required class="input" type="text" v-model="content" placeholder="Exprimez-vous" id="content"></textarea>
    </div>
    <div class="row justify-content-center">
      <v-text-field class="input" label="fichier" filled auto-grow v-model="attachment" id="attachment"></v-text-field>
    </div>
    <div class="row justify-content-center">
      <button @click="CreateMessage" class="btn">Publier</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/router/index';
import qs from 'qs';
export default { 
  name: 'NewMessage',
  data() {
    return {
        content: '',
        title: '',
        attachment: '',
    }
  },
  methods: {
    CreateMessage: function() {
        var data = qs.stringify({
        'title': this.title,
        'content': this.content,
        'attachment': this.attachment,
        });
        
        var config = {
        method: 'post',
        url: 'http://localhost:3000/api/messages/new',
        headers: { 
            'Authorization': 'Bearer ' + localStorage.getItem('token'), 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            console.log('message enregistré');
            router.push('/feed');
        })
        .catch(function (error) {
            console.log(error);
        });

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