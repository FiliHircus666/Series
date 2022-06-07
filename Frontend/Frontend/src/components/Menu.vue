<template>
    <div class="my-border">
        <!-- 5. Cserélkük le a lineket: a -> router-link, href -> to, link -> route (útvonal) -->

        <nav class="navbar navbar-expand-lg navbar-dark text-white" >
            <div class="container-fluid">
                <router-link class="navbar-brand" to="/">SeriesHub</router-link>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                         <li class="nav-item" v-if="loggedIn() != 1 || loggedIn() == 2">
                             <router-link class="nav-link"
                                to="/register"
                                role="button"
                                aria-expanded="false">
                                Register</router-link>
                         </li>
                        <!--#region adatKarbantartás -->
                        <li class="nav-item dropdown" v-if="loggedIn() == 'null' || loggedIn() == 1" >
                            <a
                                class="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                adatKarbantartás
                            </a>
                            <ul
                                class="dropdown-menu"
                                aria-labelledby="navbarDropdown">
                                <li>
                                    <router-link
                                        class="dropdown-item"
                                        to="/series"
                                        >Sorozatok</router-link
                                    >
                                </li>
                                <li><hr class="dropdown-divider" /></li>
                            <li v-if="loggedIn() !=  1 ||loggedIn() == permission == 0 ">
                                    <router-link
                                        class="dropdown-item"
                                        to="/users"
                                        
                                        >Users</router-link
                                    >
                                </li>
                            </ul>
                        </li>
                        
                        <!--#endregion adatKarbantartás -->

                        <!--#region login -->
                        <li class="nav-item dropdown" v-if="loggedIn() == 1 || loggedIn() == 2">
                            <a
                                class="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                {{ $root.$data.user.userName }}
                            </a>
                            <ul
                                class="dropdown-menu"
                                aria-labelledby="navbarDropdown">
                                <li @click.prevent="onClicklogout()">
                                    <router-link
                                        class="dropdown-item"
                                        to="/login"
                                        >Logout</router-link
                                    >
                                </li>
                                <li>
                                    <router-link
                                        class="dropdown-item"
                                        to="/profile"
                                        >Profil</router-link
                                    >
                                </li>
                                <li>
                                    <router-link
                                        class="dropdown-item"
                                        to="/favorite"
                                        >Favorite</router-link
                                    >
                                </li>
                            </ul>
                        </li>
                        <!--#endregion login -->
                        <li class="nav-item">
                            <router-link
                                class="nav-link"
                                to="/login"
                                v-if="!loggedIn() != null"
                                >Login</router-link
                            >
                        </li>
                    </ul>
                    
                    <form class="d-flex">
                        <input
                            class="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search" />
                        <button class="btn btn-outline-success" type="submit">
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
class User {
    constructor(
        userName = null,
        password = null,
        Email = null,
        permission = null
    ) {
        this.userName = userName;
        this.password = password;
        this.Email = Email;
        this.permission = permission;
    }
}

export default {
    name: "Menu",
    methods: {
        loggedIn() {
            return Boolean(this.$root.$data.user.permission,this.$root.$data.user.token) 
        },
        onClicklogout() {
            this.$root.$data.token = null;
            this.$root.$data.user = new User();
           
        },
    },
};
</script>

<style>
li{
    color: black;
}
 .navbar-nav{
    display: block;
    float: none;
    /* vertical-align: top; */
    margin:  0 auto;
    text-align: center;
    font-size: 20px;
  
}
.navbar-nav > li{
    display: inline-block;
    /* text-align: center; */
    float: none;
    
}

</style>