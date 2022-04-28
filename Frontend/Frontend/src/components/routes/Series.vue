<template>
    <div class=" my-border">
        <div>
            <h1>Series</h1>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">SeriesName</th>
                        <th scope="col">ReleaseDate</th>
                        <th scope="col">ageLimit</th>
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
                        v-for="(series, index) in serieses"
                        :key="index"
                        class="static"
                        @click="onClickRow(series.id)"
                        :class="{ 'bg-primary': series.id == isValid }">
                        <td>{{ series.name }}</td>
                        <td>{{ series.releaseDate }}</td>
                        <td>{{ series.ageLimit }}</td>
                        <td>
                            <!-- edit -->
                            <button
                                type="button"
                                class="btn  btn-light ms-1 btn-sm"
                                @click="onClickEdit(series.id)">
                                <i class="bi bi-pencil"></i>
                            </button>

                            <!-- delete -->
                            <button
                                type="button"
                                class="btn btn-light ms-1 btn-sm"
                                @click="onClickDelete(series.id)">
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
                                    Az sorozat kiadási dátuma nem megfelelő                                </div>
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
    constructor(
        id = null,
        name = null,
        releaseDate = null,
        ageLimit = null
    ) {
        this.id = id;
        this.name = name;
        this.releaseDate = releaseDate;
        this.ageLimit = ageLimit;
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
            form: null,
            isValid: null,
        };
    },
    created() {
        this.getSeries();
    },
    mounted() {
        this.modal = new bootstrap.Modal(document.getElementById("modal"), {
            Keyboard: false,
        });
        this.form = document.querySelector(".needs-validation");
    },
    methods: {
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
            let data = this.serieses;
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