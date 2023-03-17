<template style="height: 90vh;">
    <div class="container-fluid p-0" id="home-page" style="padding: 0;">
        

        <div class="container-fluid h-100 p-0">
            <div class="row justify-content-center h-100 w-100">
                <div class="col-md-4 col-xl-4 chat p-0"><div class="card mb-sm-3 mb-md-0 contacts_card">
                    <div class="card-header">
                        <div class="input-group">
                            <input type="text" placeholder="Search..." class="form-control search" v-model="searchContact" v-on:keypress="onSearchKeyPress" v-on:keyup="onSearchKeyUp" />
                            <div class="input-group-prepend">
                                <span class="input-group-text search_btn"><i class="fa fa-search" v-on:click="doSearchContact"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="card-body contacts_body">
                        <ul class="contacts">
                            <li v-for="contact in contacts" v-bind:key="contact._id" v-bind:class="contact._id == _id ? 'active' : ''">
                                <div class="d-flex bd-highlight">
                                    <div class="informations_utilisateur">
                                        <span v-text="contact.name" style="cursor: pointer;" v-bind:data-id="contact._id" v-bind:data-name="contact.name" v-bind:data-is-archive="contact.isArchive" v-on:click="onChatSelected"></span>
                                        <p v-if="(contact.unreadMessages > 0)" v-text="' (' + contact.unreadMessages + ')'" class="text-danger"></p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="card-footer"></div>
                </div></div>
                <div class="col-md-8 col-xl-8 chat p-0">
                    <div class="card">
                        <div class="card-header message_tete">
                            <div class="d-flex bd-highlight">
                                <div class="informations_utilisateur">
                                    <span>Messages avec <span v-text="name"></span></span>
                                    <p><span v-text="totalMessages" style="font-size: 10px; color: rgba(255,255,255,0.6);"></span> Messages</p>
                                </div>
                            </div>
                            <div class="text-right">
                    <router-link class="btn btn-primary" to="/contacts/add">Add Contact</router-link>
                </div>

                            <span id="action_menu_btn" class="more-options" v-on:click="showContactOptions"></span>
                        </div>
                        <div class="card-body message_body">

                            <div v-for="msg in messages" v-bind:key="msg._id">

                                <template v-if="user != null && user.email == msg.sender.email">
                                    <div class="d-flex justify-content-end mb-4">
                                        <div class="message_box_envoie">
                                            <template class="more-options" v-bind:is-my-message="true">
                                                <span v-text="msg.message"></span>
                                            </template>

                                            <p class="message_date message-data-time" v-text="getMessageTime(msg.createdAt)"></p>
                                        </div>

                                        <div class="img_cont_msg">
                                            <img v-bind:src="getPicture(msg.sender)" class="rounded-circle user_img_msg" />
                                        </div>
                                    </div>
                                </template>

                                <template v-else>
                                    <div class="d-flex justify-content-start mb-4">
                                        <div class="img_cont_msg">
                                            <img v-bind:src="getPicture(msg.sender)" class="rounded-circle user_img_msg" />
                                        </div>

                                        <div class="message_box">
                                            <template class="more-options"  v-bind:is-my-message="false">
                                                <span v-text="msg.message"></span>
                                            </template>

                                            <p class="message_date message-data-time" v-text="getMessageTime(msg.createdAt)"></p>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="input-group">
                                <textarea v-model="message" class="form-control type_msg" placeholder="..."></textarea>
                                <div class="input-group-append">
                                    <span class="input-group-text send_btn"><i class="fa fa-location-arrow" v-on:click="sendMessage"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="contextMenuContactOptions" class="context-menu" style="display: none"> 
        <ul class="menu">
            <li><a href="javascript:void(0)" v-on:click="deleteContact"><i class="fa fa-trash" aria-hidden="true"></i> Delete</a></li>
        </ul>
    </div>

    <div id="contextMenu" class="context-menu" style="display: none"> 
        <ul class="menu">
            <li class="copy"><a href="javascript:void(0)" v-on:click="copyMessage"><i class="fa fa-copy" aria-hidden="true"></i> Copy</a></li>
        </ul>
    </div>
