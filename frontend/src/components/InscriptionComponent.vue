<template>
  <div class="container" style="margin-top: 50px;height: 80vh;">

        <div class="row">
            <div class="col-md-12 text-center">
                <h1>Inscription</h1>
            </div>
        </div>

        <div class="row">
            <div class="offset-md-3 col-md-6">
                    <form method="POST" v-on:submit.prevent="doRegister">
                        <div class="form-group">
                            <label for="name">Nom : </label>
                            <input type="text" class="form-control" name="name" required />
                        </div>
                        <div class="form-group">
                            <label for="email">Email :</label>
                            <input type="email" class="form-control" name="email" required />
                        </div>
                        <div class="form-group">
                            <label for="password">Mot de pass</label>
                            <input type="password" class="form-control" name="password" required />
                        </div>
                        <input type="submit" v-bind:value="isLoading ? 'Loading...' : 'Register'" v-bind:disabled="isLoading" name="submit" class="btn btn-primary" />
                    </form>
              
            </div>
        </div>
    </div> !-->
</template>

<script>

    import axios from "axios"
    import swal from "sweetalert2"

    export default {
        data() {
            return {
                "isLoading": false
            }
        },

        methods: {
            doRegister: async function () {
                const form = event.target;
                const formData = new FormData(form);

                this.isLoading = true;

                const response = await axios.post(
                    this.$apiURL + "/registration",
                    formData
                );
                
                this.isLoading = false;
                swal.fire("Success", response.data.message, "success");

                if (response.data.status == "success") {
                    this.$router.push({
                        path: "/login"
                    })
                }
            }
        }
    }
</script>