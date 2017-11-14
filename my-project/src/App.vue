<template>
  <div id="app">
    <router-view :user="user" class="layout"></router-view>
    <router-view @logined="changeUser" class="view two" name="content"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function(){
    return {
      user: ''
    }
  },
  methods: {
    changeUser: function(user){
      this.user = user;
    }
  }
}
</script>

<style>
 @media (min-width: 1281px){
    #app {
        padding-left: 280px;
    }
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
  flex-flow: column nowrap;
  display: flex;
}
</style>
