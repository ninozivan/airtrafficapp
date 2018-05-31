<template>
  <div class="n-modal-wrapper">
    <div class="n-modal-body">
      <h1>Loading Modal right here...</h1>
    </div>  
  </div>
</template>

<script>
export default {
  name: 'ModalLoader',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'     
    }
  },
  created: function () {
    console.log('--created--ModalLoader')
  },
  mounted: function () {
    console.log('--mounted--ModalLoader')
  }   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
