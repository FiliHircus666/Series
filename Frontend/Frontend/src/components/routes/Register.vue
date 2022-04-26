<template>
    <div class="my-border p-3">
        <h1>Register</h1>
        <div class="mb-3">
            <label for="text" class="form-label">userName</label>
            <input
                type="text"
                class="form-control"
                id="userName"
                v-model="loginData.userName" />
        </div>
        <div class="mb-3 row">
            <label for="password" class="form-label">Password</label>
            <div class="col-sm-10">
                <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model="loginData.password" />
            </div>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
                type="email"
                class="form-control"
                id="email"
                v-model="loginData.email" />
        </div>
        <button type="button" class="btn btn-primary" @click="onClickLogin()">
            Primary
        </button>
        <div class="alert alert-danger m-3" role="alert" v-if="noSuccess">
            A bejelntkezés sikertelen: Rossz email vagy jelszó!
        </div>
        <div>
            <ul>
                <li>{{ loginResponse.success }}</li>
                <li>{{ loginResponse.message }}</li>
            </ul>
            <textarea
                name=""
                id=""
                cols="85"
                rows="5"
                v-model="loginResponse.token"></textarea>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            loginData: {
                userName: "user236",
                password: "userPass1",
            },
            loginResponse: {
                success: 0,
                message: "",
                token: null,
            },
            noSuccess: false,
        };
    },
    methods: {
        onClickLogin() {
            const url = `${this.$loginServer}/api/users/login`;
            let headers = new Headers();
            headers.append("Content-Type", "application/json");
            fetch(url, {
                method: "POST", // or 'PUT'
                headers: headers,
                body: JSON.stringify(this.loginData),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data);
                    this.loginResponse = data;
                    this.$root.$data.token = data.token;
                    this.$root.$data.user = data.data;
                    if (data.success) {
                        this.$router.push({path: "/"})
                    } else {
                        this.noSuccess = true;
                        setTimeout(()=>{
                            this.noSuccess = false;
                        },2000)
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        },
    },
};
</script>

<style>
</style>