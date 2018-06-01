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
                      <div class="n-has-circle-icon" v-bind:class="returnDirectionClass(singleAirplane)"><i class="fa fa-plane" aria-hidden="true"></i></div>
                      <div class="n-has-direction"><span>{{returnDirectionText(singleAirplane)}}</span></div>
                    </div>
                  </td>
                  <td class="n-col-5 n-has-altitude">
                    <span v-if="singleAirplane.Alt"><b>{{singleAirplane.Alt}} ft</b></span>
                    <span v-else><b>-- ft</b></span>
                  </td>
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
    <transition :name="typeOfOverlayAnimation" mode="out-in">
      <component 
        v-if="modalComponent.isVisible" 
        v-bind:is="modalComponent.activeModalComponent"
        v-bind:input-modal-data = "modalComponent.passedDataToModal"
      ></component>
    </transition>    
  </div>
</template>

<script>
/*
  ListOfAirTraffic will get geolocation coordinates (updated in App.vue) and call API to retreive list of all traffic in 100km radius from user
 */
//axios is used to handle api calls
import axios from 'axios';
import OverlayLoader from '@/components/modals/OverlayLoader'
import ModalSingleFlightDetails from '@/components/modals/ModalSingleFlightDetails'
import ModalError from '@/components/modals/ModalError';
export default {
  name: 'ListOfAirTraffic',
  components: {
    OverlayLoader: OverlayLoader,
    ModalSingleFlightDetails: ModalSingleFlightDetails,
    ModalError: ModalError
  },    
  data() {
    return {
      //we want different transition for some components on/off ('slide-up' or 'fade')
      typeOfOverlayAnimation: 'slide-up',
      //interval for updating list of traffic (inside interval function we defined 60000ms call)
      updateTrafficListInterval: null,
      //list that will have unsorted data received from api
      listOfAvailableTraffic: null,
      userLatitude: null,
      userLongitude: null,
      //start radius from which we want to search air traffic
      searchAreaZeroRadius: 0,
      //max radius for traffic search
      searchAreaMaxRadius: 100,
      // ~ for showing modal
      modalComponent: {
        isVisible: false,
        activeModalComponent: null,
        passedDataToModal: null
      }
    }
  },
  computed: {
    //sort retreived list from api (list of air traffic)
    sortedTrafficList: function () {
      return _.orderBy(this.listOfAvailableTraffic, 'Alt', 'desc');       
    }
  },
  methods:{
    //function which we want to call each time when list should be updated (list with air traffic)
    updateTrafficBasedOnGeolocation: function () {
      //show overlay loader until we get list from api
      this.toggleModal(true, OverlayLoader);
      //take latitude and longitude (is updated inside App.vue)
      this.userLatitude = this.$store.state.vuexStoredGeoData.latitude;
      this.userLongitude = this.$store.state.vuexStoredGeoData.longitude;
      //check if we have both values
      if (this.userLatitude && this.userLongitude){
        //create api call with right params
        let q_baseUrl = "http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?";
        let q_userLatitude = "lat=" + this.userLatitude;
        let q_userLongitude = "&lng=" + this.userLongitude;
        let q_zeroGroundDistance = "&fDstL=" + this.searchAreaZeroRadius;
        let q_maxDistanceFromUser = "&fDstU=" + this.searchAreaMaxRadius;
        let apiCallQueryParams = q_baseUrl + q_userLatitude + q_userLongitude + q_zeroGroundDistance + q_maxDistanceFromUser;
        //make call to API with axios by passing wanted query
        axios.get(apiCallQueryParams)
        .then(response => {
          //when success, we want to update unsorted list of all traffic
          this.listOfAvailableTraffic = response.data.acList;
          //close overlay modal
          this.toggleModal(false, null);
        })
        .catch(error => {
          //show modal for error
          this.toggleModal(true, ModalError);
        })
      }else {
        //since we don't have longitude & latitude, we will try again after 1s
        setTimeout(this.updateTrafficBasedOnGeolocation, 1000);
      }
    },
    //open/close modal ('nextWantedState' - true/false = open/close, new-modal-component-name)
    toggleModal: function (nextWantedState, nextModalComponent) {
      //check what kind of animatino we want to show when loading modal
      if (nextModalComponent === OverlayLoader){
        this.typeOfOverlayAnimation = 'fade'
      }else{
        this.typeOfOverlayAnimation = 'slide-up'
      }
      //decide should we close or open modal based on received params
      if (nextWantedState){
        //show modal and set wanted component inside
        this.modalComponent.activeModalComponent = nextModalComponent;
        this.modalComponent.isVisible = nextWantedState;
      }else{
        //close modal and clear all settings
        this.modalComponent.isVisible = nextWantedState;
        this.modalComponent.activeModalComponent = null;
        this.modalComponent.dataForUseInModal = null;
      }
    },
    //calculate class based on airplane direction (west or east)
    returnDirectionClass: function (inputAirplaneObject) {
      let returnClass = '';
      if (inputAirplaneObject && inputAirplaneObject.Trak){
        //inputAirplaneObject.Trak starts from 0 up North and then moves clockwise (from 0 to 180)
        if (inputAirplaneObject.Trak >= 90){
          //above 90 means that plane is moving on left part
          returnClass = 'n-to-west';
        }else{
          //otherwise plane is going east
          returnClass = 'n-to-east';
        }
      }
      return returnClass;
    },
    //calculate what text we should show based on airplane direction
    returnDirectionText: function (inputAirplaneObject) {
      let returnText = '--';
      if (inputAirplaneObject && inputAirplaneObject.Trak){
        //inputAirplaneObject.Trak starts from 0 up North and then moves clockwise (from 0 to 180)
        if (inputAirplaneObject.Trak >= 90){
          //above 90 means that plane is moving on left part, to west
          returnText = 'to west';
        }else{
          //otherwise plane is going east
          returnText = 'to east';
        }
      }
      return returnText;
    },
    //Open modal for selected airplane
    openSingleAirplaneDetails: function(inputAirplaneObject) {
      //clear interval for updating list of traffic while single plane details are open
      clearInterval(this.updateTrafficListInterval);
      //close any visible modal
      this.toggleModal(false, null);
      // ~ then prepare promise for showing modal and closing
      var promiseFromModal = this.openModal_AirplaneDetails(inputAirplaneObject).then(
        function(response) {
          //close plane details modal
          this.toggleModal(false, null);
          //initialize interval for updating traffic list
          this.initUpdateInterval();
        }.bind(this),
        function(reject) {
          //close plane details modal
          this.toggleModal(false, null);
          //initialize interval for updating traffic list
          this.initUpdateInterval();
        }.bind(this)
      );
    },
    //create promise for selected Airplane details modal
    openModal_AirplaneDetails: function(inputAirplaneObject) {
      return new Promise((resolve, reject) => {
        //prepare data to pass into modal
        this.modalComponent.passedDataToModal = {
          //object with selected airplane details
          selectedAirplaneObject: inputAirplaneObject,
          //
          resolve: resolve,
          reject: reject
        };
        //set modal component to "ModalSingleFlightDetails"
        this.modalComponent.activeModalComponent = ModalSingleFlightDetails;        
        //make modal visible
        this.modalComponent.isVisible = true;        
      });
    },
    //function that we will trigger each time we want to start interval for updating traffic list
    initUpdateInterval: function (){
      this.updateTrafficListInterval = setInterval(function(){ 
        this.updateTrafficBasedOnGeolocation();  
      }.bind(this), 60000);
    }
  },
  created: function () {
    //console.log('--created--ListOfAirTraffic')
  },
  mounted: function () {
    //console.log('--mounted--ListOfAirTraffic');
    //initialize rendering of list with all available traffic
    this.updateTrafficBasedOnGeolocation();
    //call interval that will update list of planes on defined interval
    this.initUpdateInterval();
  },
  beforeDestroy: function(){
    //clear intervals before this component is destroyed
    clearInterval(this.updateTrafficListInterval);
  },
  destroyed: function () {
    //console.log('--destroyed--ListOfAirTraffic')
  }     
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
