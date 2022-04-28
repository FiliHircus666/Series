<template class="backgrounds">
  <div
    id="app"
    class="container"
  >
    

    <Head></Head>
    <Menu></Menu>
    <router-view></router-view>
    <Footer></Footer>
    <!-- <Head></Head> -->
  </div>
</template>

<script>
import Head from "./components/Head.vue";
import Footer from "./components/Footer.vue";
import Menu from "./components/Menu.vue";
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: "App",
  components: {
    Head,
    Footer,
    Menu,
    // HelloWorld
  },
};
</script>

<style>
.my-border {
  border: 1px  ;
  padding: 0 10px;
      /* background: url(https://images.unsplash.com/photo-1616712134411-6b6ae89bc3ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80) ; */
      /* background: url(https://hdandroidwallpaper.com/wp-content/uploads/2021/03/Mandalorian-Wallpaper-HD.jpg) no-repeat; */
}

.container {
  max-width: 400px;
  margin: 20px auto;
      /* background: url(https://images.unsplash.com/photo-1616712134411-6b6ae89bc3ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80); */

}


  
</style>
