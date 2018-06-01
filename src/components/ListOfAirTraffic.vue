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
import OverlayLoader from '@/components/modals/OverlayLoader'
export default {
  name: 'ListOfAirTraffic',
  components: {
    OverlayLoader: OverlayLoader
  },    
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      // ~ for showing modal
      modalComponent: {
        isVisible: true,
        activeModalComponent: OverlayLoader
      }      
    }
  },
  methods:{
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
    console.log('--created--ListOfAirTraffic')
    this.getGeolocation();
  },
  mounted: function () {
    console.log('--mounted--ListOfAirTraffic');
    //close Loader modal
    this.toggleModal(false, null);
  },
  destroyed: function () {
    console.log('--destroyed--ListOfAirTraffic')
  }     
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
