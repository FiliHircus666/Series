<template>
  <div class="my-border header-backg">
     <div class="seriesHub-back">
        <h1> 
        
        <a href="#/">


        <span>Series</span><span class="Hub-color">Hub</span>
        </a>
        
        </h1>
       </div>
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
.seriesHub-back{
  background-color: black ;

    max-width: 30%;
    margin: 0 45%;
    border-radius: 15%;

}
</style>