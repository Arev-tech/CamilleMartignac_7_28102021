import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signin from '../views/Signin.vue'
import Feed from '../views/Feed.vue'
import createMessage from '../views/createMessage.vue'
import Message from '../views/Message.vue'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin
  },
  {
    path:'/feed',
    name: 'Feed',
    component: Feed
  },
  {
    path: '/createMessage',
    name: 'createMessage',
    component: createMessage
  },
  {
    path: '/message',
    name: 'Message',
    component: Message
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;