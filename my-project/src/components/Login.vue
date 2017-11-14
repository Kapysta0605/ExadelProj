<template>
  <div id='login'>
      <md-layout class="md-align-center">
        <md-whiteframe md-elevation="5" class="md-flex-50">
          <h1>Login</h1>
          <form novalidate @submit.stop.prevent="submit">
            <md-layout class="md-align-center">
              <md-input-container class="md-flex-50">
                <label>Login</label>
                <md-input v-model=login></md-input>
              </md-input-container> 
            </md-layout>
            <md-layout class="md-align-center">
              <md-input-container md-has-password class="md-flex-50">
                <label>Password</label>
                <md-input v-model=password type='password'></md-input>
              </md-input-container> 
            </md-layout>
            <md-button class="md-raised md-primary" type="submit">Primary</md-button>
          </form>
        </md-whiteframe>
      </md-layout>
  </div>
    
</template>

<script>
export default {
  name: 'Login',
  components: {},
  data: function(){
    return {
      password: '',
      login: ''
    }
  },
  methods: {
    submit: function(){
      if(this.password === '' || this.login === ''){
        return;
      }
      return new Promise((response) => {
        function handler () {
          response(oReq.responseText);
          cleanUp();
        }
        function cleanUp () {
          oReq.removeEventListener('load', handler);
        }

        const oReq = new XMLHttpRequest();
        const body = {
          login: this.login,
          password: this.password
        };
        oReq.addEventListener('load', handler);
        oReq.open('POST', `http://localhost:1337/api/authentication/login`);
        oReq.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:1337');
        oReq.setRequestHeader('content-type', 'application/json');
        oReq.send(JSON.stringify(body));
      })
      .then((res) => {
        this.$emit('logined', res);
      });
    }
  }
};
</script>

  
<style scoped>
#login{
  min-height: 500;
  
}
</style>
