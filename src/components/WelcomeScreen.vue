<template>
  <div class="n-modal-wrapper n-primary-back">
    <!-- Modal Body -->
    <div class="n-modal-body">
      <div class="n-responsive-container n-text-center">
        <!-- Logo -->
        <div class="n-wraps-logo-above-text">
          <img src="@/assets/img/airtraffic-logo.png" alt="AirTraffic" />        
        </div>
        <div class="n-wraps-alert-message">
          <!-- Emoticon -->
          <img src="@/assets/img/welcome-art.png" alt="Welcome to AirTraffic" />
          <!-- Text -->
          <p>This application <b>requires the use of location services, please enable it on your browser</b> in order to use this application.</p>
        </div>
        <!-- Action button -->
        <!-- <button class="n-btn n-btn-success n-btn-lg n-m-top-60">Let’s do it</button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WelcomeScreen',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created: function () {
    console.log('--created--WelcomeScreen')
  },
  mounted: function () {
    console.log('--mounted--WelcomeScreen')
  },
  destroyed: function () {
    console.log('--destroyed--WelcomeScreen')
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
