<template>
  <div class="my-border">
		<h1>Profile</h1>
    <p>Felhasználó név: {{$root.$data.user.userName}}</p>
        <p>Email: {{$root.$data.user.Email}}</p>
        <p>Permission:{{$root.$data.user.permission}}</p>
       
  </div>
</template>

<script>
export default {
    name: "Profile"
}
</script>

<style>

</style>