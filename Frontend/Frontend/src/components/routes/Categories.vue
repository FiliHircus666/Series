<template>
    <div class="my-border">
        <h1>Categories</h1>
        <table class="table table-hover">
            <thead>
                <tr>
                    
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
                <tr v-for="(category, index) in categories" :key="index">
                    
                    <td>{{ category.categoryName }}</td>
                    
                    <td>
                        <!-- edit -->
                        <button
                            type="button"
                            class="btn btn-outline-warning ms-1 btn-sm"
                            @click="onClickEdit(category.id)">
                            <i class="bi bi-pencil"></i>
                        </button>

                        <!-- delete -->
                        <button
                            type="button"
                            class="btn btn-outline-danger ms-1 btn-sm"
                            @click="onClickDelete(category.id)">
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
                                <label for="categoryName" class="form-label"
                                    >Kategoria név:
                                </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="categoryName"
                                    placeholder="Kategoria neve"
                                    v-model="category.categoryName"
                                    required />
                                <div class="invalid-feedback">
                                    A Kategoria kötelező!
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
class Category {
    constructor(id = null, categoryName = null) {
        this.id = id;
        this.categoryName = categoryName;
      
    }
}

import * as bootstrap from "bootstrap";

export default {
    name: "Category",
    data() {
        return {
            categories: [],
            state: "view",
            stateTitle: null,
            category: new Category(),
            form: null,
            
        };
    },
    created() {
        this.getCategories();
        
    },
    mounted() {
        this.modal = new bootstrap.Modal(document.getElementById("modal"), {
            Keyboard: false,
        });
        this.form = document.querySelector(".needs-validation");
    },
    methods: {
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
                    console.log("Success:", data.data);
                    this.categories = data.data;
                })
                .catch((error) => {
                    console.error("Error:", error);
                    this.categories = [];
                });
        },
        getCategoriesById(id) {
            let headers = new Headers();

            headers.append("Content-Type", "application/json");
            headers.append("Authorization", "Bearer " + this.$root.$data.token);
            const url = `${this.$loginServer}/api/categories/${id}`;
            fetch(url, {
                method: "GET",
                headers: headers,
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data.data);
                    this.category = data.data;
                })
                .catch((error) => {
                    console.error("Error:", error);
                    this.category = new Category();
                });
        },
        updateCategories() {
            let headers = new Headers();

            headers.append("Content-Type", "application/json");
            headers.append("Authorization", "Bearer " + this.$root.$data.token);
            const url = `${this.$loginServer}/api/categories`;
            let data = this.category;
            fetch(url, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data.data);
                    this.getCategories();
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        },
        deleteCategories(id) {
            let headers = new Headers();

            headers.append("Content-Type", "application/json");
            headers.append("Authorization", "Bearer " + this.$root.$data.token);
            const url = `${this.$loginServer}/api/categories`;
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
                    this.getCategories();
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        },
        createCategories() {
            let headers = new Headers();

            headers.append("Content-Type", "application/json");
            headers.append("Authorization", "Bearer " + this.$root.$data.token);
            const url = `${this.$loginServer}/api/categories`;
            let data = this.category;
            delete data.id;
            fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data.data);
                    this.getCategories();
                    this.state = "view";
                })
                .catch((error) => {
                    console.error("Error:", error);
                    this.state = "view";
                });
        },
        onClickNew() {
            this.state = "new";
            this.stateTitle = "Új Category";
            this.category = new Category();
            this.modal.show();
        },
        onClickEdit(id) {
            this.state = "edit";
            this.stateTitle = "Category modosítás";
            this.getCategoriesById(id);
            this.modal.show();
        },
        onClickDelete(id) {
            this.state = "delete";
            this.deleteCategories(id);
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
                    this.updateCategories();
                } else if (this.state == "new") {
                    //post
                    this.createCategories();
                }
            } else {
                return;
            }
            this.modal.hide();
            this.state = "view";
        },
    },
};
</script>

<style>
</style>