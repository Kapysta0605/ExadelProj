<template>
  <div id="layout" md-primary>
      <md-toolbar md-whiteframe class='header '>
        <h1> {{ titles[title] }} </h1>
        <h2> {{ user }} </h2>
      </md-toolbar>
    <sidenav @changePage="changeTitle">
    </sidenav>
  </div>
</template>

<script>
import Sidenav from './Sidenav'
export default {
  name: 'Layout',
  props: [user],
  data: () => {
    return {
      title: 0,
      titles: [
        'Info Board',
        'Attedance',
        'Schedule',
        'Home Work',
        'Grades',
        'Events',
        'Messages'
      ]
    }
  },
  components: {
    Sidenav
  },
  methods: {
    changeTitle(id){
      this.title = id;
    }
  }
}
</script>

<style scoped>
  h1 {
    padding-left: 20px;
  }
  #layout{
    min-height: 100%;
    max-height: 100%;
    display: flex;
    -ms-flex-flow: column;
    flex-flow: column;
  }
  .header{
    height: 80px;

    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
  }
</style>