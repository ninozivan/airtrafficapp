<template>
  <div id="app">
    <router-view></router-view>
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
import OverlayLoader from '@/components/modals/OverlayLoader';
import ModalBrowserNotSupported from '@/components/modals/ModalBrowserNotSupported';
import ModalGeoPermissionDenied from '@/components/modals/ModalGeoPermissionDenied';
export default {
  name: 'App',
  components: {
    OverlayLoader: OverlayLoader,
    ModalBrowserNotSupported: ModalBrowserNotSupported,
    ModalGeoPermissionDenied: ModalGeoPermissionDenied
  },   
  data(){
    return {
      geoCheckInterval: null,
      // ~ for showing modal
      modalComponent: {
        isVisible: true,
        activeModalComponent: OverlayLoader
      }
    }
  },  
  methods: {
    //Once application is started we want to check if geolocation is SUPPORTED
    checkForAppRunConditions: function () {
      console.log('check if current browser supports geolocation');
      if (navigator.geolocation) {
        console.log('geo location SUPPORTED');
        //call function to update location
        this.updateUserGeolocationInfo();
        //
      } else {
        console.log("geo location NOT SUPPORTED");
        //since geolocation is not supported we will clear interval for checking geolocation on every 1 min
        clearInterval(this.geoCheckInterval);
        //and show modal with message that users browser is not supported
        this.toggleModal(true, ModalBrowserNotSupported);
      }
    },
    ////
    updateUserGeolocationInfo: function () {
      navigator.geolocation.getCurrentPosition(this.getLocationInfo, this.handleLocationError, { timeout: 5000 });      
    },
    getLocationInfo: function (position) {
      //since we have geolocation data, we can close loading modal
      this.toggleModal(false, null);
      //
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      const geoData = {
        geoErrorStatus: null,
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
      }
      console.log(`longitude: ${lng} | latitude: ${lat}`);
      console.log('111 store.state.safelyStoredNumber: ' + this.$store.state.safelyStoredNumber);
      this.$store.commit('setNewGeolocationData', geoData);
      console.log('222 store.state.safelyStoredNumber: ' + JSON.stringify(this.$store.state.safelyStoredNumber, null, 2));
      this.$router.replace('list-of-air-traffic');
    },
    handleLocationError: function (error) {
      //since we have error, we can close loading modal
      this.toggleModal(false, null);
      switch (error.code) {
        //PositionError.TIMEOUT = 3;
        case 3:
          // timeout was hit, meaning nothing's in the cache
          // let's provide a default location:
          //this.getLocationInfo({ coords: { longitude: 33.631839, latitude: 27.380583 } });
          // now let's make a non-cached request to get the actual position
          //navigator.geolocation.getCurrentPosition(getLocationInfo, handleLocationError);
          console.log('eror code: ' + error.code + ', error msg: ' + error.message);
          this.$router.replace('welcome-screen');
          break;
        //PositionError.POSITION_UNAVAILABLE = 2;
        case 2:
          // ...
          console.log('eror code: ' + error.code + ', error msg: ' + error.message);
          break;
        //PositionError.PERMISSION_DENIED = 1;
        case 1:
        // ...
          console.log('eror code: ' + error.code + ', error msg: ' + error.message);
          this.toggleModal(true, ModalGeoPermissionDenied);
          break;
      }
    },
    //open/close modal ('nextWantedState' - true/false = open/close, new-modal-component-name)
    toggleModal: function (nextWantedState, nextModalComponent) {
      if (nextWantedState){
        this.modalComponent.isVisible = nextWantedState;
        this.modalComponent.activeModalComponent = nextModalComponent;
      }else{
        this.modalComponent.isVisible = nextWantedState;
        this.modalComponent.activeModalComponent = null;        
      }
    }    
  },  
  created: function () {
    console.log('--created--RootApp')
  },
  mounted: function () {
    console.log('--mounted--RootApp');
    this.checkForAppRunConditions();
    this.geoCheckInterval = setInterval(function(){ 
      this.checkForAppRunConditions();  
    }.bind(this), 10000);
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
