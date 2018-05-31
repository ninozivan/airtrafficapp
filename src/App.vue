<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    //Once application is started we want to check if geolocation is available
    checkForAppRunConditions: function () {
      console.log('check for geolocation')
      if (navigator.geolocation) {
        console.log('geo location AVAILABLE')
        this.$router.replace('list-of-air-traffic');
      } else {
        console.log("geo location NOT AVAILABLE")
        this.$router.replace('user-geolocation');
      }      
      // //Check to see if local storage is supported
      // if (window.localStorage){
      //   console.log('localStorage is supported');
      //   //Now check if user already seen splash screen (welcome message)
      //   if (window.localStorage.getItem('splashScreenVisited') && window.localStorage.getItem('splashScreenVisited') === "true"){
      //     this.$router.replace('list-of-air-traffic');
      //   }else{
      //     window.localStorage.setItem("splashScreenVisited", "true");
      //     this.$router.replace('list-of-air-traffic');
      //   }
      // }else{
      //   console.log('localStorage is not supported');
      // }
    }
  },  
  created: function () {
    console.log('--created--RootApp')
    this.checkForAppRunConditions();
  },
  mounted: function () {
    console.log('--mounted--RootApp')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
