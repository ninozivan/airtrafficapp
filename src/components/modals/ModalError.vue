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
          <p>Ups..</p>
          <p>Something went wrong! Please close this window and try reloading application.</p>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
/*
  This view will show message when some error occurs
 */
export default {
  name: 'ModalError',
  created: function () {
    // console.log('--created--ModalError')
  },
  mounted: function () {
    // console.log('--mounted--ModalError')
  },
  destroyed: function () {
    // console.log('--destroyed--ModalError')
  }   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
