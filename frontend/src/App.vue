<template id="app">
  <app-header />
  <router-view />
  <div style="height: 80vh;"></div>
  <app-footer />
</template>

<script>
import AppHeader from './components/layouts/AppHeader.vue'
import AppFooter from './components/layouts/AppFooter.vue'

import '../public/assets/css/style.css'
import '../public/assets/css/bootstrap.min.css'
import '../public/assets/fonts/css/font-awesome.min.css'
import '../public/assets/js/jquery-3.1.1'
import '../public/assets/js/app.js'
import '../public/assets/js/bootstrap.min.js'


export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
