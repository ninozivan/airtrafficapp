<template>
  <div class="hello">
    <h1>List Of All Airplaines In Area</h1>
    <!-- Modal Templates -->
    <transition name="fade" mode="out-in">
      <component 
        v-if="modalComponent.isVisible" 
        v-bind:is="modalComponent.activeModalComponent"
      ></component>
    </transition>    
  </div>
</template>

<script>
import ModalLoader from '@/components/modals/ModalLoader'
export default {
  name: 'ListOfAirTraffic',
  components: {
    ModalLoader: ModalLoader
  },    
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      // ~ for showing modal
      modalComponent: {
        isVisible: true,
        activeModalComponent: ModalLoader
      }      
    }
  },
  methods:{
    //get geolocation
    getGeolocation: function (){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.displayLocationInfo, this.geoError);
      }
    },
    displayLocationInfo: function (position) {
      console.log('displayLocationInfo')
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;

      console.log('longitude: ' + lng + ' | latitude: ' + lat);
    },
    geoError: function (err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    },
    //open/close modal ('wantedState' - true/false = open/close)
    toggleModal: function (wantedState) {
      if (wantedState){
        this.modalComponent.isVisible = wantedState;
        this.modalComponent.activeModalComponent = ModalLoader;
      }else{
        this.modalComponent.isVisible = wantedState;
        this.modalComponent.activeModalComponent = null;        
      }
    }
  },
  created: function () {
    console.log('--created--ListOfAirTraffic')
    this.getGeolocation();
  },
  mounted: function () {
    console.log('--mounted--ListOfAirTraffic');
    //close Loader modal
    this.toggleModal(false);
  }   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