</template>

<script>
    import axios from "axios"
    import swal from "sweetalert2"
    import store from "../vuex/store"

    
    export default {

        data() {
            return {
                _id: "",
                name: "",
                message: "",
                page: 0,
                receiver: null,
                btnLoadMoreClass: "fa fa-repeat",
                hasMoreMessages: true,
                selectedMessageId: 0,
                selectedMessageText: "",
                password: "",
                searchContact: ""
            }
        },

        computed: {
            contacts() {
                return store.getters.getContacts
            },

            messages() {
                return store.getters.getMessages
            }
        },

        methods: {
            onSearchKeyPress: function () {
                if (event.key == "Enter") {
                    this.doSearchContact()
                }
            },

            onSearchKeyUp: function () {
                this.doSearchContact()
            },
            
            showContactOptions: function () {
                var menu = document.getElementById("contextMenuContactOptions")
                menu.style.display = 'block'
                menu.style.left = event.pageX + "px"
                menu.style.top = event.pageY + "px"
            },

            copyMessage: function() {
                navigator.clipboard.writeText(this.selectedMessageText)
            },

            showMoreOptions: function (msg) {
                const isMyMessage = event.target.getAttribute("is-my-message")
                this.selectedMessageId = msg._id
                this.selectedMessageText = msg.message
                
                var menu = document.getElementById("contextMenu")
                menu.style.display = 'block'
                if (isMyMessage == "true") {
                    menu.style.left = (event.pageX - 200) + "px"
                } else {
                    menu.style.left = event.pageX + "px"
                }
                menu.style.top = event.pageY + "px"

                document.querySelector(".bookmark i").className = "fa fa-bookmark-o"

                if (msg.bookmarkBy) {
                    document.querySelector(".bookmark i").className = "fa fa-bookmark"
                }
            },

            attachEventListeners: function() {
                const self = this

                document.addEventListener('click', function(e) {
                    const moreOptions = document.querySelectorAll(".more-options")
                    let isClickedMoreOptions = true
                    for (let a = 0; a < moreOptions.length; a++) {
                        if (moreOptions[a].contains(e.target)) {
                            // Clicked in box
                            isClickedMoreOptions = true
                            break
                        } else {
                            // Clicked outside the box
                            isClickedMoreOptions = false
                        }
                    }
                    if (!isClickedMoreOptions) {
                        document.getElementById("contextMenu").style.display = "none"
                        document.getElementById("contextMenuContactOptions").style.display = "none"
                    }
                })
            },

            getChatPersonPicture: function (user) {
                if (typeof user.picture !== "undefined" && user.picture != "") {
                    return this.$apiURL + "/" + user.picture
                }
                return "../../assets/img/avatar2.png"
            },

            getPicture: function (user) {
                if (typeof user.picture !== "undefined") {
                    return this.$apiURL + "/" + user.picture
                }
                return "../../assets/img/avatar7.png"
            },

            doSearchContact: async function () {
                const formData = new FormData()
                formData.append("searchContact", this.searchContact)
                
                const response = await axios.post(
                    this.$apiURL + "/contact/search",
                    formData,
                    {
                        headers: this.$headers
                    }
                )

                if (response.data.status == "success") {
                    store.commit("setContacts", response.data.data)
                } else {
                    swal.fire("Error", response.data.message, "error")
                }
            },

            doSearch: async function () {
                const form = event.target
                const formData = new FormData(form)
                formData.append("email", this.email)
                formData.append("password", this.password)
                
                const response = await axios.post(
                    this.$apiURL + "/chat/search",
                    formData,
                    {
                        headers: this.$headers
                    }
                )

                if (response.data.status == "success") {
                    store.commit("setMessages", [])
                    for (let a = 0; a < response.data.data.length; a++) {
                        store.commit("prependMessage", response.data.data[a])
                    }
                    this.attachEventListeners()
                } else {
                    swal.fire("Error", response.data.message, "error")
                }
            },

            getMessageTime: function (time) {
                const dateObj = new Date(time)
                let timeStr = dateObj.getDate() + " " + this.$months[dateObj.getMonth()] + ", " + dateObj.getFullYear() + " " + dateObj.getHours() + ":" + dateObj.getMinutes() + ":" + dateObj.getSeconds()
                return timeStr
            },

            loadMore: function () {
                this.btnLoadMoreClass = "fa fa-spinner fa-spin"
                this.page++
                this.getData()
            },
            
            sendMessage: async function () {

                const formData = new FormData()
                formData.append("_id", this._id)
                formData.append("message", this.message)
                formData.append("password", this.password)

                const response = await axios.post(
                    this.$apiURL + "/chat/send",
                    formData,
                    {
                        headers: this.$headers
                    }
                )

                if (response.data.status == "success") {
                    this.message = ""

                    store.commit("appendMessage", response.data.messageObject)
                    this.attachEventListeners()
                } else {
                    swal.fire("Error", response.data.message, "error")
                }
            },

            deleteContact: async function () {
                const self = this

                swal.fire({
                    title: 'Are you sure?',
                    text: "This will be removed from your contact",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then(async function(result) {
                    if (result.isConfirmed) {

                        self.isDeleting = true;
                        const formData = new FormData()
                        formData.append("_id", self._id)

                        const response = await axios.post(
                            self.$apiURL + "/contact/delete",
                            formData,
                            {
                                headers: self.$headers
                            }
                        )
                        self.isDeleting = false

                        if (response.data.status == "success") {
                            swal.fire(
                                'Deleted!',
                                response.data.message,
                                'success'
                            );

                            const contactsArr = self.contacts;
                            for (let a = 0; a < contactsArr.length; a++) {
                                if (contactsArr[a]._id == self._id) {
                                    contactsArr.splice(a, 1);
                                    break;
                                }
                            }
                            self.contacts = contactsArr

                            store.commit("setMessages", [])
                            self.totalMessages = 0
                            self.name = ""
                            self._id = ""
                        } else {
                            swal.fire("Error", response.data.message, "error");
                        }
                    }
                })
            },

            onChatSelected: function () {
                const self = this
                store.commit("setMessages", [])
                this._id = event.target.getAttribute("data-id")
                this.name = event.target.getAttribute("data-name")

                this.getChat()
            },

            getChat: async function () {
                const self = this
                
                const formData = new FormData()
                formData.append("_id", this._id)
                formData.append("page", this.page)
                formData.append("password", this.password)

                const response = await axios.post(
                    this.$apiURL + "/chat/fetch",
                    formData,
                    {
                        headers: this.$headers
                    }
                )

                this.btnLoadMoreClass = "fa fa-repeat"

                if (response.data.status == "success") {

                    this.totalMessages = response.data.totalMessages

                    for (let a = 0; a < response.data.messages.length; a++) {
                        store.commit("prependMessage", response.data.messages[a])
                    }
                    this.hasMoreMessages = (response.data.messages.length == 0) ? false : true
                    this.receiver = response.data.receiver
                    this.user = response.data.user
                    this.attachEventListeners()
                } else {
                    swal.fire("Error", response.data.message, "error")
                }
            },

            getData: async function () {
                const self = this

                const response = await axios.post(
                    this.$apiURL + "/contact/fetch",
                    null,
                    {
                        headers: this.$headers
                    }
                )

                if (response.data.status == "success") {
                    store.commit("setContacts", response.data.contacts)
                } else {
                    swal.fire("Error", response.data.message, "error");
                }
            }
        },

        mounted: function () {
            this.getData()
        },

        watch: {
            $route: function (to, from) {
                store.commit("setMessages", [])
                store.commit("setContacts", [])
                this._id = ""
                this.name = ""
                this.isArchive = false
            }
        }
    }
</script>

<style>
 

     
</style>