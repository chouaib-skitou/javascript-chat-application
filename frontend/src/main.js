import { createApp } from 'vue'
import App from './App.vue'

// import the vue router necessary functions
import { createRouter, createWebHistory } from 'vue-router'

import InscriptionComponent from "./components/InscriptionComponent.vue"
import ConnexionComponent from "./components/ConnexionComponent.vue"
import MessagesComponent from "./components/MessagesComponent.vue"
import HomeComponent from "./components/HomeComponent.vue"
import AjouterContactComponent from "./components/AjouterContactComponent.vue"
import MessagerieComponent from "./components/MessagerieComponent.vue"

import NotificationsComponent from "./components/NotificationsComponent.vue"

import ProfileComponent from "./components/ProfileComponent.vue"

// Define some routes
// Each route should map to a component.
const routes = [
    { path: "/profile", component: ProfileComponent },

    { path: '/', component: HomeComponent },
    { path: '/messagerie', component: MessagesComponent },
    { path: "/contacts/add", component: AjouterContactComponent },

    { path: "/chat/:email", component: MessagerieComponent },

    { path: '/register', component: InscriptionComponent },
    { path: '/login', component: ConnexionComponent },

    { path: "/notifications", component: NotificationsComponent }
];

// Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
    // Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

const app = createApp(App)
app.use(router)

document.title = "ChatApp"

app.config.globalProperties.$mainURL = "http://localhost:8080"
app.config.globalProperties.$apiURL = "http://localhost:3000"
app.config.globalProperties.$accessTokenKey = "accessTokenKey"
app.config.globalProperties.$months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

app.config.globalProperties.$user = null;
app.config.globalProperties.$login = false;
app.config.globalProperties.$headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("accessTokenKey")
};

app.mount('#app')