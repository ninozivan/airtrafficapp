<template>
  <div class="n-traffic-view" v-bind:class="{'n-block-scroll': modalComponent.isVisible }">
    <!-- Header -->
    <div class="n-traffic-header">
      <div class="n-responsive-container">
        <img class="n-logo-img" src="@/assets/img/airtraffic-logo.png" alt="AirTraffic" />
      </div>      
    </div>
    <!-- Body -->
    <div class="n-traffic-body">
      <!-- Show list of traffic if available -->
      <div class="n-responsive-container" v-if="sortedTrafficList && sortedTrafficList.length > 0">
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
          <div class="n-has-flight-item" 
            v-for="(singleAirplane, index) in sortedTrafficList" 
            v-bind:key="index" 
            v-if="singleAirplane"
            v-on:click="openSingleAirplaneDetails(singleAirplane)"
            >
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
      <div v-else class="n-no-content-for-traffic-list">
        <img src="@/assets/img/emo-info.png" alt="Nothing to show" />
        <p>Hmm.. We don't have anything to show you.<br/>Check your location and radius (search radius for planes around your location)</p>
        <table>
          <thead>
            <tr>
              <th colspan="2">Current search settings:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Your Latitude:</td>
              <td>
                <span v-if="userLatitude === undefined || userLatitude === null || userLatitude === ''">--</span>
                <span v-else>{{userLatitude}}</span>
              </td>
            </tr>
            <tr>
              <td>Your Longitude:</td>
              <td>
                <span v-if="userLongitude === undefined || userLongitude === null || userLongitude === ''">--</span>
                <span v-else>{{userLongitude}}</span>
              </td>              
            </tr>
            <tr>
              <td>Starting radius:</td>
              <td>
                <span v-if="searchAreaZeroRadius === undefined || searchAreaZeroRadius === null || searchAreaZeroRadius === ''">-- km</span>
                <span v-else>{{searchAreaZeroRadius}} km</span>
              </td>
            </tr> 
            <tr>
              <td>Max radius:</td>
              <td>
                <span v-if="searchAreaMaxRadius === undefined || searchAreaMaxRadius === null || searchAreaMaxRadius === ''">-- km</span>
                <span v-else>{{searchAreaMaxRadius}} km</span>
              </td>              
            </tr>                         
          </tbody>
        </table>
      </div>
    </div>
    <!-- Modal for single selected Airplane -->
    <transition name="slide-up" mode="out-in">
      <component 
        v-if="modalComponent.isVisible" 
        v-bind:is="modalComponent.activeModalComponent"
        v-bind:input-modal-data = "modalComponent.passedDataToModal"
      ></component>
    </transition>    
  </div>
</template>

<script>
import axios from 'axios';
import OverlayLoader from '@/components/modals/OverlayLoader'
import ModalSingleFlightDetails from '@/components/modals/ModalSingleFlightDetails'
//import tempDataJson from '@/temp-response-from-adsbexchange'
export default {
  name: 'ListOfAirTraffic',
  components: {
    OverlayLoader: OverlayLoader,
    ModalSingleFlightDetails: ModalSingleFlightDetails
  },    
  data() {
    return {
      listOfAvailableTraffic: null,
      userLatitude: null,
      userLongitude: null,
      searchAreaZeroRadius: 0,
      searchAreaMaxRadius: 300,
      // ~ for showing modal
      modalComponent: {
        isVisible: false,
        activeModalComponent: null,
        passedDataToModal: null
      }
    }
  },
  computed: {
    sortedTrafficList: function () {
      // `this` points to the vm instance
      //return this.message.split('').reverse().join('')
      return _.orderBy(this.listOfAvailableTraffic, 'Alt', 'desc');       
    }
  },
  methods:{
    ///
    getGeolocation: function () {
      //show loader
      this.toggleModal(true, OverlayLoader);
      this.userLatitude = this.$store.state.vuexStoredGeoData.latitude;
      this.userLongitude = this.$store.state.vuexStoredGeoData.longitude;
      //create api call with right params
      let q_baseUrl = "http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?";
      let q_userLatitude = "lat=" + this.userLatitude;
      let q_userLongitude = "&lng=" + this.userLongitude;
      let q_zeroGroundDistance = "&fDstL=" + this.searchAreaZeroRadius;
      let q_maxDistanceFromUser = "&fDstU=" + this.searchAreaMaxRadius;
      let apiCallQueryParams = q_baseUrl + q_userLatitude + q_userLongitude + q_zeroGroundDistance + q_maxDistanceFromUser;
      //http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=33.433638&lng=-112.008113&fDstL=0&fDstU=100
      axios.get(apiCallQueryParams)
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
        this.modalComponent.dataForUseInModal = null;
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
    openSingleAirplaneDetails: function (inputAirplaneObject) {
      
    },
    openSingleAirplaneDetails: function(inputAirplaneObject) {
      // ~ then we need to show different page with wanted event
      var promiseFromModal = this.openModal_AirplaneDetails(inputAirplaneObject).then(
        function(response) {
          this.toggleModal(false, null);
        }.bind(this),
        function(reject) {
          this.toggleModal(false, null);
        }.bind(this)
      );
    },
    openModal_AirplaneDetails: function(inputAirplaneObject) {
      return new Promise((resolve, reject) => {
        this.modalComponent.passedDataToModal = {
          selectedAirplaneObject: inputAirplaneObject,
          resolve: resolve,
          reject: reject
        };
        this.modalComponent.activeModalComponent = ModalSingleFlightDetails;        
        this.modalComponent.isVisible = true;        
      });
    },    
  },
  created: function () {
    console.log('--created--ListOfAirTraffic')
  },
  mounted: function () {
    console.log('--mounted--ListOfAirTraffic');
    //close Loader modal
    this.getGeolocation();
  },
  destroyed: function () {
    console.log('--destroyed--ListOfAirTraffic')
  }     
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
