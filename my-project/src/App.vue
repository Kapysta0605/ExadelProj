<template>
  <div id="app">
    <layout>
      <router-view/>
    </layout>
    
  </div>
</template>

<script>
import Layout from './components/Layout'
export default {
  name: 'app',
  components: {
    Layout
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding-left: 280px;
  color: #2c3e50;
  min-height: 100%;
}
</style>
