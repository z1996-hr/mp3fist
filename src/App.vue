<template>
  <div id="app">
    <router-link to="/mp3">音乐</router-link>
    <keep-alive><router-view/></keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
