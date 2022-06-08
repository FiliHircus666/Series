 <template>
    <div class="my-border">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4  ">
            <div
                class="card h-100"
                style="width: 18rem; text-align: center"
                v-for="(seriesCard, index) in seriesCards"
                :key="index">
                <img
                    :src="getImgUrl(seriesCard.image)"
                    class="card-img-top img-fluid"
                    alt="..." />
                <div class="card-body">
                    <h5 class="card-title" style="color: black">
                        {{ seriesCard.seriesName }}
                    </h5>
                    <p class="card-text">
                        <span style=" background-color:black; color:white; font-size: 17px; font-weight: bold">{{ seriesCard.categoryName }}</span>
                        <br>
                      <span class="ageCircle" style="margin-left: 56%; margin-right: 44%;  ">{{ seriesCard.ageLimit }}</span>
                      <br>
                    </p>
                    <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        class="btn btn-primary " >
                        Részletek
                    </button>
                </div>
            </div>
        </div>
        <!-- Button trigger modal -->
       

        <!-- Modal -->
        <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            {{seriesCard.seriesName}}
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <div class="row">
                        <div class="col-5">
                          <img  :src="getImgUrl(seriesCard.image)" alt="" class="img-fluid">
                        </div>
                        <div class="col-7">
                          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus enim molestias quis consequatur. Excepturi, cumque consequatur? At aperiam necessitatibus illum mollitia ipsa dignissimos aliquid soluta ducimus beatae praesentium. Vel tempore eum, repellat maxime similique modi corrupti praesentium quam ipsam dicta ratione deleniti pariatur porro enim aliquid deserunt quidem exercitationem vero?</p>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal">
                            Bezár
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
class SeriesCard {
    constructor(
        id = null,
        seriesName = null,
        releaseDate = null,
        ageLimit = null,
        categoryId = null,
        image = null
    ) {
        this.id = id;
        this.seriesName = seriesName;
        this.releaseDate = releaseDate;
        this.ageLimit = ageLimit;
        this.categoryId = categoryId;
        this.image = image;
    }
}

// import * as bootstrap from "bootstrap";

export default {
    name: "Fooldal",
    data() {
        return {
            seriesCards: [],
            state: "view",
            stateTitle: null,
            seriesCard: new SeriesCard(),
        };
    },
    created() {
        // this.getSeriesLink();
        this.getSeries();
    },
    methods: {
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
                    this.seriesCards = data.data;
                })
                .catch((error) => {
                    console.error("Error:", error);
                    this.seriesCards = [];
                });
        },
        getDataToCards() {
            let headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", "Bearer " + this.$root.$data.token);
            const url = `${this.$loginServer}/api/getDataToCards`;
            fetch(url, {
                method: "GET",
                headers: headers,
            })
                .then((response) => response.json())
                .then((data) => {
                    this.itemlinks = data.data;
                    console.log("itemlinks:", this.itemlinks);
                })
                .catch((error) => {
                    console.error("Error:", error);
                    this.itemlinks = [];
                });
        },
        getImgUrl(pic) {
            try {
                return require("../../assets/" + pic);
            } catch (error) {
                //return "https://dummyimage.com/600x300&text=no picture";

                return require("../../assets/nopicture.jpg");
            }
        },
    },
};
</script>

<style>
.Hub-color {
    border: 1px;
    border-radius: 20%;
    background: orange;
    color: black;
    font-style: uppercase;
}
.header-backg {
    padding-top: 20px;
    /* background: url(https://c.tenor.com/xfsFj7A6lJMAAAAd/galaxy.gif); */
}
h2 {
    text-align: left;
    font-style: uppercase;
}
a {
    text-decoration: none;
    color: white;
}

h2 :hover {
    color: white;
}
.ageCircle{
  border: 4px solid red;
  background-color: orangered ;
  color: white;
  border-radius: 30%;
  float: right;

}

</style>