<template>
  <div class="n-modal-wrapper n-full-back">
    <!-- Modal Header -->
    <div class="n-modal-header">
      <div class="n-responsive-container">
        <!-- Title -->
        <div class="n-aligned-title">
          <i class="fa fa-plane" aria-hidden="true"></i>&nbsp;
          <span v-if="selectedAirplaneData && selectedAirplaneData.Icao">Flight Number: <b>{{selectedAirplaneData.Icao}}</b></span>
        </div>
        <!-- Close button -->
        <button class="n-btn n-close-btn" v-on:click="closeModal"><i class="fa fa-times" aria-hidden="true"></i>&nbsp;</button>
      </div>
    </div>
    <!-- Modal Body -->
    <div class="n-modal-body n-has-header">
      <div class="n-responsive-container">
        <!-- Blue back section title -->
        <div class="n-section-title">Flight informations</div>
        <!-- Airplane Manufacturer & Model -->
        <div class="n-grid-row">
          <div class="n-col-6">
            <div class="n-form-group">
              <label>Airplane Manufacturer</label>
              <div class="n-form-control">
                <span v-if="selectedAirplaneData.Man">{{selectedAirplaneData.Man}}</span>
                <span v-else>--</span>
              </div>
            </div>
          </div>
          <div class="n-col-6">
            <div class="n-form-group">
              <label>Airplane Model</label>
              <div class="n-form-control">
                <span v-if="selectedAirplaneData.Type">{{selectedAirplaneData.Type}}</span>
                <span v-else>--</span>                
              </div>
            </div>
          </div>                   
        </div>
        <!-- Flight destination Airport -->
        <div class="n-grid-row">
          <div class="n-col-12">
            <div class="n-form-group">
              <label>Flight destination Airport</label>
              <div class="n-form-control">
                <span v-if="selectedAirplaneData.From">{{selectedAirplaneData.From}}</span>
                <span v-else>--</span>                 
              </div>
            </div>
          </div>
        </div>
        <!-- Flight origin Airport -->
        <div class="n-grid-row">
          <div class="n-col-12">
            <div class="n-form-group">
              <label>Flight origin Airport</label>
              <div class="n-form-control">
                <span v-if="selectedAirplaneData.To">{{selectedAirplaneData.To}}</span>
                <span v-else>--</span>                   
              </div>
            </div>
          </div>
        </div>
        <!-- Airline company -->
        <div class="n-grid-row">
          <div class="n-col-12">
            <div class="n-form-group">
              <label>Airline company</label>
              <div class="n-form-control">
                <div class="n-company-logo-wrapper">
                  <img v-bind:src="sourceForAirlineCompanyLogo" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/c/ce/Example_image.png'">
                </div>
                <span v-if="selectedAirplaneData.Op">{{selectedAirplaneData.Op}}</span>
                <span v-else>--</span>                  
              </div>
            </div>
          </div>
        </div>         
      </div>
    </div>  
    <!-- Modal Footer -->
    <div class="n-modal-footer">
      <div class="n-responsive-container n-text-center">
        <button class="n-btn n-btn-primary" v-on:click="closeModal">Close</button>        
      </div>
    </div>
  </div>
</template>

<script>
/*
  This view will show wanted details about selected flight
 */
export default {
  name: 'ModalSingleFlightDetails',
  props: ['inputModalData'],
  data() {
    return {
      //variable that will keep data for selected airplane
      selectedAirplaneData: null
    }
  },
  computed: {
    //calculate logo for selected airplane company (if applicable)
    sourceForAirlineCompanyLogo: function () {
      //use clearbit api to retreive logo
      let baseUrl = "//logo.clearbit.com/";
      //get company name from selected airplane data
      let companyName = this.selectedAirplaneData && this.selectedAirplaneData.Op ? this.selectedAirplaneData.Op : 'xxxxx';
      //create full src string
      let fullSrc =  baseUrl + companyName.replace(/\s+/g, '').toLowerCase() + '.com';
      //
      return fullSrc;
    }
  },  
  methods: {
    closeModal: function (){
      //close this modal and return 'reject' to "ListOfAirTraffic.vue" (inside 'openSingleAirplaneDetails' function)
      this.reject();
    }
  },
  created: function () {
    if (this.inputModalData){
      //check for selected airplane data sent from ListOfAirTraffic.vue (inside "openModal_AirplaneDetails" function)
      if (this.inputModalData.selectedAirplaneObject){        
        //set data for selected airplane
        this.selectedAirplaneData = this.inputModalData.selectedAirplaneObject;
      }
      this.resolve = this.inputModalData.resolve;
      this.reject = this.inputModalData.reject;
    }    
  },
  mounted: function () {
    // console.log('--mounted--ModalSingleFlightDetails')
  },
  destroyed: function () {
    // console.log('--destroyed--ModalSingleFlightDetails')
  }    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
