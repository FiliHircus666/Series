<template>
    <div class="my-border">
        <h1>Series</h1>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Series Name</th>
                    <th scope="col">Release date</th>
                    <th scope="col">Age limit</th>
                    <th scope="col">Category Name</th>
                    <th scope="col">
                        <!-- new -->
                        <button
                            type="button"
                            class="btn btn-outline-primary ms-1 btn-dark"
                            @click="onClickNew()">
                            <i class="bi bi-plus-lg"></i>
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(series, index) in serieses" :key="index">
                    <td>{{ series.seriesName }}</td>
                    <td>{{ series.releaseDate }}</td>
                    <td>{{ series.ageLimit }}</td>
                    <td>{{ series.categoryName }}</td>

                    <td>
                        <!-- edit -->
                        <button
                            type="button"
                            class="btn btn-outline-warning ms-1 btn-sm"
                            @click="onClickEdit(series.id)">
                            <i class="bi bi-pencil"></i>
                        </button>

                        <!-- delete -->
                        <button
                            type="button"
                            class="btn btn-outline-danger ms-1 btn-sm"
                            @click="onClickDelete(series.id)">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- Button trigger modal -->
        <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal">
  Launch demo modal
</button> -->

        <!-- Modal -->
        <div
            class="modal fade"
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
                                <label for="seriesName" class="form-label"
                                    >Sorozat név:
                                </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="seriesName"
                                    placeholder="Sorozat neve"
                                    v-model="series.seriesName"
                                    required />
                                <div class="invalid-feedback">
                                    A sorozat kötelező!
                                </div>
                            </div>
                            <div class="mb-3 col-12">
                                <label for="releaseDate" class="form-label"
                                    >Kiadási dátum:
                                </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="releaseDate"
                                    placeholder="Kiadási dátum"
                                    v-model="series.releaseDate"
                                    required />
                                <div class="invalid-feedback">
                                    A kiadási dátum kötelező!
                                </div>
                            </div>
                            <div class="mb-3 col-12">
                                <label for="ageLimit" class="form-label"
                                    >Korhatár:
                                </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="ageLimit"
                                    placeholder="Korhatár"
                                    v-model="series.ageLimit"
                                    required />
                                <div class="invalid-feedback">
                                    A korhatár kötelező!
                                </div>
                            </div>
                            <div class="mb-3 col-12">
                                <label for="categories" class="form-label"
                                    >Kategória név:
                                </label>
                                <select
                                    id="categories"
                                    class="form-select"
                                    v-model="series.categoryId">
                                    <option
                                        v-for="(category,index) in categories"
                                        :key="index"
                                         :value="category.id">
                                        {{category.categoryName}}
                                    </option>
                                </select>
                                <div class="invalid-feedback">
                                    A kategória kötelező!
                                </div>
                            </div>
                            <!-- licenseNumber -->

                            <!-- hourlyRate -->
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
class Series {
    constructor(
        id = null,
        seriesName = null,
        releaseDate = null,
        ageLimit = null,
        categoryId = null
    ) {
        this.id = id;
        this.seriesName = seriesName;
        this.releaseDate = releaseDate;
        this.ageLimit = ageLimit;
        this.categoryId = categoryId;
    }
}

import * as bootstrap from "bootstrap";

export default {
    name: "Series",
    data() {
        return {
            serieses: [],
            state: "view",
            stateTitle: null,
            series: new Series(),
            categories: [],
            form: null,
            isValid: null,
        };
    },
    created() {
        // this.getSeriesLink();
        this.getSeries();
        this.getCategories();
    },
    mounted() {
        this.modal = new bootstrap.Modal(document.getElementById("modal"), {
            Keyboard: false,
        });
        this.form = document.querySelector(".needs-validation");
    },
    methods: {
        loggedIn() {
            return Boolean(this.$root.$data.user.permission);
        },

        getSeries() {
            let headers = new Headers();

            headers.append("Content-Type", "application/json");
            headers.append("Authorization", "Bearer " + this.$root.$data.token);
            const url = `${this.$loginServer}/api/series`;
            fetch(url, {
                method: "GET",
                headers: headers,
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data.data);
                    this.serieses = data.data;
                })
                .catch((error) => {
                    console.error("Error:", error);
                    this.serieses = [];
                });
        },
        getSeriesById(id) {
            let headers = new Headers();

            headers.append("Content-Type", "application/json");
            headers.append("Authorization", "Bearer " + this.$root.$data.token);
            const url = `${this.$loginServer}/api/series/${id}`;
            fetch(url, {
                method: "GET",
                headers: headers,
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data.data);
                    this.series = data.data;
                })
                .catch((error) => {
                    console.error("Error:", error);
                    this.series = new Series();
                });
        },
           getCategories() {
            let headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", "Bearer " + this.$root.$data.token);
            const url = `${this.$loginServer}/api/categories`;
            fetch(url, {
                method: "GET",
                headers: headers,
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Category data:", data.data);
                    this.categories = data.data;
                })
                .catch((error) => {
                    console.error("Error:", error);
                    this.categories = [];
                });
        },
        updateSeries() {
            let headers = new Headers();

            headers.append("Content-Type", "application/json");
            headers.append("Authorization", "Bearer " + this.$root.$data.token);
            const url = `${this.$loginServer}/api/series`;
            let data = this.series;
            fetch(url, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data.data);
                    this.getSeries();
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        },
        deleteSeries(id) {
            let headers = new Headers();

            headers.append("Content-Type", "application/json");
            headers.append("Authorization", "Bearer " + this.$root.$data.token);
            const url = `${this.$loginServer}/api/series`;
            let data = {
                id: id,
            };
            fetch(url, {
                method: "DELETE",
                headers: headers,
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Delete data:", data.data);
                    this.getSeries();
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        },
        createSeries() {
            let headers = new Headers();

            headers.append("Content-Type", "application/json");
            headers.append("Authorization", "Bearer " + this.$root.$data.token);
            const url = `${this.$loginServer}/api/series`;
            let data = this.series;
            delete data.id;
            fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data.data);
                    this.getSeries();
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        },
     
        onClickNew() {
            this.state = "new";
            this.stateTitle = "Új sorozat";
            this.series = new Series();
            this.modal.show();
        },
        onClickEdit(id) {
            this.state = "edit";
            this.stateTitle = "Adatmódosítás";
            this.modal.show();
            this.getSeriesById(id);
        },
        onClickDelete(id) {
            this.state = "delete";
            this.deleteSeries(id);
            this.state = "view";
        },
        onClickCancel() {
            this.state = "view";
            this.modal.hide();
        },
        //  onClickFavorite(id){
        //     this.state = "new";
        //     this.state = "Favorite-hoz adás";
        //     this.favorite = new Favorite();
        //     this.state = "view";
        // },
        onClickSaveData() {
            this.form.classList.add("was-validated");
            if (this.form.checkValidity()) {
                if (this.state == "edit") {
                    //put
                    this.updateSeries();
                } else if (this.state == "new") {
                    //post
                    this.createSeries();
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
.button-right {
    text-align: justify;
    margin: 0 40%;
    width: 20%;
}
div {
    color: white;
}
.table {
    color: white;
}
.icons-color {
    color: white;
}
tbody {
    max-width: 50%;
}
.modal-header {
    color: black;
}
label {
    color: black;
}
h4,
p {
    color: black;
}
img {
    max-width: 100%;
}
textarea {
    max-width: 75%;
    margin: 0 12%;
}
</style>