<template>
  <div class="n-traffic-view">
    <!-- Header -->
    <div class="n-traffic-header">
      <div class="n-responsive-container">
        <img class="n-logo-img" src="@/assets/img/airtraffic-logo.png" alt="AirTraffic" />
      </div>      
    </div>
    <!-- Body -->
    <div class="n-traffic-body">
      <!-- Show list of traffic if available -->
      <div class="n-responsive-container" v-if="listOfAvailableTraffic">
        <!-- List with all traffic available -->
        <div class="n-traffic-list-wrapper">
          <!-- Column description -->
          <div class="n-has-descriptions">
            <table>
              <tbody>
                <tr>
                  <td class="n-col-2">Direction</td>
                  <td class="n-col-5">Flight Altitude</td>
                  <td class="n-col-5">Flight Number</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Each item -->
          <div class="n-has-flight-item" v-for="(singleAirplane, index) in listOfAvailableTraffic" v-bind:key="index" v-if="singleAirplane">
            <table>
              <tbody>
                <tr>
                  <td class="n-col-2">
                    <div class="n-flight-direction-wrap">
                      <div class="n-has-circle-icon" v-bind:class="checkDirection(singleAirplane)"><i class="fa fa-plane" aria-hidden="true"></i></div>
                      <div class="n-has-direction"><span>{{returnDirectionText(singleAirplane)}}</span></div>
                    </div>
                  </td>
                  <td class="n-col-5 n-has-altitude"><b>{{singleAirplane.Alt}} ft</b></td>
                  <td class="n-col-5 n-has-flight-code"><b>{{singleAirplane.Icao}}</b></td>
                </tr>
              </tbody>
            </table>
            <div class="n-has-info-icon"><i class="fa fa-info-circle" aria-hidden="true"></i></div>
          </div>        
        </div>
      </div>
      <!-- Show no content message if needed -->
      <div v-else>No content available</div>
    </div>
    <!-- Modal for single selected Airplane -->
    <transition name="fade" mode="out-in">
      <component 
        v-if="modalComponent.isVisible" 
        v-bind:is="modalComponent.activeModalComponent"
      ></component>
    </transition>    
  </div>
</template>

<script>
import axios from 'axios';
import OverlayLoader from '@/components/modals/OverlayLoader'
import tempDataJson from '@/temp-response-from-adsbexchange'
export default {
  name: 'ListOfAirTraffic',
  components: {
    OverlayLoader: OverlayLoader
  },    
  data() {
    return {
      listOfAvailableTraffic: null,
      // ~ for showing modal
      modalComponent: {
        isVisible: false,
        activeModalComponent: null
      }
    }
  },
  methods:{
    ///
    getGeolocation: function () {
      this.toggleModal(true, OverlayLoader);
      //http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=33.433638&lng=-112.008113&fDstL=0&fDstU=100
      axios.get('http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=33.433638&lng=-112.008113&fDstL=0&fDstU=100')
      .then(response => {
        // JSON responses are automatically parsed.
        //this.posts = response.data
        console.log('axios responded success ');
        //console.log('axios response: ' + JSON.stringify(response, null, 2));
        this.listOfAvailableTraffic = response.data.acList;
        this.toggleModal(false, null);
      })
      .catch(error => {
        console.log('axios error: ' + JSON.stringify(error, null, 2));
        this.toggleModal(false, null);
      })
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
    },
    ////
    checkDirection: function (inputAirplaneObject) {
      let returnClass = '';
      if (inputAirplaneObject && inputAirplaneObject.Trak){
        if (inputAirplaneObject.Trak >= 90){
          returnClass = 'n-to-west';
        }else{
          returnClass = 'n-to-east';
        }
      }
      return returnClass;
    },
    ///
    returnDirectionText: function (inputAirplaneObject) {
      let returnText = '--';
      if (inputAirplaneObject && inputAirplaneObject.Trak){
        if (inputAirplaneObject.Trak >= 90){
          returnText = 'to west';
        }else{
          returnText = 'to east';
        }
      }
      return returnText;
    },
  },
  created: function () {
    console.log('--created--ListOfAirTraffic')
    this.getGeolocation();
  },
  mounted: function () {
    console.log('--mounted--ListOfAirTraffic');
    //close Loader modal
  },
  destroyed: function () {
    console.log('--destroyed--ListOfAirTraffic')
  }     
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
