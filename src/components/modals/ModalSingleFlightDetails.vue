<template>
  <div class="n-modal-wrapper">
    <!-- Modal Body -->
    <div class="n-modal-body">
      <h1>Modal Single Flight Details</h1>
    </div>  
  </div>
</template>

<script>
export default {
  name: 'ModalSingleFlightDetails',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'     
    }
  },
  created: function () {
    console.log('--created--ModalSingleFlightDetails')
  },
  mounted: function () {
    console.log('--mounted--ModalSingleFlightDetails')
  },
  destroyed: function () {
    console.log('--destroyed--ModalSingleFlightDetails')
  }    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
