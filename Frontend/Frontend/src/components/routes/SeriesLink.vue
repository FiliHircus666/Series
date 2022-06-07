<template>
  <div class="my-border">
    <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">SorozatId</th>
                    <th scope="col">Sorozat link</th>
                    <th scope="col">
                        <!-- new -->
                        <button
                            type="button"
                            class="btn btn-outline-success ms-1 btn-sm"
                            @click="onClickNew()">
                            <i class="bi bi-plus-lg"></i>
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(serieslink, index) in serieslinks" :key="index">
                    <td>{{serieslink.seriesId}}</td>
                    <td>{{serieslink.videoLink}}</td>
                  
                    <td>
                        <!-- edit -->
                        <button
                            type="button"
                            class="btn btn-outline-warning ms-1 btn-sm"
                            @click="onClickEdit(serieslink.id)">
                            <i class="bi bi-pencil"></i>
                        </button>

                        <!-- delete -->
                        <button
                            type="button"
                            class="btn btn-outline-danger ms-1 btn-sm"
                            @click="onClickDelete(serieslink.id)">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
  </div>
</template>

<script>
class SeriesLink{
    constructor (
        id = null,
        seriesId = null,
        videoLink = null
      ){
        this.id = id;
        this.seriesId = seriesId;
        this.videoLink = videoLink;
      }
}
export default {
  name: "SeriesLink",
  data() {
    return{
      serieslink: [],
      state: "view",
      serieslinks: new SeriesLink()
    };
    
    
  },
  created() {
        this.getSeriesLink();
       
    },
    methods: {
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
                    this.serieslinks = data.data;
                })
                .catch((error) => {
                    console.error("Error:", error);
                    this.serieslinks = [];
                });
        },
                },
                  updateSeriesLink() {
            let headers = new Headers();

            headers.append("Content-Type", "application/json");
            headers.append("Authorization", "Bearer " + this.$root.$data.token);
            const url = `${this.$loginServer}/api/series/seriesLink`;
            let data = this.serieslink;
            fetch(url, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data.data);
                    this.getSeriesLink();
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        },
        deleteSeriesLink(id) {
            let headers = new Headers();

            headers.append("Content-Type", "application/json");
            headers.append("Authorization", "Bearer " + this.$root.$data.token);
            const url = `${this.$loginServer}/api/series/seriesLink/${id}`;
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
                    this.getSeriesLink();
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        },
        onClickNew() {
            this.state = "new";
            this.stateTitle = "Új sorozat";
            this.serieses = new SeriesLink();
            this.modal.show();
        },
        onClickEdit(id) {
            this.state = "edit";
            this.stateTitle = "Adatmódosítás";
            this.modal.show();
            this.getSeriesLinkById(id);
        },
        onClickDelete(id) {
            this.state = "delete";
            this.deleteSeriesLink(id);
            this.state = "view";
        },
        onClickCancel() {
            this.state = "view";
            this.modal.hide();
        },

      }
    

</script>

<style>
</style>