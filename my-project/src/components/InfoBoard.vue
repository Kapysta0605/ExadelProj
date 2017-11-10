<template>
  <div id='info-board'>
    <md-layout md-gutter>
      <md-layout md-column md-gutter>
        <md-layout md-flex="20"></md-layout>
        <md-layout></md-layout>
      </md-layout>

      <md-layout md-column md-gutter>
        <md-layout md-flex="50"></md-layout>
        <md-layout></md-layout>
        <md-layout></md-layout>
      </md-layout>
    </md-layout>
  </div>
    
    
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
#info-board{
  min-height: 1080px;
}
</style>
