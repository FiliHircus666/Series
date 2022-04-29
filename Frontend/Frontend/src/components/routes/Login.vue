<template>
    <div class="my-border p-3">
        <h1>Login</h1>
        <div class="mb-3">
            <p>
            If you won't have profile register <a href="#/register" class="here-color">here</a>

            </p>
            <label for="text" class="form-label"> <p>
                 userName
                </p></label>
            <div class="col-sm-2">
                <input
                    type="test"
                    class="form-control"
                    id="userName"
                    v-model="loginData.userName" />
            </div>
        </div>
        <div class="mb-4 row">
            <label for="password" class="form-label">
                <p>

                Password
                </p>
                
                </label>
            <div class="col-sm-2">
                <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model="loginData.password" />
            </div>
        </div>
        <button type="button" class="btn btn-primary" @click="onClickLogin()">
            Login
        </button>
        <!-- <button type="button" class="btn btn-primary"  @click="onClickRegistration()">
           <a  href="#/register">Register </a> 
        </button> -->
        <div class="alert alert-danger m-3" role="alert" v-if="noSuccess">
            A bejelntkezés sikertelen: Rossz username vagy jelszó!
        </div>
        <!-- <div>
            <ul>
            </ul>
            <textarea
                name=""
                id=""
                cols="85"
                rows="5"
                v-model="loginResponse.token"></textarea>
        </div> -->
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
                        this.$router.push({ path: "/" });
                    } else {
                        this.noSuccess = true;
                        setTimeout(() => {
                            this.noSuccess = false;
                        }, 2000);
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        },
        onClickRegistration() {
            const url = `${this.$loginServer}/api/users/register`;
            let headers = new Headers();
            headers.append("Content-Type", "application/json");
            fetch(url, {
                method: "POT", // or 'PUT'
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
                        this.$router.push({ path: "/login" });
                    } else {
                        this.noSuccess = true;
                        setTimeout(() => {
                            this.noSuccess = false;
                        }, 2000);
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
a {
    color: whitee;
    text-decoration: none;
}
p{
    color: white;
}
.here-color{
    color: blue;
}
li{
    color: white;
}
</style>