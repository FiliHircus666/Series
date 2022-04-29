<template>
    <div class=" my-border">
        <div>
            <h1>Favorite</h1>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">UserId</th>
                        <th scope="col">SeriesId</th>
                        <th scope="col">Watched</th>
                       <th scope="col">
                            Műveletek
                            <!-- new -->
                             <button
                                type="button"
                                class="btn btn-light ms-1 btn-sm"
                                @click="onClickNew()">
                                <i class="bi bi-plus-lg"></i> 
                             </button>
                        </th> 
                    </tr> 
                </thead>
                <tbody>
                    <tr
                        v-for="(favorite, index) in favorites"
                        :key="index"
                        class="static"
                        @click="onClickRow(favorite.id)"
                        :class="{ 'bg-primary': favorite.id == isValid }">
                        <td>{{ favorite.userId }}</td>
                        <td>{{ favorite.seriesId }}</td>
                        <td>{{ favorite.watched }}</td>
                        <td>
                            <!-- edit -->
                            <button
                                type="button"
                                class="btn  btn-light ms-1 btn-sm"
                                @click="onClickEdit(favorite.id)">
                                <i class="bi bi-pencil"></i>
                            </button>

                            <!-- delete -->
                            <button
                                type="button"
                                class="btn btn-light ms-1 btn-sm"
                                @click="onClickDelete(favorite.id)">
                                <i class="bi bi-archive"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
       
        <!-- Button trigger modal -->
        <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal">
  Launch demo modal
</button> -->

        <!-- Modal -->
        <div
            class="modal fade icons-color"
            id="modal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            {{ stateTitle }}
                        </h5>

                        <button
                            type="button"
                            class="btn-close"
                            aria-label="Close"
                            @click="onClickCancel()"></button>
                    </div>
                    <div class="modal-body">
                        <form class="row g-3 needs-validation" novalidate>
                            <!-- űrlap -->
                            <!-- name -->
                            <div class="mb-3 col-12">
                                <label for="userId" class="form-label"
                                    >UserId:
                                </label>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="userId"
                                    placeholder="User Id"
                                    v-model="favorites.userId"
                                    required />
                                <div class="invalid-feedback">
                                 
                                </div>
                            </div>

                            <!-- licenseNumber -->
                            <div class="mb-3 col-7">
                                <label for="seriesId" class="form-label"
                                    >SeriesId:
                                </label>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="seriesId"
                                    placeholder="2000"
                                    v-model="favorites.seriesId"
                                    required />
                                <div class="invalid-feedback">
                                                                </div>
                            </div>
                            <!-- hourlyRate -->
                            <div class="mb-3 col-5">
                                <label for="watched" class="form-label"
                                    >Watched
                                </label>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="watched"
                                    placeholder="16"
                                    v-model="favorites.watched"
                                    required />
                                <div class="invalid-feedback">
                                   
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            @click="onClickCancel()">
                            Cancle
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            @click="onClickSaveData()">
                            Mentés
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
class Favorite {
    constructor(
        id = null,
        userId = null,
        seriesId = null,
        watched = null
    ) {
        this.id = id;
        this.userId = userId;
        this.seriesId = seriesId;
        this.watched = watched;
    }
}

import * as bootstrap from "bootstrap";

export default {
    name: "Favorite",
    data() {
        return {
            favorites: [],
            state: "view",
            stateTitle: null,
            favorite: new Favorite(),
            form: null,
            isValid: null,
        };
    },
    created() {
        this.getFavorites();
    },
    mounted() {
        this.modal = new bootstrap.Modal(document.getElementById("modal"), {
            Keyboard: false,
        });
        this.form = document.querySelector(".needs-validation");
    },
    methods: {
        getFavorites() {
            let headers = new Headers();

            headers.append("Content-Type", "application/json");
            headers.append("Authorization", "Bearer " + this.$root.$data.token);
            const url = `${this.$loginServer}/api/user/favorite/series`;
            fetch(url, {
                method: "GET",
                headers: headers,
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data.data);
                    this.favorites = data.data;
                })
                .catch((error) => {
                    console.error("Error:", error);
                    this.favorites = [];
                });
        },
        getFavoriteById(id) {
            let headers = new Headers();

            headers.append("Content-Type", "application/json");
            headers.append("Authorization", "Bearer " + this.$root.$data.token);
            const url = `${this.$loginServer}/api/user/series/favorite/${id}`;
            fetch(url, {
                method: "GET",
                headers: headers,
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data.data);
                    this.favorites = data.data;
                })
                .catch((error) => {
                    console.error("Error:", error);
                    this.favorites = [];
                });
        },
        updateFavorite() {
            let headers = new Headers();

            headers.append("Content-Type", "application/json");
            headers.append("Authorization", "Bearer " + this.$root.$data.token);
            const url = `${this.$loginServer}/api/user/series/favorite`;
            let data = this.favorites;
            fetch(url, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data.data);
                    this.getFavorites();
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        },
        deleteFavorite(id) {
            let headers = new Headers();

            headers.append("Content-Type", "application/json");
            headers.append("Authorization", "Bearer " + this.$root.$data.token);
            const url = `${this.$loginServer}/api/user/series/favorite/${id}`;
            let data = {
                id: id
            };
            fetch(url, {
                method: "DELETE",
                headers: headers,
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data.data);
                    this.getFavorites();
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        },
        createFavorite() {
            let headers = new Headers();

            headers.append("Content-Type", "application/json");
            headers.append("Authorization", "Bearer " + this.$root.$data.token);
            const url = `${this.$loginServer}/api/user/series/favorite`;
            let data = this.favorites;
            delete data.id;
            fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data.data);
                    this.getFavorites();
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        },
        onClickNew() {
            this.state = "new";
            this.stateTitle = "Új favorite";
            this.favorites = new Favorite();
            this.modal.show();
        },
        onClickEdit(id) {
            this.state = "edit";
            this.stateTitle = "Adatmódosítás";
            this.modal.show();
            this.getFavoriteById(id);
        },
        onClickDelete(id) {
            this.state = "delete";
            this.deleteFavorite(id);
            this.state = "view";
        },
        onClickCancel() {
            this.state = "view";
            this.modal.hide();
        },
        onClickSaveData() {
            this.form.classList.add("was-validated");
            if (this.form.checkValidity()) {
                if (this.state == "edit") {
                    //put
                    this.updateFavorite();
                } else if (this.state == "new") {
                    //post
                    this.createFavorite();
                }
            } else {
                return;
            }
            this.modal.hide();
            this.state = "view";
        },
        onClickRow(id) {
            this.isValid = id;
        },
    },
};
</script>

<style>
div{color: white;}
.table{
    color: white;
    }
.icons-color{
    color: white;
}
tbody{
    max-width: 50%;
}
.modal-header{
    color: black;
}
label{
    color: black;
}
</style>