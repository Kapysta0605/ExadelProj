<template>
    <md-button-toggle md-single class='sidenav-links md-list'>
      <h2>FeelsBadMan.coz</h2>
      <md-button v-for="(item, index) in menu" :key=index :value=index @click="changePage">
        {{ item.name }}
      </md-button>
    </md-button-toggle>
</template>

<script>
export default {
  name: "SidenavLinks",
  data: () => {
    return {
      menu: [
      {name: 'Info Board'},
      {name: 'Attedance'},
      {name: 'Schedule'},
      {name: 'Home Work'},
      {name: 'Grades'},
      {name: 'Events'},
      {name: 'Messages'}
      ]
    }
  },
  methods: {
    changePage: function(event){
      this.$emit('changePage', event.target.value);
    }
  }
};
</script>

<style scoped>
.md-list {
  background-color: #fff;
  margin-top: -150px;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,.3);
}
</style>