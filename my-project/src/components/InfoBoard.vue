<template>
    <h1>About US</h1>
    
</template>

<script>
import SidenavLinks from './SidenavLinks'
export default {
  name: 'InfoBoard',
  components: { 
    SidenavLinks
   }
};
</script>

  
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.container{
  box-sizing: inherit;
}

.sidenav-logo{
  margin-top: -50px;
  padding: 0;
}
</style>
