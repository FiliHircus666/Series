<template>
  <div class="my-border header-backg">
      <h1> 
        
        <a href="#/">


        <span>Series</span><span class="Hub-color">Hub</span>
        </a>
        
        </h1>
  </div>
</template>

<script>
export default {
    name: "Head"
}
</script>
  
<style>
.Hub-color{
  border: 1px ;
  border-radius: 20%;
  background: orange ;
  color: black;
  font-style: uppercase;
}
.header-backg{
  padding-top: 20px;
  /* background: url(https://c.tenor.com/xfsFj7A6lJMAAAAd/galaxy.gif); */

}
h1{
  text-align:  center;
}
h1 :hover{
  color: white;
}
a :hover{
  color: white;
}
</style>