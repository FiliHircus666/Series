<template>
    <div class="my-border">
        <button
            type="button"
            class="btn btn-light ms-1 btn-sm"
            @click="onClickNew()">
            <i class="bi bi-plus-lg"></i>
        </button>
        <div class="row row-cols-1 row-cols-md-4 row-cols-sm-2 g-4 p-4">
            <div class="col" v-for="(series, index) in serieses" :key="index">
                <div class="card h-100">
                    <div class="card-body card-txt-color">
                        <div v-html="getVideoFromLink(series.videoLink)"></div>

                        <h4 class="card-title">
                            {{ series.name }}
                        </h4>

                        <!-- <p v-html="embed" class="card-text"><a :href="gamelink.link">
                            {{ gamelink.link }} </a></p> -->
                        <p class="card-title">{{ series.releaseDate }}</p>
                        <p class="card-text">{{ series.ageLimit }}</p>
                        <div class="row">
                            <button
                                type="button"
                                class="
                                    btn btn-light
                                    ms-1
                                    btn-sm
                                    col-lg-4 col-sm-12 col-md-4
                                "
                                @click="onClickEdit(series.id)"
                                v-if="loggedIn()">
                                <i class="bi bi-pencil"></i>
                            </button>

                            <!-- delete -->
                            <button
                                type="button"
                                class="
                                    btn btn-light
                                    ms-1
                                    btn-sm
                                    col-lg-4 col-sm-12 col-md-4
                                "
                                @click="onClickDelete(series.id)"
                                v-if="loggedIn()">
                                <i class="bi bi-archive"></i>
                            </button>
                            <!-- Favorite -->
                            <button
                                type="button"
                                class="
                                    btn btn-light
                                    ms-1
                                    btn-sm
                                    col-lg-3 col-sm-12 col-md-4
                                "
                                @click="onClickFavorite(series.id)"
                                v-if="loggedIn()">
                                <i class="bi bi-star"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
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
                                <label for="name" class="form-label"
                                    >Név:
                                </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="name"
                                    placeholder="Series Name"
                                    v-model="serieses.name"
                                    required />
                                <div class="invalid-feedback">
                                    Az sorozat neve kötelező!
                                </div>
                            </div>

                            <!-- licenseNumber -->
                            <div class="mb-3 col-7">
                                <label for="releaseDate" class="form-label"
                                    >releaseDate:
                                </label>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="releaseDate"
                                    placeholder="2000"
                                    v-model="serieses.releaseDate"
                                    required />
                                <div class="invalid-feedback">
                                    Az sorozat kiadási dátuma nem megfelelő
                                </div>
                            </div>
                            <!-- hourlyRate -->
                            <div class="mb-3 col-5">
                                <label for="ageLimit" class="form-label"
                                    >ageLimit
                                </label>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="ageLimit"
                                    placeholder="16"
                                    v-model="serieses.ageLimit"
                                    required />
                                <div class="invalid-feedback">
                                    A korhatár kötelező
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

class Series {
    constructor(id = null, name = null, releaseDate = null, ageLimit = null,videoLink = null) {
        this.id = id;
        this.name = name;
        this.releaseDate = releaseDate;
        this.ageLimit = ageLimit;
        this.videoLink = videoLink;
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
            seroesId: null,
            form: null,
            embed: null,
            isValid: null,
        };
    },
    created() {
        this.getSeriesLink();
        this.getSeries();
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
            const url = `${this.$loginServer}/api/user/series`;
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
            const url = `${this.$loginServer}/api/user/series/${id}`;
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
        updateSeries() {
            let headers = new Headers();

            headers.append("Content-Type", "application/json");
            headers.append("Authorization", "Bearer " + this.$root.$data.token);
            const url = `${this.$loginServer}/api/user/series`;
            let data = this.serieses;
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
            const url = `${this.$loginServer}/api/user/series/${id}`;
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
                    console.log("Success:", data.data);
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
            const url = `${this.$loginServer}/api/user/series`;
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
        getSeriesLink() {
            let headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", "Bearer " + this.$root.$data.token);
            const url = `${this.$loginServer}/api/series/serieslink`;
            fetch(url, {
                method: "GET",
                headers: headers,
            })
                .then((response) => response.json())
                .then((data) => {
                    this.series = data.data;
                })
                .catch((error) => {
                    console.error("Error:", error);
                    this.series = [];
                });
        },
        getVideoFromLink(videoLink) {
            // videoLink = videoLink.split("=")[1];
            return `<iframe width="100%" height="315"
                src=" https://youtube.be/embed/${videoLink}"
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; 
                autoplay; 
                clipboard-write; 
                encrypted-media; 
                gyroscope; 
                picture-in-picture" allowfullscreen>
                </iframe>`;
        },
        onClickNew() {
            this.state = "new";
            this.stateTitle = "Új sorozat";
            this.serieses = new Series();
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