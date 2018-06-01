<template>
  <div class="n-modal-wrapper">
    <!-- Modal Body -->
    <div class="n-modal-body">
      <h1>Modal Error...</h1>
    </div>  
  </div>
</template>

<script>
export default {
  name: 'ModalError',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'     
    }
  },
  created: function () {
    console.log('--created--ModalError')
  },
  mounted: function () {
    console.log('--mounted--ModalError')
  },
  destroyed: function () {
    console.log('--destroyed--ModalError')
  }   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
