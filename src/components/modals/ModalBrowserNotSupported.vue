<template>
  <div class="n-modal-wrapper n-error-back">
    <!-- Modal Body -->
    <div class="n-modal-body">
      <div class="n-responsive-container n-text-center">
        <!-- Logo -->
        <div class="n-wraps-logo-above-text">
          <img src="@/assets/img/airtraffic-logo.png" alt="AirTraffic" />        
        </div>
        <div class="n-wraps-alert-message">
          <!-- Emoticon -->
          <img src="@/assets/img/emo-error.png" alt="Error emoticon" />
          <!-- Text -->
          <p>Sorry..</p>
          <p>Your browser doesn't have support for Geolocation!<br/>We need that option in order to run AirTraffic application.</p>           
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
export default {
  name: 'BrowserNotSupported',
  created: function () {
    console.log('--created--BrowserNotSupported')
  },
  mounted: function () {
    console.log('--mounted--BrowserNotSupported')
  },
  destroyed: function () {
    console.log('--destroyed--BrowserNotSupported')
  }   
}
</script>

<style>
</style>
