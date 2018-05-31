<template>
  <div class="hello">
    <h1>Ask for Geolocation</h1>
  </div>
</template>

<script>
export default {
  name: 'AskForGeoLocation',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created: function () {
    console.log('--created--AskForGeoLocation')
  },
  mounted: function () {
    console.log('--mounted--AskForGeoLocation')
  }   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
}
</style>
