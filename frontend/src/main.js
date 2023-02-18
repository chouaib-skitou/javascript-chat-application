import { createApp } from 'vue'
import App from './App.vue'


// import the vue router
import { createRouter, createWebHistory } from 'vue-router'

// import the routes
const routes = [
];

// create the router
const router = createRouter({
    history: createWebHistory(),
    routes,
});


const app = createApp(App)
app.use(router)
app.mount('#app')
