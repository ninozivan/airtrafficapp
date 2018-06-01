<template>
  <div class="n-modal-wrapper">
    <div class="n-overlay-loader-wrapper">
      <!-- Loader Animated -->
      <div class="n-loader-container">
        <div class="n-box n-box-one"></div>
        <div class="n-box n-box-two"></div>
        <div class="n-box n-box-three"></div>
        <div class="n-box n-box-four"></div>
      </div>
      <!-- Text -->
      <div class="n-has-text">Loading..</div>      
    </div>
  </div>
</template>

<script>
export default {
  name: 'OverlayLoader',
  created: function () {
    // console.log('--created--OverlayLoader')
  },
  mounted: function () {
    // console.log('--mounted--OverlayLoader')
  },
  destroyed: function () {
    // console.log('--destroyed--OverlayLoader')
  }    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
