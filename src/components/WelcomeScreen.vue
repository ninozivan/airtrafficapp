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
      </div>
    </div>
  </div>
</template>

<script>
/*
  This view is used to inform user that we need him to enable us access to geolocation in order to run applicaiton
 */
export default {
  name: 'WelcomeScreen',
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
</style>
