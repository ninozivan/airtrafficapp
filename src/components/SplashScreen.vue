<template>
  <div class="n-modal-wrapper">
    <!-- Modal Body -->
    <div class="n-modal-body">
      <div class="n-responsive-container n-text-center">
        <!-- Logo -->
        <div class="n-wraps-logo-above-text">
          <img src="@/assets/img/airtraffic-logo.png" alt="AirTraffic" />        
        </div>
        <p>Hello</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SplashScreen',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created: function () {
    console.log('--created--SplashScreen')
  },
  mounted: function () {
    console.log('--mounted--SplashScreen')
  },
  destroyed: function () {
    console.log('--destroyed--SplashScreen')
  }     
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h1, h2 {
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
} */
</style>
