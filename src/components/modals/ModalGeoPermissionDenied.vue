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
          <p>You blocked us from using device geolocation. In order to use application, you need to enable that in your browser.</p>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
export default {
  name: 'ModalGeoPermissionDenied',
  created: function () {
    console.log('--created--ModalGeoPermissionDenied')
  },
  mounted: function () {
    console.log('--mounted--ModalGeoPermissionDenied')
  },
  destroyed: function () {
    console.log('--destroyed--ModalGeoPermissionDenied')
  }  
}
</script>

<style>
</style>
