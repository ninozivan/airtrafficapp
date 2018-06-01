<template>
  <div id="app">
    <!-- Container for all views -->
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
import ModalError from '@/components/modals/ModalError';
export default {
  name: 'App',
  components: {
    OverlayLoader: OverlayLoader,
    ModalBrowserNotSupported: ModalBrowserNotSupported,
    ModalGeoPermissionDenied: ModalGeoPermissionDenied,
    ModalError: ModalError
  },   
  data(){
    return {
      geoCheckInterval: null,
      //watch instance for geolocation
      watchGeoPosition: null,
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
      if (navigator.geolocation) {
        //call function to update geolocation based on user data
        this.updateUserGeolocationInfo();
      } else {
        //and show modal with message that users browser is not supported
        this.toggleModal(true, ModalBrowserNotSupported);
      }
    },
    //function that will initialize update of users current location
    updateUserGeolocationInfo: function () {
      var options = {timeout:3000};
      //get user location and use 'getLocationInfo' for success or 'handleLocationError' for errors (we have set 5s timeout to allow getting data)
      this.watchGeoPosition = navigator.geolocation.watchPosition(this.getLocationInfo, this.handleLocationError, options);
    },
    //SUCCESS function for getting geolocation
    getLocationInfo: function (position) {
      //since we have geolocation data, we can close loading modal
      this.toggleModal(false, null);
      //prepare data that will be saved at Vuex store variable 'vuexStoredGeoData'
      const geoData = {
        geoErrorStatus: null,
        //if ternary conditions are met, longitude will take 'position.coords.longitude' value, otherwise 'null'
        longitude: (position && position.coords && position.coords.longitude) ? position.coords.longitude : null,
        latitude: (position && position.coords && position.coords.latitude) ? position.coords.latitude : null
      }
      //after we prepared data, we can save it to Vuex store variable 'vuexStoredGeoData' 
      this.$store.commit('setNewGeolocationData', geoData);
      //since all data are available, we can move to view with list of air traffic
      //we will call route change ONLY when we are NOT ALREADY ON 'list-of-air-traffic' route
      if (this.$route.path != 'list-of-air-traffic'){
        this.$router.replace('list-of-air-traffic');
      }
    },
    //ERROR function for getting geolocation
    handleLocationError: function (error) {
      //since we have error, we can close loading modal
      this.toggleModal(false, null);
      switch (error.code) {
        case 3:
          //PositionError.TIMEOUT = 3;
          // timeout was hit, meaning nothing's in the cache
          //we want to tell user that he must enable geolocation to use our application
          this.$router.replace('welcome-screen');
          break;
        case 2:
          //PositionError.POSITION_UNAVAILABLE = 2;
          this.toggleModal(true, ModalError);
          break;
        case 1:
          //PositionError.PERMISSION_DENIED = 1;
          //user denied access to use, so we need to show message why he won't be able to use application
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
    // console.log('--created--RootApp')
  },
  mounted: function () {
    // console.log('--mounted--RootApp');
    //when application is mounted, we can initialize geolocation request
    this.checkForAppRunConditions();
  }
}
</script>

<style>
</style>
